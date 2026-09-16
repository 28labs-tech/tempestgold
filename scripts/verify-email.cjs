// Local SMTP capture only: never contacts an external mailbox or database.
const assert = require('node:assert/strict');
const net = require('node:net');
const { EnquiriesService, EnquiryDto } = require('../server/dist/modules/enquiries/enquiries.module');
const { validate } = require('../server/node_modules/class-validator');
const { randomUUID } = require('node:crypto');
async function main() {
  let messages = [], reject = false;
  const smtp = net.createServer(socket => {
    socket.write('220 localhost test SMTP\r\n');
    let buffer = '', content = '', inData = false;
    socket.on('data', chunk => {
      buffer += chunk.toString();
      let at;
      while ((at = buffer.indexOf('\r\n')) >= 0) {
        const line = buffer.slice(0, at); buffer = buffer.slice(at + 2);
        if (inData) {
          if (line === '.') { messages.push(content); content = ''; inData = false; socket.write('250 queued locally\r\n'); }
          else content += line + '\n';
        } else if (/^(EHLO|HELO)/.test(line)) socket.write('250 localhost\r\n');
        else if (/^RCPT/.test(line)) socket.write(reject ? '550 rejected\r\n' : '250 OK\r\n');
        else if (/^DATA/.test(line)) { inData = true; socket.write('354 proceed\r\n'); }
        else if (/^QUIT/.test(line)) socket.end('221 bye\r\n');
        else socket.write('250 OK\r\n');
      }
    });
  });
  await new Promise(resolve => smtp.listen(0, '127.0.0.1', resolve));
  const rows = new Map();
  const receipts = {
    async create(row) { if (rows.has(row.requestId)) throw { code: 11000 }; rows.set(row.requestId, row); },
    findOne({requestId}) { return { lean: async () => rows.get(requestId) }; },
    async updateOne({requestId}, update) { Object.assign(rows.get(requestId), update); },
    async deleteOne({requestId}) { rows.delete(requestId); },
  };
  const config = { smtpHost:'127.0.0.1', smtpPort:smtp.address().port, smtpSecure:false, emailFrom:'website@example.test', enquiryTo:'adviser@example.test' };
  const service = new EnquiriesService(config, receipts);
  const data = Object.assign(new EnquiryDto(), { requestId:randomUUID(), name:'Test Person', email:'visitor@example.test', phone:'', service:'Valuation', property:'Test property', intent:'Consultation', message:'Local test enquiry only.', consent:true });
  try {
    assert.equal((await validate(data)).length, 0);
    assert.equal((await service.submit(data)).status, 'sent');
    assert.equal(messages.length, 1);
    assert.match(messages[0], /Reply-To: Test Person <visitor@example.test>/);
    assert.match(messages[0], /To: adviser@example.test/);
    await service.submit(data);
    assert.equal(messages.length, 1, 'A retry must not send a duplicate');
    await assert.rejects(service.submit({...data,message:'Changed content'}), /already used/);
    reject = true;
    const failed = {...data, requestId:randomUUID()};
    await assert.rejects(service.submit(failed), /could not be sent/);
    assert.equal(rows.has(failed.requestId), false, 'Failed mail must be retryable');
    reject = false;
    assert.equal((await service.submit(failed)).status, 'sent');
    const unavailable = new EnquiriesService({...config,smtpHost:''}, receipts);
    await assert.rejects(unavailable.submit({...data,requestId:randomUUID()}), /not configured/);
    unavailable.onModuleDestroy();
    assert.ok((await validate(Object.assign(new EnquiryDto(), {...data,email:'invalid',consent:false}))).length >= 2);
    console.log('Email checks passed: SMTP acceptance, fixed recipient, reply-to, deduplication, rejection/retry, missing settings and validation. No external email sent.');
  } finally { service.onModuleDestroy(); await new Promise(resolve => smtp.close(resolve)); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

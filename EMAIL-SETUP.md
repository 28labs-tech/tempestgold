# Email delivery

**Current selection: Mailtrap sandbox.** The local configuration uses `sandbox.smtp.mailtrap.io`, port 587, and clearly labelled `.test` sender/recipient addresses. Fill in `SMTP_USER` and `SMTP_PASSWORD` from your sandbox Integration tab. These addresses are test labels, not company contact details. Successful forms report sandbox capture; live delivery is disabled. Do not enter real customer data during sandbox testing.

Mailtrap was selected as the provider. For live delivery use `SMTP_HOST=live.smtp.mailtrap.io`, `SMTP_PORT=587`, `SMTP_SECURE=false`, and `SMTP_USER=api`; set `SMTP_PASSWORD` to the token from your verified sending domain's **Integrations → Transactional → SMTP** settings. Choose `EMAIL_FROM` on that verified domain and `ENQUIRY_TO` as the real advisory mailbox. See [Mailtrap SMTP integration](https://docs.mailtrap.io/email-api-smtp/setup/smtp-integration).

For testing only, use `SMTP_HOST=sandbox.smtp.mailtrap.io` and the username/password shown under **Email Testing → Sandboxes → Integration → SMTP**. Sandbox messages stay in Mailtrap and never reach the real recipient. See [Mailtrap sandbox integration](https://docs.mailtrap.io/email-sandbox/setup/sandbox-smtp-integration). No account credentials have been supplied yet, so neither mode is activated.

The contact, property and valuation forms POST to `/api/enquiries`. Success means the configured SMTP server accepted the message, not a guarantee of inbox placement. Failures preserve the form for retry. Duplicate request references are retained in MongoDB for 24 hours; message bodies are never stored there. There is no CRM integration.

Enter these values in the ignored `server/.env`:

```
SMTP_HOST=your-provider-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password
EMAIL_FROM=verified-sender@your-domain
ENQUIRY_TO=your-advisory-mailbox@your-domain
```

Use port 465 with `SMTP_SECURE=true` if your provider requires it. STARTTLS is required for other external SMTP connections. Never put SMTP passwords in frontend `VITE_` variables. Both address settings must be single plain email addresses. Configure SPF/DKIM with the provider and monitor mailbox bounces. Restart the API after changing settings: `cd server`, `npm run build`, `npm start`.

Until the mailbox settings are supplied, forms show an honest configuration error and do not claim to send. No customer enquiry has been sent during implementation. `node scripts/verify-email.cjs` uses a local SMTP capture service.

The API limits submissions to five per IP in ten minutes. If deployed behind a proxy, configure Express trust proxy for that specific infrastructure before changing the limiter; never trust arbitrary forwarded headers. Rate limits are per API process. For multiple instances, add a shared rate limit store.

# Credentials and dependencies

Local JWT and admin password were rotated. Read the current login values in `server/.env`; existing tokens will need a new login. `.env` files are removed from Git tracking and safe examples are provided. Previously committed credentials remain in repository history: rotate Cloudinary keys through the provider account, then replace the local values. Shared Git history has not been rewritten.

Node 24 is used locally. The API uses Nest 11 with patched Multer 2 through an npm override, retaining CommonJS and Mongoose 8. Recheck `npm audit` in both package directories before deployment. Admin routes and their editor dependencies are dynamically imported.

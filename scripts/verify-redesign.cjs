// Transient checks: no database connection, writes, or published test records.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
function load(filename) {
  const full = path.resolve(__dirname, "..", filename);
  const output = ts.transpileModule(fs.readFileSync(full, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };
  const localRequire = (name) => {
    if (name === "../hooks/useCollection") return {};
    return require(name);
  };
  vm.runInNewContext(output, {
    module,
    exports: module.exports,
    require: localRequire,
  });
  return module.exports;
}
const {
  amountFor,
  priceFor,
  categoryFor,
  isResidential,
  statusFor,
  botswanaLocations,
} = load("src/data/property.ts");
assert.ok(botswanaLocations.includes("Gaborone"));
assert.equal(priceFor({ purpose: "For Sale" }), "POA");
assert.equal(priceFor({ purpose: "To Let", price: 3000000 }), "POA");
assert.equal(priceFor({ purpose: "For Sale", price: 0 }), "POA");
assert.equal(priceFor({ purpose: "For Sale", price: -100 }), "POA");
assert.equal(priceFor({ purpose: "For Sale", price: NaN }), "POA");
assert.equal(
  amountFor({ purpose: "To Let", price: 3000000, price_monthly: 25000 }),
  25000,
);
assert.equal(priceFor({ purpose: "For Sale", price: 3500000 }), "P 3,500,000");
assert.equal(
  priceFor({ purpose: "To Let", price_monthly: 25000 }),
  "P 25,000 / month",
);
assert.equal(isResidential({ type: "Commercial for sale" }), false);
assert.equal(isResidential({ type: "Residential for sale" }), true);
assert.equal(categoryFor("Vacant land"), "Development Land / Plots");
assert.equal(categoryFor("Warehouse / Industrial"), "Warehouse / Industrial");
assert.equal(statusFor({ purpose: "For Sale", status: "Sold" }), "Sold");
const mongoose = require("../server/node_modules/mongoose");
const { PropertySchema } = require("../server/dist/schemas/property.schema");
const Model = mongoose.model("TransientRedesignCheck", PropertySchema);
const commercial = new Model({
  title: "Transient validation fixture",
  location: "Test only",
  type: "Office",
  purpose: "To Let",
  lettableArea: 320,
  tenure: "Test only",
  uses: ["Commercial Use"],
  images: ["https://example.com/test.jpg"],
  amenities: ["Parking"],
});
assert.equal(commercial.validateSync(), undefined);
assert.equal(commercial.price, undefined);
assert.equal(commercial.bedrooms, undefined);
assert.equal(commercial.lettableArea, 320);
assert.equal(commercial.uses[0], "Commercial Use");
console.log(
  "Redesign checks passed: POA, Pula prices, rental amounts, property categories, verified-location filters, and commercial schema.",
);

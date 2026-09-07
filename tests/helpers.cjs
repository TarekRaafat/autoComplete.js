const { before, after } = require("node:test");
const { rollup } = require("rollup");
const { chromium, firefox, webkit } = require("playwright");
let browser, source;
before(async () => {
  const bundle = await rollup({ input: "src/autoComplete.js" });
  source = (await bundle.generate({ format: "iife", name: "autoComplete" })).output[0].code;
  await bundle.close();
  const engine = process.env.TEST_BROWSER || "chromium";
  browser = await ({ chromium, firefox, webkit })[engine].launch({ headless: true });
  console.log("Browser:", engine, browser.version());
});
after(async () => { if (browser) await browser.close(); });
const formats = ["source", "dist/autoComplete.js", "dist/autoComplete.min.js"];
async function run(format, scenario, arg) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  try {
    await page.setContent('<input id="autoComplete">');
    await page.addScriptTag(format === "source" ? { content: source } : { path: format });
    await page.evaluate(() => {
      window.tick = (ms = 25) => new Promise(resolve => setTimeout(resolve, ms));
      window.mount = async options => {
        const ac = new autoComplete(Object.assign({ data: { src: ["apple", "apricot", "avocado"] } }, options));
        await tick();
        return ac;
      };
    });
    const value = await page.evaluate(scenario, arg);
    return { value, errors };
  } finally { await page.close(); }
}
module.exports = { formats, run };

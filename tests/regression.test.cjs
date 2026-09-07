const { test } = require("node:test");
const assert = require("node:assert/strict");
const { formats, run } = require("./helpers.cjs");
for (const format of formats) {
  test(format + ": full matches, filtered results and selection", async () => {
    const { value, errors } = await run(format, async () => {
      const ac = await mount({ resultsList: { maxResults: 1 } });
      ac.start("a"); await tick();
      let selected;
      ac.input.addEventListener("selection", e => selected = e.detail.selection.value);
      ac.select(0);
      return [ac.feedback.matches.length, ac.feedback.results.length, selected];
    });
    assert.deepEqual(errors, []);
    assert.deepEqual(value, [3, 1, "apple"]);
  });
  test(format + ": undefined event override retains default input handler", async () => {
    const { value, errors } = await run(format, async () => {
      const ac = await mount({ events: { input: { input: undefined } } });
      ac.input.value = "a"; ac.input.dispatchEvent(new Event("input")); await tick();
      return ac.feedback.results.length;
    });
    assert.deepEqual(errors, []);
    assert.equal(value, 3);
  });
  for (const cache of [false, true]) for (const kind of ["array", "promise", "async"]) {
    test(format + ": " + kind + " source, cache=" + cache, async () => {
      const { value, errors } = await run(format, async ({ cache, kind }) => {
        const records = [{ name: "apple" }, { name: "banana" }];
        let calls = 0;
        const src = kind === "array" ? records : kind === "promise"
          ? () => { calls++; return Promise.resolve(records); }
          : async () => { calls++; return records; };
        const ac = await mount({ data: { src, keys: ["name"], cache } });
        ac.start("app"); await tick();
        const first = ac.feedback.results[0].value.name;
        ac.start("ban"); await tick();
        return [first, ac.feedback.results[0].value.name, calls];
      }, { cache, kind });
      assert.deepEqual(errors, []);
      assert.deepEqual(value, ["apple", "banana", kind === "array" ? 0 : cache ? 1 : 2]);
    });
  }
}

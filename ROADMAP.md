# autoComplete.js Roadmap

## Context

This plan covers the path from v10.3.0 through v11.1.0, shaped by community feedback, open issues, contributor PRs, and improvements identified over time. Safe, non-breaking improvements ship incrementally in v10.x. All breaking changes are batched into v11.0.0.

### Core Principles

Every decision in this plan is anchored to these principles. They always come first.

1. **Pure vanilla JavaScript**, zero dependencies
2. **Smallest footprint in its category**, every byte is measured
3. **Simple, lightweight, and fast**
4. **Highly customizable**, flexible enough to adapt to any project, use case, or design system
5. **Great developer experience**, clean API, clear defaults, predictable behavior
6. **Solid WAI-ARIA accessibility**, full combobox pattern compliance
7. **Thorough documentation**, every config option, method, and event is covered with types, defaults, and real examples

---

## Release 1: v10.3.0, Robustness & Internal Improvements

**Theme**: Fix bugs and harden internals. Zero API surface changes. Zero breaking changes.

### Changes

| Ref | Area | File(s) | What Changes |
|-----|------|---------|-------------|
| B3 | No input element validation (PR #379) | `src/services/configure.js` | Add validation after `select(ctx.selector)`. Throw descriptive `Error` if input element is `null` |
| B1 | No validation on `data.src` return (#333) | `src/controllers/dataController.js` | Wrap `await data.src(query)` in try/catch; validate result is array-like; set `ctx.feedback = error` on failure |
| B2 | Unhandled promise rejection in init | `src/autoComplete.js` | Add `.catch()` on `init(this)` call; emit "error" event via eventEmitter |
| B4 | Data fetch errors silently swallowed (PR #453) | `src/services/start.js` | Emit "error" event when `ctx.feedback instanceof Error`, before returning; add request ID counter to discard stale async responses |
| A2 | Prototype extension runs per-instance | `src/autoComplete.js`, `src/services/extend.js` | Move `extend.call()` out of constructor to module-level; execute once at import time |
| A4 | Instance counter naming misleading | `src/autoComplete.js` | Rename `autoComplete.instances` to `autoComplete._nextId` |
| D1 | No early termination in search | `src/controllers/dataController.js` | Break out of `forEach` (convert to `for...of`) when `matches.length >= maxResults` AND no custom `data.filter` is set |
| D2 | `innerHTML = ""` for list clearing | `src/controllers/listController.js` | Replace `list.innerHTML = ""` with `list.replaceChildren()` |
| D4 | Invalid `rgba()` with hex codes in CSS (PR #449) | `dist/css/autoComplete.01.css`, `dist/css/autoComplete.02.css` | Replace invalid `rgba(#ffffff, 0)` with `transparent`; fix must be applied to source stylesheets, not dist |
| E3 | Missing aria-label on listbox (PR #375, #372) | `src/services/init.js` | Add `"aria-label": "Results"` to list element (configurable via `resultsList.ariaLabel`); add top-level `ariaLabel` config option for wrapper/input element |
| E4 | WAI-ARIA 1.2 combobox compliance audit | `src/services/init.js`, `src/controllers/listController.js` | Audit against the full WAI-ARIA 1.2 combobox pattern; add `aria-live` region for result count announcements; verify focus management edge cases; document compliance level |

### Verification
- Manual: init with invalid selector -> should throw clear error
- Manual: `data.src` returns null/undefined/rejects -> should emit "error" event, no crash
- Manual: Confirm all existing functionality unchanged (search, navigate, select)
- Manual: Screen reader testing (VoiceOver/NVDA) for result count announcements and focus management
- Manual: CSS stylesheets use valid standard CSS (no preprocessor-only syntax)
- Automated: Vitest unit tests (added in v10.4.0, but can be backported here)

---

## Release 2: v10.4.0, Build Modernization, Test Infrastructure & Docs Overhaul

**Theme**: Modernize the toolchain, add test coverage, and overhaul documentation based on community feedback. No runtime behavior changes.

### Changes

| Ref | Area | File(s) | What Changes |
|-----|------|---------|-------------|
| F1 | `nodent` transpiler unmaintained (PR #447, PR #445, PR #391) | `rollup.config.js`, `package.json` | Remove `rollup-plugin-nodent`; evaluate swc vs babel+terser (PR #447); update all outdated dependencies (PR #445); includes json5 security fix (PR #391) |
| F2 | Source maps disabled | `rollup.config.js` | Enable external `.map` files for dev build; inline sourcemaps for dev server |
| F3 | Build outputs to `docs/demo/` | `rollup.config.js` | Remove docs output from Rollup config; add a simple copy script in npm scripts (`"postbuild": "cp dist/*.js docs/demo/js/"`) |
| C2 | No `exports` field in package.json | `package.json` | Add `exports` map pointing `.` at `main`/`browser` (prep for ESM in v11): `{ ".": { "require": "./dist/autoComplete.js", "default": "./dist/autoComplete.min.js" }, "./css/*": "./dist/css/*" }` |
| G1 | Zero test infrastructure | New files | Add Vitest + jsdom; create test suite structure: `tests/unit/` for each controller/helper/service; `tests/integration/` for full lifecycle |
| G2 | No linting/formatting | New config files | Add ESLint (flat config) + Prettier; add `"lint"` and `"format"` npm scripts |

### Test Suite Structure (G1)
```
tests/
  unit/
    searchController.test.js    <- strict/loose modes, diacritics, edge cases
    dataController.test.js      <- sync/async data, caching, error handling
    listController.test.js      <- render, open, close, navigation, selection
    eventController.test.js     <- event attach/detach, merge behavior
    configure.test.js           <- config merging, defaults
    io.test.js                  <- select, create, format, debounce, mark
  integration/
    lifecycle.test.js           <- init -> input -> results -> select -> destroy
  setup.js                      <- jsdom environment setup
```

### Documentation Overhaul (Community-Driven)

Most support requests from the community point to docs gaps, not missing features. The following pages need rework:

**`docs/configuration.md`** - Improve the selection event section (#425, #382):
- Add clear before/after examples for both string data and object data with keys
- Show how `event.detail.selection` differs between the two data types
- Document the full `feedback` object shape at each lifecycle stage

**`docs/how-to-guides.md`** - Add missing recipes for the most asked-about patterns:
- Show all results on focus/click (threshold: 0 + events.input.focus) - #218, #277, #403, #451
- Force selection from list (validate on blur) - #419, #381
- Multiple instances on the same page (separate instances, not class selectors) - #267, #386, #395, #440
- Dynamic data / runtime data updates (cache vs. live, re-fetching) - #214, #271, #305
- Async data with error handling (try/catch pattern) - #207, #247, #258, #424
- Custom result rendering with multiple fields - #275, #385, #413
- Disabling the wrapper when it breaks CSS - #227, #338
- Searching across multiple keys simultaneously - #191, #220, #273, #414
- Fix the Recent Searches example (.reverse() -> .toReversed()) - #438

**`docs/usage.md`** - Strengthen the security note:
- Move the XSS/sanitization warning higher, not buried at the bottom
- Add a concrete example using DOMPurify with the `query` config option

**General**:
- Review all code examples for consistency with current API
- Ensure every config option links to a working example
- Update the `llms.txt` file to stay in sync with any new docs content

### Verification
- `npm run build` succeeds with no nodent
- Source maps present in dev build
- `npm test` runs full suite with >80% coverage on core modules
- `npm run lint` passes clean
- Bundle size delta < 0.5 KB from v10.3.0
- All new how-to-guide examples verified working against current build

---

## Release 3: v10.5.0, Headless Mode & Standalone Search Export

**Theme**: Open the library to headless/framework-integration use cases and enable tree-shaking of the search engine. Non-breaking, opt-in features only.

### Changes

| Ref | Area | File(s) | What Changes |
|-----|------|---------|-------------|
| H1 | No headless/renderless mode (#370) | `src/services/init.js`, `src/controllers/eventController.js`, `src/autoComplete.js` | Add `render: false` config option; when disabled, skip wrapper/list DOM creation and event binding; users call `instance.start(query)` manually and read results from `ctx.feedback`; all search, data, and lifecycle events still fire normally |
| H2 | Search engine not independently importable | `src/controllers/searchController.js`, `rollup.config.js` | Export `search()` as a standalone named export (`import { search } from "@tarekraafat/autocomplete.js/search"`); add separate entry point in `exports` field; enables ~1 KB tree-shaken import of just the matching engine without any DOM layer |
| R1 | No scoring or ranking control | `src/controllers/dataController.js` | Add `data.sort` callback option; receives matched results array after filtering, returns sorted array; enables custom relevance ranking, weighted scoring, or plugging in external rankers; default behavior (insertion order) unchanged when not set |
| R2 | No empty state / no-results template | `src/controllers/listController.js`, `src/services/init.js` | Add `resultsList.noResults` callback option; when set, fires with `(list, query)` when search returns zero matches; allows rendering a "No results found" message or suggestion; list opens to show the empty state content |
| R8 | No case-sensitive search option (PR #436, #412) | `src/helpers/io.js`, `src/controllers/searchController.js`, `src/controllers/dataController.js` | Add `caseSensitive` config option (default `false`); when enabled, skip `.toLowerCase()` in `format()`; pass through search pipeline via searchController and dataController |

### API Surface

**Headless mode usage:**
```javascript
const ac = new autoComplete({
  selector: "#query",
  render: false,
  data: { src: ["..."] },
  events: {
    input: {
      results: (event) => {
        const { matches, results } = event.detail;
        // render results with your own UI / framework
      }
    }
  }
});
ac.start("search term");
```

**Standalone search import:**
```javascript
import { search } from "@tarekraafat/autocomplete.js/search";
const result = search("query", "record value", { mode: "loose" });
```

**Custom scoring/ranking:**
```javascript
const ac = new autoComplete({
  selector: "#query",
  data: {
    src: ["..."],
    sort: (results) => {
      // Sort by match length (shortest first) or any custom logic
      return results.sort((a, b) => a.value.length - b.value.length);
    }
  }
});
```

**Empty state template:**
```javascript
const ac = new autoComplete({
  selector: "#query",
  resultsList: {
    noResults: (list, query) => {
      const message = document.createElement("li");
      message.textContent = `No results found for "${query}"`;
      message.setAttribute("class", "no_results");
      list.appendChild(message);
    }
  }
});
```

### Package.json Additions
```json
"exports": {
  ".": { "require": "./dist/autoComplete.js", "default": "./dist/autoComplete.min.js" },
  "./search": { "import": "./dist/search.esm.js", "require": "./dist/search.cjs.js" },
  "./css/*": "./dist/css/*"
}
```

### Verification
- Headless: `render: false` produces no DOM elements, no event listeners on input
- Headless: `start(query)` triggers search pipeline and fires `results` event with correct feedback
- Headless: existing `render: true` (default) behavior is completely unchanged
- Standalone: `import { search }` works in isolation without side effects
- Standalone: tree-shaken bundle size is < 1.5 KB gzipped
- Sorting: `data.sort` receives correct results array and returned order is preserved in rendering
- Sorting: omitting `data.sort` preserves existing insertion-order behavior
- Empty state: `resultsList.noResults` fires only when matches array is empty
- Empty state: list opens to display the no-results content
- Empty state: omitting `resultsList.noResults` preserves existing behavior (list stays closed on zero results)
- Case sensitive: `caseSensitive: true` preserves original casing in query and record matching
- Case sensitive: `caseSensitive: false` (default) maintains existing lowercase behavior
- Full bundle size delta < 0.5 KB from v10.4.0

---

## Release 4: v11.0.0, Major Release (Breaking Changes)

**Theme**: Modernize the API, fix structural issues, ship ESM, eliminate XSS vectors. All breaking changes land here.

### Breaking Changes

| Ref | Area | File(s) | What Changes | Migration |
|-----|------|---------|-------------|-----------|
| A1 | No `new` guard on constructor | `src/autoComplete.js` | Convert from constructor function to ES `class autoComplete {}`. Enforces `new` automatically | Consumers calling without `new` must add it |
| A3 | Shallow config merge breaks on null/arrays | `src/services/configure.js` | Rewrite merge to use plain-object check (`Object.getPrototypeOf(v) === Object.prototype`); handle `null`, arrays, DOM elements correctly; support deeper nesting | Edge cases where consumers passed arrays/null in unusual ways may behave differently |
| C1 | `module` points to minified UMD | `rollup.config.js`, `package.json` | Add ESM output (`dist/autoComplete.esm.js`); update `module` to point at ESM; ship **Dual CJS + ESM** via `exports` field | No action for most users; `require()` still works via `main`, bundlers now get ESM |
| C3 | Internal state exposed on instance | `src/autoComplete.js`, all controllers | Move internal state (`cursor`, `feedback`, `isOpen`) to a `WeakMap`; expose read-only via getters on the class | `instance.cursor` becomes read-only; direct mutation breaks |
| C4 | `unInit()` doesn't remove results list (#358) | `src/services/extend.js` | Add `this.list.remove()` to `unInit()` | Consumers relying on list persisting after destroy must re-create it |
| C5 | Re-init doesn't teardown first (PR #369, #356, #407) | `src/services/extend.js` | `init()` calls `unInit()` if already initialized (guard via `this._initialized` flag); fix `select(index)` crashing when called before `ctx.feedback` is populated | Double-init no longer creates duplicates |
| D3 | Highlight via innerHTML, XSS vector (#406, #420) | `src/controllers/searchController.js`, `src/helpers/io.js`, `src/controllers/listController.js` | Build highlights using DOM nodes (Text + `<mark>` elements) in a DocumentFragment; stop using `innerHTML` for result items | `resultItem.element()` callback receives DOM-built items instead of HTML-string items; `match` property in results is now a DocumentFragment, not a string |
| E1 | Deprecated `keyCode` usage | `src/controllers/listController.js` | Replace `event.keyCode` with `event.key` (`"ArrowDown"`, `"ArrowUp"`, `"Enter"`, `"Tab"`, `"Escape"`) | Consumers overriding keyboard events with keyCode-based logic must migrate |
| E2 | Escape clears input (surprising) (#402) | `src/controllers/listController.js` | Escape only closes the list by default; add `resultsList.clearOnEscape: false` option to control behavior | Consumers relying on Escape clearing input must set `clearOnEscape: true` |

### Non-Breaking Improvements Also Landing in v11

- **ESM class syntax** throughout (aligns with ESM output)
- **`exports` field** updated for dual CJS+ESM (extends v10.5.0 standalone search export):
  ```json
  "exports": {
    ".": {
      "import": "./dist/autoComplete.esm.js",
      "require": "./dist/autoComplete.cjs.js",
      "default": "./dist/autoComplete.min.js"
    },
    "./search": {
      "import": "./dist/search.esm.js",
      "require": "./dist/search.cjs.js"
    },
    "./css/*": "./dist/css/*"
  }
  ```
- **Build outputs**: `dist/autoComplete.esm.js`, `dist/autoComplete.cjs.js`, `dist/autoComplete.min.js` (UMD for CDN/unpkg)

### Rollup Config Changes for v11
```
Output targets:
1. ESM  -> dist/autoComplete.esm.js     (module/import)
2. CJS  -> dist/autoComplete.cjs.js     (require)
3. UMD  -> dist/autoComplete.min.js     (CDN/unpkg/browser)
4. UMD  -> dist/autoComplete.js         (development, unminified)
```

### Migration Guide (to ship with v11)
Document each breaking change with before/after code examples:
1. `new` is now required (class enforcement)
2. Config merge is stricter: null values are no longer iterated
3. `instance.cursor` / `instance.isOpen` are now read-only getters
4. `unInit()` now removes the results list from DOM
5. `init()` is now idempotent (auto-teardown)
6. Highlighted `match` is now a DocumentFragment, not an HTML string
7. Keyboard events use `event.key` instead of `event.keyCode`
8. Escape only closes the list (set `clearOnEscape: true` for old behavior)

### Verification
- All v10.4.0 tests pass (adjusted for new API)
- New tests for: class enforcement, config merge edge cases, WeakMap state isolation, DOM-based highlighting, event.key navigation, escape behavior
- Bundle size target: < 4 KB gzipped (ESM), < 5 KB gzipped (UMD)
- Migration guide reviewed against top 10 GitHub issues for common patterns
- CDN consumers (unpkg/jsdelivr) get UMD as before, no breakage

---

## Release 5: v11.1.0, Feature Expansion

**Theme**: Expand capabilities with highly requested features. Non-breaking additions that build on v11's class architecture and ESM foundation.

### Changes

| Ref | Area | File(s) | What Changes |
|-----|------|---------|-------------|
| R3 | No plugin/extensibility system | `src/autoComplete.js`, new `src/plugins/` | Add lightweight plugin lifecycle hooks using `before`/`after` pattern on core methods (`start`, `open`, `close`, `select`, `navigate`); plugins register via `plugins: [myPlugin()]` config array; each plugin is a plain object with optional lifecycle methods; core iterates hooks at near-zero cost when no plugins are registered |
| R4 | No multi-source / federated search (#394, #362) | `src/controllers/dataController.js`, `src/controllers/listController.js` | Accept `data.src` as an array of source objects, each with its own `src`, `keys`, `filter`, and `display` config; results render in grouped sections within the list; each source group is a `<div>` with `role="group"` and `aria-label` inside the listbox; single-source config remains unchanged (backward compatible) |
| R5 | No section templates (headers, footers) | `src/controllers/listController.js` | When using multi-source, each source object accepts optional `header(element, sourceData)` and `footer(element, sourceData)` callbacks for rendering section labels, counts, or "View all" links; rendered as non-interactive elements outside the `role="option"` items |
| R6 | No recent searches utility | New `src/plugins/recentSearches.js` | Ship as an optional first-party plugin; stores queries in `localStorage` with configurable key and max entries; exposes `get()`, `add(query)`, and `clear()` methods; integrates with multi-source as an additional data source; tree-shakeable, not included in core bundle unless imported |
| R7 | No paste-split for multi-value inputs | `src/controllers/eventController.js` | Add `events.input.paste` handler; when `selection.mode: "multiple"` is active, split pasted text by configurable delimiter (default: `,`); each token triggers selection; opt-in, no effect in single-select mode |

### API Surface

**Plugin registration:**
```javascript
const ac = new autoComplete({
  selector: "#query",
  plugins: [
    recentSearches({ max: 5 }),
    myCustomPlugin()
  ]
});
```

**Plugin shape:**
```javascript
function myCustomPlugin() {
  return {
    name: "my-plugin",
    before: {
      start: (ctx, query) => { /* modify query before search */ },
      select: (ctx, event, index) => { /* validate before selection */ }
    },
    after: {
      open: (ctx) => { /* track analytics on open */ },
      close: (ctx) => { /* cleanup on close */ }
    }
  };
}
```

**Multi-source / federated search:**
```javascript
const ac = new autoComplete({
  selector: "#query",
  data: {
    src: [
      {
        name: "recent",
        src: () => recentSearches.get(),
        header: (el) => { el.textContent = "Recent Searches"; }
      },
      {
        name: "results",
        src: async (query) => fetch(`/api/search?q=${query}`).then(r => r.json()),
        keys: ["title"],
        header: (el) => { el.textContent = "Results"; },
        footer: (el, data) => { el.textContent = `${data.matches.length} found`; }
      }
    ]
  }
});
```

**Recent searches plugin:**
```javascript
import { recentSearches } from "@tarekraafat/autocomplete.js/plugins/recentSearches";

const recent = recentSearches({ key: "ac_recent", max: 10 });

const ac = new autoComplete({
  selector: "#query",
  plugins: [recent],
  events: {
    input: {
      selection: (event) => {
        recent.add(event.detail.selection.value);
      }
    }
  }
});
```

### Package.json Additions
```json
"exports": {
  ".": { "import": "./dist/autoComplete.esm.js", "require": "./dist/autoComplete.cjs.js", "default": "./dist/autoComplete.min.js" },
  "./search": { "import": "./dist/search.esm.js", "require": "./dist/search.cjs.js" },
  "./plugins/recentSearches": { "import": "./dist/plugins/recentSearches.esm.js", "require": "./dist/plugins/recentSearches.cjs.js" },
  "./css/*": "./dist/css/*"
}
```

### Verification
- Plugins: lifecycle hooks fire in registration order, before/after core method execution
- Plugins: zero plugins registered has no measurable performance impact
- Plugins: plugin errors are caught and emitted as "error" events, not swallowed
- Multi-source: single-source `data.src` config works identically to v11.0.0
- Multi-source: array of sources renders grouped sections with correct ARIA roles
- Multi-source: keyboard navigation flows through all source groups sequentially
- Multi-source: each source can have independent async fetch timing
- Section templates: headers/footers render as non-interactive, non-selectable elements
- Recent searches: localStorage read/write works correctly; respects max limit
- Recent searches: tree-shaken out of main bundle when not imported
- Paste-split: only active in `selection.mode: "multiple"`; no effect in single-select
- Paste-split: respects custom delimiter config
- Core bundle size: < 4.5 KB gzipped (ESM) with plugin system, without any plugins loaded
- Plugin bundle sizes: recentSearches < 0.5 KB gzipped

---

## Release Timeline Summary

```
v10.3.0  ->  Bug fixes, hardening & ARIA compliance audit (no API changes)
v10.4.0  ->  Build modernization + Vitest + ESLint + docs overhaul (no runtime changes)
v10.5.0  ->  Headless mode, standalone search, scoring hook, empty state (non-breaking)
v11.0.0  ->  Breaking: ES class, ESM output, XSS fix, private state, a11y
v11.1.0  ->  Plugin system, multi-source search, recent searches, paste-split (non-breaking)
```

## Internal Reference

### Key Files to Modify

| File | v10.3.0 | v10.4.0 | v10.5.0 | v11.0.0 | v11.1.0 |
|------|---------|---------|---------|---------|---------|
| `src/autoComplete.js` | B2, A2, A4 | - | H1 | A1, C3 | R3 |
| `src/services/configure.js` | B3 | - | - | A3 | - |
| `src/services/init.js` | E3, E4 | - | H1, R2 | - | - |
| `src/services/start.js` | B4 | - | - | - | - |
| `src/services/extend.js` | - | - | - | C4, C5 | - |
| `src/controllers/dataController.js` | B1, D1 | - | R1, R8 | - | R4 |
| `src/controllers/listController.js` | D2, E4 | - | R2 | D3, E1, E2 | R4, R5 |
| `src/controllers/searchController.js` | - | - | H2, R8 | D3 | - |
| `src/controllers/eventController.js` | - | - | H1 | - | R7 |
| `src/helpers/io.js` | - | - | R8 | D3 | - |
| `dist/css/*.css` | D4 | - | - | - | - |
| `src/plugins/` (new) | - | - | - | - | R3, R6 |
| `rollup.config.js` | - | F1, F2, F3 | H2 | C1 | R6 |
| `package.json` | version bump | C2, F1, G1, G2 | H2, exports | C1, exports | R6, exports |
| `tests/**` (new) | - | G1 | expand | expand | expand |
| `.eslintrc` / `.prettierrc` (new) | - | G2 | - | - | - |
| `docs/configuration.md` | - | docs overhaul | headless, sort, noResults docs | - | plugins, multi-source docs |
| `docs/how-to-guides.md` | - | docs overhaul | - | - | recipes |
| `docs/usage.md` | - | docs overhaul | - | - | - |
| `llms.txt` | - | sync with docs | sync with docs | - | sync with docs |

### Guiding Constraints

- Target < 4 KB gzipped for ESM. Every change is measured.
- v10.x patches must not break any existing consumer code.
- v10.x patches are safe upgrades; v11 is opt-in.
- Nothing ships undocumented.

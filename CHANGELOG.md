# Changelog

### v10.2.11 ✨
- 🔧 Fixed: Synchronous data source callbacks in distributed builds with cache enabled or disabled (Thanks 👍 @QuentiumYT) #492
- ➕ Added: Browser regression tests for source and distributed builds

### v10.2.10
- ➕ Added: `llms.txt` for AI agent discoverability
- 🔧 Fixed: Async function detection fails in transpiled environments (Thanks 👍 @folknor) #442
- 🎛️ Updated: Development dependencies

### v10.2.9
- 🔧 Fixed: `"type": "module"` issue (Thanks 👍 @bbysaeth and @jules-w2) #437

### v10.2.8
- ➕ Added: `Clear` event (Thanks 👍 @alan-rudzinski) #435
- 🔧 Fixed: `LiveReload` script issue (Thanks 👍 @Jammmmm) #434
- 🎛️ Updated: Development dependencies

### v10.2.7
- 🎛️ Updated: Development dependencies

### v10.2.6
- ➕ Added: New `How-to Guides` example for `Dynamic list position` based on its position inside viewport [#158]
- 🎛️ Updated: Library code with minor cleanup and optimizations resulted in minor size reduction for faster loading time
- 🎛️ Updated: `Configuration` documentation section
- 🎛️ Updated: Development dependencies
- 🧹 Removed: `autoComplete.search()` API method to be only available per `autoComplete.js` instance instead of global

### v10.2.5
- 🔧 Fixed: `response` eventEmitter not firing in `data.cache` mode

### v10.2.4
- 🎛️ Updated: Library code with minor optimizations (Thanks 👍 @folknor) #256

### v10.2.3
- 🔧 Fixed: `query` API issue (Thanks 👍 @folknor) #254

### v10.2.2
- ➕ Added: Security awareness note under the `Usage` section in the Docs (Thanks 👍 @needlag) #254
- 🔧 Fixed: `search` API method was not returning the result value
- 🎛️ Updated: Library code with deep cleanup and minor optimizations resulted in around `2.4%` size reduction of the minified version and `3.2%` of the original version and additional performance improvements

### v10.2.1
- 🧹 Removed: `preventDefault` on `Tab` key press event
- 🎛️ Updated: `No Results Found` example under `How-to Guides` in documentation

### v10.2.0
- ➕ Added: `submit` API property controls `Enter` button default behavior (Thanks 👍 @CodeWithOz) #249 #224 #189
- ➕ Added: `query` `String` argument to the `start("query")` API method for programmatic operations
- 🔧 Fixed: Generated errors when `resultsList` is disabled due to the attachment of the `keydown` event
- 🎛️ Updated: Library code with minor optimizations
- 🧹 Removed: Engines field in package.json

### v10.1.5
- 🧹 Removed: `preInit` stage (Thanks 👍 @folknor) #229
- 🔧 Fixed: `unInit` to remove the `wrapper` element (Thanks 👍 @deniseismo) #245

### v10.1.4
- 🔧 Fixed: Unresolved dependencies when building a Svelte app (Thanks 👍 @sunshineplan) #243

### v10.1.3
- 🔧 Fixed: `mark` tag's invalid "classes" to "class" attribute (Thanks 👍 @50kudos) #242

### v10.1.2
- 🔧 Fixed: Data fetching error handling (Thanks 👍 @folknor) #234

### v10.1.1
- 🔧 Fixed: APIs works with the wrong instance (Thanks 👍 @FoHoOV) #230

### v10.1.0
- ➕ Added: `wrapper` API property controls wrapper rendering (Thanks 👍 @folknor) #227
- 🔧 Fixed: TypeError: "query" is read-only (Thanks 👍 @n1k0) #231
- 🔧 Fixed: Mouse `click` item selection error (Thanks 👍 @victor-paumier) #232

### v10.0.4
- 🔝 Updated: `data.src` query parameter to be aligned with the `query` method value when set

### v10.0.3
- 🔧 Fixed: Scrolling issue moving the entire page
- 🔧 Fixed: Searching `Numbers` issue (Thanks 👍 @folknor) #226

### v10.0.2
- 🔧 Fixed: Missing Package Files

### v10.0.1
- 🔧 Fixed: Missing Package Files

### v10.0
- ➕ Added: Automatic field wrapping inside `DIV`
- ➕ Added: Document `readyState` listener that initializes the library after `DOM` content is loaded
- ➕ Added: `query` value to `data.src` for easier data fetching
- ➕ Added: `resultsList` navigation auto scrolling for long lists
- ➕ Added: `resultsList.tabSelect` API property to control `tab` button behavior
- ➕ Added: `events` list API property that holds and assigns events to `input` and `list` (Thanks 👍 @stell) #223
- ➕ Added: `close` API method controls `resultsList` state
- ➕ Added: `open` API method controls `resultsList` state
- ➕ Added: `goTo` API method controls `resultsList` navigation by index
- ➕ Added: `next` API method controls `resultsList` navigation
- ➕ Added: `previous` API method controls `resultsList` navigation
- ➕ Added: `select` API method controls `resultsList` selection by index
- ➕ Added: `search` API method to avail autoComplete.js powerful engine for external use
- ➕ Added: `isOpen` API `boolean` property that holds `resultsList` state `true` opened `false` closed
- ➕ Added: `list` API property holds the entire list html element
- ➕ Added: `wrapper` API property holds the entire wrapper html element
- ➕ Added: `cursor` API property holds the index of the current selection or `-1` or `undefined` for idle
- ➕ Added: `id` API property holds the current instance number
- ➕ Added: `name` API property that changes all the `className` properties accordingly
- ➕ Added: `options` API property that holds all the custom set `config` options for separation
- ➕ Added: `data.src` fetching error message/instance to `response` event detail (Thanks 👍 @folknor) #207
- 🔝 Updated: Data caching with a better mechanism
- 🔝 Updated: `WAI-ARIA` configurations for significantly better support
- 🔝 Updated: `dataFeedback` event information
- 🔧 Fixed: `diacritics` highlighting issue in `strict` mode
- 🔧 Fixed: `resultsList` eventEmitters unexpected behavior which was firing multiple times
- 🔧 Fixed: Empty `className` values do not assign any classes instead of `undefined`
- 🌀 Changed: The core library architecture for an improved performance and code separation
- 🌀 Changed: API to only include the used options instead of including unused ones with `undefined` value
- 🌀 Changed: `fetch` eventEmitter name to `response`
- 🌀 Changed: `inputField` API property name to `input`
- 🌀 Changed: `dataFeedback` API property name to `feedback`
- 🌀 Changed: `trigger` API property type from `Object` to `Function` formerly called `trigger.condition`
- 🌀 Changed: `data.results` API property name to `data.filter`
- 🌀 Changed: `noResults` API to accept `boolean` instead of `Function` to be replaced with `resultsList.container`
- 🌀 Changed: `resultItem.highlight` API property type from `Object` to accept `Boolean` or `String` formerly called `resultItem.highlight.class`
- 🌀 Changed: `resultItem.selected` API property type from `Object` to `String` formerly called `resultItem.selected.class`
- 🌀 Changed: `resultItem.content` API parameters order from `(data, element)` to `(element, data)` for consistency
- 🌀 Changed: `resultItem.idName` API property name to `resultItem.id`
- 🌀 Changed: `resultItem.className` API property name to `resultItem.class`
- 🌀 Changed: `resultItem.content` API property name to `resultItem.element`
- 🌀 Changed: `resultsList.idName` API property name `resultsList.id`
- 🌀 Changed: `resultsList.className` API property name `resultsList.class`
- 🌀 Changed: `resultsList.container` API property name to `resultsList.element`
- 🌀 Changed: Highlighted characters wrapper element to be `mark` instead of `span` (Thanks 👍 @aarongerig) #195
- 🌀 Changed: `query` API property type from `Object` to `Function` formerly called `query.manipulate`
- 🌀 Changed: `observer` API property name `observe`
- 🌀 Changed: `data.key` API property name `data.keys`
- ❗ Removed: `onSelection` API method to be replaced with `selection` eventEmitter
- ❗ Removed: `resultsList.render` API property to be replaced with `resultsList` to accept `Boolean` instead of `Object` in case of disabling list rendering
- ❗ Removed: `trigger.event` API property to be replaced with `events`
- ❗ Removed: `feedback` API method to be replaced with `navigate` event
- ❗ Removed: `resultsList.navigation` API method to be replaced with `events`
- ❗ Removed: `nav` API property to be replaced with `events`
- ❗ Removed: `hook` API method to be replaced with `start` API
- ❗ Removed: `input` property from `dataFeedback` due to the existence of `query` already
- ❗ Removed: `unInit` eventEmitter

### v9.1.1
- 🔧 Fixed: Data feedback `inputField` value was in lowerCase instead of raw
- 🔧 Fixed: `resultItem.className` did not accept except one class instead of multiple
- 🔝 Updated: Code with deep refactoring and cleanup (Thanks 👍 @Pirulax) #210

### v9.1.0
- ➕ Added: New `data` parameter to `resultsList.container` method that contains (input, query, matches, results) values
- 🔝 Updated: `resultsList.container.className` default value to be `undefined`
- 🔝 Updated: Code with some refactoring and cleanup
- 🔝 Updated: Development dependencies
- 🔧 Fixed: `resultsList` error on `Enter` key press with no selection
- 🔧 Fixed: Input field `aria-activedescendant` was not removed on each `resultsList` regeneration
- 🔧 Fixed: `noResults` error on `Enter` key press
- 🔧 Fixed: Input field `aria-expanded` set to `true` even when `noResults` was not active
- 🔧 Fixed: `resultsList` on `close` event did not fire when `noResults` was active
- 🔧 Fixed: `unInit` method did not remove all `inputField` set event listeners except for `input` event
- 🔧 Fixed: `open` eventEmitter unexpected behavior that used to fire on each trigger event

### v9.0.5
- 🔧 Fixed: `resultsList.container` hierarchy comes after list rendering instead of before

### v9.0.4
- 🔧 Fixed: `resultsList.container` is removed on second input (Thanks 👍 @folknor) #206

### v9.0.3
- 🔧 Fixed: `TAB` button behavior
- 🔧 Fixed: `resultsList` close behavior on `inputField` double click

### v9.0.2
- 🔧 Fixed: Unexpected behavior `onClick` (Thanks 👍 @iNalgiev) #205

### v9.0.1
- 🔧 Fixed: `resultItem.idName` issue
- 🔝 Updated: `TAB` button behavior (Thanks 👍 @ronmichael @codyjames) #175 #202

### v9.0
- 🔧 Fixed: `esc` button not working with `noResults` in some cases (Thanks 👍 @sunshineplan) #157
- ➕ Added: `selection` and `highlight` custom `className` API methods (Thanks 👍 @jerrykan) #184
- ➕ Added: `eventEmitter` for `resultsList` fires on list `close` event (Thanks 👍 @yliharma) #188
- ➕ Added: `event` parameter to `trigger.event` API method (Thanks 👍 @nornes) #189
- 🌀 Changed: `maxResults` API moved under `resultsList`
- 🌀 Changed: `noResults` API moved under `resultsList`
- 🌀 Changed: `highlight` API moved under `resultItem`
- 🌀 Changed: `selection` API moved under `resultItem` with the name of `selected`
- 🌀 Changed: `rendered` `eventEmitter` name to `open`
- 🌀 Changed: `navigation` `eventEmitter` name to `navigate`
- 🌀 Changed: `closeAllLists` refactored and renamed to `closeList`
- 🌀 Changed: `generateList` stage with some refactoring
- 🌀 Changed: `start` stage with some refactoring
- 🌀 Changed: `noResults` API method with some refactoring
- 🌀 Changed: `highlight` API from `String` to `Object`
- ❗ Removed: `sort` API due to its redundancy, `data.results` could be used instead
- ❗ Removed: `connect` `eventEmitter` from the `preInit` stage
- 🔝 Updated: Replaced `Uglify` with `Terser`
- 🔝 Updated: Development dependencies
- 🔝 Updated: Code comments
- 🔝 Updated: Documentation

### v8.3.2
- 🔧 Fixed: `selector` as a function breaks when `observer` is true (Thanks 👍 @brunobg) #179

### v8.3.1
- 🔧 Fixed: Keyboard navigation selection reset (Thanks 👍 @marsimeau) #177

### v8.3.0
- ➕ Added: `event` object to the `onSelection` data `feedback` (Thanks 👍 @Liano) #176

### v8.2.3
- 🔧 Fixed: `resultItem` ID `setAttribute` to be `idName` instead of `className` (Thanks 👍 @marsimeau) #173

### v8.2.2
- 🔧 Fixed: `diacritics` composite characters do not match (Thanks 👍 @ikemo3 @Michin0suke @bravik) #169 #171

### v8.2.1
- 🔝 Updated: `package.json` node engine version from `12` to `>=12` (Thanks 👍 @mynameisbogdan) #164
- 🔝 Updated: `package.json` npm engine version from `6` to `>=6`

### v8.2.0
- ➕ Added: `data.results` API to access and manipulate data feedback matching results
- 🔧 Fixed: `resultItem.content` API `data` params to pass the entire item data (Thanks 👍 @jwendel) #163

### v8.1.1
- 🔧 Fixed: `selector` API to accept function (Thanks 👍 @goaround) #160 #161
- 🔧 Fixed: `resultsList` destination API to accept function (Thanks 👍 @goaround) #160 #162

### v8.1.0
- ➕ Added: `observer` Controller API (turned off by default) #149
- ➕ Added: New Light Style (autoComplete.02.css)
- 🔧 Fixed: Main build `live reload` issue (Thanks 👍 @lougroshek) #155

### v8.0.4
- 🔧 Fixed: Remove prior event listeners before adding new one in `init` (Thanks 👍 @RobinLawinsky) #153

### v8.0.3
- 🔧 Fixed: Custom results list rendering destination (Thanks 👍 @RobinLawinsky) #150

### v8.0.2
- 🎛️ Updated: Input Field Assignment Order
- 🔧 Fixed: Trigger Event API

### v8.0.1
- 🎛️ Updated: Build

### v8.0
- ➕ Added: High Quality Accessibility (WAI-ARIA 1.2) Support
- ➕ Added: Life Cycle Events (Thanks 👍 @zippy84) #89
- ➕ Added: `init/unInit` methods (Thanks 👍 @Keagel) #115
- ➕ Added: Input Field Observing Functionality
- ➕ Added: `Diacritics` 2 way Support (Thanks 👍 @batcaverna, @svkmedia) #77 #93
- ➕ Added: API for Controlling `Classes` and `IDs` (Thanks 👍 @xtellurian, @Lirux) #73
- ➕ Added: New neutral/non-opinionated Style (Thanks 👍 @luizbills) #92
- 🌀 Changed: `autoComplete.js` Internal Flow
- 🌀 Changed: `data` Fetching
- 🌀 Changed: `data` Storing
- 🌀 Changed: `resultsList` Navigation
- 🌀 Changed: `resultsList` Rendering (Thanks 👍 @eballeste) #105 #139 #126
- 🔧 Fixed: `resultsList` element visibility in idle state (Thanks 👍 @digiiitalmb) #100
- 🔧 Fixed: `query` threshold length accuracy #142
- 🔧 Fixed: Calling `dataSrc` on each trigger (Thanks 👍 @thomasphilibert) #106
- 🔧 Fixed: Right-click behavior on `resultsList` (Thanks 👍 @drankje) #94
- 🔧 Fixed: Cursor relocation on keyboard `keyUp` or `keyDown` (Thanks 👍 @cadday) #117
- 🔧 Fixed: `data` as a `Number` parsing issue (Thanks 👍 @andresfdel17) #132
- 🔧 Fixed: `autoComplete.js` interference with native keyboard events (Thanks 👍 @eballeste) #104
- 🔧 Fixed: Keyboard events stops working when `onSelection` not defined (Thanks 👍 @AustinGrey) #130
- 🌀 Changed: Whole New More Modern Architecture Design

### v7.2.0
- ➕ Added: Support to `textarea` input field (Thanks 👍 @EmilStenstrom)

### v7.1.3
- 🔧 Fixed: Enhanced mouse selection (Thanks 👍 @adan-ferguson)

### v7.1.2
- 🔧 Fixed: Error behavior occurs when searching (Empty, False, Null) record

### v7.1.1
- 🎛️ Updated: `resList` now is fully created in `DocumentFragment` before rendering for better performance (Thanks 👍 @asafwat)
- 🎛️ Updated: `config` parameters restructure (Thanks 👍 @asafwat)
- 🎛️ Updated: Reduced `autoComplete.js` weight

### v7.1.0
- ➕ Added: New improved Navigation logic (Thanks 👍 @mtomov)
- 🧹 Removed: `shadowRoot` API support
- 🎛️ Updated: Enhanced `resList.navigation` API data feedback
- 🌀 Changed: Styling
- 🎛️ Updated: Major code Refactor and Optimizations for faster performance and lighter weight

### v7.0.3
- 🔧 Fixed: Duplicate values selection bug (Thanks 👍 @plungerman)

### v7.0.2
- 🔧 Fixed: Data Promise bug (Thanks 👍 @braco)
- 🔧 Fixed: Remote API duplicate calls (Thanks 👍 @srinivas025, @argebynogame)
- 🎛️ Updated: `trigger.condition` enhancement (Thanks 👍 @sakuraineed)
- 🎛️ Updated: Code Refactor for faster performance and lighter weight

### v7.0.1
- 🔧 Fixed: `api multiple calls` issue (Thanks 👍 @srinivas025)

### v7.0
- ➕ Added: New API for results list navigation `resultsList.navigation` (Thanks 👍 @fredluetkemeier)
- ➕ Added: New API for autoComplete.js engine `trigger.event` (Thanks 👍 @fredluetkemeier)
- ➕ Added: New API for autoComplete.js engine `trigger.condition`
- ➕ Added: Support to `Shadow DOM` expanding customizability (Thanks 👍 @MSDevs)
- ➕ Added: Node Element Support for Input Selector (Thanks 👍 @jkhaui)
- 🔧 Fixed: Empty record issue (Thanks 👍 @Platon)
- ❗ Removed: `customEngine` API, merged with `searchEngine` API key for more convenience
- 🎛️ Updated: Code Optimizations

### v6.1.0
- ➕ Added: Use Custom Search Algorithm via `customEngine` method (Thanks @hwangm)

### v6.0
- 🔧 Fixed: `CustomEvent` and `Closest` method IE compatibility (Thanks @g-viet)
- ➕ Added: Query interception (Thanks @barns101)
- 🌀 Changed: Simplified `resultsList` and `resultItem`
- ➕ Added: `EventEmitter` fires on clearing input field
- ➕ Added: `EventEmitter` now has `input` method for raw user's input
- ➕ Added: `EventEmitter` now has `query` method for intercepted user's input

### v5.3.0
- ➕ Added: Get results from `eventEmitter` without rendering list through `resultsList.render` API
- 🌀 Changed: EventEmitter name `type` changed to `autoComplete`

### v5.2.0
- ➕ Added: Event Emitter on `noResults` event

### v5.1.2
- 🔧 Fixed: `noResults` API unset error bug

### v5.1.1
- 🔧 Fixed: `UpperCase` query bug

### v5.1.0
- ➕ Added: `noResults` open API for No Results (Thanks @chabri)
- ➕ Added: HTML elements `ContentEditable` Input Support (Thanks @philippejadin)

### v5.0
- ➕ Added: Large datasets handling (Thanks @Johann-S)
- ➕ Added: API Data fetching and Dynamic Data reloading (Thanks @Brostafa)
- ➕ Added: Debouncing API Calls
- ➕ Added: Custom `resultsList` and `resultItem` Elements (Thanks @Johann-S)
- 🔧 Fixed: Bug fixes
- 🎛️ Updated: Code Clean Up

### v4.0
- ➕ Added: Multiple searchable `keys` for data `src` (Thanks @Johann-S)
- 🔧 Fixed: Rendered `results` in original case (Thanks @nickbp12)
- 🎛️ Updated: Improved Development Environment (Thanks @ziishaned)
- 🔧 Fixed: IE 11 fix (Thanks @maciekgrzybek)
- ➕ Added: Improved returned data object `onSelection`
- ➕ Added: Sort rendered `results` API
- ➕ Added: Enhanced `results` navigation adding `ArrowRight` key for selection
- ➕ Added: `event` emitter on input field
- 🎛️ Updated: Code Clean Up

### v3.2.2
- 🔧 Fixed: Bug with `highlight` API default value during `strict` engine mode
- 🔧 Fixed: Bug with `resultsList` API default value when not configured

### v3.2.1
- 🔧 Fixed: Isolated `resultsList` value for multiple instances (Thanks @albu77)

### v3.2.0
- 🎛️ Updated: API Enhancements over rendered results list container `resultsList > container` function (Thanks @albu77)

### v3.1.0
- ➕ Added: API for rendered results list container `resultsList > container` function (Thanks @albu77)
- 🎛️ Updated: API Enhancements

### v3.0
- ➕ Added: API for rendered result item `resultItem` function
- 🌀 Changed: `renderResults` API name changed to `resultsList`

### v2.1.0
- ➕ Added: Support for Keyboard `(Arrow)` and `(Tab)` Navigation
- ➕ Added: Selection event object returns in data feedback (Thanks @alvaaz)
- ➕ Added: `Function` support to `selector` for detached DOM rendering (Thanks @mikob)
- ➕ Added: `Function` support to `renderResults` for detached DOM rendering
- 🔧 Fixed: Placeholder if not set doesn't overwrite external assigned values (Thanks @mikob)
- 🌀 Changed: Replaced `id` with `data-attribute` (Thanks @mikob)
- 🌀 Changed: Input doesn't clear automatically `onSelection` event (Thanks @mikob)
- 🌀 Changed: Place Holder doesn't assign selected value `onSelection` event automatically
- ❗ Removed: Error message rendered on Engine failure in the body for End-User (Thanks @mikob)
- ❗ Removed: API `data-attribute` setting
- 🎛️ Updated: Optimizations
- 🎛️ Updated: Style Enhancements

### v2.0.1
- 🔧 Fixed: Multiple space input issue (Thanks @DevOsamaMohamed)
- 🔧 Fixed: Remote data source excessive requests (Thanks @DevOsamaMohamed)
- 🎛️ Updated: Optimizations for performance enhancements
- 🎛️ Updated: Reduced Weight

### v2.0
- ➕ Added: Support for array of `Objects` and `JSON` as data source with `Key` selection
- ➕ Added: Support for external data source via `Promises` and `Async/Await` function
- ➕ Added: More comprehensive and usable data feedback on user selection
- 🌀 Changed: `dataSrc` method to object method `data` with two new methods `src` and `key`
- 🌀 Changed: Highlighted Results class name from `.autoComplete_highlighted_result` to `autoComplete_highlighted`
- 🎛️ Updated: Many Optimizations for better performance

### v1.5.4
- 🎛️ Updated: Gzipped options for both builds are ready `(2KB) non-minified` and `(1KB) minified`
- 🔧 Fixed: Styling issue with selections last selection child on mobile devices

### v1.5.3
- ➕ Added: `threshold` for minimum characters length before Engine starts rendering suggestions
- 🎛️ Updated: Optimizations for better performance
- 🎛️ Updated: Reduced Weight to `(3KB)` minified

### v1.5.2
- 🔧 Fixed: `onSelection` null action issue
- ❗ Removed: Placeholder keeps value of last selection
- 🎛️ Updated: Fully isolated UI from Logic
- 🎛️ Updated: Some code cleanup and optimizations
- 🎛️ Updated: Reduced Weight

### v1.5.1
- 🔧 Fixed: Bug fixes

### v1.5.0
- ➕ Added: Ability to change results destination and position `renderResults`
- 🎛️ Updated: Optimizations for faster performance and lighter weight
- 🎛️ Updated: Enhanced error handling capabilities
- 🔧 Fixed: Styles fixes for better cross browser compatibility
- ➕ Added: Detailed documentation

### v1.4.1
- 🔧 Fixed: Bug Fixes

### v1.4.0
- ➕ Added: New type/mode of Search Engine `strict`
- 🌀 Changed: Detached the results list style behavior from code
- ❗ Removed: `Placeholder max. length` option
- 🎛️ Updated: Optimizations for higher performance and lighter weight

### v1.3.1
- 🎛️ Updated: Refactored for higher speed and smaller footprint
- 🔧 Fixed: Bug fixes and Optimizations

### v1.3.0
- ➕ Added: New `datasrc` a function that returns `Array`

### v1.2.1
- ➕ Added: Placeholder text maximum length option `[Experimental]`
- ➕ Added: New style sheet variation

### v1.2.0
- 🎛️ Updated: Redesigned the entire search engine for better results and experience
- ➕ Added: Support for Multi-keyword search
- 🔧 Fixed: Issue with Capital letters reflects in results

### v1.1.0
- 🎛️ Updated: Reduced the library size 97% `(101KB -> 4KB)`
- ➕ Added: Introducing 2 different versions of the library `(pure, minified)`
- 🌀 Changed: Replaced webpack with Rollup for better bundling
- 🔧 Fixed: Some bugs caused problems with node apps

### v1.0.3
- 🎛️ Updated: Refactored and Optimized to reduce size and enhance performance

### v1.0.2
- 🔧 Fixed: The library name in the webpack.config.js file

### v1.0.1
- 🎛️ Updated: Optimizations Reduced the library weight by 1KB

### v1.0
- ➕ Added: Customized data attribute tag for generated results
- ➕ Added: Highlight matching results from the results list
- ➕ Added: Set maximum number for shown results
- ➕ Added: Placeholder text to the input field
- ➕ Added: Placeholder keeps the last selection value saved

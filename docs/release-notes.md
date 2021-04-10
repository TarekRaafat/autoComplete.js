# Release Notes
Find release notes/changelog and guides on versioning guidelines


## Versioning

* * *

For transparency and insight into the release cycle, releases will be numbered
with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

-   Breaking backwards compatibility bumps the major
-   New additions without breaking backwards compatibility bumps the minor
-   Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit <http://semver.org/>.

- Release flags:
  -   `[Experimental]`: Under testing and might be deprecated at any point
  -   `[Deprecated]`: Not developed / supported anymore, might be removed at any point
  -   `[Removed]`: Completely gone, no longer exists
  -   `[Changed]`: Breaking change in the API or the core library
  -   `[Updated]`: Non-breaking change in the API or the core library
  -   `[Fixed]`: Bug or Issue that was fixed and no longer exists
  -   `[Added]`: New feature

* * *

## Releases

#### v9.0.0 ✨
  > <div class="ps-icon ps-icon-important"></div> This version has breaking changes, kindly check the list
  - 🔧 Fixed: `esc` button not working with `noResults` in some cases (Thanks 👍 @sunshineplan) #157
  - ➕ Added: `selection` & `highlight` custom `className` API methods (Thanks 👍 @jerrykan) #184
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
  - 🌀 Changed: `noResults` API method with some refactoring [details](https://tarekraafat.github.io/autoComplete.js/#/?id=api-configuration)
  - 🌀 Changed: `highlight` API from `String` to `Object` [details](https://tarekraafat.github.io/autoComplete.js/#/?id=api-configuration)
  - ❗ Removed: `sort` API
  - ❗ Removed: `connect` `eventEmitter` from the `preInit` stage
  - 🔝 Updated: Replaced `Uglify` with `Terser`
  - 🔝 Updated: Development dependencies
  - 🔝 Updated: Code comments
  - 🔝 Updated: Documentation

***

#### v8.3.2
  - 🔧 Fix: `selector` as a function breaks when `observer` is true (Thanks 👍 @brunobg) #179

***

#### v8.3.1
  - 🔧 Fix: Keyboard navigation selection reset (Thanks 👍 @marsimeau) #177

***

#### v8.3.0
  - ➕ Added: `event` object to the `onSelection` data `feedback` (Thanks 👍 @Liano) #176

***

#### v8.2.3
  - 🔧 Fix: `resultItem` ID `setAttribute` to be `idName` instead of `className` (Thanks 👍 @marsimeau) #173

***

#### v8.2.2
  - 🔧 Fix: `diacritics` composite characters do not match (Thanks 👍 @ikemo3 @Michin0suke @bravik) #169 #171

***

#### v8.2.1
  - 🔝 Updated: `package.json` node engine version from `12` to `>=12` (Thanks 👍 @mynameisbogdan) #164
  - 🔝 Updated: `package.json` npm engine version from `6` to `>=6`

***

#### v8.2.0
  - ➕ Added: `data.results` API to access and manipulate data feedback matching results
  - 🔧 Fixed: `resultItem.content` API `data` params to pass the entire item data (Thanks 👍 @jwendel) #163

***

#### v8.1.1
  - 🔧 Fixed: `selector` API to accept function (Thanks 👍 @goaround) #160 #161
  - 🔧 Fixed: `resultsList` destination API to accept function (Thanks 👍 @goaround) #160 #162

***

#### v8.1.0
  - ➕ Added: `observer` Controller API [Turned off by default] #149
  - ➕ Added: New Light Style [autoComplete.02.css]
  - 🔧 Fixed: Main build `live reload` issue (Thanks 👍 @lougroshek) #155

***

#### v8.0.4
  - Fixed: Remove prior event listeners before adding new one in `init` (Thanks 👍 @RobinLawinsky) #153

***

#### v8.0.3
  - Fixed: Custom results list rendering destination (Thanks 👍 @RobinLawinsky) #150

***

#### v8.0.2
  - Updated: Input Field Assignment Order
  - Fixed: Trigger Event API

***

#### v8.0.1
  - Build Update

***

#### v8.0.0
  - Whole New More Modern Architecture Design
  - Added: High Quality Accessibility ([WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/examples/combobox/combobox-autocomplete-both.html)) Support
  - Added: Life Cycle Events (Thanks 👍 @zippy84) #89
  - Added: `init/unInit` methods  (Thanks 👍 @Keagel) #115
  - Added: Input Field Observing Functionality
  - Added: `Diacritics` 2 way Support (Thanks 👍 @batcaverna, @svkmedia) #77 #93
  - Added: API for Controlling `Classes` & `IDs` (Thanks 👍 @xtellurian, @Lirux) #73
  - Added: New neutral/non-opinionated Style (Thanks 👍 @luizbills) #92
  - Changed: `autoComplete.js` Internal Flow
  - Changed: `data` Fetching
  - Changed: `data` Storing
  - Changed: `resultsList` Navigation
  - Changed: `resultsList` Rendering (Thanks 👍 @eballeste) #105 #139 #126
  - Fixed: `resultsList` element visibility in idle state (Thanks 👍 @digiiitalmb) #100
  - Fixed: `query` threshold length accuracy #142
  - Fixed: Calling `dataSrc` on each trigger (Thanks 👍 @thomasphilibert) #106
  - Fixed: Right-click behavior on `resultsList` (Thanks 👍 @drankje) #94
  - Fixed: Cursor relocation on keyboard `keyUp` or `keyDown` (Thanks 👍 @cadday) #117
  - Fixed: `data` as a `Number` parsing issue (Thanks 👍 @andresfdel17) #132
  - Fixed: `autoComplete.js` interference with native keyboard events (Thanks 👍 @eballeste) #104
  - Fixed: Keyboard events stops working when `onSelection` not defined (Thanks 👍 @AustinGrey) #130

***

#### v7.2.0
  - Added support to `textarea` input field (Thanks 👍 @EmilStenstrom)


***

#### v7.1.3
  - Enhanced mouse selection (Thanks 👍 @adan-ferguson)


***

#### v7.1.2
  - Fixed error behavior occurs when searching (Empty, False, Null) record


***

#### v7.1.1
  - `resList` now is fully created in `DocumentFragment` before rendering for better performance (Thanks 👍 @asafwat)
  - `config` parameters restructure (Thanks 👍 @asafwat)
  - Reduced `autoComplete.js` weight

***

#### v7.1.0
  - New improved Navigation logic (Thanks 👍 @mtomov)
  - `shadowRoot` API support `[Removed]`
  - Enhanced `resList.navigation` API data feedback
  - Styling `[Changed]`
  - Major code Refactor & Optimizations
    - Faster performance
    - Reduced `autoComplete.js` weight

***

#### v7.0.3
  - Duplicate values selection bug fix (Thanks 👍 @plungerman)

***

#### v7.0.2
  - Data Promise bug fix (Thanks 👍 @braco)
  - Remote API duplicate calls fix (Thanks 👍 @srinivas025, @argebynogame)
  - `trigger.condition` enhancement (Thanks 👍 @sakuraineed)
  - Code Refactor for faster performance and lighter weight

***

#### v7.0.1
  - `api multiple calls` issue fix (Thanks 👍 @srinivas025)

***

#### v7.0.0
  - New API for results list navigation `resultsList.navigation` (Thanks 👍 @fredluetkemeier)
  - New API for autoComplete.js engine `trigger.event` (Thanks 👍 @fredluetkemeier)
  - New API for autoComplete.js engine `trigger.condition`
  - Added Support to `Shadow DOM` expanding customizability (Thanks 👍 @MSDevs)
  - Node Element Support for Input Selector (Thanks 👍 @jkhaui)
  - Empty record issue fix (Thanks 👍 @Platon)
  - `customEngine` API `[Removed]`
  - `customEngine` merged with `searchEngine` API key for more convenience `[Changed]`
  - Code Optimizations

***

#### v6.1.0
  - Use Custom Search Algorithm via `customEngine` method (Thanks @hwangm)

***

#### v6.0.0
  - `CustomEvent` & `Closest` method IE compatibility (Thanks @g-viet)
  - Query interception (Thanks @barns101)
  - Simplified `resultsList` & `resultItem`
  - `EventEmitter` fires on clearing input field
  - `EventEmitter` now has `input` method for row user’s input
  - `EventEmitter` now has `query` method for intercepted user’s input

***

#### v5.3.0
  - Get results from `eventEmitter` without rendering list through `resultsList.render` API
  - EventEmitter name `type` changed to `autoComplete` `[Changed]`

***

#### v5.2.0
  - Added Event Emitter on `noResults` event

***

#### v5.1.2
  - `noResults` API unset error bug fix

***

#### v5.1.1
  - `UpperCase` query bug fix

***

#### v5.1.0
  - Added `noResults` open API for No Results (Thanks @chabri)
  - HTML elements `ContentEditable` Input Support (Thanks @philippejadin)

***

#### v5.0.0
  - Large datasets handeling (Thanks @Johann-S)
  - API Data fetching & Dynamic Data reloading (Thanks @Brostafa)
  - Debouncing API Calls
  - Custom `resultsList` & `resultItem` Elements (Thanks @Johann-S)
  - Bug fixes
  - Code Clean Up

-   v4.0.0
    -   Multiple searchable `keys` for data `src` (Thanks @Johann-S)
    -   Rendered `results` in original case (Thanks @nickbp12)
    -   Improved Development Environment (Thanks @ziishaned)
    -   IE 11 fix (Thanks @maciekgrzybek)
    -   Improved returned data object `onSelection`
        -   Index of result data value
        -   Total number of matching results
        -   Key of result data value (If multiple keys)
        -   HTML element of selected result
    -   Sort rendered `results` API
    -   Enhanced `results` navigation adding `ArrowRight` key for selection
    -   Added `event` emitter on input field type name `type` returns
        -   Query
        -   Number of matching results
        -   Rendered results
        -   Keyboard event
    -   Code Clean Up

-   v3.2.2
    -   Fixed bug with `hightlight` API default value during `strict` engine mode
    -   Fixed bug with `resultsList` API default value when not configured

-   v3.2.1
    -   Isolated `resultsList` value for multiple instances **(Thanks @albu77)**

-   v3.2.0
    -   API Enhancements over rendered results list container `resultsList > container` function **(Thanks @albu77)**

-   v3.1.0
    -   Added API for rendered results list container `resultsList > container` function **(Thanks @albu77)**
    -   API Enhancements

-   v3.0.0
    -   Added API for rendered result item `resultItem` function
    -   `renderResults` API name changed to `resultsList` `[Changed]`

-   v2.1.0
    -   Added support for Keyboard `(Arrow)` & `(Tab)` Navigation
    -   Selection event object returns in data feedback **(Thanks @alvaaz)**
    -   Added `Function` support to `selector` for detached DOM rendering **(Thanks @mikob)**
    -   Added `Function` support to `renderResults` for detached DOM rendering
    -   Fixed Placeholder if not set doesn't overwrite external assigned values **(Thanks @mikob)**
    -   Replaced `id` with `data-attribute` **(Thanks @mikob)**
    -   Input doesn't clear automatically `onSelection` event **(Thanks @mikob)**
    -   Place Holder doesn't assign selected value `onSelection` event automatically
    -   Error message rendered on Engine failure in the body for End-User `[Removed]` **(Thanks @mikob)**
    -   API `data-attribute` setting `[Removed]`
    -   Optimizations
    -   Style Enhancements

-   v2.0.1
    -   Fixed multiple space input issue **(Thanks @DevOsamaMohamed)**
    -   Fixed remote data source excessive requests **(Thanks @DevOsamaMohamed)**
    -   Optimizations for performance enhancements
    -   Reduced Weight

-   v2.0.0
    -   Added support for array of `Objects` & `JSON` as data source with `Key` selection
    -   Added support for external data source via `Promises` & `Async/Await` function
    -   Added more comprehensive and usable data feedback on user selection `(User Input, Results List, User Selection)` Object
    -   `dataSrc` method `CHANGED` to object method `data` with two new methods `src` & `key` ([Check API Configurations](/?id=api-configurations))
    -   Highlighted Results class name `CHANGED` from `.autoComplete_highlighted_result` to `autoComplete_highlighted`
    -   Many Optimizations for better performance
    -   Scroll Infinite results style in [Demo](https://tarekraafat.github.io/autoComplete.js/demo/)

-   v1.5.4
    -   Gzipped options for both builds are ready `(2KB) non-minified` & `(1KB) minified`
    -   Fixed styling issue with selections last selection child on mobile devices

-   v1.5.3
    -   Added `threshold` for minimum characters length before Engine starts rendering suggestions
    -   Optimizations for better performance
    -   Reduced Weight to `(3KB)` minified

-   v1.5.2
    -   Fixed `onSelection` null action issue
    -   Placeholder keeps value of last selection `[Removed]`
    -   Fully isolated UI from Logic
    -   Some code cleanup & optimizations
    -   Reduced Weight

-   v1.5.1
    -   Bug fixes

-   v1.5.0
    -   Ability to change results destination & position `renderResults`
    -   Optimizations for faster performance & lighter weight
    -   Enhanced error handling capabilities
    -   Styles fixes for better cross browser compatibility
    -   Added detailed documentation

-   v1.4.1
    -   Bug Fixes

-   v1.4.0
    -   Added new type/mode of Search Engine `strict`
    -   Detached the results list style behavior from code
    -   `Placeholder max. length` option `[Removed]`
    -   Optimizations for higher performance & lighter weight

-   v1.3.1
    -   Refactored for higher speed & smaller footprint
    -   Bug fixes & Optimizations

-   v1.3.0
    -   Added new `datasrc` a function that returns `Array`

-   v1.2.1
    -   Added Placeholder text maximum length option `[Experimental]`
    -   Added new style sheet variation

-   v1.2.0
    -   Redesigned the entire search engine for better results & experience
    -   Added support for Multi-keyword search
    -   Fixed issue with Capital letters reflects in results

-   v1.1.0
    -   Reduced the library size 97% `(101KB -> 4KB)`
    -   Introducing 2 different versions of the library `(pure, minified)`
    -   Replaced webpack with Rollup for better bundling
    -   Fixed some bugs caused problems with node apps

-   v1.0.3
    -   Refactored & Optimized to reduce size and enhance performance

-   v1.0.2
    -   Fixed the library name in the webpack.config.js file

-   v1.0.1
    -   Optimizations Reduced the library weight by 1KB

-   v1.0.0
    -   Add customized data attribute tag for generated results
    -   Highlight matching results from the results list
    -   Set maximum number for shown results
    -   Add placeholder text to the input field
    -   Placeholder keeps the last selection value saved

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

Release flags:

-   `[Experimental]`: Under testing and might be deprecated at any point
-   `[Deprecated]`: Not developed / supported anymore, might be removed at any point
-   `[Removed]`: Completely gone, no longer exists
-   `[Changed]`: A change in the API

* * *

## Release Notes

- v7.2.0 :sparkles:
  - Added support to `textarea` input field (Thanks 👍 @EmilStenstrom)


- v7.1.3
  - Enhanced mouse selection (Thanks 👍 @adan-ferguson)


- v7.1.2
  - Fixed error behavior occurs when searching (Empty, False, Null) record


- v7.1.1
  - `resList` now is fully created in `DocumentFragment` before rendering for better performance (Thanks 👍 @asafwat)
  - `config` parameters restructure (Thanks 👍 @asafwat)
  - Reduced `autoComplete.js` weight

- v7.1.0
  - New improved Navigation logic (Thanks 👍 @mtomov)
  - `shadowRoot` API support `[Removed]`
  - Enhanced `resList.navigation` API data feedback
  - Styling `[Changed]`
  - Major code Refactor & Optimizations
    - Faster performance
    - Reduced `autoComplete.js` weight

- v7.0.3
  - Duplicate values selection bug fix (Thanks 👍 @plungerman)

- v7.0.2
  - Data Promise bug fix (Thanks 👍 @braco)
  - Remote API duplicate calls fix (Thanks 👍 @srinivas025, @argebynogame)
  - `trigger.condition` enhancement (Thanks 👍 @sakuraineed)
  - Code Refactor for faster performance and lighter weight

- v7.0.1
  - `api multiple calls` issue fix (Thanks 👍 @srinivas025)

- v7.0.0
  - New API for results list navigation `resultsList.navigation` (Thanks 👍 @fredluetkemeier)
  - New API for autoComplete.js engine `trigger.event` (Thanks 👍 @fredluetkemeier)
  - New API for autoComplete.js engine `trigger.condition`
  - Added Support to `Shadow DOM` expanding customizability (Thanks 👍 @MSDevs)
  - Node Element Support for Input Selector (Thanks 👍 @jkhaui)
  - Empty record issue fix (Thanks 👍 @Platon)
  - `customEngine` API `[Removed]`
  - `customEngine` merged with `searchEngine` API key for more convenience `[Changed]`
  - Code Optimizations

- v6.1.0
  - Use Custom Search Algorithm via `customEngine` method (Thanks @hwangm)

- v6.0.0
  - `CustomEvent` & `Closest` method IE compatibility (Thanks @g-viet)
  - Query interception (Thanks @barns101)
  - Simplified `resultsList` & `resultItem`
  - `EventEmitter` fires on clearing input field
  - `EventEmitter` now has `input` method for row user’s input
  - `EventEmitter` now has `query` method for intercepted user’s input

- v5.3.0
  - Get results from `eventEmitter` without rendering list through `resultsList.render` API
  - EventEmitter name `type` changed to `autoComplete` `[Changed]`

- v5.2.0
  - Added Event Emitter on `noResults` event

- v5.1.2
  - `noResults` API unset error bug fix

- v5.1.1
  - `UpperCase` query bug fix

- v5.1.0
  - Added `noResults` open API for No Results (Thanks @chabri)
  - HTML elements `ContentEditable` Input Support (Thanks @philippejadin)

- v5.0.0

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

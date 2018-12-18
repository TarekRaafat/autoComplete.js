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
-   `[Removed]`: Removed

* * *

## Release Notes

-   v1.5.1

    -   Fixed `onSelection` null action issue
    -   Placeholder keeps value of last selection `[Removed]`
    -   Fully isolated UI from Logic
    -   Some code cleanup & optimizations
    -   Reduced Weight

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
    -   Deprecated "~~Placeholder max. length~~" setting
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

# autoComplete.js :sparkles:

<br>
<br>
<p align="center">
	<a href="https://tarekraafat.github.io/autoComplete.js/">
  		<img src="./docs/img/autoComplete.js.png" alt="autoComplete.js Design" width="50%">
	</a>
</p>
<br>
<br>

## v8 changes

- Whole new architecture and API design
- Added high quality accessability (WAI-ARIA) support
- Added life cycle events for each stage (Thanks 👍 @zippy84)
- Added `detach/attach` methods (Thanks 👍 @Keagel)
- Added input field observing functionality
- Added `Diacritics` support (Thanks 👍 @batcaverna)
- Added API for controlling all `Classes` and `IDs` (Thanks 👍 @xtellurian, @Lirux)
- Added new styles including neutral/non-opinionated style (Thanks 👍 @luizbills)
- Enhanced non-cached data fetching
- Enhanced `resultsList` navigation
- Enhanced `resultsList` rendering
- Fixed `resultsList` element visibility in idle state (Thanks 👍 @digiiitalmb)
- Fixed query `threshold` length
- Fixed calling data `src` on each trigger (Thanks 👍 @thomasphilibert)
- Fixed right click behavior on `resultsList` (Thanks 👍 @drankje)
- Fixed cursor relocation on `keyUp` (Thanks 👍 @cadday)

## v8 API breaking changes

- Library class name changed from `autoComplete` to `autoCompleteJS`
- New events `connect`, `init`, `request`, `response`, `rendered`, `navigation`, `detached` (Subject to change in final release)

## v8 TODO

- [ ] Add `aria-activedescendant` update on list navigation
- [ ] Add `list-sections` separate each data key records with section name (Thanks 👍 @Matoo125)
- [ ] Add `Diacritics` support (Thanks 👍 @batcaverna)
- [ ] Add `eventEmitter` post list rendering (Thanks 👍 @zippy84)

---

## Support

For general questions about autoComplete.js, tweet at [@TarekRaafat].

For technical questions, you should post a question on [Stack Overflow] and tag
it with [autoComplete.js][so tag].

<!-- section links -->

[stack overflow]: https://stackoverflow.com/
[@tarekraafat]: https://twitter.com/TarekRaafat
[so tag]: https://stackoverflow.com/questions/tagged/autoComplete.js

---

## Author

**Tarek Raafat**

- Email: tarek.m.raafat@gmail.com
- Website: <http://www.tarekraafat.com/>
- Github: <https://github.com/TarekRaafat/>

Distributed under the Apache 2.0 license. See `Apache 2.0` for more information.

---

## License

Apache 2.0 © [Tarek Raafat](http://www.tarekraafat.com)

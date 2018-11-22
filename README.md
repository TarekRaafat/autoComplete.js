# autoComplete.js :sparkles:
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/TarekRaafat/autoComplete.js.svg?branch=master)](https://travis-ci.com/TarekRaafat/autoComplete.js)
![[Size]()](https://img.shields.io/badge/Size-100%20KB-green.svg)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)]()


[![autoComplete.js Design](./README/img/autoComplete.js.png "autoComplete.js Design")](http://www.tarekraafat.com/dev/projects/autoComplete/)

> Simple autocomplete pure vanilla Javascript library. <a href="http://www.tarekraafat.com/dev/projects/autoComplete/" target="_blank">Demo</a>

autoComplete.js is a simple pure vanilla Javascript library that's built for speed, high versatility and seamless integration with wide range of projects & systems.

## Features
- [x] Simple & Easy to use
- [x] Pure Vanilla Javascript
- [x] Zero Dependencies
- [x] Lightweight
- [x] Lightning Fast
- [x] Versatile
- [x] Customizable
- [x] First Class Error Reporting

![autoComplete.js Code Example](./README/img/autoComplete.init.png "autoComplete.js Code Example")
----

## Get Started
### Clone:
* Clone autoComplete.js to your local machine using `https://github.com/TarekRaafat/autoComplete.js.git`
### Setup:

1. Install Dependencies
```shell
$ npm i
```
2. Development live server
```shell
$ npm start
```
3. Build Production Package
```shell
$ npm run build
```

<br>

### How to use:


> HTML file
1. Assign id="autoComplete" to the input filed

```html
<input id="autoComplete" type="text">
```
> JS file

2. Create new instance of autoComplete engine
```js
// The app instance creator

new autoComplete({
	dataSrc: grocery,	    // Array data source
	placeHolder: "Try me ...",  // Place Holder text
	maxNum: 10,		    // Max number of results
	highlight: true,	    // Highlight matching results
	dataAttribute: {
		tag: "set",	    // Data attribute tag
		value: "value"	    // Data attribute value
    	},
	onSelection: value => {     // Action script onClick event
		document.querySelector(".selection").innerHTML = value.id;
	}
});
```
3. That's it, you're ready to go!

----

Example
--------

  For working example of autoComplete.js, visit the [Demo].

[Demo]: http://www.tarekraafat.com/dev/projects/autoComplete/

  Or download the [Demo] files from the <a href="./dist" target="_blank">`/dist`</a> folder.

----

## Browser Support
### Desktop
* Chrome
* Firefox
* Safari
* Opera
* Edge

### Mobile
* Chrome
* Safari

----

Versioning
----------

For transparency and insight into the release cycle, releases will be numbered 
with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

---

## Release History

* v1.0.1
	* Optimizations Reduced the library weigth by 1KB
  
* v1.0.0
  * Add customized data attribute tag for generated results
  * Highlight matching results from the results list
  * Set maximum number for shown results
  * Add placeholder text to the input field
  * Placeholder keeps the last selection value saved

----

## Roadmap

#### Functionality:
- [ ] Navigate results list with keyboard
- [ ] Add support for different types of data source
	- [ ] JS Object
	- [ ] JSON
	- [ ] Multidimensional Array
- [ ] Multi-keyword Search


#### Interface:
- [ ] New designs for inspiration (Ongoing)
	- [ ] Styles
	- [ ] Interactions
- [ ] Number of results inside input field (Optional)

----

## Contribution

> Contributions are always more than  welcome!

If you have any ideas, just [open an issue](https://github.com/TarekRaafat/autoComplete.js/issues) and tell me what you think.

- Please fork the repository and make changes as you'd like.
Pull requests are warmly welcome.

> If you'd like to contribute:

1. Fork it (<https://github.com/TarekRaafat/autoComplete.js.git>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

----

## Author

Tarek Raafat - tarek.m.raafat@gmail.com

Distributed under the Apache 2.0 license. See ``Apache 2.0`` for more information.

https://github.com/TarekRaafat/

----

## License
Apache 2.0 © [Tarek Raafat](https://tarekraafat.com)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Build Status](https://travis-ci.com/TarekRaafat/autoComplete.js.svg?branch=master)](https://travis-ci.com/TarekRaafat/autoComplete.js)

# autoComplete.js :sparkles:
> Simple autocomplete pure vanilla Javascript library. [Demo](https://www.tarekraafat.com/dev/projects/autoComplete/)

autoComplete.js is a pure vanilla Javascript library, that was built for speed, high versatility and seemless integration with wide variety of projects & systems.
<br>

![autoComplete.js Initialization Example](./README/img/autoComplete.js.png "autoComplete.js Initialization Example")

## Features
- [x] Pure Vanilla Javascript
- [x] Zero Dependencies
- [x] Lightweight
- [x] Lighting Fast
- [x] Versitle
- [x] Customizable

<br>

----

## Get Started
### Install:

1. Install Dependencies
```
$ npm i
```
2. Development live server
```
$ npm start
```
3. Build Production Package
```
$ npm run build
```

<br>

### How to use:

1. Instantiate autoComplete engine
2. Configure it as shown below
3. You're ready to go
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
<br>

---

## Release History

* v1.0.0
  * Add customized data tags to generated results
  * Highlight matching results
  * Set maximum number for shown results
  * Add placeholder text to the input field

----

## Roadmap

#### Functionality:
- [ ] Navigate results list with keyboard
- [ ] Add different types of data source (Objects, Multidimensional Arrays, etc...)
- [ ] Multi-Search


#### Interface:
- [ ] Show number of results inside text field
- [ ] Change input field Color
- [ ] Change input field Icon


----

## Meta

Tarek Raafat - tarek.m.raafat@gmail.com

Distributed under the Apache 2.0 license. See ``Apache 2.0`` for more information.

https://github.com/TarekRaafat/

----

## Contribute

> Contributions are always more than  welcome!

1. Fork it (<https://github.com/TarekRaafat/autoComplete.js.git>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

----

## License
Apache 2.0 © [Tarek Raafat](https://tarekraafat.com)
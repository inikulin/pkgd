# pkgd
[![Build Status](https://api.travis-ci.org/inikulin/pkgd.svg)](https://travis-ci.org/inikulin/pkgd)

*Get package publish info: package.json and file list.*

There are some packages in npm already that read package files. However, some of them are broken and the
others are too slow. Moreover, this package reads `package.json` as well and provides nice Promise-based
interface.

## Install
```
npm install pkgd
```

## Usage
```js
const pkgd = require('pkgd');

pkgd('./projects/pkgd').then(info => {
    console.log(info.cfg.name);   // > "pkgd"
    console.log(info.cfg.author); // > "Ivan Nikulin (ifaaan@gmail.com)"
    console.log(info.files);      // > [ "package.json", "README.md", "LICENSE", "index.js" ]
});
```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)

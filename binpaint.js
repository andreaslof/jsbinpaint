// binpaint.js
// An experiment which will paint with hashed-base2-encoded strings
// Author(s): Andreas Löf Hermansson & Simon Westerlund

var test = 'andreas';
var string = test.md5().toBin().group();

console.log(string);
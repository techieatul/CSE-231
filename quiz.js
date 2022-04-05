const python = require('lezer-python');
const { createUnparsedSourceFile } = require('typescript');
const input = "x=20\nprint(10)";
const tree = python.parser.parse(input)
const cursor = tree.cursor();
console.log(cursor.type.name)
console.log(input.substr(cursor.from,cursor.to));
var i = 10;
// while(i>3){
//     cursor.firstChild();
//     console.log(cursor.type.name)
//     console.log(input.substr(cursor.from,cursor.to));
    
//     i--;
// }
 cursor.next();
 console.log(cursor.type.name)
 cursor.next();
 console.log(cursor.type.name);
 cursor.next();
 console.log(cursor.type.name);
 cursor.next();
 console.log(cursor.type.name);
 cursor.next();
 console.log(cursor.type.name);
// //console.log(input.substr(cursor.from,cursor.to));
// cursor.nextSibling();
// console.log(cursor.type.name)
// console.log(input.substr(cursor.from,cursor.to));
// cursor.firstChild();
// cursor.nextSibling();
// cursor.firstChild();
//cursor.firstChild();
//cursor.nextSibling();
//cursor.nextSibling();
// console.log(cursor.type.name)
// console.log(input.substr(cursor.from,cursor.to));
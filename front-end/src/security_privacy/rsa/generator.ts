/**create encryption using RSA  
 * 
 * need to install RSA library 
 * npm i node-rsa
 * https://www.npmjs.com/package/node-rsa
 * 
*/

// file system for read and write operation
var fileSystem = require("fs");

const rsa = require('node-rsa');
//use key 1024 byte 
const key = new rsa({b: 1024}); //pub and private

function generateKeys() {
    
    //export both keys
    var public_key = key.exportKey('public');
    
    var private_key = key.exportKey('private');


    //input file write the key into the files
    fileSystem.openSync("./key/public.pem","w");
    fileSystem.writeFileSync("./key/public.pem", public_key, "utf8");
    //write for private
    fileSystem.openSync("./key/private.pem","w");
    fileSystem.writeFileSync("./key/private.pem", private_key, "utf8");
}

generateKeys();
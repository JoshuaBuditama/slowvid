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
//use key 4096 byte 
const key = new rsa({ b: 4096 }); //pub and private

var publicKey = new rsa();
var privateKey = new rsa();

function generateKeys() {

    //export both keys
    var public_key = key.exportKey('public');

    var private_key = key.exportKey('private');


    //input file write the key into the files
    fileSystem.openSync("./key/public.pem", "w");
    fileSystem.writeFileSync("./key/public.pem", public_key, "utf8");

    publicKey.importKey(public_key);
    privateKey.importKey(private_key);
}

//encrypt data
function encrypteInput(data) {
    //encrypt with privatekey
    const encryptedVar = privateKey.encryptPrivate(data, "base64");
    return encryptedVar;
}

generateKeys();
//token will input here
encrypteInput("this is the secret");
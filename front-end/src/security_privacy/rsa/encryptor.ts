
var rsa = require("node-rsa");
//for salt
var  crypto = require('crypto');
var forSalt;

//file input
var fs = require("fs");
// create new keys variable
var publicKey = new rsa();
var privateKey = new rsa();

//retreved data from both .pem files
var public = fs.readFileSync("./key/public.pem", "utf8");
var private = fs.readFileSync("./key/private.pem", "utf8");


//store into the key var
publicKey.importKey(public);
privateKey.importKey(private);

function encrypteInput(data) {
    //generate salt
    // const salt = crypto.randomBytes(64).toString('hex');
    // forSalt = salt;
    // console.log(salt);
    //const salt ='qwedaf12312312hggf817fyefh1ef9efy98ehf';
    // combine salt with token and key
    //const encryptedvar = privateK.encryptPrivate(salt + data, "base64");
    
    //without salt
    const encryptedvar = privateKey.encryptPrivate(data, "base64");
    return encryptedvar;
}

function checkKey(thekey)
{
    //decrypted from the public key
    const decryptedKey = publicKey.decryptPublic(thekey, "utf8");
   
    if("thisisit"== decryptedKey)
    // if(forSalt+"thisisit" == decryptedKey)
    {
        console.log(decryptedKey+'\n');
        return true;
    }
    else 
    {
        return false;
    }
}

console.log("the key " + encrypteInput("thisisit"));

var keyVar = "eizimtyNmOEJJtA2pnnbXxv+3kCg11yh5bnhgEw8Z+uXKC1/Of/bcyChfUuwBW7ZOdFj/ZHmcj2nFQYlagv9h74sD3MhxN3HkVMYN53WfFI1qP6FgqYmoq1FFAP3SARXwfJCHKNAZghrFnnw93yOVLkPYqk9ajzsXqH+QpaQRPc=";
console.log(checkKey(keyVar));

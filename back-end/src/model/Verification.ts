export class WebToken{
    static setToken(userID: string, _hcpID: string){
        let jwt = require('jsonwebtoken');
        let fs = require('fs');
        let pk = fs.readFileSync('certificates/backend_key.pem'); // reading the private key
        let payload = {
            deviceID: "placeholderID",     // provided by user
            expiresIn: 60*30,       // expires in 60 seconds * 30
            hcpID: "placeholderHCPID"   // provided by health care professional
        }
        // algorithm is RSA SHA256 
        let token = jwt.sign(payload, pk, {algorithm: 'RS256'} ,{expiresIn: 60 * 30}); // can also sign with a secret in .env file
        return token;
    }
}


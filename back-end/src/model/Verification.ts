export class WebToken{
    static setToken(userID: string, _hcpID: string){
        var jwt = require('jsonwebtoken');
        let payload = {
            deviceID: "placeholderID",     // provided by user
            expiresIn: 60*60,       // expires in 60 seconds * 30
            hcpID: "placeholderHCPID"   // provided by health care professional
        }
        var token = jwt.sign({payload},{algorithm: 'RS256'}, {expiresIn: 30 * 60}); // can sign with a secret in .env file
        /* algorithm is RSA SHA256 */
        return token;
    }
}


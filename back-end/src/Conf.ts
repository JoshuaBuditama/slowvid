import fs from 'fs';
import path from 'path';

export const httpsOptions = {
	key: fs.readFileSync(path.join(__dirname, '..', '..', 'certificates', 'backend_key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '..', '..', 'certificates', 'backend_cert.pem')),
	requestCert: true,
	rejectUnauthorized: false, // for error handling
	ca: [
		fs.readFileSync(path.join(__dirname, '..', '..', 'certificates', 'backend_cert.pem'))
	]
};

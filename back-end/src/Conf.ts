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
// signal strength threshold. The minimum bluetooth signal strength required
// before an encounter can be identified as a close contact (if other
// conditions are met)
export const signalStrengthThreshold: number = 1.0;
// duration threshold. The minimum proximity duration required before an
// encounter can be identified as a close contact (if other conditions are met)
export const durationThresholdinMs: number = 5000;

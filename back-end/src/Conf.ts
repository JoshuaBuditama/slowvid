import fs from 'fs';
import path from 'path';
import { ExtractJwt } from 'passport-jwt';

// Options for the https server
export const httpsOptions = {
	key: fs.readFileSync(path.join(__dirname, '..', '..', 'certificates', 'backend_key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '..', '..', 'certificates', 'backend_cert.pem')),
	requestCert: true,
	rejectUnauthorized: false, // for error handling
	ca: [
		fs.readFileSync(path.join(__dirname, '..', '..', 'certificates', 'backend_cert.pem'))
	]
};

export const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: httpsOptions.cert,
	algorithms: ["RS256"]
};

// length of JWT tokens for Health Care Professional front-end
export const jwtTokenExpiry: number = 36000;
// signal strength threshold. The minimum bluetooth signal strength required
// before an encounter can be identified as a close contact (if other
// conditions are met)
export const signalStrengthThreshold: number = 1.0;
// duration threshold. The minimum proximity duration required before an
// encounter can be identified as a close contact (if other conditions are met)
export const durationThresholdinMs: number = 5000;
// allowed incorrect password attempts by a health care professional (HCP)
// before the account is locked
export const allowedIncorrectPasswordAttemptsHCP: number = 5;

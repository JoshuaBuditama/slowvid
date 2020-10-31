import express from 'express';
import tls from 'tls';

export const authenticate = (req: express.Request, res: express.Response, 
	next?: ((...args: any[]) => any)) => {
	const cert = (req.socket as tls.TLSSocket).getPeerCertificate();

	if (Object.keys(cert).length > 0 && (req.socket as tls.TLSSocket).authorized) {
		// Name: ${cert.subject.CN}, certificate was issued by ${cert.issuer.CN}
	} else if (cert.subject) {
		return res.status(403)
				.send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`);

	} else {
		return res.status(401)
			.send(`Sorry, but you need to provide a client certificate to continue.`);
	}
			
	if (next) {
		next();
	}
};

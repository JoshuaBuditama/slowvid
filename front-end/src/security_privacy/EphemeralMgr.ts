import elliptic from 'elliptic';

/**
 * Generate a Emphemeral Id by Elliptic-curve Diffie–Hellman
 * https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman
 * using the curve Curve25519, see http://safecurves.cr.yp.to/ for a list of safe curves.
 * @returns string Emphemeral Id (hex)
 */
export function genId() : string {
	let ec = new elliptic.ec('curve25519');
	let key = ec.genKeyPair();
	return key.getPublic("hex");
}

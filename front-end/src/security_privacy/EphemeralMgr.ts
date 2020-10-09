import elliptic from 'elliptic';

/**
 * Generate a KeyPair (public key is the Emphemeral Id) by
 * using Elliptic-curve Diffie–Hellman
 * https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman
 * using the curve Curve25519, see http://safecurves.cr.yp.to/ for a list of safe curves.
 * @returns elliptic.ec.KeyPair Elliptic-curve Diffie–Hellman key pair
 */
export function genKeyPair() : elliptic.ec.KeyPair {
	return getCurve().genKeyPair();
}

/**
 * Get the Emphemeral Id from a KeyPair
 * @returns string Emphemeral Id (hex string)
 */
export function getId(keypair: elliptic.ec.KeyPair) : string {
	return keypair.getPublic("hex");
}
/**
 * Generate an encounter token using Elliptic-curve Diffie–Hellman
 * https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman
 * @param  {elliptic.ec.KeyPair} keypair Our key pair
 * @param  {string} foreignEmphemeralId The foreign Emphemeral ID as a hex string
 * @returns string Encounter token (hex string)
 */
export function genEncounterToken(keypair: elliptic.ec.KeyPair, foreignEmphemeralId: string) : string {
	let foreignKey = getCurve().keyFromPublic(foreignEmphemeralId, "hex");
	let shared = keypair.derive(foreignKey.getPublic());
	return shared.toString("hex");
}

function getCurve() : elliptic.ec {
	if (ecurve === undefined)
	{
		ecurve = new elliptic.ec('curve25519');
	}
	return ecurve;
}

let ecurve : elliptic.ec;

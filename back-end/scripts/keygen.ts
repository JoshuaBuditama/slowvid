import child_process from 'child_process';
import path from 'path';
import fs from 'fs';

function exec(cmd: string, args: string[])
{
	const ret = child_process.spawnSync(cmd, args, { stdio: 'inherit' });
	console.log('[keygen] terminated :', ret.status);
}

function keygen() {
	if (process.argv.length < 3) {
		console.log("keygen [gen]");
		return;
	}
	if (!fs.existsSync("certificates")) {
		fs.mkdirSync("certificates");
	}
	if (process.argv[2] === "gen") {
		exec("openssl",
		["req",
		 "-x509",
		 "-newkey", "rsa:4096",
		 "-keyout", path.join("certificates", "backend_key.pem"),
		 "-out", path.join("certificates", "backend_cert.pem"),
		 "-nodes",
		 "-days", "365",
		 "-subj", "/CN=localhost/O=Slowvid back-end"]);
	}
	else if (process.argv[2] === "pkcs" && process.argv.length < 4) {
		exec("openssl",
		["pkcs12",
		 "-export", "-name", "Slowvid back-end",
		 "-out", path.join("certificates", "backend.pfx"),
		 "-inkey", path.join("certificates", "backend_key.pem"),
		 "-in", path.join("certificates", "backend_cert.pem")]);
	}
	else if (process.argv[2] === "client") {
		const name = process.argv[3];
		if (process.argv.length < 4) {
			console.log("keygen client name");
			return;
		}
		exec("openssl",
		["req",
		 "-newkey", "rsa:4096",
		 "-keyout", path.join("certificates", name.toLowerCase() + "_key.pem"),
		 "-out", path.join("certificates", name.toLowerCase() + "_csr.pem"),
		 "-nodes",
		 "-days", "365",
		 "-subj", "/CN=" + name]);
		 // sign with server_cert.pem
		 exec("openssl",
		 ["x509",
		  "-req",
		  "-in", path.join("certificates", name.toLowerCase() + "_csr.pem"),
		  "-CA", path.join("certificates", "backend_cert.pem"),
		  "-CAkey", path.join("certificates", "backend_key.pem"),
		  "-out", path.join("certificates", name.toLowerCase() + "_cert.pem"),
		  "-set_serial", "01",
		  "-days", "365"]);
	}
	else if (process.argv[2] === "pkcs" && process.argv.length >= 4) {
		const name = process.argv[3];
		exec("openssl",
		["pkcs12",
		 "-export", "-name", name,
		 "-out", path.join("certificates", name.toLowerCase() + ".pfx"),
		 "-inkey", path.join("certificates", name.toLowerCase() + "_key.pem"),
		 "-in", path.join("certificates", name.toLowerCase() + "_cert.pem")]);
	}
}

keygen();

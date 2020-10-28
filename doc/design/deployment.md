# Deployment

This document outlines the deployment guidelines for all components of the SlowVid application.
We utilise modern development and deployment practices to provide Encryption in Transit (TLS) and Encryption at Rest for our application.

## Front-end deployment

In production, this would be built as a native app using React Native and distributed via the Apple App Store and Google Play Store.
For this assignment, our Mock runs in the browser and can be deployed to Google App Engine in the same way the back-end is deployed.

## Back-end deployment

We deploy our back-end to Google App Engine Standard Environment for NodeJS.
The local file system in App Engine is not writable, which will prevent sensitive data being accidentally written and exposed to attack.

> While Cloud Storage is the recommended solution for reading and writing files in App Engine, if your app only needs to write temporary files, you can use standard Node.js methods to write files to a directory named /tmp.
> All files in this directory are stored in the instance's RAM, therefore writing to /tmp takes up system memory. In addition, files in the /tmp directory are only available to the app instance that created the files. When the instance is deleted, the temporary files are deleted. [reference](https://cloud.google.com/appengine/docs/standard/nodejs/using-temp-files)

App engine also provides us with TLS and managed certificates.

## Database deployment

### MongoDB Enterprise Encrypted Storage Engine

We deploy to a MongoDB enterprise instance hosted on Google Cloud Platform, with deployment managed with MongoDB Atlas.
MongoDB Enterprise provides an Encrypted Storage Engine which includes an option for encrypting the data using AES-256 symmetric encryption.

> MongoDB Enterprise 3.2 introduces a native encryption option for the WiredTiger storage engine. This feature allows MongoDB to encrypt data files such that only parties with the decryption key can decode and read the data. [reference](https://docs.mongodb.com/manual/core/security-encryption-at-rest/)

The data is encrypted by the storage engine, which means that the data is decrypted before being transmitted to the database client. Our database client (the Slowvid back-end) communicates with the database storage engine using TLS which provides encryption during transmission. TLS is configured automatically using MongoDB Atlas.

The master key for the Encrypted Storage Engine must be managed externally. We follow the securty recommendation of using the Google Cloud Platform KMS.

> Using a key manager meets regulatory key management guidelines, such as HIPAA, PCI-DSS, and FERPA, and is recommended over the local key management. [reference](https://docs.mongodb.com/manual/tutorial/configure-encryption/)

Set-up instructions are contained in the references.

### Client-side field level encryption (not used)

There is an option that allows encryption client side.
This option would allow the Slowvid back-end to hold the encryption key, with the NodeJS client automatically encrypting the data before communicating it to the storage engine.

> The official MongoDB 4.2-compatible drivers provide a client-side field level encryption framework. Applications can encrypt fields in documents prior to transmitting data over the wire to the server. Only applications with access to the correct encryption keys can decrypt and read the protected data. Deleting an encryption key renders all data encrypted using that key as permanently unreadable. [reference](https://docs.mongodb.com/manual/core/security-client-side-encryption/)

This would require modifications to the schema as per [this document](https://docs.mongodb.com/manual/reference/security-client-side-automatic-json-schema/#field-level-encryption-json-schema).

It only provides field-level encryption and does not allow full-document encryption. There may be a good use case for this for highly sensitive information like names or phone numbers, however currently our application design does not require this.

## Further references:

- GCP App Engine encryption:
  - https://cloud.google.com/appengine/docs/standard/nodejs/securing-custom-domains-with-ssl
  - https://cloud.google.com/security/encryption-in-transit
- Instructions for configuring GCP KMS:
  - https://docs.atlas.mongodb.com/security-kms-encryption/
  - https://docs.atlas.mongodb.com/security-gcp-kms/#security-gcp-kms

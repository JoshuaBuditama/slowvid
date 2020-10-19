# Deployment

This document outlines the deployment guidelines for all components of the SlowVid application. 
We utilise modern development and deployment practices to provide Encryption in Transit (TLS) and Encryption at Rest for our application. 


## Back-end deployment

We deploy our back-end to Google App Engine Standard Environment for NodeJS.
The local file system in App Engine is not writable, which will prevent sensitive data being accidentally written and exposed to attack. 

> While Cloud Storage is the recommended solution for reading and writing files in App Engine, if your app only needs to write temporary files, you can use standard Node.js methods to write files to a directory named /tmp.
> All files in this directory are stored in the instance's RAM, therefore writing to /tmp takes up system memory. In addition, files in the /tmp directory are only available to the app instance that created the files. When the instance is deleted, the temporary files are deleted.

- https://cloud.google.com/appengine/docs/standard/nodejs/using-temp-files

App engine also provides us with TLS and managed certificates. 

References:
  
- https://cloud.google.com/appengine/docs/standard/nodejs/securing-custom-domains-with-ssl
- https://cloud.google.com/security/encryption-in-transit


## Database deployment

We deploy our database to MongoDB Atlas in production. 

Atlas includes encryption at rest:
> Atlas uses whole volume (disk) encryption for any data at rest, including your cluster data and backups of that data.
> Atlas also requires TLS encryption for client data and intra-cluster network communications.

- https://docs.atlas.mongodb.com/reference/faq/security/index.html


## MongoDB enterprise

Another option available in MongoDB enterprise is an Encrypted Storage Engine, which provides native encryption. This could be used in conjunction with whole volume (disk) encryption above. 

- https://docs.mongodb.com/manual/core/security-encryption-at-rest/


## Front-end deployment

In production, this would be built as a native app using React Native, and distributed via the Apple App Store and Google Play Store. 
For this assignment, our Mock runs in the browser and can be deployed to Google App Engine in the same way the back-end is deployed.  

// Upload helper using firebase-admin SDK to a bucket
const admin = require('firebase-admin');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // private_key should have newlines replaced
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET,
  });
}

const bucket = admin.storage().bucket();

async function uploadBuffer(buffer, filename, mimetype) {
  const file = bucket.file(filename);
  await file.save(buffer, { metadata: { contentType: mimetype } });
  await file.makePublic();
  return `https://storage.googleapis.com/${process.env.FIREBASE_BUCKET}/${filename}`;
}

module.exports = { uploadBuffer };

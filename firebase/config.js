import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(app, "gs://learntube-4326c.appspot.com");

const uploadThumbnail = async (thumbnail) => {
  const imgRef = ref(
    storage,
    `upload/thumbnail/${Date.now()}-${thumbnail.name}`
  );
  const uploadTask = await uploadBytes(imgRef, thumbnail);
  return uploadTask;
};

const uploadVideo = async (video) => {
  const imgRef = ref(storage, `upload/video/${Date.now()}-${video.name}`);
  const uploadTask = await uploadBytes(imgRef, video);
  return uploadTask;
};

const otpValidation = async (number) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
};

const getDownloadLink = (path) => {
  return getDownloadURL(ref(storage, path));
};

export {
  app,
  auth,
  uploadThumbnail,
  uploadVideo,
  getDownloadLink,
  otpValidation,
};

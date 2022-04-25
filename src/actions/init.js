import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from '../utils/firebaseConfig';

export let firebaseApp;
export let db;
export let auth;

export const configureFirebase = async () => {
	if (window.location.hostname === "localhost") {
		const firebaseApps = getApps();
		if (firebaseApps.length < 1) {
			firebaseApp = initializeApp(firebaseConfig);
		}
	} else {
		const response = await fetch("/__/firebase/init.json");
		const config = await response.json();
		const firebaseApps = getApps();
		if (firebaseApps.length < 1) {
			firebaseApp = initializeApp(config);
		}
	}
  db = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
};
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig.js';

export const configureFirebase = async () => {
	if (window.location.hostname === "localhost") {
		const firebaseApps = getApps();
		if (firebaseApps.length < 1) {
			const app = initializeApp(firebaseConfig);
		}
	} else {
		const response = await fetch("/__/firebase/init.json");
		const config = await response.json();
		const firebaseApps = getApps();
		if (firebaseApps.length < 1) {
			const app = initializeApp(config);
		}
	}
};
import { AppUpdater } from '@objekt/capacitor-app-updater';

import { SplashScreen } from '@capacitor/splash-screen';

(async () => {

	// Check for app updates.
	if (process.env.NODE_ENV.toUpperCase() === 'PRODUCTION') {

		const didUpdate = await AppUpdater.sync(process.env.WEB_SERVER_URL, 0);
		alert(didUpdate);

		// Stop processing if there was an update, as the updated would have triggered a page reload.
		if (didUpdate) {
			return;
		}
	}

	// Load the app shell module.
	await import('./modules/AppShell.js');

	// Hide the native splash screen.
	await SplashScreen.hide();

})();
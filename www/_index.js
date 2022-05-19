import { AppUpdater } from '@objekt/capacitor-app-updater';

import { SplashScreen } from '@capacitor/splash-screen';

(async () => {

	// Check for app updates.
	const didUpdate = await AppUpdater.sync('https://objektlabs.github.io/capacitor-app-updater/example', 0);

	// Stop processing if there was an update, as the updated would have triggered a page reload.
	if (didUpdate) {
		return;
	}

	// Load the app shell module.
	await import('./modules/AppShell.js');

	// Hide the native splash screen.
	await SplashScreen.hide();

})();
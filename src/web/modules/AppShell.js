import { Device } from '@capacitor/device';

import './components/TitleBar.js';

/**
 * Main application shell component.
 */
export class AppShell extends HTMLElement {

	/**
	 * Initialise the component.
	 */
	constructor() {

		super();

		const root = this.attachShadow({ mode: 'open' });

		root.innerHTML = `
			<style>
				:host {
					display: block;

					width: 100%;
					height: 100%;

					--app-theme-background: #001a3a;
					--app-theme-foreground: #ffffff;
					--app-content-size: 0.9em;
				}

				h1, h2, h2, p {
					margin: 0px 0px;
					padding: 0px;
				}

				header {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					background-color: var(--app-theme-background);

					padding: 15px;
				}

				header h1 {
					font-size: 1.2em;
					font-weight: 600;
					color: var(--app-theme-foreground);

					text-align: center;
				}

				main {
					display: flex;
					flex-direction: column;

					padding: 15px;
				}

				main h1 {
					font-size: 1em;
					text-transform: uppercase;
					letter-spacing: 1px;

					margin-bottom: 15px;
				}

				main h2 {
					font-size: var(--app-content-size);
				}

				main p {
					font-size: var(--app-content-size);
					color: #333;
				}
				
				main hr {
					height: 1px;
					background-color: #eee;
					border: 0;
					margin: 20px 0px;
				}
				
				main pre {
					white-space: pre-line;
				}

				button {
					background-color: var(--app-theme-background);
					color: var(--app-theme-foreground);
					border: none;
					font-size: var(--app-content-size);
					padding: var(--app-content-size);
				}

				.prop-sheet {
					display: grid;
					grid-template-columns: auto 1fr;
					align-items: center;

					row-gap: 10px;
					column-gap: 20px;
				}
			</style>

			<div>
				<header class="logo-box">
					<img src="./assets/icons/app-192.png">
					<h1>Capacitor 3 Example App</h1>
				</header>
				<main>
					<h1>Device Info</h1>
					<div id="deviceInfo" class="prop-sheet"></div>
					<hr>
					<h1>Web App Version</h1>
					<div id="webAppInfo" class="prop-sheet"></div>
					<button id="sync-button">Sync Web Content</button>
				</main>
			</div>
		`;
	}

	/**
	 * Setup the component when added to the DOM.
	 * 
	 * @returns {void}
	 */
	async connectedCallback() {

		// Get the device info.
		const deviceInfo = await Device.getInfo();

		this.shadowRoot.querySelector('#deviceInfo').innerHTML = `
			<h2>Name:</h2>
			<p>${deviceInfo.name}</p>
			<h2>Model:</h2>
			<p>${deviceInfo.model}</p>
			<h2>Platform:</h2>
			<p>${deviceInfo.platform}</p>
			<h2>Operating System:</h2>
			<p>${deviceInfo.operatingSystem}</p>
			<h2>OS Version:</h2>
			<p>${deviceInfo.osVersion}</p>
			<h2>Manufacturer:</h2>
			<p>${deviceInfo.manufacturer}</p>
			<h2>Is Virtual:</h2>
			<p>${deviceInfo.isVirtual}</p>
			<h2>Web View Version:</h2>
			<p>${deviceInfo.webViewVersion}</p>
		`;

		// Register a click handler to get the latest version of the app.
		this.shadowRoot.querySelector('#sync-button').addEventListener('click', async () => {

			console.log('Test');
		});
	}
}

window.customElements.define('app-shell', AppShell);
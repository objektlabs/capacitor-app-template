export class TitleBar extends HTMLElement {

	constructor() {

		super();

		const root = this.attachShadow({ mode: 'open' });
		root.innerHTML = `
			<style>
				:host {
					padding: 15px 15px 15px 15px;
					text-align: center;
					background-color: #001a3a;
				
					font-size: 1.2em;
					font-weight: 600;
					color: #fff;
				}
			</style>

			<slot></slot>
		`;
	}
}

window.customElements.define('app-title-bar', TitleBar);
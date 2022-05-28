import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

export default merge(common, {
	mode: 'production',
	devtool: false,
	plugins: [
		// Inject environment values
		new webpack.EnvironmentPlugin({
			WEB_SERVER_URL: 'https://objektlabs.github.io/capacitor-app-updater/example'
		}),
		// Inject all non-asset files into the service-worker preload cache.
		new WorkboxWebpackPlugin.InjectManifest({
			swSrc: './src/web/service-worker.js',
			exclude: [/assets.*/]
		})
	],
	performance: {
		hints: 'warning'
	},
	optimization: {
		minimize: true
	},
	stats: {
		preset: 'normal'
	}
});
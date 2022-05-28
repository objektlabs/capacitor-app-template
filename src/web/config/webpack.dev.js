import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

export default merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		// Inject environment values
		new webpack.EnvironmentPlugin({
			WEB_SERVER_URL: 'http://localhost:3000'
		}),
	],
	performance: {
		hints: false
	},
	optimization: {
		minimize: false
	}
});
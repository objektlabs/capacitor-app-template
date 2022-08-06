import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export default {
	target: 'web',
	entry: {
		app: path.resolve(process.cwd(), './src/web/index.js')
	},
	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve(process.cwd(), 'dist'),
		clean: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/web/favicon.ico', to: 'favicon.ico' },
				{ from: './src/web/index.css', to: 'index.css' },
				{ from: './src/web/manifest.json', to: 'manifest.json' },
				{
					from: './src/web/assets',
					to: 'assets',
					globOptions: {
						ignore: ['**/.DS_Store']
					}
				}
			]
		}),
		new HtmlWebpackPlugin({
			title: 'Capacitor 3 Example App',
			filename: 'index.html',
			template: './src/web/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							['@babel/transform-runtime'],

							['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
							['@babel/plugin-proposal-class-properties'],
							['@babel/plugin-proposal-private-methods']
						]
					}
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			}
		]
	},
	performance: {
		maxEntrypointSize: 512 * 1000, // 512kb
		maxAssetSize: 512 * 1000, // 512kb
	},
	optimization: {
		minimizer: [
			new TerserWebpackPlugin({
				terserOptions: {
					format: {
						comments: false
					}
				},
				extractComments: false
			}),
			new CssMinimizerPlugin()
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				}
			},
			/*
			minSize: 10 * 1000, // 10kb
			maxSize: 250 * 1000, // 250kb
			*/
		}
	},
	stats: {
		preset: 'errors-warnings',
		colors: true
	}
};
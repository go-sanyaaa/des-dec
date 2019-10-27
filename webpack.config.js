const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const webpack = require("webpack")

const sass = {
	loader: 'sass-loader',
	options: {
		indentedSyntax: true,
		data: ''
	}
}

const global_css = {
	loader: 'sass-resources-loader',
	options: {
		resources: [
			path.resolve(__dirname,'./src/sass/_colors.sass')
		]
	}
}
module.exports = {
	output: {
		filename: "bundle.js"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve("babel-loader"),
					query: {
						presets: [
							["@babel/preset-env", { modules: false }]
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
				  'vue-style-loader',
				  'css-loader?url=false',
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-plain-loader'
			},
			{
				test: /\.sass$/,
				use: [
				  'vue-style-loader',
				  'css-loader?url=false',
				  sass,
				  global_css
				]
			},
		]
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			"@": path.resolve(__dirname,'src')
		}
	},

	plugins: [
	// убедитесь что подключили плагин!
	new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
	]
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendors: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: "vendor",
	// 				chunks: "all",
	// 				minChunks: 1
	// 			}
	// 		}
	// 	}
	// }
};
/*
 * Arquivo de opções do webpack 3.x
 *
 * Esse arquivo exporta uma função responsável por gerar as opções do webpack conforme o tipo de execução:
 *          # development   -- compilação em modo de desenvolvedor
 *          # production    -- compilação para a produção
 *          # test          -- compilação para testes unitários
 *
 * Os modos podem ser alternados através do valor do parametro no package.json --env.isDev. Suporte ao modo de teste com segundo parametro --env.isTest.
 *
 * # modo development
 *
 * > No modo para o desenvolvimento, o codigo não é minificado, o modo debug é ativo e demais opções que facilitam o desenvolvimento.
 *
 * # modo production
 *
 * > No modo de produção, o código é otimizado e o modo debug é desabilitado.
 *
 * Versão: 3.0.0
 *
 * */

// Libraries
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Webpack2Polyfill = require('webpack2-polyfill-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

var isDev = false;
var isTest = false;
var version = require('./package.json').version; // default value
var publicPath = './'; // default value

module.exports = WebpackConfig;

const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var argv = require('minimist')(process.argv.slice(2));
const isWeb = (argv && argv.target === 'web');
const output = (isWeb ? 'build/web' : 'build/electron');

function WebpackConfig(env) {
    // Ler parametros da CLI
    if (env) {
        isDev = env.isDev;
        isTest = env.isTest;
        version = env.version || version;
        publicPath = env.publicPath || publicPath;
    }
    // Webpack Options
    var options = {
        context: path.join(__dirname, 'src'),
        entry: isTest ? undefined : {
            main: './app.js', 
        },
        devtool: isTest || isDev ? 'eval' : 'cheap-module-source-map',
        output: getOutput(),
        resolve: getResolve(),
        resolveLoader: {
            moduleExtensions: ['-loader'] // suport legacy components
        },
        plugins: getPlugins(isDev, isTest, publicPath),
        module: {
            rules: getLoaders(),
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
              }],
        },
        devServer: {
            hot: isDev,
            inline: true,
            historyApiFallback: true,
            compress: !isDev,
            stats: 'errors-only'
        }
    };


    return options;
};

// private methods

function getResolve() {
    var resolve = {
        alias: {
            components: path.join(__dirname, 'src/components'),
            features: path.join(__dirname, 'src/features'),
            shared: path.join(__dirname, 'src/shared'),
            src: path.join(__dirname,  'src')
        },
        modules: [
            path.join(__dirname,  'node_modules/ndd-kendo/vendor/js/'), // config for ndd-kendo
            'node_modules'
        ],
    };
    return resolve;
}

function getOutput() {
    return {
        path: path.join(__dirname, 'dist'),
        pathinfo: isDev,
        publicPath: publicPath,
        filename: isDev ? '[name].bundle.js' : '[name].[hash].bundle.js',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js'
    };
}

function getPlugins() {
    var plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: '!ejs-loader!src/index.html', // Precisa utilizar o loader ejs para resolver a base tag
            base: publicPath
        }),
        new Webpack2Polyfill(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pt|en|es/),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(isDev),
            ENVIRONMENT: JSON.stringify(isDev ? 'development' : 'production')
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            options: {
                resolveUrlLoader: {
                    silent: true
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            debug: isDev
        })
    ];
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if (!isDev && !isTest) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 2
        }));
        plugins.push(new ParallelUglifyPlugin({
            sourceMap: false,
            uglifyJS: {
                compress: {
                    warnings: false
                }
            }
        }));
        plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
    }
    // Test
    if (isTest) {
        plugins.push(new webpack.DefinePlugin({
            'typeof window': JSON.stringify('object')
        }));
    }
    return plugins;
}

function getLoaders() {
    var defaultCssLoaderConfig = {
        loader: 'css-loader',
        options: {
            minimize: !isDev
        }
    };

    var loaders = [{
            test: /\.html$/,
            use: ['html-loader']
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                defaultCssLoaderConfig
            ]
        },
        {
            test: /\.js$/,
            use: ['ng-annotate-loader', 'strict-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', defaultCssLoaderConfig, 'less-loader']
        },
        {
            test: /\.font\.(js|json)$/,
            use: ['style-loader', defaultCssLoaderConfig, 'fontgen-loader']
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                defaultCssLoaderConfig,
                {
                    loader: 'resolve-url-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.join(__dirname, 'src/shared/styles')],
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.(ttf|eot|svg|png|gif|jpg|jpeg|woff|woff2)(.*)$/,
            loader: 'url-loader',
            options: {
                limit: 1000
            }
        }
    ];
    return loaders;
}

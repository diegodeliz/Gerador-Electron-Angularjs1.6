/*
 * Arquivo de opções do webpack 2.x
 *
 * Esse arquivo exporta uma função responsável por gerar as opções do webpack conforme o tipo de execução:
 *          # development   -- compilação em modo de desenvolvedor
 *          # production    -- compilação para a produção
 *
 * Os modos podem ser alternados através do valor do parametro isDev. Suporte ao modo de teste com segundo parametro isTest.
 *
 * # modo development
 *
 * > No modo para o desenvolvimento, o codigo não é minificado, o modo debug é ativo e demais opções que facilitam o desenvolvimento.
 *
 * # modo production
 *
 * > No modo de produção, o codigo é otimizado e o modo debug é desabilitado.
 *
 * Versão: 2.0.0
 *
 * */

// Libraries
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Webpack2Polyfill = require('webpack2-polyfill-plugin');

module.exports = WebpackConfig;


function WebpackConfig (isDev, isTest, publicPath) {
    // Webpack Options
    return {
        context: path.join(__dirname, '..', 'src'),
        entry: isTest ? undefined : {
            main: './app.js'
        },
        devtool: isTest || isDev ? 'eval' : 'source-map',
        output: getOutput(isDev, publicPath),
        resolve: getResolve(),
        resolveLoader: {
            moduleExtensions: ['-loader'] // suport legacy components
        },
        plugins: getPlugins(isDev, isTest, publicPath),
        module: {
            rules: getLoaders()
        },
        devServer: {
            stats: 'errors-only'
        }
    };
};

// private methods

function getResolve() {
    var resolve = {
        alias: {
            components: path.join(__dirname, '..', 'src/components'),
            features: path.join(__dirname, '..', 'src/features'),
            shared: path.join(__dirname, '..', 'src/shared'),
            src: path.join(__dirname, '..', 'src')
        },
        modules: [
            path.join(__dirname, '..', 'node_modules/ndd-kendo/vendor/js/'), // config for ndd-kendo
            'node_modules'
        ]
    };
    return resolve;
}

function getOutput(isDev, publicPath) {
    return {
        path: path.join(__dirname, '..', 'dist'),
        pathinfo: isDev,
        publicPath: publicPath,
        filename: isDev ? '[name].bundle.js' : '[name].[hash].bundle.js',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js'
    };
}

function getPlugins(isDev, isTest, publicPath) {
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
            PRODUCTION: JSON.stringify(isDev)
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            options: {
                resolveUrlLoader: {
                    silent: true
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({ debug: isDev })
    ];

    // plugins
    plugins.push(new webpack.DefinePlugin({
        ENVIRONMENT: JSON.stringify(isDev ? 'development' : 'production')
    }));
    if (!isDev && !isTest) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 2
        }));
        plugins.push(new webpack.optimize.UglifyJsPlugin());
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
    var loaders = [
        { test: /\.html$/, use: ['html-loader'] },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.js$/, use: ['ng-annotate-loader', 'strict-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // precisa ter essa linha para compilar os estilos.
        { test: /\.font\.(js|json)$/, use: ['style-loader', 'css-loader', 'fontgen-loader'] },
        {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'resolve-url-loader' },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.join(__dirname, '..', 'src/shared/styles')],
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.(ttf|eot|svg|png|gif|jpg|jpeg|woff|woff2)(.*)$/,
            loader: 'url-loader',
            options: { limit: 1000 }
        }
    ];
    return loaders;
}

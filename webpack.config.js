const path = require('path');
const fs = require('fs');
const process = require('process');
const _ = require('lodash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CrxWebpackPlugin = require("crx-webpack-plugin");

function getWebpackMode() {
    let result = _.compact(_.map(process.argv, function (arg) {
        if (arg.indexOf('--mode=') === 0) {
            return arg.substr(7);
        }
        return null;
    }));
    if (result) {
        return result[0];
    }
    return null;
}

module.exports = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, 'src/manifest.json'), 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            let manifest = JSON.parse(data);
            let version = manifest.version;
            let config = {
                entry: path.resolve(__dirname, 'src/index.js'),
                output: {
                    path: path.resolve(__dirname, 'build'),
                    filename: 'bundle.js'
                },
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['babel-preset-env']
                                }
                            }
                        }
                    ]
                },
                plugins: [
                    new CopyWebpackPlugin([
                        {
                            from: path.resolve(__dirname, 'src/manifest.json'),
                            to: path.resolve(__dirname, 'build/manifest.json')
                        }
                    ])
                ]
            };
            if (getWebpackMode() === 'production') {
                config.plugins.push(new CrxWebpackPlugin({
                    keyFile: path.resolve(__dirname, 'key.pem'),
                    contentPath: path.resolve(__dirname, 'build'),
                    outputPath: path.resolve(__dirname, 'dist'),
                    name: version
                }));
            }
            resolve(config);
        });
    });
};
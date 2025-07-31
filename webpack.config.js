const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const commonConfig = {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        })
      ]
    }
  };

  return [
    // CommonJS build
    {
      ...commonConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'templates.js',
        library: {
          type: 'commonjs2'
        }
      },
      plugins: [
        ...(isProduction ? [new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['**/*', '!templates.esm.js', '!templates.umd.js']
        })] : [])
      ]
    },
    // ESM build
    {
      ...commonConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'templates.esm.js',
        library: {
          type: 'module'
        }
      },
      experiments: {
        outputModule: true
      }
    },
    // UMD build for browser usage
    {
      ...commonConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'templates.umd.js',
        library: {
          name: 'FyndStorefrontTemplates',
          type: 'umd'
        },
        globalObject: 'this'
      }
    }
  ];
}; 
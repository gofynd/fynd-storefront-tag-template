const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = process.env.ANALYZE === 'true';

  // Clean dist folder once before all builds
  if (isProduction && !global.webpackCleanDone) {
    const { execSync } = require('child_process');
    execSync('rm -rf dist', { stdio: 'inherit' });
    global.webpackCleanDone = true;
  }

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
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: isProduction,
              drop_debugger: isProduction,
              pure_funcs: isProduction ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          extractComments: false,
        })
      ],
      // Tree shaking optimizations
      usedExports: true,
      sideEffects: false,
    },
    performance: {
      // Increase limits for library bundles
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000, // 500 KiB
      maxAssetSize: 512000, // 500 KiB
    }
  };

  const configs = [
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
        new CopyPlugin({
          patterns: [
            { from: 'src/template.js', to: 'template.js' }
          ]
        }),
        ...(isAnalyze ? [new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'bundle-report-cjs.html',
          openAnalyzer: false
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
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: 'src/template.js', to: 'template.js' }
          ]
        })
      ]
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
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: 'src/template.js', to: 'template.js' }
          ]
        })
      ]
    }
  ];

  return configs;
}; 
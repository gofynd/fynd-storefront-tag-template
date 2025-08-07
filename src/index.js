/**
 * Fynd Storefront Tag Templates
 * 
 * A collection of pre-configured tag templates for Fynd Platform storefronts
 * @module @gofynd/storefront-tag-templates
 */

const templates = require('./template');
const createTemplate = require('./utils/createTemplate');

// Export the templates object as default
module.exports = templates;

// Also export individual templates for named imports
module.exports.gtm = templates.gtm;
module.exports.sentry = templates.sentry;
module.exports.ga4 = templates.ga4;
module.exports.amplitude = templates.amplitude;
module.exports.adobeAnalytics = templates.adobeAnalytics;
module.exports.mixpanel = templates.mixpanel;
module.exports.heap = templates.heap;
module.exports.adobeLaunch = templates.adobeLaunch;
module.exports.segment = templates.segment;
module.exports.mparticle = templates.mparticle;
module.exports.hotjar = templates.hotjar;
module.exports.crazyegg = templates.crazyegg;
module.exports.fullstory = templates.fullstory;
module.exports.mouseflow = templates.mouseflow;
module.exports.clevertap = templates.clevertap;
module.exports.moengage = templates.moengage;
module.exports.webengage = templates.webengage;
module.exports.pushengage = templates.pushengage;

// Export the createTemplate helper
module.exports.createTemplate = createTemplate; 
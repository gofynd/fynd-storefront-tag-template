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
module.exports.notifyvisitors = templates.notifyvisitors;
module.exports.optimizely = templates.optimizely;
module.exports.adobeTarget = templates.adobeTarget;
module.exports.abTasty = templates.abTasty;
module.exports.qualaroo = templates.qualaroo;
module.exports.survicate = templates.survicate;
module.exports.typeform = templates.typeform;
module.exports.usabilla = templates.usabilla;
module.exports.totango = templates.totango;
module.exports.intercom = templates.intercom;
module.exports.logrocket = templates.logrocket;
module.exports.trackjs = templates.trackjs;
module.exports.quantcast = templates.quantcast;

// Export the createTemplate helper for custom templates
module.exports.createTemplate = createTemplate; 
/**
 * Fynd Storefront Tag Templates
 * 
 * A collection of pre-configured tag templates for Fynd Platform storefronts
 * @module @gofynd/storefront-tag-templates
 */

const templates = require('./template');
const createTemplate = require('./utils/createTemplate');

// Export the templates object with items array as default
module.exports = templates;

// Export the createTemplate helper for custom templates
module.exports.createTemplate = createTemplate; 
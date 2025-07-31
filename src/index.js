/**
 * Fynd Storefront Tag Templates
 * 
 * A collection of pre-configured tag templates for Fynd Platform storefronts
 * @module @gofynd/storefront-tag-templates
 */

const templates = require('./template');

// Export the templates object as default
module.exports = templates;

// Also export individual templates for named imports
module.exports.gtm = templates.gtm;
module.exports.sentry = templates.sentry;
module.exports.ga4 = templates.ga4;

// Export the createTemplate helper if someone wants to use it
module.exports.createTemplate = (config) => {
    const defaults = {
        type: 'js',
        sub_type: 'inline',
        position: 'head',
        pages: [],
        attributes: { async: "true" },
        compatible_engines: ['react', 'vue2'],
        field_mappings: {},
        layout: { columns: 2, gap: '20px', responsive: true }
    };
    
    return { ...defaults, ...config };
}; 
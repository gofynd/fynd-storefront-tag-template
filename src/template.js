/**
 * Template Configuration Guide
 * ===========================
 * 
 * Each template MUST have these fixed keys:
 * 
 * REQUIRED KEYS:
 * - name: string - Display name of the template
 * - path: string - Unique path identifier
 * - description: string - Brief description
 * - template_id: string - Unique template ID
 * - template_version: string - Version number
 * - fields: array - Form fields configuration
 * - script: string - JavaScript template with {{placeholders}}
 * 
 * OPTIONAL KEYS:
 * - image: string - Logo/icon URL
 * - note: string - Help text (supports **markdown** for bold)
 * - help_link: object - { text, url, label }
 * - type: string - Script type (default: 'js')
 * - sub_type: string - Script subtype (default: 'inline')
 * - position: string - Script position (default: 'head')
 * - pages: array - Pages to include (default: ['all'])
 * - excludePages: array - Pages to exclude (default: [])
 * - attributes: object - Script tag attributes
 * - compatible_engines: array - Compatible templating engines
 * - field_mappings: object - Internal field name mappings
 * - layout: object - Form layout configuration
 * - saveButtonDisabled: function - Disable save based on form state
 * - category: string - Template category for grouping
 * 
 * For field configuration, see createTemplate.js
 */

// Import all templates
const abTastyTemplate = require('./templates/abTasty');
const adobeAnalyticsTemplate = require('./templates/adobeAnalytics');
const adobeLaunchTemplate = require('./templates/adobeLaunch');
const adobeTargetTemplate = require('./templates/adobeTarget');
const amplitudeTemplate = require('./templates/amplitude');
const clevertapTemplate = require('./templates/clevertap');
const crazyeggTemplate = require('./templates/crazyegg');
const fullstoryTemplate = require('./templates/fullstory');
const ga4Template = require('./templates/ga4');
const gtmTemplate = require('./templates/gtm');
const heapTemplate = require('./templates/heap');
const hotjarTemplate = require('./templates/hotjar');
const intercomTemplate = require('./templates/intercom');
const logrocketTemplate = require('./templates/logrocket');
const mixpanelTemplate = require('./templates/mixpanel');
const moengageTemplate = require('./templates/moengage');
const mouseflowTemplate = require('./templates/mouseflow');
const mparticleTemplate = require('./templates/mparticle');
const notifyvisitorsTemplate = require('./templates/notifyvisitors');
const optimizelyTemplate = require('./templates/optimizely');
const posthogTemplate = require('./templates/posthog');
const metaPixelTemplate = require('./templates/metaPixel');
const pushengageTemplate = require('./templates/pushengage');
const qualarooTemplate = require('./templates/qualaroo');
const quantcastTemplate = require('./templates/quantcast');
const segmentTemplate = require('./templates/segment');
const sentryTemplate = require('./templates/sentry');
const serviceWorkerTemplate = require('./templates/serviceWorker');
const survicateTemplate = require('./templates/survicate');
const totangoTemplate = require('./templates/totango');
const trackjsTemplate = require('./templates/trackjs');
const typeformTemplate = require('./templates/typeform');
const usabillaTemplate = require('./templates/usabilla');
const webengageTemplate = require('./templates/webengage');

const templates = {
  items: [
    // Analytics
    { template_name: 'gtm', ...gtmTemplate },
    { template_name: 'ga4', ...ga4Template },
    // { template_name: 'amplitude', ...amplitudeTemplate },
    // { template_name: 'adobeAnalytics', ...adobeAnalyticsTemplate },
    // { template_name: 'mixpanel', ...mixpanelTemplate },
    // { template_name: 'heap', ...heapTemplate },
    // { template_name: 'adobeLaunch', ...adobeLaunchTemplate },
    // { template_name: 'segment', ...segmentTemplate },
    // { template_name: 'mparticle', ...mparticleTemplate },
    // { template_name: 'quantcast', ...quantcastTemplate },
    // { template_name: 'posthog', ...posthogTemplate },
    { template_name: 'metaPixel', ...metaPixelTemplate },
    
    // Session Recording & Heatmaps
    // { template_name: 'hotjar', ...hotjarTemplate },
    // { template_name: 'crazyegg', ...crazyeggTemplate },
    // { template_name: 'fullstory', ...fullstoryTemplate },
    // { template_name: 'mouseflow', ...mouseflowTemplate },
    // { template_name: 'logrocket', ...logrocketTemplate },
    
    // A/B Testing & Personalization
    // { template_name: 'optimizely', ...optimizelyTemplate },
    // { template_name: 'adobeTarget', ...adobeTargetTemplate },
    // { template_name: 'abTasty', ...abTastyTemplate },
    
    // Customer Engagement
    // { template_name: 'clevertap', ...clevertapTemplate },
    // { template_name: 'moengage', ...moengageTemplate },
    // { template_name: 'webengage', ...webengageTemplate },
    // { template_name: 'pushengage', ...pushengageTemplate },
    // { template_name: 'notifyvisitors', ...notifyvisitorsTemplate },
    // { template_name: 'intercom', ...intercomTemplate },
    
    // Surveys & Feedback
    // { template_name: 'qualaroo', ...qualarooTemplate },
    // { template_name: 'survicate', ...survicateTemplate },
    // { template_name: 'typeform', ...typeformTemplate },
    // { template_name: 'usabilla', ...usabillaTemplate },
    
    // Customer Success
    // { template_name: 'totango', ...totangoTemplate },
    
    // Error Tracking
    { template_name: 'sentry', ...sentryTemplate },
    // { template_name: 'trackjs', ...trackjsTemplate }
    
    // Service Workers
    { template_name: 'serviceWorker', ...serviceWorkerTemplate }
  ]
};

module.exports = templates; 
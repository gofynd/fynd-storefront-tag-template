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
 * - img: string - Logo/icon URL
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
const pushengageTemplate = require('./templates/pushengage');
const qualarooTemplate = require('./templates/qualaroo');
const quantcastTemplate = require('./templates/quantcast');
const segmentTemplate = require('./templates/segment');
const sentryTemplate = require('./templates/sentry');
const survicateTemplate = require('./templates/survicate');
const totangoTemplate = require('./templates/totango');
const trackjsTemplate = require('./templates/trackjs');
const typeformTemplate = require('./templates/typeform');
const usabillaTemplate = require('./templates/usabilla');
const webengageTemplate = require('./templates/webengage');

const templates = {
  // Analytics
  gtm: gtmTemplate,
  ga4: ga4Template,
  amplitude: amplitudeTemplate,
  adobeAnalytics: adobeAnalyticsTemplate,
  mixpanel: mixpanelTemplate,
  heap: heapTemplate,
  adobeLaunch: adobeLaunchTemplate,
  segment: segmentTemplate,
  mparticle: mparticleTemplate,
  quantcast: quantcastTemplate,
  
  // Session Recording & Heatmaps
  hotjar: hotjarTemplate,
  crazyegg: crazyeggTemplate,
  fullstory: fullstoryTemplate,
  mouseflow: mouseflowTemplate,
  logrocket: logrocketTemplate,
  
  // A/B Testing & Personalization
  optimizely: optimizelyTemplate,
  adobeTarget: adobeTargetTemplate,
  abTasty: abTastyTemplate,
  
  // Customer Engagement
  clevertap: clevertapTemplate,
  moengage: moengageTemplate,
  webengage: webengageTemplate,
  pushengage: pushengageTemplate,
  notifyvisitors: notifyvisitorsTemplate,
  intercom: intercomTemplate,
  
  // Surveys & Feedback
  qualaroo: qualarooTemplate,
  survicate: survicateTemplate,
  typeform: typeformTemplate,
  usabilla: usabillaTemplate,
  
  // Customer Success
  totango: totangoTemplate,
  
  // Error Tracking
  sentry: sentryTemplate,
  trackjs: trackjsTemplate
};

module.exports = templates; 
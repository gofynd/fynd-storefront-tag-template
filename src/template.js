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
 * - pages: array - Pages to include (default: [])
 * - attributes: object - HTML attributes (default: { async: "true" })
 * - compatible_engines: array - Supported engines (default: ['react', 'vue2'])
 * - field_mappings: object - Map form fields to API fields
 * - layout: object - Grid layout configuration
 * - saveButtonDisabled: function - Custom function to control save button state
 *   Receives: (formData, errors, component) Returns: boolean
 *   Default: false (button is enabled)
 * 
 * FIELD CONFIGURATION:
 * Each field in the fields array can have:
 * 
 * REQUIRED:
 * - name: string - Field identifier
 * - type: string - Field type (text, array, select, multiselect, checkbox, textarea, number)
 * - label: string - Display label
 * 
 * OPTIONAL:
 * - size: string - Grid size (full, large, medium, small)
 * - required: boolean - Is field required?
 * - default: any - Default value
 * - placeholder: string - Placeholder text
 * - description: string - Field description
 * - help_link: object - { text, url }
 * - validation: object - { pattern: RegExp, message: string }
 * - options: array - For select/multiselect type: [{ label, value }]
 * - searchable: boolean - For select/multiselect, enables search (default: false)
 * - useTooltip: boolean - Shows description as tooltip vs text (default: true, except for array fields)
 * - tooltipPosition: string - Position of tooltip: 'top', 'bottom', 'left', 'right' (default: 'top')
 * - input_config: object - For array type configuration
 *   - type: string - Input type (default: 'text')
 *   - placeholder: string - Input placeholder
 *   - button_text: string - Button label
 *   - input_size: string - Input size class
 *   - button_size: string - Button size class
 *   - validation: object - Input validation rules
 *   - events: object - Custom event handlers { click, input, blur, remove }
 *     - click: Called when Add button is clicked
 *     - remove: Called when chip delete icon is clicked
 * - events: object - Custom event handlers { input, change, click, blur, focus }
 *   Each handler receives: (value, field, formData, component)
 * - condition: function - Conditional visibility based on formData
 *   Returns boolean to show/hide field
 * 
 * LAYOUT CONFIGURATION:
 * - columns: number - Number of grid columns (1-12)
 * - gap: string - Gap between fields (e.g., '20px')
 * - responsive: boolean - Enable responsive behavior
 */

// Import createTemplate helper
const createTemplate = require('./utils/createTemplate');

// Import individual templates
const gtmTemplate = require('./templates/gtm');
const sentryTemplate = require('./templates/sentry');
const ga4Template = require('./templates/ga4');
const amplitudeTemplate = require('./templates/amplitude');
const adobeAnalyticsTemplate = require('./templates/adobeAnalytics');
const mixpanelTemplate = require('./templates/mixpanel');
const heapTemplate = require('./templates/heap');
const adobeLaunchTemplate = require('./templates/adobeLaunch');
const segmentTemplate = require('./templates/segment');
const mparticleTemplate = require('./templates/mparticle');
const hotjarTemplate = require('./templates/hotjar');
const crazyeggTemplate = require('./templates/crazyegg');
const fullstoryTemplate = require('./templates/fullstory');
const mouseflowTemplate = require('./templates/mouseflow');
const clevertapTemplate = require('./templates/clevertap');
const moengageTemplate = require('./templates/moengage');
const webengageTemplate = require('./templates/webengage');
const pushengageTemplate = require('./templates/pushengage');

// Available Templates:
// - gtm: Google Tag Manager
// - sentry: Sentry Error Tracking
// - ga4: Google Analytics 4
// - amplitude: Amplitude Product Analytics
// - adobeAnalytics: Adobe Analytics
// - mixpanel: Mixpanel Product Analytics
// - heap: Heap Analytics
// - adobeLaunch: Adobe Launch (Experience Platform Tags)
// - segment: Segment Customer Data Platform
// - mparticle: mParticle Customer Data Platform
// - hotjar: Hotjar Behavior Analytics
// - crazyegg: Crazy Egg Visual Analytics
// - fullstory: FullStory Digital Experience Intelligence
// - mouseflow: Mouseflow Website Analytics
// - clevertap: CleverTap Customer Engagement Platform
// - moengage: MoEngage Customer Engagement Platform
// - webengage: WebEngage Retention Platform
// - pushengage: PushEngage Web Push Notifications
const templates = {
  // Import all refactored templates
  gtm: gtmTemplate,
  sentry: sentryTemplate,
  ga4: ga4Template,
  amplitude: amplitudeTemplate,
  adobeAnalytics: adobeAnalyticsTemplate,
  mixpanel: mixpanelTemplate,
  heap: heapTemplate,
  adobeLaunch: adobeLaunchTemplate,
  segment: segmentTemplate,
  mparticle: mparticleTemplate,
  hotjar: hotjarTemplate,
  crazyegg: crazyeggTemplate,
  fullstory: fullstoryTemplate,
  mouseflow: mouseflowTemplate,
  clevertap: clevertapTemplate,
  moengage: moengageTemplate,
  webengage: webengageTemplate,
  pushengage: pushengageTemplate
};

// Working example to demonstrate array field with chips
const ARRAY_FIELD_EXAMPLE = {
  name: 'arrayField',
  type: 'array',
  label: 'Example URLs',
  description: 'Add URLs to the list',
  default: ['https://example.com'],
  size: 'full',
  input_config: {
    type: 'text',
    placeholder: 'Enter URL',
    button_text: 'Add URL',
    input_size: 'large',
    button_size: 'small',
    validation: {
      pattern: /^https?:\/\/.+/,
      message: 'Must be a valid URL'
    },
    events: {
      // The click event is called BEFORE the item is added
      // The actual addition is handled by addArrayItem
      click: function(value, field, formData, component) {
        console.log('Before adding:', value);
        console.log('Current items:', formData[field.name]);
      },
      // The remove event is called BEFORE the item is removed
      // The actual removal is handled by removeArrayItem
      remove: function(value, index, field, formData, component) {
        console.log('Before removing:', value, 'at index', index);
        console.log('Current items:', formData[field.name]);
      }
    }
  }
};

// Template creator guide
const HOW_TO_CREATE_TEMPLATE = `
// To create a new template, use the createTemplate helper:

myTemplate: createTemplate({
  // REQUIRED - These must be provided
  name: 'My Template Name',
  path: 'my-template-path',
  description: 'What this template does',
  template_id: '1234',
  template_version: '1.0.0',
  fields: [
    {
      name: 'fieldName',
      type: 'text',
      label: 'Field Label'
    }
  ],
  script: 'console.log("{{fieldName}}");',
  
  // OPTIONAL - These have defaults
  img: 'https://example.com/logo.png',
  note: 'Help text for users',
  field_mappings: { fieldName: 'field_name' },
  layout: { columns: 2, gap: '20px' }
   })
 `;

module.exports = templates;
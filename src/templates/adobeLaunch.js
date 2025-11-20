/**
 * Adobe Launch Template
 */

const createTemplate = require('../utils/createTemplate');

const adobeLaunchTemplate = createTemplate({
  // Required keys
  name: 'Adobe Launch',
  path: 'adobe-launch',
  description: 'Adobe Experience Platform tag management system.',
  template_id: '1008',
  template_version: '1.0.0',
  category: 'analytics',
  type: 'js',
  sub_type: 'inline',
  position: 'head',
  attributes: {
    async: 'true'
  },
  compatible_engines: ['react', 'vue2'],
  image: 'https://logo.clearbit.com/adobe.com',
  note: '**Adobe Launch** (now Adobe Experience Platform Tags) is Adobe\'s next-generation tag management system. Get your embed code from the Environments tab in your Launch property.',
  help_link: {
    text: 'Learn more about Adobe Launch implementation in the',
    url: 'https://experienceleague.adobe.com/docs/experience-platform/tags/get-started/quick-start.html',
    label: 'Quick Start Guide'
  },
  field_mappings: {
    embedCode: 'embed_code',
    environment: 'environment',
    asyncLoad: 'async_load',
    enableDebug: 'enable_debug',
    enableActivityMap: 'enable_activity_map',
    loadTarget: 'load_target',
    loadRules: 'load_rules_immediately',
    suppressPageView: 'suppress_page_view',
    customDataLayer: 'custom_data_layer',
    pageBottom: 'page_bottom',
    timeout: 'timeout'
  },
  layout: {
    columns: 2,
    gap: '24px'
  },
  fields: [
    {
      name: 'embedCode',
      type: 'text',
      label: 'Embed Code URL',
      placeholder: 'https://assets.adobedtm.com/xxxxx/xxxxx/launch-xxxxx.min.js',
      required: true,
      size: 'full',
      description: 'The Launch library URL from your environment. Find in Environments tab.',
      validation: {
        pattern: /^https:\/\/assets\.adobedtm\.com\/[a-zA-Z0-9\/_-]+\/(launch-[a-zA-Z0-9_-]+)(\.min)?\.js$/,
        message: 'Must be a valid Adobe Launch embed URL'
      }
    },
    {
      name: 'environment',
      type: 'select',
      label: 'Environment',
      required: true,
      size: 'medium',
      description: 'Select the appropriate environment for this tag.',
      options: [
        { label: 'Development', value: 'development' },
        { label: 'Staging', value: 'staging' },
        { label: 'Production', value: 'production' }
      ],
      default: 'production'
    },
    {
      name: 'asyncLoad',
      type: 'checkbox',
      label: 'Async Loading',
      default: true,
      size: 'medium',
      description: 'Load the Launch library asynchronously (recommended).'
    },
    {
      name: 'enableDebug',
      type: 'checkbox',
      label: 'Enable Debug Mode',
      default: false,
      size: 'medium',
      description: 'Enable Launch debugging and console logging.',
      condition: function(formData) {
        return formData.environment === 'development';
      }
    },
    {
      name: 'enableActivityMap',
      type: 'checkbox',
      label: 'Enable Activity Map',
      default: true,
      size: 'medium',
      description: 'Enable Adobe Analytics Activity Map for link tracking.'
    },
    {
      name: 'loadTarget',
      type: 'checkbox',
      label: 'Load Adobe Target',
      default: false,
      size: 'medium',
      description: 'Pre-load Adobe Target for A/B testing and personalization.'
    },
    {
      name: 'loadRules',
      type: 'checkbox',
      label: 'Load Rules on Library Load',
      default: true,
      size: 'medium',
      description: 'Execute page load rules immediately when library loads.'
    },
    {
      name: 'suppressPageView',
      type: 'checkbox',
      label: 'Suppress Initial Page View',
      default: false,
      size: 'medium',
      description: 'Prevent automatic page view tracking on load.'
    },
    {
      name: 'customDataLayer',
      type: 'text',
      label: 'Custom Data Layer Name',
      placeholder: 'dataLayer',
      required: false,
      size: 'medium',
      description: 'Custom data layer object name (default: _satellite).',
      validation: {
        pattern: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
        message: 'Must be a valid JavaScript variable name'
      }
    },
    {
      name: 'pageBottom',
      type: 'checkbox',
      label: 'Include Page Bottom Call',
      default: true,
      size: 'medium',
      description: 'Add _satellite.pageBottom() call for sequential loading.'
    },
    {
      name: 'timeout',
      type: 'number',
      label: 'Script Timeout (ms)',
      placeholder: '3000',
      required: false,
      size: 'small',
      description: 'Timeout for script loading in milliseconds.',
      validation: {
        min: 100,
        max: 10000,
        message: 'Must be between 100 and 10000 ms'
      },
      default: 3000,
      condition: function(formData) {
        return formData.asyncLoad;
      }
    }
  ],
  script: `(function() {
    // Adobe Launch configuration
    var config = window._satellite = window._satellite || {};
    
    // Set debug mode if enabled
    if ({{enableDebug}}) {
      localStorage.setItem('sdsat_debug', true);
      config.debug = true;
    }
    
    // Configure settings
    config.settings = config.settings || {};
    
    // Set custom data layer if specified
    var customDataLayer = '{{customDataLayer}}';
    if (customDataLayer) {
      window[customDataLayer] = window[customDataLayer] || [];
      config.settings.dataLayer = customDataLayer;
    }
    
    // Activity Map settings
    if (!{{enableActivityMap}}) {
      config.settings.ActivityMap = {
        enabled: false
      };
    }
    
    // Adobe Target settings
    if ({{loadTarget}}) {
      config.settings.Target = {
        enabled: true,
        loadSync: true
      };
    }
    
    // Suppress initial page view if requested
    if ({{suppressPageView}}) {
      config.settings.suppressInitialPageView = true;
    }
    
    // Set environment
    config.environment = '{{environment}}';
    
    // Load Adobe Launch library
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = {{asyncLoad}};
    script.src = '{{embedCode}}';
    
    // Set timeout for script loading
    var timeout = {{timeout}} || 3000;
    var timeoutId = setTimeout(function() {
      console.error('[Adobe Launch] Failed to load script within ' + timeout + 'ms');
    }, timeout);
    
    script.onload = function() {
      clearTimeout(timeoutId);
      console.log('[Adobe Launch] Script loaded successfully');
      
      // Initialize _satellite if available
      if (window._satellite && typeof window._satellite.track === 'function') {
        // Set up initial tracking
        if (!{{suppressPageView}}) {
          try {
            _satellite.track('page-view');
          } catch (e) {
            console.error('[Adobe Launch] Error tracking page view:', e);
          }
        }
        
        // Load rules immediately if configured
        if ({{loadRules}} && typeof _satellite.pageLoadRules === 'function') {
          try {
            _satellite.pageLoadRules();
          } catch (e) {
            console.error('[Adobe Launch] Error loading page rules:', e);
          }
        }
      }
    };
    
    script.onerror = function() {
      clearTimeout(timeoutId);
      console.error('[Adobe Launch] Failed to load script from: ' + script.src);
    };
    
    // Append script to head
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    
    // Add pageBottom function if enabled
    if ({{pageBottom}}) {
      // Wait for DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          if (window._satellite && typeof window._satellite.pageBottom === 'function') {
            try {
              window._satellite.pageBottom();
            } catch (e) {
              console.error('[Adobe Launch] Error calling pageBottom:', e);
            }
          }
        });
      } else {
        // DOM already loaded
        if (window._satellite && typeof window._satellite.pageBottom === 'function') {
          try {
            window._satellite.pageBottom();
          } catch (e) {
            console.error('[Adobe Launch] Error calling pageBottom:', e);
          }
        }
      }
    }
  })();`
});

module.exports = adobeLaunchTemplate; 
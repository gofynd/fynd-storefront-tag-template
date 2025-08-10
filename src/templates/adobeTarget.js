/**
 * Adobe Target Template
 */

const createTemplate = require('../utils/createTemplate');

const adobeTargetTemplate = createTemplate({
    // Required keys
    name: 'Adobe Target',
    path: 'adobe-target',
    description: 'A/B testing, personalization, and AI-powered optimization platform from Adobe.',
    template_id: '1021',
    template_version: '1.0.0',
    category: 'testing',
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/adobe.com',
    note: '**Adobe Target** provides A/B testing, multivariate testing, and AI-powered personalization. Find your Client Code in Administration → Implementation.',
    help_link: {
      text: 'Learn more about Adobe Target implementation in the',
      url: 'https://experienceleague.adobe.com/docs/target/using/implement-target/client-side/at-js-implementation/at-js/how-atjs-works.html',
      label: 'Documentation'
    },
    field_mappings: {
      clientCode: 'client_code',
      atjsVersion: 'atjs_version',
      serverDomain: 'server_domain',
      globalMboxName: 'global_mbox_name',
      globalMboxAutoCreate: 'global_mbox_auto_create',
      timeout: 'timeout',
      defaultContentHiddenStyle: 'default_content_hidden_style',
      defaultContentVisibleStyle: 'default_content_visible_style',
      bodyHidingEnabled: 'body_hiding_enabled',
      bodyHiddenStyle: 'body_hidden_style',
      selectorsPollingTimeout: 'selectors_polling_timeout',
      visitorApiTimeout: 'visitor_api_timeout',
      overrideMboxEdgeServer: 'override_mbox_edge_server',
      overrideMboxEdgeServerTimeout: 'override_mbox_edge_server_timeout',
      optoutEnabled: 'optout_enabled',
      optinEnabled: 'optin_enabled',
      secureOnly: 'secure_only',
      cookieDomain: 'cookie_domain',
      crossDomain: 'cross_domain',
      spaEnabled: 'spa_enabled',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      userAttributes: 'user_attributes',
      mboxParameters: 'mbox_parameters',
      customEvents: 'custom_events'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'clientCode',
        type: 'text',
        label: 'Client Code',
        placeholder: 'YOUR_CLIENT_CODE',
        required: true,
        size: 'medium',
        description: 'Your Adobe Target Client Code from Administration → Implementation.',
        validation: {
          pattern: /^[a-zA-Z0-9]{6,20}$/,
          message: 'Must be 6-20 alphanumeric characters'
        }
      },
      {
        name: 'atjsVersion',
        type: 'select',
        label: 'AT.js Version',
        required: true,
        size: 'medium',
        description: 'Version of Adobe Target AT.js library to use.',
        options: [
          { label: 'AT.js 2.x (Recommended)', value: '2.x' },
          { label: 'AT.js 1.x (Legacy)', value: '1.x' }
        ],
        default: '2.x'
      },
      {
        name: 'serverDomain',
        type: 'text',
        label: 'Server Domain',
        placeholder: 'clientcode.tt.omtrdc.net',
        required: false,
        size: 'full',
        description: 'Custom Target server domain (default: clientcode.tt.omtrdc.net).',
        validation: {
          pattern: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Must be a valid domain'
        }
      },
      {
        name: 'globalMboxName',
        type: 'text',
        label: 'Global Mbox Name',
        placeholder: 'target-global-mbox',
        required: false,
        size: 'medium',
        description: 'Name of the global mbox (default: target-global-mbox).',
        validation: {
          pattern: /^[a-zA-Z0-9-_]+$/,
          message: 'Must be alphanumeric with hyphens or underscores'
        }
      },
      {
        name: 'globalMboxAutoCreate',
        type: 'checkbox',
        label: 'Auto-create Global Mbox',
        default: true,
        size: 'medium',
        description: 'Automatically create the global mbox on page load.'
      },
      {
        name: 'timeout',
        type: 'number',
        label: 'Request Timeout (ms)',
        placeholder: '3000',
        required: false,
        size: 'small',
        description: 'Timeout for Target requests in milliseconds.',
        validation: {
          min: 1000,
          max: 15000,
          message: 'Must be between 1000 and 15000 ms'
        },
        default: 3000
      },
      {
        name: 'bodyHidingEnabled',
        type: 'checkbox',
        label: 'Enable Body Hiding',
        default: true,
        size: 'medium',
        description: 'Hide page body during initial load to prevent flicker.',
        condition: (formData) => formData.atjsVersion === '2.x'
      },
      {
        name: 'bodyHiddenStyle',
        type: 'text',
        label: 'Body Hidden Style',
        placeholder: 'body { opacity: 0 !important }',
        required: false,
        size: 'full',
        description: 'CSS to hide body during Target load.',
        default: 'body { opacity: 0 !important }',
        condition: (formData) => formData.bodyHidingEnabled && formData.atjsVersion === '2.x'
      },
      {
        name: 'selectorsPollingTimeout',
        type: 'number',
        label: 'Selectors Polling Timeout (ms)',
        placeholder: '5000',
        required: false,
        size: 'small',
        description: 'Timeout for polling DOM selectors.',
        validation: {
          min: 1000,
          max: 30000,
          message: 'Must be between 1000 and 30000 ms'
        },
        default: 5000
      },
      {
        name: 'optoutEnabled',
        type: 'checkbox',
        label: 'Enable Opt-out',
        default: false,
        size: 'medium',
        description: 'Allow users to opt out of Target experiences.'
      },
      {
        name: 'optinEnabled',
        type: 'checkbox',
        label: 'Require Opt-in (GDPR)',
        default: false,
        size: 'medium',
        description: 'Require explicit consent before loading Target.'
      },
      {
        name: 'secureOnly',
        type: 'checkbox',
        label: 'Secure Cookies Only',
        default: true,
        size: 'medium',
        description: 'Use secure flag for all Target cookies.'
      },
      {
        name: 'cookieDomain',
        type: 'text',
        label: 'Cookie Domain',
        placeholder: 'auto',
        required: false,
        size: 'medium',
        description: 'Domain for Target cookies (default: auto).',
        validation: {
          pattern: /^(auto|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          message: 'Must be "auto" or a valid domain'
        }
      },
      {
        name: 'crossDomain',
        type: 'text',
        label: 'Cross-Domain Tracking',
        placeholder: 'disabled',
        required: false,
        size: 'medium',
        description: 'Cross-domain tracking setting (disabled, x-only, enabled).',
        validation: {
          pattern: /^(disabled|x-only|enabled)$/,
          message: 'Must be: disabled, x-only, or enabled'
        }
      },
      {
        name: 'spaEnabled',
        type: 'checkbox',
        label: 'Enable SPA Support',
        default: false,
        size: 'medium',
        description: 'Enable Single Page Application support with at.js 2.x.',
        condition: (formData) => formData.atjsVersion === '2.x'
      },
      {
        name: 'debugMode',
        type: 'checkbox',
        label: 'Debug Mode',
        default: false,
        size: 'medium',
        description: 'Enable console logging and debugging tools.'
      },
      {
        name: 'enableInDevelopment',
        type: 'checkbox',
        label: 'Enable in Development',
        default: false,
        size: 'medium',
        description: 'Enable on localhost/development environments.'
      },
      {
        name: 'userAttributes',
        type: 'array',
        label: 'Profile Parameters',
        description: 'User profile parameters for targeting (e.g., user.categoryId=electronics, user.isVip=true).',
        help_link: {
          url: 'https://experienceleague.adobe.com/docs/target/using/audiences/visitor-profiles/profile-parameters.html',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., user.key=value',
          button_text: 'Add Parameter',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^user\.[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: user.key=value'
          }
        }
      },
      {
        name: 'mboxParameters',
        type: 'array',
        label: 'Mbox Parameters',
        description: 'Global mbox parameters (e.g., orderTotal=99.99, productPurchasedId=12345).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., key=value',
          button_text: 'Add Parameter',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: key=value'
          }
        }
      },
      {
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Custom events to track (e.g., purchase, signup, video-complete).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., event-name',
          button_text: 'Add Event',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z0-9-_]+$/,
            message: 'Must be alphanumeric with hyphens or underscores'
          }
        }
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Adobe Target] Skipping load in development environment');
          }
          return;
      }
      
      // Check for opt-in requirement
      if ({{optinEnabled}} && typeof window.hasUserConsent === 'function' && !window.hasUserConsent('targeting')) {
          if ({{debugMode}}) {
              console.log('[Adobe Target] Waiting for user consent');
          }
          return;
      }
      
      // Adobe Target configuration
      window.targetGlobalSettings = window.targetGlobalSettings || {};
      
      // Basic configuration
      window.targetGlobalSettings.clientCode = '{{clientCode}}';
      window.targetGlobalSettings.cookieDomain = '{{cookieDomain}}' || 'auto';
      window.targetGlobalSettings.crossDomain = '{{crossDomain}}' || 'disabled';
      window.targetGlobalSettings.timeout = {{timeout}} || 3000;
      window.targetGlobalSettings.globalMboxAutoCreate = {{globalMboxAutoCreate}};
      window.targetGlobalSettings.secureOnly = {{secureOnly}};
      
      // Custom server domain
      var serverDomain = '{{serverDomain}}';
      if (serverDomain) {
          window.targetGlobalSettings.serverDomain = serverDomain;
      }
      
      // Global mbox name
      var globalMboxName = '{{globalMboxName}}';
      if (globalMboxName) {
          window.targetGlobalSettings.globalMboxName = globalMboxName;
      }
      
      // Body hiding for AT.js 2.x
      if ('{{atjsVersion}}' === '2.x' && {{bodyHidingEnabled}}) {
          window.targetGlobalSettings.bodyHidingEnabled = true;
          window.targetGlobalSettings.bodyHiddenStyle = '{{bodyHiddenStyle}}' || 'body { opacity: 0 !important }';
      }
      
      // Selectors polling timeout
      window.targetGlobalSettings.selectorsPollingTimeout = {{selectorsPollingTimeout}} || 5000;
      
      // Opt-out configuration
      if ({{optoutEnabled}}) {
          window.targetGlobalSettings.optoutEnabled = true;
      }
      
      // Debug mode
      if ({{debugMode}}) {
          window.targetGlobalSettings.enabled = true;
          document.cookie = 'mboxDebug=true; path=/';
          window._AT = window._AT || {};
          window._AT.querySingleMbox = true;
          console.log('[Adobe Target] Debug mode enabled');
      }
      
      // Process user attributes (profile parameters)
      var userAttrsArray = [{{userAttributes}}] || [];
      var profileParams = {};
      userAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2 && parts[0].startsWith('user.')) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value)) value = Number(value);
                  profileParams[key] = value;
              }
          }
      });
      
      // Process mbox parameters
      var mboxParamsArray = [{{mboxParameters}}] || [];
      var mboxParams = {};
      mboxParamsArray.forEach(function(param) {
          if (typeof param === 'string' && param.includes('=')) {
              var parts = param.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value)) value = Number(value);
                  mboxParams[key] = value;
              }
          }
      });
      
      // Merge profile and mbox parameters
      var globalParams = Object.assign({}, mboxParams, profileParams);
      
      if (Object.keys(globalParams).length > 0) {
          window.targetGlobalSettings.globalMboxParams = function() {
              return globalParams;
          };
          if ({{debugMode}}) {
              console.log('[Adobe Target] Global parameters:', globalParams);
          }
      }
      
      // Custom events configuration
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          window.adobeTargetCustomEvents = customEventsArray;
          
          // Helper function to send custom events
          window.trackTargetEvent = function(eventName, mbox, params) {
              if (window.adobeTargetCustomEvents.indexOf(eventName) !== -1 && window.adobe && window.adobe.target) {
                  var eventParams = Object.assign({}, params || {}, {
                      'event': eventName,
                      'eventTimestamp': new Date().getTime()
                  });
                  
                  window.adobe.target.trackEvent({
                      mbox: mbox || 'target-global-mbox',
                      params: eventParams
                  });
                  
                  if ({{debugMode}}) {
                      console.log('[Adobe Target] Tracked event:', eventName, eventParams);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[Adobe Target] Custom events configured:', customEventsArray);
          }
      }
      
      // SPA configuration for AT.js 2.x
      if ('{{atjsVersion}}' === '2.x' && {{spaEnabled}}) {
          window.targetGlobalSettings.viewsEnabled = true;
          
          // Helper for SPA view changes
          window.triggerTargetView = function(viewName, options) {
              if (window.adobe && window.adobe.target) {
                  window.adobe.target.triggerView(viewName, options);
                  if ({{debugMode}}) {
                      console.log('[Adobe Target] Triggered view:', viewName, options);
                  }
              }
          };
      }
      
      if ({{debugMode}}) {
          console.log('[Adobe Target] Initialized with Client Code:', '{{clientCode}}');
          console.log('[Adobe Target] Configuration:', window.targetGlobalSettings);
      }
      
      // Load Adobe Target AT.js
      (function() {
          var atjsVersion = '{{atjsVersion}}';
          var clientCode = '{{clientCode}}';
          
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          
          if (atjsVersion === '2.x') {
              script.src = 'https://assets.adobedtm.com/' + clientCode + '/atjs/launch-atjs-2.js';
          } else {
              script.src = 'https://assets.adobedtm.com/' + clientCode + '/atjs/launch-atjs.js';
          }
          
          script.onload = function() {
              if ({{debugMode}}) {
                  console.log('[Adobe Target] AT.js loaded successfully');
              }
              
              // Fire page load event
              if (window.adobe && window.adobe.target) {
                  window.adobe.target.getOffer({
                      mbox: 'target-global-mbox',
                      success: function(response) {
                          if ({{debugMode}}) {
                              console.log('[Adobe Target] Page load offer received:', response);
                          }
                      },
                      error: function(status, error) {
                          if ({{debugMode}}) {
                              console.error('[Adobe Target] Page load error:', status, error);
                          }
                      }
                  });
              }
          };
          
          var first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
      })();
    })();`
  });

module.exports = adobeTargetTemplate;

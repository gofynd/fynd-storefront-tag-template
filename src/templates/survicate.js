/**
 * Survicate Template
 */

const createTemplate = require('../utils/createTemplate');

const survicateTemplate = createTemplate({
    // Required keys
    name: 'Survicate',
    path: 'survicate',
    description: 'Feedback automation platform for website surveys, email surveys, and in-product feedback.',
    template_id: '1024',
    template_version: '1.0.0',
    category: 'feedback',
    type: 'js',
    sub_type: 'inline',
    position: 'body-bottom',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    image: 'https://logo.clearbit.com/survicate.com',
    note: '**Survicate** provides website surveys, email surveys, in-app surveys, and NPS tracking. Find your Workspace Key in Settings → Setup & Targeting → Install Survicate.',
    help_link: {
      text: 'Learn more about Survicate implementation in the',
      url: 'https://help.survicate.com/en/articles/4415246-install-survicate-tracking-code-on-your-website',
      label: 'Documentation'
    },
    field_mappings: {
      workspaceKey: 'workspace_key',
      disableTargeting: 'disable_targeting',
      cookieDomain: 'cookie_domain',
      cookieSecure: 'cookie_secure',
      sessionSampling: 'session_sampling',
      visitorSampling: 'visitor_sampling',
      retargetingInterval: 'retargeting_interval',
      showOnMobile: 'show_on_mobile',
      showOnDesktop: 'show_on_desktop',
      hideOnSmallScreens: 'hide_on_small_screens',
      minScreenWidth: 'min_screen_width',
      enableRecurringVisits: 'enable_recurring_visits',
      enableExitIntent: 'enable_exit_intent',
      enableScrollTrigger: 'enable_scroll_trigger',
      privacyMode: 'privacy_mode',
      disableCookies: 'disable_cookies',
      enableGDPR: 'enable_gdpr',
      consentRequired: 'consent_required',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      userTraits: 'user_traits',
      customAttributes: 'custom_attributes',
      pageAttributes: 'page_attributes',
      excludeUrls: 'exclude_urls',
      customEvents: 'custom_events',
      integrations: 'integrations'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'workspaceKey',
        type: 'text',
        label: 'Workspace Key',
        placeholder: 'YOUR_WORKSPACE_KEY',
        required: true,
        size: 'medium',
        description: 'Your Survicate Workspace Key from Settings → Setup & Targeting.',
        validation: {
          pattern: /^[a-fA-F0-9]{32}$/,
          message: 'Must be a 32-character hexadecimal key'
        }
      },
      {
        name: 'disableTargeting',
        type: 'checkbox',
        label: 'Disable Auto-Targeting',
        default: false,
        size: 'medium',
        description: 'Disable automatic survey targeting (manual triggers only).'
      },
      {
        name: 'showOnMobile',
        type: 'checkbox',
        label: 'Show on Mobile',
        default: true,
        size: 'medium',
        description: 'Display surveys on mobile devices.'
      },
      {
        name: 'showOnDesktop',
        type: 'checkbox',
        label: 'Show on Desktop',
        default: true,
        size: 'medium',
        description: 'Display surveys on desktop devices.'
      },
      {
        name: 'hideOnSmallScreens',
        type: 'checkbox',
        label: 'Hide on Small Screens',
        default: false,
        size: 'medium',
        description: 'Hide surveys on screens smaller than minimum width.'
      },
      {
        name: 'minScreenWidth',
        type: 'number',
        label: 'Minimum Screen Width (px)',
        placeholder: '320',
        required: false,
        size: 'small',
        description: 'Minimum screen width to show surveys.',
        validation: {
          min: 320,
          max: 1920,
          message: 'Must be between 320 and 1920 pixels'
        },
        default: 320,
        condition: (formData) => formData.hideOnSmallScreens
      },
      {
        name: 'sessionSampling',
        type: 'number',
        label: 'Session Sampling (%)',
        placeholder: '100',
        required: false,
        size: 'small',
        description: 'Percentage of sessions to include in targeting.',
        validation: {
          min: 1,
          max: 100,
          message: 'Must be between 1 and 100'
        },
        default: 100
      },
      {
        name: 'visitorSampling',
        type: 'number',
        label: 'Visitor Sampling (%)',
        placeholder: '100',
        required: false,
        size: 'small',
        description: 'Percentage of unique visitors to target.',
        validation: {
          min: 1,
          max: 100,
          message: 'Must be between 1 and 100'
        },
        default: 100
      },
      {
        name: 'retargetingInterval',
        type: 'number',
        label: 'Retargeting Interval (days)',
        placeholder: '30',
        required: false,
        size: 'small',
        description: 'Days before showing surveys to returning visitors.',
        validation: {
          min: 0,
          max: 365,
          message: 'Must be between 0 and 365 days'
        },
        default: 30
      },
      {
        name: 'enableRecurringVisits',
        type: 'checkbox',
        label: 'Track Recurring Visits',
        default: true,
        size: 'medium',
        description: 'Track and target returning visitors.'
      },
      {
        name: 'enableExitIntent',
        type: 'checkbox',
        label: 'Enable Exit Intent',
        default: false,
        size: 'medium',
        description: 'Show surveys when users are about to leave.'
      },
      {
        name: 'enableScrollTrigger',
        type: 'checkbox',
        label: 'Enable Scroll Triggers',
        default: true,
        size: 'medium',
        description: 'Allow surveys to be triggered by scroll depth.'
      },
      {
        name: 'privacyMode',
        type: 'checkbox',
        label: 'Privacy Mode',
        default: false,
        size: 'medium',
        description: 'Enable enhanced privacy (no PII collection).'
      },
      {
        name: 'disableCookies',
        type: 'checkbox',
        label: 'Disable Cookies',
        default: false,
        size: 'medium',
        description: 'Disable all Survicate cookies (session-only mode).'
      },
      {
        name: 'enableGDPR',
        type: 'checkbox',
        label: 'Enable GDPR Mode',
        default: false,
        size: 'medium',
        description: 'Enable GDPR compliance features.'
      },
      {
        name: 'consentRequired',
        type: 'checkbox',
        label: 'Require Consent',
        default: false,
        size: 'medium',
        description: 'Require explicit consent before showing surveys.'
      },
      {
        name: 'cookieDomain',
        type: 'text',
        label: 'Cookie Domain',
        placeholder: 'auto',
        required: false,
        size: 'medium',
        description: 'Domain for Survicate cookies (default: auto).',
        validation: {
          pattern: /^(auto|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          message: 'Must be "auto" or a valid domain'
        }
      },
      {
        name: 'cookieSecure',
        type: 'checkbox',
        label: 'Secure Cookies',
        default: true,
        size: 'small',
        description: 'Use secure flag for cookies.'
      },
      {
        name: 'debugMode',
        type: 'checkbox',
        label: 'Debug Mode',
        default: false,
        size: 'medium',
        description: 'Enable console logging and debug info.'
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
        name: 'userTraits',
        type: 'array',
        label: 'User Traits',
        description: 'User traits for targeting (e.g., email=user@example.com, plan=premium, role=admin).',
        help_link: {
          url: 'https://help.survicate.com/en/articles/4492026-identify-respondents-using-visitor-traits',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., trait=value',
          button_text: 'Add Trait',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: trait=value'
          }
        }
      },
      {
        name: 'customAttributes',
        type: 'array',
        label: 'Custom Attributes',
        description: 'Custom attributes for advanced targeting (e.g., cart_value=99.99, last_purchase=2023-12-01).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., attribute=value',
          button_text: 'Add Attribute',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: attribute=value'
          }
        }
      },
      {
        name: 'pageAttributes',
        type: 'array',
        label: 'Page Attributes',
        description: 'Page-specific attributes (e.g., category=electronics, type=product, section=reviews).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., attribute=value',
          button_text: 'Add Attribute',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: attribute=value'
          }
        }
      },
      {
        name: 'excludeUrls',
        type: 'array',
        label: 'Exclude URL Patterns',
        description: 'URL patterns where surveys should not appear (e.g., /admin/*, /api/*, /checkout/*).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., /admin/*',
          button_text: 'Add Pattern',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[/a-zA-Z0-9*?.-]+$/,
            message: 'Must be a valid URL pattern'
          }
        }
      },
      {
        name: 'customEvents',
        type: 'array',
        label: 'Custom Events',
        description: 'Events to track and trigger surveys (e.g., purchase_completed, form_submitted, video_watched).',
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
      },
      {
        name: 'integrations',
        type: 'select',
        label: 'Analytics Integration',
        required: false,
        size: 'full',
        description: 'Send survey events to analytics platform.',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Google Analytics', value: 'ga' },
          { label: 'Google Analytics 4', value: 'ga4' },
          { label: 'Google Tag Manager', value: 'gtm' },
          { label: 'Segment', value: 'segment' },
          { label: 'Mixpanel', value: 'mixpanel' },
          { label: 'Amplitude', value: 'amplitude' },
          { label: 'Heap', value: 'heap' }
        ],
        default: 'none'
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Survicate] Skipping load in development environment');
          }
          return;
      }
      
      // Check for consent if required
      if ({{consentRequired}} && typeof window.hasUserConsent === 'function' && !window.hasUserConsent('feedback')) {
          if ({{debugMode}}) {
              console.log('[Survicate] Waiting for user consent');
          }
          return;
      }
      
      // Check device type
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile && !{{showOnMobile}}) {
          if ({{debugMode}}) {
              console.log('[Survicate] Disabled on mobile devices');
          }
          return;
      }
      if (!isMobile && !{{showOnDesktop}}) {
          if ({{debugMode}}) {
              console.log('[Survicate] Disabled on desktop devices');
          }
          return;
      }
      
      // Check screen width
      if ({{hideOnSmallScreens}} && window.innerWidth < {{minScreenWidth}}) {
          if ({{debugMode}}) {
              console.log('[Survicate] Screen width too small:', window.innerWidth);
          }
          return;
      }
      
      // Check excluded URLs
      var excludeUrlsArray = [{{excludeUrls}}] || [];
      var currentPath = window.location.pathname;
      for (var i = 0; i < excludeUrlsArray.length; i++) {
          var pattern = excludeUrlsArray[i];
          if (pattern) {
              var regex = new RegExp(pattern.replace(/\*/g, '.*'));
              if (regex.test(currentPath)) {
                  if ({{debugMode}}) {
                      console.log('[Survicate] URL excluded by pattern:', pattern);
                  }
                  return;
              }
          }
      }
      
      // Check sampling rates
      var sessionSampling = {{sessionSampling}} || 100;
      var visitorSampling = {{visitorSampling}} || 100;
      
      // Session sampling
      if (sessionSampling < 100) {
          var sessionRandom = Math.random() * 100;
          if (sessionRandom > sessionSampling) {
              if ({{debugMode}}) {
                  console.log('[Survicate] Session excluded by sampling rate');
              }
              return;
          }
      }
      
      // Visitor sampling (using localStorage for persistence)
      if (visitorSampling < 100 && typeof(Storage) !== 'undefined') {
          var visitorSample = localStorage.getItem('survicate_visitor_sample');
          if (!visitorSample) {
              var visitorRandom = Math.random() * 100;
              localStorage.setItem('survicate_visitor_sample', visitorRandom);
              visitorSample = visitorRandom;
          }
          if (parseFloat(visitorSample) > visitorSampling) {
              if ({{debugMode}}) {
                  console.log('[Survicate] Visitor excluded by sampling rate');
              }
              return;
          }
      }
      
      // Initialize Survicate configuration
      window._sva = window._sva || [];
      
      // Set workspace key
      window._sva.push(['setWorkspaceKey', '{{workspaceKey}}']);
      
      // Configure settings
      if ({{disableTargeting}}) {
          window._sva.push(['disableTargeting']);
      }
      
      if ({{enableRecurringVisits}}) {
          window._sva.push(['enableRecurringVisits']);
      }
      
      if ({{retargetingInterval}} > 0) {
          window._sva.push(['setRetargetingInterval', {{retargetingInterval}}]);
      }
      
      // Privacy settings
      if ({{privacyMode}}) {
          window._sva.push(['enablePrivacyMode']);
      }
      
      if ({{disableCookies}}) {
          window._sva.push(['disableCookies']);
      }
      
      if ({{enableGDPR}}) {
          window._sva.push(['enableGDPRMode']);
      }
      
      // Cookie settings
      if ('{{cookieDomain}}' && '{{cookieDomain}}' !== 'auto') {
          window._sva.push(['setCookieDomain', '{{cookieDomain}}']);
      }
      
      if ({{cookieSecure}}) {
          window._sva.push(['setCookieSecure', true]);
      }
      
      // Exit intent
      if ({{enableExitIntent}}) {
          window._sva.push(['enableExitIntent']);
      }
      
      // Scroll triggers
      if (!{{enableScrollTrigger}}) {
          window._sva.push(['disableScrollTriggers']);
      }
      
      // Process user traits
      var userTraitsArray = [{{userTraits}}] || [];
      var traits = {};
      userTraitsArray.forEach(function(trait) {
          if (typeof trait === 'string' && trait.includes('=')) {
              var parts = trait.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value) && value !== '') value = Number(value);
                  traits[key] = value;
              }
          }
      });
      
      if (Object.keys(traits).length > 0) {
          window._sva.push(['setVisitorTraits', traits]);
          if ({{debugMode}}) {
              console.log('[Survicate] User traits set:', traits);
          }
      }
      
      // Process custom attributes
      var customAttrsArray = [{{customAttributes}}] || [];
      customAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  // Convert to appropriate type
                  if (value === 'true') value = true;
                  else if (value === 'false') value = false;
                  else if (!isNaN(value) && value !== '') value = Number(value);
                  window._sva.push(['setAttribute', key, value]);
              }
          }
      });
      
      // Process page attributes
      var pageAttrsArray = [{{pageAttributes}}] || [];
      var pageAttrs = {};
      pageAttrsArray.forEach(function(attr) {
          if (typeof attr === 'string' && attr.includes('=')) {
              var parts = attr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  pageAttrs[key] = value;
              }
          }
      });
      
      if (Object.keys(pageAttrs).length > 0) {
          window._sva.push(['setPageAttributes', pageAttrs]);
          if ({{debugMode}}) {
              console.log('[Survicate] Page attributes set:', pageAttrs);
          }
      }
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          window.survicateCustomEvents = customEventsArray;
          
          // Helper function to track events
          window.trackSurvicateEvent = function(eventName, properties) {
              if (window.survicateCustomEvents.indexOf(eventName) !== -1) {
                  window._sva = window._sva || [];
                  window._sva.push(['trackEvent', eventName, properties || {}]);
                  
                  if ({{debugMode}}) {
                      console.log('[Survicate] Event tracked:', eventName, properties);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[Survicate] Custom events configured:', customEventsArray);
          }
      }
      
      // Analytics integration
      var integration = '{{integrations}}';
      if (integration && integration !== 'none') {
          window._sva.push(['setIntegration', integration]);
          if ({{debugMode}}) {
              console.log('[Survicate] Analytics integration enabled:', integration);
          }
      }
      
      // Helper functions
      window.SurvicateAPI = {
          // Show specific survey
          showSurvey: function(surveyId) {
              window._sva = window._sva || [];
              window._sva.push(['showSurvey', surveyId]);
          },
          
          // Hide all surveys
          hideAllSurveys: function() {
              window._sva = window._sva || [];
              window._sva.push(['hideAllSurveys']);
          },
          
          // Set visitor trait
          setTrait: function(key, value) {
              window._sva = window._sva || [];
              window._sva.push(['setVisitorTrait', key, value]);
          },
          
          // Track goal
          trackGoal: function(goalName, value) {
              window._sva = window._sva || [];
              window._sva.push(['trackGoal', goalName, value]);
          },
          
          // Destroy widget
          destroyWidget: function() {
              window._sva = window._sva || [];
              window._sva.push(['destroyWidget']);
          }
      };
      
      if ({{debugMode}}) {
          window._sva.push(['debug']);
          console.log('[Survicate] Debug mode enabled');
          console.log('[Survicate] Workspace Key:', '{{workspaceKey}}');
      }
      
      // Load Survicate script
      (function() {
          var s = document.createElement('script');
          s.src = 'https://survey.survicate.com/workspaces/{{workspaceKey}}/web_surveys.js';
          s.async = true;
          
          s.onload = function() {
              if ({{debugMode}}) {
                  console.log('[Survicate] Script loaded successfully');
              }
              
              // Initialize
              window._sva.push(['init']);
          };
          
          s.onerror = function() {
              console.error('[Survicate] Failed to load script');
          };
          
          var e = document.getElementsByTagName('script')[0];
          e.parentNode.insertBefore(s, e);
      })();
    })();`
  });

module.exports = survicateTemplate;

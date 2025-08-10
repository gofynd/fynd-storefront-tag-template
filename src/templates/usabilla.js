/**
 * Usabilla Template
 */

const createTemplate = require('../utils/createTemplate');

const usabillaTemplate = createTemplate({
    // Required keys
    name: 'Usabilla',
    path: 'usabilla',
    description: 'Voice of customer feedback platform for website feedback buttons and targeted surveys.',
    template_id: '1026',
    template_version: '1.0.0',
    category: 'feedback',
    type: 'js',
    sub_type: 'inline',
    position: 'body-bottom',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    img: 'https://logo.clearbit.com/getfeedback.com',
    note: '**Usabilla** (GetFeedback) provides feedback buttons, targeted surveys, and user experience insights. Find your Button ID in the Usabilla dashboard under Websites → Feedback button → Setup.',
    help_link: {
      text: 'Learn more about Usabilla implementation in the',
      url: 'https://help.usabilla.com/hc/en-us/articles/115003378534-Install-Usabilla-on-your-website',
      label: 'Documentation'
    },
    field_mappings: {
      buttonId: 'button_id',
      widgetType: 'widget_type',
      buttonPosition: 'button_position',
      buttonText: 'button_text',
      buttonColor: 'button_color',
      buttonTextColor: 'button_text_color',
      hideOnMobile: 'hide_on_mobile',
      hideOnDesktop: 'hide_on_desktop',
      language: 'language',
      autoShow: 'auto_show',
      showDelay: 'show_delay',
      exitIntent: 'exit_intent',
      scrollTrigger: 'scroll_trigger',
      scrollPercentage: 'scroll_percentage',
      cookieLifetime: 'cookie_lifetime',
      samplingRate: 'sampling_rate',
      enableScreenshot: 'enable_screenshot',
      enableConsoleLog: 'enable_console_log',
      enableCookies: 'enable_cookies',
      privacyMode: 'privacy_mode',
      maskEmails: 'mask_emails',
      maskNumbers: 'mask_numbers',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      customVariables: 'custom_variables',
      customData: 'custom_data',
      targetingRules: 'targeting_rules',
      excludeUrls: 'exclude_urls',
      includeUrls: 'include_urls',
      customEvents: 'custom_events',
      onFeedbackSuccess: 'on_feedback_success',
      onFeedbackStart: 'on_feedback_start',
      onFeedbackClose: 'on_feedback_close'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'buttonId',
        type: 'text',
        label: 'Button ID',
        placeholder: 'YOUR_BUTTON_ID',
        required: true,
        size: 'medium',
        description: 'Your Usabilla Button ID from the dashboard.',
        validation: {
          pattern: /^[a-fA-F0-9]{24}$/,
          message: 'Must be a 24-character hexadecimal ID'
        }
      },
      {
        name: 'widgetType',
        type: 'select',
        label: 'Widget Type',
        required: true,
        size: 'medium',
        description: 'Type of feedback widget to display.',
        options: [
          { label: 'Feedback Button', value: 'button' },
          { label: 'Inline Form', value: 'inline' },
          { label: 'Email Campaign', value: 'email' },
          { label: 'Exit Survey', value: 'exit' }
        ],
        default: 'button'
      },
      {
        name: 'buttonPosition',
        type: 'select',
        label: 'Button Position',
        required: false,
        size: 'medium',
        description: 'Position of the feedback button.',
        options: [
          { label: 'Right Middle', value: 'middle-right' },
          { label: 'Left Middle', value: 'middle-left' },
          { label: 'Bottom Right', value: 'bottom-right' },
          { label: 'Bottom Left', value: 'bottom-left' },
          { label: 'Top Right', value: 'top-right' },
          { label: 'Top Left', value: 'top-left' }
        ],
        default: 'middle-right',
        condition: (formData) => formData.widgetType === 'button'
      },
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text',
        placeholder: 'Feedback',
        required: false,
        size: 'medium',
        description: 'Text displayed on the feedback button.',
        default: 'Feedback',
        condition: (formData) => formData.widgetType === 'button'
      },
      {
        name: 'buttonColor',
        type: 'text',
        label: 'Button Color',
        placeholder: '#00A5FF',
        required: false,
        size: 'small',
        description: 'Button background color (hex).',
        validation: {
          pattern: /^#[0-9A-Fa-f]{6}$/,
          message: 'Must be a valid hex color (e.g., #00A5FF)'
        },
        default: '#00A5FF',
        condition: (formData) => formData.widgetType === 'button'
      },
      {
        name: 'buttonTextColor',
        type: 'text',
        label: 'Button Text Color',
        placeholder: '#FFFFFF',
        required: false,
        size: 'small',
        description: 'Button text color (hex).',
        validation: {
          pattern: /^#[0-9A-Fa-f]{6}$/,
          message: 'Must be a valid hex color (e.g., #FFFFFF)'
        },
        default: '#FFFFFF',
        condition: (formData) => formData.widgetType === 'button'
      },
      {
        name: 'hideOnMobile',
        type: 'checkbox',
        label: 'Hide on Mobile',
        default: false,
        size: 'medium',
        description: 'Hide feedback widget on mobile devices.'
      },
      {
        name: 'hideOnDesktop',
        type: 'checkbox',
        label: 'Hide on Desktop',
        default: false,
        size: 'medium',
        description: 'Hide feedback widget on desktop devices.'
      },
      {
        name: 'language',
        type: 'select',
        label: 'Language',
        required: false,
        size: 'medium',
        description: 'Language for the feedback widget.',
        options: [
          { label: 'Auto-detect', value: 'auto' },
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
          { label: 'German', value: 'de' },
          { label: 'Italian', value: 'it' },
          { label: 'Portuguese', value: 'pt' },
          { label: 'Dutch', value: 'nl' },
          { label: 'Polish', value: 'pl' },
          { label: 'Russian', value: 'ru' },
          { label: 'Japanese', value: 'ja' },
          { label: 'Chinese (Simplified)', value: 'zh-CN' },
          { label: 'Chinese (Traditional)', value: 'zh-TW' }
        ],
        default: 'auto'
      },
      {
        name: 'autoShow',
        type: 'checkbox',
        label: 'Auto-show on Load',
        default: false,
        size: 'medium',
        description: 'Automatically show feedback form on page load.',
        condition: (formData) => ['inline', 'email'].includes(formData.widgetType)
      },
      {
        name: 'showDelay',
        type: 'number',
        label: 'Auto-show Delay (seconds)',
        placeholder: '5',
        required: false,
        size: 'small',
        description: 'Delay before auto-showing.',
        validation: {
          min: 0,
          max: 300,
          message: 'Must be between 0 and 300 seconds'
        },
        default: 5,
        condition: (formData) => formData.autoShow && ['inline', 'email'].includes(formData.widgetType)
      },
      {
        name: 'exitIntent',
        type: 'checkbox',
        label: 'Exit Intent Trigger',
        default: false,
        size: 'medium',
        description: 'Show feedback when user intends to leave.',
        condition: (formData) => formData.widgetType === 'exit'
      },
      {
        name: 'scrollTrigger',
        type: 'checkbox',
        label: 'Scroll Trigger',
        default: false,
        size: 'medium',
        description: 'Show feedback at specific scroll depth.'
      },
      {
        name: 'scrollPercentage',
        type: 'number',
        label: 'Scroll Percentage (%)',
        placeholder: '50',
        required: false,
        size: 'small',
        description: 'Scroll depth to trigger feedback.',
        validation: {
          min: 1,
          max: 100,
          message: 'Must be between 1 and 100'
        },
        default: 50,
        condition: (formData) => formData.scrollTrigger
      },
      {
        name: 'cookieLifetime',
        type: 'number',
        label: 'Cookie Lifetime (days)',
        placeholder: '90',
        required: false,
        size: 'small',
        description: 'Days before showing feedback again.',
        validation: {
          min: 0,
          max: 365,
          message: 'Must be between 0 and 365 days'
        },
        default: 90
      },
      {
        name: 'samplingRate',
        type: 'number',
        label: 'Sampling Rate (%)',
        placeholder: '100',
        required: false,
        size: 'small',
        description: 'Percentage of visitors to show feedback to.',
        validation: {
          min: 1,
          max: 100,
          message: 'Must be between 1 and 100'
        },
        default: 100
      },
      {
        name: 'enableScreenshot',
        type: 'checkbox',
        label: 'Enable Screenshot',
        default: true,
        size: 'medium',
        description: 'Allow users to include screenshots with feedback.'
      },
      {
        name: 'enableConsoleLog',
        type: 'checkbox',
        label: 'Capture Console Logs',
        default: false,
        size: 'medium',
        description: 'Include browser console logs with feedback.'
      },
      {
        name: 'enableCookies',
        type: 'checkbox',
        label: 'Enable Cookies',
        default: true,
        size: 'medium',
        description: 'Use cookies to track user sessions.'
      },
      {
        name: 'privacyMode',
        type: 'checkbox',
        label: 'Privacy Mode',
        default: false,
        size: 'medium',
        description: 'Enhanced privacy mode (no PII collection).'
      },
      {
        name: 'maskEmails',
        type: 'checkbox',
        label: 'Mask Email Addresses',
        default: false,
        size: 'medium',
        description: 'Automatically mask email addresses in feedback.'
      },
      {
        name: 'maskNumbers',
        type: 'checkbox',
        label: 'Mask Numbers',
        default: false,
        size: 'medium',
        description: 'Automatically mask numbers (credit cards, phone).'
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
        name: 'customVariables',
        type: 'array',
        label: 'Custom Variables',
        description: 'Custom variables to track (e.g., user_type=premium, page_section=checkout).',
        help_link: {
          url: 'https://help.usabilla.com/hc/en-us/articles/207957269',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., variable=value',
          button_text: 'Add Variable',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: variable=value'
          }
        }
      },
      {
        name: 'customData',
        type: 'array',
        label: 'Custom Data',
        description: 'Additional data to include with feedback (e.g., order_id=12345, session_id=abc).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., key=value',
          button_text: 'Add Data',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: key=value'
          }
        }
      },
      {
        name: 'targetingRules',
        type: 'array',
        label: 'Targeting Rules',
        description: 'Show feedback based on conditions (e.g., logged_in=true, cart_value>100).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., variable=value or variable>value',
          button_text: 'Add Rule',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*[=<>][^=]+$/,
            message: 'Must be in format: variable=value or variable>value'
          }
        }
      },
      {
        name: 'excludeUrls',
        type: 'array',
        label: 'Exclude URL Patterns',
        description: 'URL patterns where feedback should not appear (e.g., /admin/*, /api/*).',
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
        name: 'includeUrls',
        type: 'array',
        label: 'Include Only URL Patterns',
        description: 'Show feedback only on matching URLs (leave empty for all pages).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., /product/*',
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
        description: 'Events to trigger feedback (e.g., error_occurred, help_clicked, purchase_failed).',
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
        name: 'onFeedbackSuccess',
        type: 'textarea',
        label: 'On Success Callback',
        placeholder: '// Code to run after successful feedback submission',
        required: false,
        size: 'full',
        description: 'JavaScript to execute after feedback is submitted.',
        rows: 3
      },
      {
        name: 'onFeedbackStart',
        type: 'textarea',
        label: 'On Start Callback',
        placeholder: '// Code to run when feedback form opens',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when feedback starts.',
        rows: 3
      },
      {
        name: 'onFeedbackClose',
        type: 'textarea',
        label: 'On Close Callback',
        placeholder: '// Code to run when feedback form closes',
        required: false,
        size: 'full',
        description: 'JavaScript to execute when feedback closes.',
        rows: 3
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Usabilla] Skipping load in development environment');
          }
          return;
      }
      
      // Check device type
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile && {{hideOnMobile}}) {
          if ({{debugMode}}) {
              console.log('[Usabilla] Hidden on mobile devices');
          }
          return;
      }
      if (!isMobile && {{hideOnDesktop}}) {
          if ({{debugMode}}) {
              console.log('[Usabilla] Hidden on desktop devices');
          }
          return;
      }
      
      // Check URL patterns
      var currentPath = window.location.pathname;
      
      // Check excluded URLs
      var excludeUrlsArray = [{{excludeUrls}}] || [];
      for (var i = 0; i < excludeUrlsArray.length; i++) {
          var pattern = excludeUrlsArray[i];
          if (pattern) {
              var regex = new RegExp(pattern.replace(/\*/g, '.*'));
              if (regex.test(currentPath)) {
                  if ({{debugMode}}) {
                      console.log('[Usabilla] URL excluded by pattern:', pattern);
                  }
                  return;
              }
          }
      }
      
      // Check included URLs (if specified)
      var includeUrlsArray = [{{includeUrls}}] || [];
      if (includeUrlsArray.length > 0) {
          var included = false;
          for (var i = 0; i < includeUrlsArray.length; i++) {
              var pattern = includeUrlsArray[i];
              if (pattern) {
                  var regex = new RegExp(pattern.replace(/\*/g, '.*'));
                  if (regex.test(currentPath)) {
                      included = true;
                      break;
                  }
              }
          }
          if (!included) {
              if ({{debugMode}}) {
                  console.log('[Usabilla] URL not in include list');
              }
              return;
          }
      }
      
      // Check sampling rate
      var samplingRate = {{samplingRate}} || 100;
      if (samplingRate < 100) {
          var random = Math.random() * 100;
          if (random > samplingRate) {
              if ({{debugMode}}) {
                  console.log('[Usabilla] Visitor excluded by sampling rate');
              }
              return;
          }
      }
      
      // Check targeting rules
      var targetingRulesArray = [{{targetingRules}}] || [];
      var passesTargeting = true;
      
      if (targetingRulesArray.length > 0) {
          for (var i = 0; i < targetingRulesArray.length; i++) {
              var rule = targetingRulesArray[i];
              if (rule) {
                  // Parse rule (e.g., "logged_in=true" or "cart_value>100")
                  var operator = rule.includes('>') ? '>' : rule.includes('<') ? '<' : '=';
                  var parts = rule.split(operator);
                  if (parts.length === 2) {
                      var variable = parts[0].trim();
                      var expectedValue = parts[1].trim();
                      
                      // Get actual value from window object or custom variables
                      var actualValue = window[variable];
                      
                      // Perform comparison
                      if (operator === '=') {
                          if (String(actualValue) !== expectedValue) {
                              passesTargeting = false;
                              break;
                          }
                      } else if (operator === '>') {
                          if (!(parseFloat(actualValue) > parseFloat(expectedValue))) {
                              passesTargeting = false;
                              break;
                          }
                      } else if (operator === '<') {
                          if (!(parseFloat(actualValue) < parseFloat(expectedValue))) {
                              passesTargeting = false;
                              break;
                          }
                      }
                  }
              }
          }
          
          if (!passesTargeting) {
              if ({{debugMode}}) {
                  console.log('[Usabilla] Does not meet targeting rules');
              }
              return;
          }
      }
      
      // Initialize Usabilla configuration
      window.usabilla_live = window.usabilla_live || [];
      
      // Set button ID
      window.usabilla_live.push(['setButtonId', '{{buttonId}}']);
      
      // Configure widget type and position
      var widgetType = '{{widgetType}}';
      
      if (widgetType === 'button') {
          window.usabilla_live.push(['button', {
              position: '{{buttonPosition}}' || 'middle-right',
              text: '{{buttonText}}' || 'Feedback',
              backgroundColor: '{{buttonColor}}' || '#00A5FF',
              color: '{{buttonTextColor}}' || '#FFFFFF'
          }]);
      }
      
      // Set language
      if ('{{language}}' && '{{language}}' !== 'auto') {
          window.usabilla_live.push(['language', '{{language}}']);
      }
      
      // Configure privacy settings
      if ({{privacyMode}}) {
          window.usabilla_live.push(['privacyMode', true]);
      }
      
      if ({{maskEmails}}) {
          window.usabilla_live.push(['maskEmails', true]);
      }
      
      if ({{maskNumbers}}) {
          window.usabilla_live.push(['maskNumbers', true]);
      }
      
      if (!{{enableScreenshot}}) {
          window.usabilla_live.push(['disableScreenshot', true]);
      }
      
      if ({{enableConsoleLog}}) {
          window.usabilla_live.push(['enableConsoleLog', true]);
      }
      
      if (!{{enableCookies}}) {
          window.usabilla_live.push(['disableCookies', true]);
      }
      
      // Set cookie lifetime
      if ({{cookieLifetime}} >= 0) {
          window.usabilla_live.push(['cookieLifetime', {{cookieLifetime}}]);
      }
      
      // Process custom variables
      var customVarsArray = [{{customVariables}}] || [];
      var customVars = {};
      customVarsArray.forEach(function(varStr) {
          if (typeof varStr === 'string' && varStr.includes('=')) {
              var parts = varStr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  customVars[key] = value;
              }
          }
      });
      
      if (Object.keys(customVars).length > 0) {
          window.usabilla_live.push(['setCustomVariables', customVars]);
          if ({{debugMode}}) {
              console.log('[Usabilla] Custom variables:', customVars);
          }
      }
      
      // Process custom data
      var customDataArray = [{{customData}}] || [];
      var customData = {};
      customDataArray.forEach(function(dataStr) {
          if (typeof dataStr === 'string' && dataStr.includes('=')) {
              var parts = dataStr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  customData[key] = value;
              }
          }
      });
      
      if (Object.keys(customData).length > 0) {
          window.usabilla_live.push(['data', customData]);
          if ({{debugMode}}) {
              console.log('[Usabilla] Custom data:', customData);
          }
      }
      
      // Set up event handlers
      var onSuccessCallback = {{onFeedbackSuccess}};
      if (onSuccessCallback) {
          window.usabilla_live.push(['onFeedbackSuccess', function() {
              if ({{debugMode}}) {
                  console.log('[Usabilla] Feedback submitted successfully');
              }
              try {
                  (function() {
                      eval(onSuccessCallback);
                  })();
              } catch (error) {
                  console.error('[Usabilla] Error in success callback:', error);
              }
          }]);
      }
      
      var onStartCallback = {{onFeedbackStart}};
      if (onStartCallback) {
          window.usabilla_live.push(['onFeedbackStart', function() {
              if ({{debugMode}}) {
                  console.log('[Usabilla] Feedback form opened');
              }
              try {
                  (function() {
                      eval(onStartCallback);
                  })();
              } catch (error) {
                  console.error('[Usabilla] Error in start callback:', error);
              }
          }]);
      }
      
      var onCloseCallback = {{onFeedbackClose}};
      if (onCloseCallback) {
          window.usabilla_live.push(['onFeedbackClose', function() {
              if ({{debugMode}}) {
                  console.log('[Usabilla] Feedback form closed');
              }
              try {
                  (function() {
                      eval(onCloseCallback);
                  })();
              } catch (error) {
                  console.error('[Usabilla] Error in close callback:', error);
              }
          }]);
      }
      
      // Custom events
      var customEventsArray = [{{customEvents}}] || [];
      if (customEventsArray.length > 0) {
          window.usabillaCustomEvents = customEventsArray;
          
          // Helper function to trigger feedback by event
          window.triggerUsabillaEvent = function(eventName) {
              if (window.usabillaCustomEvents.indexOf(eventName) !== -1) {
                  window.usabilla_live = window.usabilla_live || [];
                  window.usabilla_live.push(['trigger', eventName]);
                  
                  if ({{debugMode}}) {
                      console.log('[Usabilla] Event triggered:', eventName);
                  }
              }
          };
          
          if ({{debugMode}}) {
              console.log('[Usabilla] Custom events configured:', customEventsArray);
          }
      }
      
      // Helper functions
      window.UsabillaAPI = {
          // Show feedback form
          show: function() {
              window.usabilla_live = window.usabilla_live || [];
              window.usabilla_live.push(['show']);
          },
          
          // Hide feedback form
          hide: function() {
              window.usabilla_live = window.usabilla_live || [];
              window.usabilla_live.push(['hide']);
          },
          
          // Reset feedback form
          reset: function() {
              window.usabilla_live = window.usabilla_live || [];
              window.usabilla_live.push(['reset']);
          },
          
          // Set custom variable
          setVariable: function(key, value) {
              window.usabilla_live = window.usabilla_live || [];
              window.usabilla_live.push(['setCustomVariables', {[key]: value}]);
          }
      };
      
      if ({{debugMode}}) {
          window.usabilla_live.push(['debug', true]);
          console.log('[Usabilla] Debug mode enabled');
          console.log('[Usabilla] Button ID:', '{{buttonId}}');
          console.log('[Usabilla] Widget type:', widgetType);
      }
      
      // Load Usabilla script
      (function() {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://w.usabilla.com/{{buttonId}}.js';
          
          script.onload = function() {
              if ({{debugMode}}) {
                  console.log('[Usabilla] Script loaded successfully');
              }
              
              // Auto-show functionality
              if ({{autoShow}} && ['inline', 'email'].includes(widgetType)) {
                  setTimeout(function() {
                      window.usabilla_live.push(['show']);
                  }, ({{showDelay}} || 5) * 1000);
              }
              
              // Exit intent
              if ({{exitIntent}} && widgetType === 'exit') {
                  var exitIntentShown = false;
                  document.addEventListener('mouseout', function(e) {
                      if (!exitIntentShown && e.clientY <= 0 && e.relatedTarget == null) {
                          exitIntentShown = true;
                          window.usabilla_live.push(['show']);
                      }
                  });
              }
              
              // Scroll trigger
              if ({{scrollTrigger}}) {
                  var scrollShown = false;
                  var scrollPercentage = {{scrollPercentage}} || 50;
                  window.addEventListener('scroll', function() {
                      if (!scrollShown) {
                          var scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                          if (scrolled >= scrollPercentage) {
                              scrollShown = true;
                              window.usabilla_live.push(['show']);
                          }
                      }
                  });
              }
          };
          
          script.onerror = function() {
              console.error('[Usabilla] Failed to load script');
          };
          
          var first = document.getElementsByTagName('script')[0];
          first.parentNode.insertBefore(script, first);
      })();
    })();`
  }});

module.exports = usabillaTemplate;

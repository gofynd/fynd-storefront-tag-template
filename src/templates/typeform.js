/**
 * Typeform Template
 */

const createTemplate = require('../utils/createTemplate');

const typeformTemplate = createTemplate({
    // Required keys
    name: 'Typeform',
    path: 'typeform',
    description: 'Interactive forms and surveys with conversational UI for better engagement.',
    template_id: '1025',
    template_version: '1.0.0',
    category: 'feedback',
    type: 'js',
    sub_type: 'inline',
    position: 'body-bottom',
    attributes: {
      async: 'true'
    },
    compatible_engines: ['react', 'vue2'],
    image: 'https://logo.clearbit.com/typeform.com',
    note: '**Typeform** provides conversational forms, surveys, quizzes, and lead generation tools. Get your Form ID from Share → Embed in your Typeform dashboard.',
    help_link: {
      text: 'Learn more about Typeform embed options in the',
      url: 'https://www.typeform.com/help/a/embed-a-typeform-in-a-web-page-360029573471/',
      label: 'Documentation'
    },
    field_mappings: {
      formId: 'form_id',
      embedType: 'embed_type',
      buttonText: 'button_text',
      buttonColor: 'button_color',
      buttonTextColor: 'button_text_color',
      popupSize: 'popup_size',
      popupWidth: 'popup_width',
      popupHeight: 'popup_height',
      hideHeaders: 'hide_headers',
      hideFooter: 'hide_footer',
      opacity: 'opacity',
      autoOpen: 'auto_open',
      openDelay: 'open_delay',
      exitIntent: 'exit_intent',
      scrollTrigger: 'scroll_trigger',
      scrollPercentage: 'scroll_percentage',
      timeTrigger: 'time_trigger',
      timeDelay: 'time_delay',
      showOnMobile: 'show_on_mobile',
      showOnDesktop: 'show_on_desktop',
      disableTracking: 'disable_tracking',
      keepSession: 'keep_session',
      transferableUrlParameters: 'transferable_url_parameters',
      debugMode: 'debug_mode',
      enableInDevelopment: 'enable_in_development',
      hiddenFields: 'hidden_fields',
      customVariables: 'custom_variables',
      excludePages: 'exclude_pages',
      includePages: 'include_pages',
      onSubmitRedirect: 'on_submit_redirect',
      onSubmitCallback: 'on_submit_callback',
      utm_tracking: 'utm_tracking'
    },
    layout: {
      columns: 2,
      gap: '24px'
    },
    fields: [
      {
        name: 'formId',
        type: 'text',
        label: 'Form ID',
        placeholder: 'YOUR_FORM_ID',
        required: true,
        size: 'medium',
        description: 'Your Typeform ID from Share → Embed in your form settings.',
        validation: {
          pattern: /^[a-zA-Z0-9]{6,20}$/,
          message: 'Must be 6-20 alphanumeric characters'
        }
      },
      {
        name: 'embedType',
        type: 'select',
        label: 'Embed Type',
        required: true,
        size: 'medium',
        description: 'How the form should be displayed.',
        options: [
          { label: 'Popup (Click trigger)', value: 'popup' },
          { label: 'Slider (Side panel)', value: 'slider' },
          { label: 'Popover (Floating)', value: 'popover' },
          { label: 'Side Tab', value: 'sidetab' },
          { label: 'Widget (Inline)', value: 'widget' },
          { label: 'Full Page', value: 'fullpage' }
        ],
        default: 'popup'
      },
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text',
        placeholder: 'Open Form',
        required: false,
        size: 'medium',
        description: 'Text for the trigger button.',
        default: 'Open Form',
        condition: (formData) => ['popup', 'slider', 'popover', 'sidetab'].includes(formData.embedType)
      },
      {
        name: 'buttonColor',
        type: 'text',
        label: 'Button Color',
        placeholder: '#0445AF',
        required: false,
        size: 'small',
        description: 'Button background color (hex).',
        validation: {
          pattern: /^#[0-9A-Fa-f]{6}$/,
          message: 'Must be a valid hex color (e.g., #0445AF)'
        },
        default: '#0445AF',
        condition: (formData) => ['popup', 'slider', 'popover', 'sidetab'].includes(formData.embedType)
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
        condition: (formData) => ['popup', 'slider', 'popover', 'sidetab'].includes(formData.embedType)
      },
      {
        name: 'popupSize',
        type: 'select',
        label: 'Popup Size',
        required: false,
        size: 'medium',
        description: 'Size of the popup window.',
        options: [
          { label: 'Small (50%)', value: '50' },
          { label: 'Medium (75%)', value: '75' },
          { label: 'Large (90%)', value: '90' },
          { label: 'Full Screen', value: '100' },
          { label: 'Custom', value: 'custom' }
        ],
        default: '75',
        condition: (formData) => formData.embedType === 'popup'
      },
      {
        name: 'popupWidth',
        type: 'number',
        label: 'Custom Width (px)',
        placeholder: '800',
        required: false,
        size: 'small',
        description: 'Custom popup width in pixels.',
        validation: {
          min: 300,
          max: 2000,
          message: 'Must be between 300 and 2000 pixels'
        },
        condition: (formData) => formData.embedType === 'popup' && formData.popupSize === 'custom'
      },
      {
        name: 'popupHeight',
        type: 'number',
        label: 'Custom Height (px)',
        placeholder: '600',
        required: false,
        size: 'small',
        description: 'Custom popup height in pixels.',
        validation: {
          min: 300,
          max: 1500,
          message: 'Must be between 300 and 1500 pixels'
        },
        condition: (formData) => formData.embedType === 'popup' && formData.popupSize === 'custom'
      },
      {
        name: 'hideHeaders',
        type: 'checkbox',
        label: 'Hide Headers',
        default: false,
        size: 'medium',
        description: 'Hide form headers for cleaner look.'
      },
      {
        name: 'hideFooter',
        type: 'checkbox',
        label: 'Hide Footer',
        default: false,
        size: 'medium',
        description: 'Hide Typeform branding in footer.'
      },
      {
        name: 'opacity',
        type: 'number',
        label: 'Background Opacity (%)',
        placeholder: '100',
        required: false,
        size: 'small',
        description: 'Form background opacity.',
        validation: {
          min: 0,
          max: 100,
          message: 'Must be between 0 and 100'
        },
        default: 100
      },
      {
        name: 'autoOpen',
        type: 'checkbox',
        label: 'Auto-open on Load',
        default: false,
        size: 'medium',
        description: 'Automatically open form when page loads.',
        condition: (formData) => ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'openDelay',
        type: 'number',
        label: 'Auto-open Delay (seconds)',
        placeholder: '5',
        required: false,
        size: 'small',
        description: 'Delay before auto-opening.',
        validation: {
          min: 0,
          max: 300,
          message: 'Must be between 0 and 300 seconds'
        },
        default: 5,
        condition: (formData) => formData.autoOpen && ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'exitIntent',
        type: 'checkbox',
        label: 'Exit Intent Trigger',
        default: false,
        size: 'medium',
        description: 'Show form when user intends to leave.',
        condition: (formData) => ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'scrollTrigger',
        type: 'checkbox',
        label: 'Scroll Trigger',
        default: false,
        size: 'medium',
        description: 'Show form at specific scroll depth.',
        condition: (formData) => ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'scrollPercentage',
        type: 'number',
        label: 'Scroll Percentage (%)',
        placeholder: '50',
        required: false,
        size: 'small',
        description: 'Scroll depth to trigger form.',
        validation: {
          min: 1,
          max: 100,
          message: 'Must be between 1 and 100'
        },
        default: 50,
        condition: (formData) => formData.scrollTrigger && ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'timeTrigger',
        type: 'checkbox',
        label: 'Time-based Trigger',
        default: false,
        size: 'medium',
        description: 'Show form after time on page.',
        condition: (formData) => ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'timeDelay',
        type: 'number',
        label: 'Time Delay (seconds)',
        placeholder: '30',
        required: false,
        size: 'small',
        description: 'Time before showing form.',
        validation: {
          min: 1,
          max: 600,
          message: 'Must be between 1 and 600 seconds'
        },
        default: 30,
        condition: (formData) => formData.timeTrigger && ['popup', 'slider', 'popover'].includes(formData.embedType)
      },
      {
        name: 'showOnMobile',
        type: 'checkbox',
        label: 'Show on Mobile',
        default: true,
        size: 'medium',
        description: 'Display form on mobile devices.'
      },
      {
        name: 'showOnDesktop',
        type: 'checkbox',
        label: 'Show on Desktop',
        default: true,
        size: 'medium',
        description: 'Display form on desktop devices.'
      },
      {
        name: 'disableTracking',
        type: 'checkbox',
        label: 'Disable Tracking',
        default: false,
        size: 'medium',
        description: 'Disable Typeform analytics tracking.'
      },
      {
        name: 'keepSession',
        type: 'checkbox',
        label: 'Keep Session',
        default: false,
        size: 'medium',
        description: 'Remember user progress in form.'
      },
      {
        name: 'utm_tracking',
        type: 'checkbox',
        label: 'Pass UTM Parameters',
        default: true,
        size: 'medium',
        description: 'Pass UTM parameters to form.'
      },
      {
        name: 'transferableUrlParameters',
        type: 'array',
        label: 'URL Parameters to Pass',
        description: 'URL parameters to pass to the form (e.g., email, name, source).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., parameter_name',
          button_text: 'Add Parameter',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
            message: 'Must be a valid parameter name'
          }
        }
      },
      {
        name: 'onSubmitRedirect',
        type: 'text',
        label: 'Redirect URL on Submit',
        placeholder: 'https://example.com/thank-you',
        required: false,
        size: 'full',
        description: 'Redirect to URL after form submission.',
        validation: {
          pattern: /^https?:\/\/.+$/,
          message: 'Must be a valid URL'
        }
      },
      {
        name: 'debugMode',
        type: 'checkbox',
        label: 'Debug Mode',
        default: false,
        size: 'medium',
        description: 'Enable console logging.'
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
        name: 'hiddenFields',
        type: 'array',
        label: 'Hidden Fields',
        description: 'Pre-fill hidden fields (e.g., source=website, campaign=summer2024).',
        help_link: {
          url: 'https://www.typeform.com/help/a/use-hidden-fields-to-collect-extra-information-4428128934420/',
          text: 'Learn more'
        },
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., field=value',
          button_text: 'Add Field',
          input_size: 'medium',
          button_size: 'small',
          validation: {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*=[^=]+$/,
            message: 'Must be in format: field=value'
          }
        }
      },
      {
        name: 'customVariables',
        type: 'array',
        label: 'Custom Variables',
        description: 'Custom data to pass (e.g., user_id=123, session_id=abc).',
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
        name: 'excludePages',
        type: 'array',
        label: 'Exclude URL Patterns',
        description: 'URL patterns where form should not appear (e.g., /admin/*, /checkout/*).',
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
        name: 'includePages',
        type: 'array',
        label: 'Include Only URL Patterns',
        description: 'Show form only on matching URLs (leave empty for all pages).',
        default: [],
        size: 'full',
        input_config: {
          type: 'text',
          placeholder: 'e.g., /contact/*',
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
        name: 'onSubmitCallback',
        type: 'textarea',
        label: 'On Submit JavaScript Callback',
        placeholder: '// Execute custom code after submission\n// Available: response, formId',
        required: false,
        size: 'full',
        description: 'JavaScript to execute after form submission.',
        rows: 4
      }
    ],
    script: `(function() {
      // Skip loading in development if not enabled
      if (!{{enableInDevelopment}} && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('.local'))) {
          if ({{debugMode}}) {
              console.log('[Typeform] Skipping load in development environment');
          }
          return;
      }
      
      // Check device type
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile && !{{showOnMobile}}) {
          if ({{debugMode}}) {
              console.log('[Typeform] Disabled on mobile devices');
          }
          return;
      }
      if (!isMobile && !{{showOnDesktop}}) {
          if ({{debugMode}}) {
              console.log('[Typeform] Disabled on desktop devices');
          }
          return;
      }
      
      // Check URL patterns
      var currentPath = window.location.pathname;
      
      // Check excluded pages
      var excludePagesArray = [{{excludePages}}] || [];
      for (var i = 0; i < excludePagesArray.length; i++) {
          var pattern = excludePagesArray[i];
          if (pattern) {
              var regex = new RegExp(pattern.replace(/\*/g, '.*'));
              if (regex.test(currentPath)) {
                  if ({{debugMode}}) {
                      console.log('[Typeform] Page excluded by pattern:', pattern);
                  }
                  return;
              }
          }
      }
      
      // Check included pages (if specified)
      var includePagesArray = [{{includePages}}] || [];
      if (includePagesArray.length > 0) {
          var included = false;
          for (var i = 0; i < includePagesArray.length; i++) {
              var pattern = includePagesArray[i];
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
                  console.log('[Typeform] Page not in include list');
              }
              return;
          }
      }
      
      // Build options object
      var options = {
          hideHeaders: {{hideHeaders}},
          hideFooter: {{hideFooter}},
          opacity: {{opacity}} || 100,
          disableTracking: {{disableTracking}},
          keepSession: {{keepSession}}
      };
      
      // Process hidden fields
      var hiddenFieldsArray = [{{hiddenFields}}] || [];
      var hiddenFields = {};
      hiddenFieldsArray.forEach(function(field) {
          if (typeof field === 'string' && field.includes('=')) {
              var parts = field.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  hiddenFields[key] = value;
              }
          }
      });
      
      // Process custom variables
      var customVarsArray = [{{customVariables}}] || [];
      customVarsArray.forEach(function(varStr) {
          if (typeof varStr === 'string' && varStr.includes('=')) {
              var parts = varStr.split('=');
              if (parts.length === 2) {
                  var key = parts[0].trim();
                  var value = parts[1].trim();
                  hiddenFields[key] = value;
              }
          }
      });
      
      // Add URL parameters
      var urlParams = new URLSearchParams(window.location.search);
      
      // Transfer specified URL parameters
      var transferableParams = [{{transferableUrlParameters}}] || [];
      transferableParams.forEach(function(param) {
          if (urlParams.has(param)) {
              hiddenFields[param] = urlParams.get(param);
          }
      });
      
      // Transfer UTM parameters if enabled
      if ({{utm_tracking}}) {
          ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function(utm) {
              if (urlParams.has(utm)) {
                  hiddenFields[utm] = urlParams.get(utm);
              }
          });
      }
      
      // Add hidden fields to options
      if (Object.keys(hiddenFields).length > 0) {
          options.hidden = hiddenFields;
          if ({{debugMode}}) {
              console.log('[Typeform] Hidden fields:', hiddenFields);
          }
      }
      
      // Redirect URL
      var redirectUrl = '{{onSubmitRedirect}}';
      if (redirectUrl) {
          options.onSubmit = function(event) {
              if ({{debugMode}}) {
                  console.log('[Typeform] Form submitted:', event);
              }
              
              // Custom callback
              var customCallback = {{onSubmitCallback}};
              if (customCallback) {
                  try {
                      (function(response, formId) {
                          eval(customCallback);
                      })(event.response_id, '{{formId}}');
                  } catch (error) {
                      console.error('[Typeform] Error in custom callback:', error);
                  }
              }
              
              // Redirect
              setTimeout(function() {
                  window.location.href = redirectUrl;
              }, 500);
          };
      } else {
          // Just custom callback
          var customCallback = {{onSubmitCallback}};
          if (customCallback) {
              options.onSubmit = function(event) {
                  if ({{debugMode}}) {
                      console.log('[Typeform] Form submitted:', event);
                  }
                  try {
                      (function(response, formId) {
                          eval(customCallback);
                      })(event.response_id, '{{formId}}');
                  } catch (error) {
                      console.error('[Typeform] Error in custom callback:', error);
                  }
              };
          }
      }
      
      // Embed type specific options
      var embedType = '{{embedType}}';
      
      if (embedType === 'popup') {
          var popupSize = '{{popupSize}}';
          if (popupSize === 'custom') {
              options.width = {{popupWidth}} || 800;
              options.height = {{popupHeight}} || 600;
          } else if (popupSize !== '100') {
              options.size = parseInt(popupSize) || 75;
          }
      }
      
      if (embedType === 'widget') {
          options.container = document.querySelector('.typeform-widget-container');
          if (!options.container) {
              // Create container if it doesn't exist
              var container = document.createElement('div');
              container.className = 'typeform-widget-container';
              container.style.width = '100%';
              container.style.height = '500px';
              document.body.appendChild(container);
              options.container = container;
          }
      }
      
      // Helper functions
      window.TypeformAPI = {
          open: function() {
              if (window.typeformEmbed) {
                  window.typeformEmbed.open();
              }
          },
          close: function() {
              if (window.typeformEmbed) {
                  window.typeformEmbed.close();
              }
          },
          reload: function() {
              if (window.typeformEmbed) {
                  window.typeformEmbed.reload();
              }
          }
      };
      
      if ({{debugMode}}) {
          console.log('[Typeform] Loading with options:', options);
          console.log('[Typeform] Form ID:', '{{formId}}');
          console.log('[Typeform] Embed type:', embedType);
      }
      
      // Load Typeform Embed SDK
      (function() {
          var js, q, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName;
          var id = "typef_orm_share", b = "https://embed.typeform.com/";
          if (!gi.call(d, id)) {
              js = ce.call(d, "script");
              js.id = id;
              js.src = b + "embed.js";
              q = gt.call(d, "script")[0];
              q.parentNode.insertBefore(js, q);
          }
      })();
      
      // Wait for SDK to load
      var waitForTypeform = setInterval(function() {
          if (window.typeformEmbed) {
              clearInterval(waitForTypeform);
              
              if ({{debugMode}}) {
                  console.log('[Typeform] SDK loaded successfully');
              }
              
              var formId = '{{formId}}';
              
              // Create embed based on type
              switch (embedType) {
                  case 'popup':
                      // Create button
                      var button = document.createElement('button');
                      button.textContent = '{{buttonText}}' || 'Open Form';
                      button.style.backgroundColor = '{{buttonColor}}' || '#0445AF';
                      button.style.color = '{{buttonTextColor}}' || '#FFFFFF';
                      button.style.padding = '12px 24px';
                      button.style.border = 'none';
                      button.style.borderRadius = '4px';
                      button.style.cursor = 'pointer';
                      button.style.fontSize = '16px';
                      button.className = 'typeform-share button';
                      button.setAttribute('data-mode', 'popup');
                      
                      document.body.appendChild(button);
                      
                      window.typeformEmbed = window.typeformEmbed.makePopup('https://form.typeform.com/to/' + formId, options);
                      
                      button.onclick = function() {
                          window.typeformEmbed.open();
                      };
                      
                      // Auto-open
                      if ({{autoOpen}}) {
                          setTimeout(function() {
                              window.typeformEmbed.open();
                          }, ({{openDelay}} || 5) * 1000);
                      }
                      
                      // Exit intent
                      if ({{exitIntent}}) {
                          var exitIntentShown = false;
                          document.addEventListener('mouseout', function(e) {
                              if (!exitIntentShown && e.clientY <= 0 && e.relatedTarget == null) {
                                  exitIntentShown = true;
                                  window.typeformEmbed.open();
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
                                      window.typeformEmbed.open();
                                  }
                              }
                          });
                      }
                      
                      // Time trigger
                      if ({{timeTrigger}}) {
                          setTimeout(function() {
                              window.typeformEmbed.open();
                          }, ({{timeDelay}} || 30) * 1000);
                      }
                      break;
                      
                  case 'slider':
                      window.typeformEmbed = window.typeformEmbed.makeSlider('https://form.typeform.com/to/' + formId, options);
                      
                      // Auto-open triggers
                      if ({{autoOpen}}) {
                          setTimeout(function() {
                              window.typeformEmbed.open();
                          }, ({{openDelay}} || 5) * 1000);
                      }
                      
                      if ({{exitIntent}}) {
                          var exitIntentShown = false;
                          document.addEventListener('mouseout', function(e) {
                              if (!exitIntentShown && e.clientY <= 0 && e.relatedTarget == null) {
                                  exitIntentShown = true;
                                  window.typeformEmbed.open();
                              }
                          });
                      }
                      
                      if ({{scrollTrigger}}) {
                          var scrollShown = false;
                          var scrollPercentage = {{scrollPercentage}} || 50;
                          window.addEventListener('scroll', function() {
                              if (!scrollShown) {
                                  var scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                                  if (scrolled >= scrollPercentage) {
                                      scrollShown = true;
                                      window.typeformEmbed.open();
                                  }
                              }
                          });
                      }
                      
                      if ({{timeTrigger}}) {
                          setTimeout(function() {
                              window.typeformEmbed.open();
                          }, ({{timeDelay}} || 30) * 1000);
                      }
                      break;
                      
                  case 'popover':
                      options.buttonText = '{{buttonText}}' || 'Open Form';
                      window.typeformEmbed = window.typeformEmbed.makePopover('https://form.typeform.com/to/' + formId, options);
                      
                      // Triggers for popover
                      if ({{autoOpen}}) {
                          setTimeout(function() {
                              window.typeformEmbed.open();
                          }, ({{openDelay}} || 5) * 1000);
                      }
                      break;
                      
                  case 'sidetab':
                      options.buttonText = '{{buttonText}}' || 'Feedback';
                      window.typeformEmbed = window.typeformEmbed.makeSidetab('https://form.typeform.com/to/' + formId, options);
                      break;
                      
                  case 'widget':
                      window.typeformEmbed = window.typeformEmbed.makeWidget('https://form.typeform.com/to/' + formId, options);
                      break;
                      
                  case 'fullpage':
                      window.location.href = 'https://form.typeform.com/to/' + formId + '?' + new URLSearchParams(hiddenFields).toString();
                      break;
              }
              
              if ({{debugMode}}) {
                  console.log('[Typeform] Form embedded successfully');
              }
          }
      }, 100);
    })();`
  });

module.exports = typeformTemplate;

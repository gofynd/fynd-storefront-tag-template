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

// Template structure helper
const createTemplate = (config) => {
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

const templates = {
    gtm: createTemplate({
      // Required keys
      name: 'Google Tag Manager',
      path: "google-tag-manager",
      description: "Integrate Google Tag Manager for advanced analytics.",
      template_id: "1001",
      template_version: "1.0.0",
      fields: [
        {
          name: 'gtmId',
          type: 'text',
          label: 'Enter Google Tag Manager ID',
          placeholder: 'Enter GTM Tag',
          required: true,
          size: 'full',
          validation: {
            pattern: /^GTM-[A-Z0-9]+$/i,
            message: 'Must be a valid GTM ID (e.g., GTM-XXXXXXX)',
          },
          events: {
            // Auto-format GTM ID on blur
            blur: function(value, field, formData, component) {
              if (value && !value.startsWith('GTM-')) {
                // If user enters just the ID part, add GTM- prefix
                const cleanId = value.replace(/^gtm-/i, '').toUpperCase();
                component.$set(formData, field.name, 'GTM-' + cleanId);
              }
            }
          }
        },
      ],
      script: `window.addEventListener("load",function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","{{gtmId}}");});function consumeEvent(){const FPI_EVENTS={LOG_IN:"user.login",LOG_OUT:"user.logout",PROFILE_UPDATE:"user.update",PRODUCT_LIST_VIEW:"product_list.view",COLLECTION_LIST_VIEW:"collection_list.view",PRODUCT_LIST_CLICK:"product_list.click",PRODUCT_FILTER:"product_list.filter",PRODUCT_SORT:"product_list.sort",PRODUCT_DETAIL_PAGE_VIEW:"product.view",NOTIFY_PRODUCT:"notify.product",ADD_TO_COMPARE:"compare.add",REMOVE_FROM_COMPARE:"compare.remove",ADD_TO_WISHLIST:"wishlist.add",REMOVE_FROM_WISHLIST:"wishlist.remove",VIEW_CART:"cart.view",ADD_TO_CART:"cart.newProduct",REMOVE_FROM_CART:"cart.remove",UPDATE_CART:"cart.update",ORDER_CHECKOUT:"order.checkout",ADD_PAYMENT_INFORMATION:"order.payment_information",ADD_ADDRESS_INFORMATION:"order.address_information",ORDER_PROCESSED:"order.processed",ORDER_TRACKING_VIEW:"order_tracking.view",REFUND_SUCCESS:"refund.success",SEARCH_PRODUCTS:"search.products",PINCODE_SERVICEABILITY:"pincode.serviceablility"};const getGTMEventName=(event)=>{const GTM_EVENTS={[FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW]:"view_item",[FPI_EVENTS.ADD_TO_CART]:"add_to_cart",[FPI_EVENTS.REMOVE_FROM_CART]:"remove_from_cart",[FPI_EVENTS.ORDER_CHECKOUT]:"begin_checkout",[FPI_EVENTS.ORDER_PROCESSED]:"purchase",[FPI_EVENTS.REFUND_SUCCESS]:"refund",[FPI_EVENTS.PRODUCT_LIST_VIEW]:"view_item_list",[FPI_EVENTS.COLLECTION_LIST_VIEW]:"view_collection",[FPI_EVENTS.ADD_TO_WISHLIST]:"add_to_wishlist",[FPI_EVENTS.VIEW_CART]:"view_cart",[FPI_EVENTS.SEARCH_PRODUCTS]:"products_searched",[FPI_EVENTS.ADD_PAYMENT_INFORMATION]:"add_payment_info",[FPI_EVENTS.ADD_ADDRESS_INFORMATION]:"add_shipping_info",[FPI_EVENTS.LOG_IN]:"login",[FPI_EVENTS.LOG_OUT]:"logout",[FPI_EVENTS.PROFILE_UPDATE]:"profile_update"};return GTM_EVENTS[event]||"not_known";};const pushToDataLayer=(event,data)=>{const eventName=getGTMEventName(event);if(eventName==="not_known")return;dataLayer.push({ecommerce:null});data.userAgent=window.navigator.userAgent;dataLayer.push({event:eventName,ecommerce:data});};const getSkipEvents=()=>[];if(window.FPI){Object.keys(FPI_EVENTS).filter(ev=>!getSkipEvents().includes(FPI_EVENTS[ev])).forEach(event=>{FPI.event.on(FPI_EVENTS[event],eventData=>{console.log("FPI "+event);pushToDataLayer(FPI_EVENTS[event],eventData);});});}}consumeEvent();`,
      
      // Optional keys
      img: "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_tag_manager.svg",
      note:"The GTM ID for your Google Tag Manager account is available on the Google Tag Manager Dashboard.",
      field_mappings: {
        gtmId: 'gtm_id'
      },
      layout: {
        columns: 2,
        gap: '20px'
      },
      // Custom save button state - only disable if form is invalid
      saveButtonDisabled: function(formData, errors, component) {
        // This uses the built-in form validation (computed property)
        return !component.isFormValid;
      }
    }),
    sentry: {
      name: 'Sentry',
      path: "sentry-tag",
      description: "Monitor errors and performance with Sentry.",
      img: "https://sentry-brand.storage.googleapis.com/sentry-logo-black.png",
      note:"The DSN for your Sentry account is available on the Sentry Dashboard in Settings > Project > Client Keys (*this instructions needs to be changed according to Sentry documentation)",
      help_link: {
        text: "Learn the steps to connect with Sentry by reading the article on",
        url: "https://docs.sentry.io/product/sentry-basics/",
        label: "Help Center"
      },
      template_id: "1002",
      template_version: "1.0.0",
      type: 'js',
      sub_type: 'inline',
      position: 'head',
      pages: [],
      attributes: { async: "true" },
      compatible_engines: ['react', 'vue2'],
      field_mappings: {
        dsn: 'sentry_dsn',
        excludedUrls: 'excluded_urls'
      },
      layout: {
        columns: 2,
        gap: '24px'
      },
      fields: [
        {
          name: 'dsn',
          type: 'text',
          label: 'Enter Sentry DSN',
          required: true,
          size: 'full',
          validation: {
            pattern: /^https?:\/\/[\w.@:\/\-]+$/,
            message: 'Must be a valid DSN URL',
          },
        },
        {
          name: 'excludedUrls',
          type: 'array',
          label: 'URLs to exclude',
          description: 'We have by default added some URLs below, this is to avoid the errors that are reported from the core system. We recommend you to keep this as it is. You can add more URLs here to add to denyURLs in Sentry.',
          help_link: {
            url: "https://docs.sentry.io/platforms/javascript/configuration/filtering/",
            text: "More info"
          },
          default: [
          ],
          size: 'full',
          input_config: {
            type: 'text',
            placeholder: 'Enter URL to exclude',
            button_text: 'Exclude URL',
            input_size: 'large',  // Size for the input within array field
            button_size: 'small', // Size for the button within array field
            validation: {
              pattern: /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3})(\:\d+)?(\/[-a-z\d%_.@~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
              message: 'Not a valid URL'
            },
            events: {
              // Custom click handler - can be used for additional validation or logging
              click: function(value, field, formData, component) {
                console.log('Adding excluded URL:', value);
                // The actual chip addition is handled by the default addArrayItem method
                // You can add custom validation or processing here if needed
              },
              // Custom remove handler - optional notification when removing
              remove: function(value, index, field, formData, component) {
                console.log('Removed excluded URL:', value);
                // The actual removal is handled by the default removeArrayItem method
              }
            }
          }
        },
      ],
      script: `(function() {
                    const script = document.createElement('script');
                    script.src = 'https://browser.sentry-cdn.com/9.35.0/bundle.tracing.min.js';
                    script.integrity = 'sha384-XvcGe2ErrJucCsy3ffdT1rnrcilIPvF5GfEDumgaFnypaxiXyJqr4p4zdMfDrTcM';
                    script.crossOrigin = 'anonymous';
                    script.onload = () => {
                        Sentry.init({
                        dsn: '{{dsn}}',
                        sendDefaultPii: true,
                        integrations: [
                            new Sentry.BrowserTracing(),
                            new Sentry.Replay()
                        ],
                        tracesSampleRate: 1.0,
                        replaysSessionSampleRate: 0.1,
                        replaysOnErrorSampleRate: 1.0,
                        denyUrls: [{{excludedUrls}}] || [],
                        });
                    };
                    document.head.appendChild(script);
                    })();`
    },
    ga4: {
      name: 'Google Analytics',
      path: "google-analytics",
      description: "tracks and reports website traffic, providing insights to help optimize your site's performance.",
      img: "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyndnp/wrkr/x5/misc/pictures/free-icon/original/iejFtwUQr-logo.png",
      note:"The APP_ID for your Google Analytics account is available on the Google Analytics Dashboard in **Settings > App Settings > Account Settings > APP ID**.",
      template_id: "1003",
      template_version: "1.0.0",
      type: 'js',
      sub_type: 'inline',
      position: 'head',
      pages: [],
      attributes: { async: "true" },
      compatible_engines: ['react', 'vue2'],
      field_mappings: {
        measurementId: 'google_analytics_id'
      },
      layout: {
        columns: 3,
        gap: '16px',
        responsive: true  // Enable responsive behavior
      },
      fields: [
        {
          name: 'measurementId',
          type: 'text',
          label: 'Enter Google Analytics Property ID',
          placeholder: 'Enter Google Analytics Property ID',
          required: true,
          size: 'medium',
          validation: {
            pattern: /^(G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)$/i,
            message: 'Must be a valid Measurement ID (e.g., G-XXXXXXXXXX or UA-XXXXXXXXX-X)',
          },
        },
      ],
      script: `(function(){const script=document.createElement("script");script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id={{measurementId}}';script.onload=()=>{window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","{{measurementId}}");};document.head.appendChild(script);}).call(this);`
    },
    
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
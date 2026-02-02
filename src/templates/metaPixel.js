/**
 * Meta Pixel (Facebook Pixel) Template
 */

const createTemplate = require('../utils/createTemplate');

const isTrue = (value) => value === true || value === 'true';

const metaPixelTemplate = createTemplate({
  // Required keys
  name: 'Meta Pixel',
  path: "meta-pixel",
  description: "Track conversions, optimize ads, and build audiences for Facebook and Instagram advertising campaigns.",
  template_id: "1033",
  template_version: "1.0.0",
  category: 'analytics',
  fields: [
    {
      name: 'useGTM',
      type: 'boolean',
      label: 'GTM Tracking',
      required: false,
      size: 'full',
      description: 'Turn ON the toggle button if you\'re using Google Tag Manager (GTM) for managing your Pixel events',
      tooltip: 'You can choose between GTM or Meta for tracking Pixel events. To utilize GTM Tracking, turn on the toggle button. To use Meta Tracking, turn off the GTM Tracking toggle and enter the Meta Pixel ID below.',
      default: false,
      note: 'You can choose between GTM or Meta for tracking Pixel events. To utilize GTM Tracking, turn on the toggle button. To use Meta Tracking, turn off the GTM Tracking toggle and enter the Meta Pixel ID below.'
    },
    {
      name: 'pixelId',
      type: 'text',
      label: 'Meta Pixel ID',
      placeholder: 'Enter pixel ID',
      required: false, // optional; disabled when GTM is on
      size: 'full',
      description: 'Facebook Pixel ID for your Meta Pixel account is available on the Facebook Business Account in Settings > App Settings > Account Settings > APP ID',
      tooltip: 'Facebook Pixel ID for your Meta Pixel account is available on the Facebook Business Account in Settings > App Settings > Account Settings > APP ID',
      disabled: function(formData) {
        return isTrue(formData.useGTM);
      },
      validation: {
        pattern: "/^[0-9]{15,16}$/",
        message: 'Must be a valid Meta Pixel ID (15-16 digits)',
        required_message: 'Meta Pixel ID is required when GTM Tracking is disabled'
      }
    },
    {
      name: 'conversionsApiNote',
      type: 'note',
      size: 'full',
      content: 'For Conversions API, you\'ll need an Access Token from Facebook Business Manager. Find your Pixel ID in Facebook Events Manager under Data Sources > Pixels.'
    },
    {
      name: 'enableConversionsApi',
      type: 'boolean',
      label: 'Conversions API',
      required: false,
      size: 'full',
      description: 'Enable Conversions API for server-side event tracking',
      tooltip: 'To utilize event tracking via Conversions API, you need to activate Conversions API. Ensure to turn on the Conversions API toggle button and save the Pixel ID and Access Token details.',
      default: false
    },
    {
      name: 'conversionsApiPixelId',
      type: 'text',
      label: 'Meta Pixel ID',
      placeholder: 'Enter pixel ID',
      required: function(formData) {
        return isTrue(formData.enableConversionsApi);
      },
      size: 'full',
      description: 'Meta Pixel ID is required for Conversions API',
      visible: function(formData) {
        return isTrue(formData.enableConversionsApi);
      },
      validation: {
        pattern: "/^[0-9]{15,16}$/",
        message: 'Must be a valid Meta Pixel ID (15-16 digits)',
        required_message: 'Meta Pixel ID is required when Conversions API is enabled'
      }
    },
    {
      name: 'accessToken',
      type: 'text',
      label: 'Access Token',
      placeholder: 'Enter access token',
      required: function(formData) {
        return isTrue(formData.enableConversionsApi);
      },
      size: 'full',
      description: 'Access Token is mandatory for Conversions API. Get it from Facebook Business Manager.',
      visible: function(formData) {
        return isTrue(formData.enableConversionsApi);
      },
      validation: {
        pattern: "/^.{50,}$/",
        message: 'Access Token is required and must be at least 50 characters',
        required_message: 'Access Token is required when Conversions API is enabled'
      }
    },
    {
      name: 'testEventCode',
      type: 'text',
      label: 'Test Events Code',
      placeholder: 'Enter test events code',
      required: false,
      size: 'full',
      description: 'Use this if you need to test the server-side event. Remove it after testing.',
      visible: function(formData) {
        return isTrue(formData.enableConversionsApi);
      },
      validation: {
        pattern: "/^[A-Z0-9]{8,10}$/",
        message: 'Must be a valid test event code (8-10 uppercase alphanumeric characters)',
      }
    }
  ],
  script: `window.addEventListener("load", function() {
    {{#unless useGTM}}
    // Initialize Meta Pixel only if not using GTM
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize pixel
    fbq('init', '{{pixelId}}');
    
    // Track page view
    fbq('track', 'PageView');
    {{/unless}}
  });

  function consumeEvent() {
    const FPI_EVENTS = {
      LOG_IN: "user.login",
      LOG_OUT: "user.logout",
      PROFILE_UPDATE: "user.update", 
      PRODUCT_LIST_VIEW: "product_list.view",
      COLLECTION_LIST_VIEW: "collection_list.view",
      PRODUCT_LIST_CLICK: "product_list.click",
      PRODUCT_FILTER: "product_list.filter",
      PRODUCT_SORT: "product_list.sort",
      PRODUCT_DETAIL_PAGE_VIEW: "product.view",
      NOTIFY_PRODUCT: "notify.product",
      ADD_TO_COMPARE: "compare.add",
      REMOVE_FROM_COMPARE: "compare.remove",
      ADD_TO_WISHLIST: "wishlist.add",
      REMOVE_FROM_WISHLIST: "wishlist.remove",
      VIEW_CART: "cart.view",
      ADD_TO_CART: "cart.newProduct",
      REMOVE_FROM_CART: "cart.remove",
      UPDATE_CART: "cart.update",
      ORDER_CHECKOUT: "order.checkout",
      ADD_PAYMENT_INFORMATION: "order.payment_information",
      ADD_ADDRESS_INFORMATION: "order.address_information",
      ORDER_PROCESSED: "order.processed",
      ORDER_TRACKING_VIEW: "order_tracking.view",
      REFUND_SUCCESS: "refund.success",
      SEARCH_PRODUCTS: "search.products",
      PINCODE_SERVICEABILITY: "pincode.serviceablility"
    };

    const getMetaPixelEventName = (event) => {
      const META_EVENTS = {
        [FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW]: "ViewContent",
        [FPI_EVENTS.ADD_TO_CART]: "AddToCart",
        [FPI_EVENTS.ORDER_CHECKOUT]: "InitiateCheckout",
        [FPI_EVENTS.ORDER_PROCESSED]: "Purchase",
        [FPI_EVENTS.PRODUCT_LIST_VIEW]: "ViewCategory",
        [FPI_EVENTS.COLLECTION_LIST_VIEW]: "ViewCategory",
        [FPI_EVENTS.ADD_TO_WISHLIST]: "AddToWishlist",
        [FPI_EVENTS.SEARCH_PRODUCTS]: "Search",
        [FPI_EVENTS.ADD_PAYMENT_INFORMATION]: "AddPaymentInfo",
        [FPI_EVENTS.LOG_IN]: "CompleteRegistration"
      };
      return META_EVENTS[event] || null;
    };

    const formatEventData = (event, data) => {
      const eventData = {};
      
      // Standard e-commerce parameters
      if (data.value || data.total_amount || data.amount) {
        eventData.value = data.value || data.total_amount || data.amount;
      }

      // Product data
      if (data.product) {
        eventData.content_ids = [data.product.id || data.product.uid];
        eventData.content_name = data.product.name;
        eventData.content_type = 'product';
        
        if (data.product.categories && data.product.categories.length > 0) {
          eventData.content_category = data.product.categories[0].name;
        }
        
        if (data.product.price) {
          eventData.value = data.product.price.effective;
          eventData.currency = data.product.price.currency_code;
        }
      }

      // Cart/Order data
      if (data.cart && data.cart.items) {
        eventData.content_ids = data.cart.items.map(item => item.product.id || item.product.uid);
        eventData.contents = data.cart.items.map(item => ({
          id: item.product.id || item.product.uid,
          quantity: item.quantity || 1,
          item_price: item.product.price ? item.product.price.effective : undefined
        }));
        eventData.num_items = data.cart.items.length;
      }

      // Order data
      if (data.order) {
        if (data.order.order_id) {
          eventData.order_id = data.order.order_id;
        }
        
        if (data.order.bags && data.order.bags.length > 0) {
          const items = data.order.bags.flatMap(bag => bag.items || []);
          eventData.content_ids = items.map(item => item.product.id || item.product.uid);
          eventData.contents = items.map(item => ({
            id: item.product.id || item.product.uid,
            quantity: item.quantity || 1,
            item_price: item.product.price ? item.product.price.effective : undefined
          }));
          eventData.num_items = items.length;
        }

        if (data.order.total_details) {
          eventData.value = data.order.total_details.total;
          eventData.currency = data.order.total_details.currency;
        }
      }

      // Search data
      if (data.query || data.search_query) {
        eventData.search_string = data.query || data.search_query;
      }

      // User data for advanced matching
      if (data.user) {
        const userData = {};
        if (data.user.email) userData.em = data.user.email;
        if (data.user.phone) userData.ph = data.user.phone;
        if (data.user.first_name) userData.fn = data.user.first_name;
        if (data.user.last_name) userData.ln = data.user.last_name;
        
        if (Object.keys(userData).length > 0) {
          eventData.user_data = userData;
        }
      }

      return eventData;
    };

    const trackEvent = (event, data) => {
      const eventName = getMetaPixelEventName(event);
      if (!eventName) return;
      
      const eventData = formatEventData(event, data);
      
      {{#if useGTM}}
      // Push to GTM dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'meta_pixel_event',
          'fb_event_name': eventName,
          'fb_event_data': eventData
        });
        console.log('Meta Pixel Event (via GTM):', eventName, eventData);
      }
      {{else}}
      // Direct Meta Pixel tracking
      if (!window.fbq) return;
      
      fbq('track', eventName, eventData);
      console.log('Meta Pixel Event:', eventName, eventData);
      {{/if}}
    };

    const getSkipEvents = () => [];

    if (window.FPI) {
      Object.keys(FPI_EVENTS)
        .filter(ev => !getSkipEvents().includes(FPI_EVENTS[ev]))
        .forEach(event => {
          FPI.event.on(FPI_EVENTS[event], eventData => {
            console.log("FPI " + event);
            trackEvent(FPI_EVENTS[event], eventData);
          });
        });
    }
  }
  
  consumeEvent();`,

  // Optional keys
  image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyndnp/wrkr/x5/misc/pictures/free-icon/original/PSpnazzPe-ezl6UPQ-U-logo.png",
  note: "Meta Pixel tracks conversions from Facebook and Instagram ads. You can either use GTM to manage Pixel events or integrate Meta Pixel directly. For Conversions API, you'll need an Access Token from Facebook Business Manager. Find your Pixel ID in Facebook Events Manager under Data Sources > Pixels.",
  field_mappings: {
    useGTM: 'use_gtm',
    pixelId: 'pixel_id',
    enableConversionsApi: 'enable_conversions_api',
    conversionsApiPixelId: 'conversions_api_pixel_id',
    accessToken: 'access_token',
    testEventCode: 'test_event_code'
  },
  layout: {
    columns: 2,
    gap: '20px'
  },
  
  // Custom validation function to check all required fields based on current configuration
  validate: function(formData) {
    const errors = {};
    const useGTM = isTrue(formData.useGTM);
    const enableConversionsApi = isTrue(formData.enableConversionsApi);
    
    // Pixel ID optional; validate format only if provided
    if (formData.pixelId && formData.pixelId.trim() !== '') {
      if (!/^[0-9]{15,16}$/.test(formData.pixelId.trim())) {
        errors.pixelId = 'Must be a valid Meta Pixel ID (15-16 digits)';
      }
    }
    
    // Case 2: Conversions API is ON - both conversionsApiPixelId AND accessToken are required
    if (enableConversionsApi) {
      if (!formData.conversionsApiPixelId || formData.conversionsApiPixelId.trim() === '') {
        errors.conversionsApiPixelId = 'Meta Pixel ID is required for Conversions API';
      } else if (!/^[0-9]{15,16}$/.test(formData.conversionsApiPixelId.trim())) {
        errors.conversionsApiPixelId = 'Must be a valid Meta Pixel ID (15-16 digits)';
      }
      
      if (!formData.accessToken || formData.accessToken.trim() === '') {
        errors.accessToken = 'Access Token is required for Conversions API';
      } else if (formData.accessToken.trim().length < 50) {
        errors.accessToken = 'Must be a valid access token (at least 50 characters)';
      }
      
      // Validate testEventCode if provided (optional field)
      if (formData.testEventCode && formData.testEventCode.trim() !== '') {
        if (!/^[A-Z0-9]{8,10}$/.test(formData.testEventCode.trim())) {
          errors.testEventCode = 'Must be a valid test event code (8-10 uppercase alphanumeric characters)';
        }
      }
    }
    
    // Case 3: Both GTM ON and Conversions API OFF - no additional fields required (GTM handles it)
    // Case 4: Both GTM ON and Conversions API ON - only Conversions API fields required (handled above)
    
    // Case 5: If neither GTM nor Conversions API provides valid config, require at least one
    if (useGTM && !enableConversionsApi) {
      // GTM only mode - this is valid, no additional validation needed
    }
    
    return errors;
  },
  
  saveButtonDisabled: function(formData, errors, component) {
    const useGTM = isTrue(formData.useGTM);
    const enableConversionsApi = isTrue(formData.enableConversionsApi);
    
    // Run custom validation
    const validationErrors = this.validate ? this.validate(formData) : {};
    const hasValidationErrors = Object.keys(validationErrors).length > 0;
    
    // Check if form has any errors (from component or custom validation)
    if (hasValidationErrors) {
      return true;
    }
    
    // If component has its own validation, also check that
    if (component && component.isFormValid === false) {
      return true;
    }
    
    // Scenario 1: Conversions API is ON - BOTH conversionsApiPixelId AND accessToken must be filled
    if (enableConversionsApi) {
      // Check Pixel ID for Conversions API
      if (!formData.conversionsApiPixelId || formData.conversionsApiPixelId.trim() === '') {
        return true;
      }
      if (!/^[0-9]{15,16}$/.test(formData.conversionsApiPixelId.trim())) {
        return true;
      }
      
      // Check Access Token - MANDATORY when Conversions API is enabled
      if (!formData.accessToken || formData.accessToken.trim() === '') {
        return true;
      }
      if (formData.accessToken.trim().length < 50) {
        return true;
      }
      
      // Check testEventCode format if provided
      if (formData.testEventCode && formData.testEventCode.trim() !== '') {
        if (!/^[A-Z0-9]{8,10}$/.test(formData.testEventCode.trim())) {
          return true;
        }
      }
    }
    
    return false;
  }
});

module.exports = metaPixelTemplate; 
/**
 * Meta Pixel (Facebook Pixel) Template
 */

const createTemplate = require('../utils/createTemplate');

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
      name: 'pixelId',
      type: 'text',
      label: 'Meta Pixel ID',
      placeholder: '1234567890123456',
      required: true,
      size: 'full',
      description: 'Your Meta Pixel ID from Facebook Events Manager.',
      validation: {
        pattern: /^\d{15,16}$/,
        message: 'Must be a valid Meta Pixel ID (15-16 digits)',
      }
    },
    {
      name: 'enableAdvancedMatching',
      type: 'boolean',
      label: 'Enable Advanced Matching',
      required: false,
      size: 'half',
      description: 'Automatically send hashed customer information to improve event matching.',
      default: true
    },
    {
      name: 'enableAutomaticMatching',
      type: 'boolean',
      label: 'Enable Automatic Matching',
      required: false,
      size: 'half',
      description: 'Automatically collect additional website visitor information.',
      default: true
    },
    {
      name: 'testEventCode',
      type: 'text',
      label: 'Test Event Code',
      placeholder: 'TEST12345',
      required: false,
      size: 'full',
      description: 'Test event code for testing pixel events (optional, for development only).',
      validation: {
        pattern: /^[A-Z0-9]{8,10}$/,
        message: 'Must be a valid test event code (8-10 uppercase alphanumeric characters)',
      }
    },
    {
      name: 'trackPageView',
      type: 'boolean',
      label: 'Track Page Views',
      required: false,
      size: 'half',
      description: 'Automatically track page view events.',
      default: true
    },
    {
      name: 'trackCustomEvents',
      type: 'boolean',
      label: 'Track E-commerce Events',
      required: false,
      size: 'half',
      description: 'Track AddToCart, Purchase, and other e-commerce events.',
      default: true
    },
    {
      name: 'currency',
      type: 'text',
      label: 'Default Currency',
      placeholder: 'INR',
      required: false,
      size: 'half',
      description: 'Default currency code for purchase events (e.g., USD, EUR, INR).',
      default: 'INR',
      validation: {
        pattern: /^[A-Z]{3}$/,
        message: 'Must be a valid 3-letter currency code (e.g., USD, EUR, INR)',
      }
    }
  ],
  script: `window.addEventListener("load", function() {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize pixel
    {{#if testEventCode}}
    fbq('init', '{{pixelId}}', {
      em: 'auto',
      {{#if enableAdvancedMatching}}
      advanced_matching: true,
      {{/if}}
      {{#if enableAutomaticMatching}}
      automatic_matching: true
      {{/if}}
    }, '{{testEventCode}}');
    {{else}}
    fbq('init', '{{pixelId}}', {
      em: 'auto'{{#if enableAdvancedMatching}},
      advanced_matching: true{{/if}}{{#if enableAutomaticMatching}},
      automatic_matching: true{{/if}}
    });
    {{/if}}

    {{#if trackPageView}}
    fbq('track', 'PageView');
    {{/if}}
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
        eventData.currency = '{{currency}}';
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
          eventData.currency = data.product.price.currency_code || '{{currency}}';
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
          eventData.currency = data.order.total_details.currency || '{{currency}}';
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
      if (!{{trackCustomEvents}} || !window.fbq) return;
      
      const eventName = getMetaPixelEventName(event);
      if (eventName) {
        const eventData = formatEventData(event, data);
        
        {{#if testEventCode}}
        fbq('trackSingle', '{{pixelId}}', eventName, eventData, '{{testEventCode}}');
        {{else}}
        fbq('track', eventName, eventData);
        {{/if}}
        
        console.log('Meta Pixel Event:', eventName, eventData);
      }
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
  img: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyndnp/wrkr/x5/misc/pictures/free-icon/original/PSpnazzPe-ezl6UPQ-U-logo.png",
  note: "Meta Pixel tracks conversions from Facebook and Instagram ads. Find your Pixel ID in Facebook Events Manager under Data Sources > Pixels.",
  field_mappings: {
    pixelId: 'pixel_id',
    enableAdvancedMatching: 'advanced_matching',
    enableAutomaticMatching: 'automatic_matching',
    testEventCode: 'test_event_code',
    trackPageView: 'track_pageview',
    trackCustomEvents: 'track_custom_events',
    currency: 'default_currency'
  },
  layout: {
    columns: 2,
    gap: '20px'
  },
  saveButtonDisabled: function(formData, errors, component) {
    return !component.isFormValid;
  }
});

module.exports = metaPixelTemplate; 
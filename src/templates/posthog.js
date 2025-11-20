/**
 * PostHog Analytics Template
 */

const createTemplate = require('../utils/createTemplate');

const posthogTemplate = createTemplate({
  // Required keys
  name: 'PostHog',
  path: "posthog",
  description: "Open-source product analytics platform with session recordings, feature flags, and experiments.",
  template_id: "1032",
  template_version: "1.0.0",
  category: 'analytics',
  fields: [
    {
      name: 'apiKey',
      type: 'text',
      label: 'PostHog API Key',
      placeholder: 'phc_xxxxxxxxxxxxxxxxxxxxxxxxxx',
      required: true,
      size: 'full',
      description: 'Your PostHog project API key from the project settings.',
      validation: {
        pattern: /^phc_[a-zA-Z0-9]+$/,
        message: 'Must be a valid PostHog API key (starts with phc_)',
      }
    },
    {
      name: 'instanceUrl',
      type: 'text',
      label: 'PostHog Instance URL',
      placeholder: 'https://app.posthog.com',
      required: false,
      size: 'full',
      description: 'PostHog instance URL. Leave blank for PostHog Cloud (app.posthog.com).',
      default: 'https://app.posthog.com',
      validation: {
        pattern: /^https?:\/\/.+/,
        message: 'Must be a valid URL starting with http:// or https://',
      }
    },
    {
      name: 'enableSessionRecording',
      type: 'boolean',
      label: 'Enable Session Recording',
      required: false,
      size: 'half',
      description: 'Automatically record user sessions for replay and analysis.',
      default: true
    },
    {
      name: 'capturePageview',
      type: 'boolean',
      label: 'Auto-capture Pageviews',
      required: false,
      size: 'half',
      description: 'Automatically track page views.',
      default: true
    },
    {
      name: 'captureClicks',
      type: 'boolean',
      label: 'Auto-capture Clicks',
      required: false,
      size: 'half',
      description: 'Automatically capture click events on buttons and links.',
      default: true
    },
    {
      name: 'maskAllInputs',
      type: 'boolean',
      label: 'Mask All Text Inputs',
      required: false,
      size: 'half',
      description: 'Mask all text inputs in session recordings for privacy.',
      default: true
    },
    {
      name: 'debug',
      type: 'boolean',
      label: 'Enable Debug Mode',
      required: false,
      size: 'half',
      description: 'Enable debug logging in browser console.',
      default: false
    }
  ],
  script: `window.addEventListener("load", function() {
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    
    const config = {
      api_host: "{{instanceUrl}}",
      autocapture: {{captureClicks}},
      capture_pageview: {{capturePageview}},
      disable_session_recording: !{{enableSessionRecording}},
      session_recording: {
        maskAllInputs: {{maskAllInputs}},
        maskInputOptions: {
          password: true
        }
      },
      loaded: function(posthog) {
        if ({{debug}}) {
          posthog.debug();
        }
      }
    };
    
    posthog.init("{{apiKey}}", config);
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

    const getPostHogEventName = (event) => {
      const POSTHOG_EVENTS = {
        [FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW]: "Product Viewed",
        [FPI_EVENTS.ADD_TO_CART]: "Product Added to Cart",
        [FPI_EVENTS.REMOVE_FROM_CART]: "Product Removed from Cart",
        [FPI_EVENTS.ORDER_CHECKOUT]: "Checkout Started",
        [FPI_EVENTS.ORDER_PROCESSED]: "Order Completed",
        [FPI_EVENTS.REFUND_SUCCESS]: "Order Refunded",
        [FPI_EVENTS.PRODUCT_LIST_VIEW]: "Product List Viewed",
        [FPI_EVENTS.COLLECTION_LIST_VIEW]: "Collection Viewed",
        [FPI_EVENTS.ADD_TO_WISHLIST]: "Product Added to Wishlist",
        [FPI_EVENTS.VIEW_CART]: "Cart Viewed",
        [FPI_EVENTS.SEARCH_PRODUCTS]: "Products Searched",
        [FPI_EVENTS.ADD_PAYMENT_INFORMATION]: "Payment Info Added",
        [FPI_EVENTS.ADD_ADDRESS_INFORMATION]: "Shipping Info Added",
        [FPI_EVENTS.LOG_IN]: "User Logged In",
        [FPI_EVENTS.LOG_OUT]: "User Logged Out",
        [FPI_EVENTS.PROFILE_UPDATE]: "Profile Updated"
      };
      return POSTHOG_EVENTS[event] || null;
    };

    const trackEvent = (event, data) => {
      const eventName = getPostHogEventName(event);
      if (eventName && window.posthog) {
        // Clean and structure the data for PostHog
        const cleanData = { ...data };
        delete cleanData.userAgent;
        
        posthog.capture(eventName, cleanData);
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
  image: "https://posthog.com/brand/posthog-logo.svg",
  note: "PostHog provides product analytics, session recordings, feature flags, and A/B testing. The API key can be found in your PostHog project settings.",
  field_mappings: {
    apiKey: 'api_key',
    instanceUrl: 'instance_url',
    enableSessionRecording: 'session_recording_enabled',
    capturePageview: 'auto_pageview',
    captureClicks: 'auto_clicks',
    maskAllInputs: 'mask_inputs',
    debug: 'debug_mode'
  },
  layout: {
    columns: 2,
    gap: '20px'
  },
  saveButtonDisabled: function(formData, errors, component) {
    return !component.isFormValid;
  }
});

module.exports = posthogTemplate; 
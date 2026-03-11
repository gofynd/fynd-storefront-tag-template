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
      disabled_when: {
        field: 'useGTM',
        value: true
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
      required: false,
      required_when: {
        field: 'enableConversionsApi',
        value: true
      },
      size: 'full',
      description: 'Meta Pixel ID is required for Conversions API',
      visible_when: {
        field: 'enableConversionsApi',
        value: true
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
      required: false,
      required_when: {
        field: 'enableConversionsApi',
        value: true
      },
      size: 'full',
      description: 'Access Token is mandatory for Conversions API. Get it from Facebook Business Manager.',
      visible_when: {
        field: 'enableConversionsApi',
        value: true
      },
      validation: {
        pattern: "/^.{50,}$/",
        message: 'Access Token is required and must be at least 50 characters',
        required_message: 'Access Token is required when Conversions API is enabled'
      }
    },
    // {
    //   name: 'testEventCode',
    //   type: 'text',
    //   label: 'Test Events Code',
    //   placeholder: 'Enter test events code',
    //   required: false,
    //   size: 'full',
    //   description: 'Use this if you need to test the server-side event. Remove it after testing.',
    //   visible_when: {
    //     field: 'enableConversionsApi',
    //     value: true
    //   },
    //   validation: {
    //     pattern: "/^[A-Za-z0-9]+$/",
    //     message: 'Must be a valid test event code (alphanumeric characters only)',
    //   },
    //   button_config: {
    //     label: 'Test',
    //     theme: 'primary',
    //     position: 'inline',
    //     api: {
    //       method: 'POST',
    //       endpoint: '/api/ext/v1/company/{companyId}/application/{appId}/capi/test',
    //       buildPayload: function(formData) {
    //         return {
    //           test_code: formData.testEventCode,
    //           pixel_id: formData.conversionsApiPixelId,
    //           access_token: formData.accessToken
    //         };
    //       },
    //       validateBeforeCall: function(formData) {
    //         const errors = [];
    //         if (!formData.testEventCode || formData.testEventCode.trim() === '') {
    //           errors.push('Test Events Code is required');
    //         }
    //         if (!formData.conversionsApiPixelId || formData.conversionsApiPixelId.trim() === '') {
    //           errors.push('Meta Pixel ID is required for testing');
    //         }
    //         if (!formData.accessToken || formData.accessToken.trim() === '') {
    //           errors.push('Access Token is required for testing');
    //         }
    //         return errors;
    //       }
    //     }
    //   }
    // }
  ],
  events: {
    pixel: {
      label: 'Meta Pixel Events',
      banner: 'Please enable Meta Pixel to enable Meta custom events',
      items: [
        {
          name: 'addToCart',
          type: 'event',
          label: 'Add To Cart',
          description: 'The event is triggered when a visitor adds a product to the cart.',
          is_enabled: false
        },
        {
          name: 'addToWishlist',
          type: 'event',
          label: 'Add To Wishlist',
          description: 'The event is triggered when a visitor adds a product to the wish list.',
          is_enabled: false
        },
        {
          name: 'initiateCheckout',
          type: 'event',
          label: 'Initiate Checkout',
          description: 'The event will be triggered when a visitor selects a product or a service, adds it to the cart, and clicks on the checkout button intending to make a purchase.',
          is_enabled: false
        },
        {
          name: 'purchase',
          type: 'event',
          label: 'Purchase',
          description: 'This event is triggered when the payment is completed, and the receipt is generated. This event can be set to fire when the customer views the "Thank You" page after they purchase.',
          is_enabled: false
        },
        {
          name: 'search',
          type: 'event',
          label: 'Search',
          description: 'This event refers to the searches that are performed on a website.',
          is_enabled: false
        },
        {
          name: 'viewContent',
          type: 'event',
          label: 'View Content',
          description: 'This event helps in tracking those who view a specific page on a website. It could be a products description page (PDP) or any kind of landing page. This Meta Pixel function only indicates that a user has visited the specified URL. It helps in remarketing. You can trigger this event on product landing page (PLP), PDP, and homepage.',
          is_enabled: false
        }
      ]
    },
    capi: {
      label: 'Meta Conversion Events',
      banner: 'Please enable Meta Conversion API to enable Conversion API custom events',
      items: [
        {
          name: 'addToCart',
          type: 'event',
          label: 'Add To Cart',
          description: 'The event is triggered when a visitor adds a product to the cart.',
          is_enabled: false
        },
        {
          name: 'addToWishlist',
          type: 'event',
          label: 'Add To Wishlist',
          description: 'The event is triggered when a visitor adds a product to the wish list.',
          is_enabled: false
        },
        {
          name: 'initiateCheckout',
          type: 'event',
          label: 'Initiate Checkout',
          description: 'The event will be triggered when a visitor selects a product or a service, adds it to the cart, and clicks on the checkout button intending to make a purchase.',
          is_enabled: false
        },
        {
          name: 'purchase',
          type: 'event',
          label: 'Purchase',
          description: 'This event is triggered when the payment is completed, and the receipt is generated. This event can be set to fire when the customer views the "Thank You" page after they purchase.',
          is_enabled: false
        },
        {
          name: 'search',
          type: 'event',
          label: 'Search',
          description: 'This event refers to the searches that are performed on a website.',
          is_enabled: false
        },
        {
          name: 'viewContent',
          type: 'event',
          label: 'View Content',
          description: 'This event helps in tracking those who view a specific page on a website. It could be a products description page (PDP) or any kind of landing page. This Meta Pixel function only indicates that a user has visited the specified URL. It helps in remarketing. You can trigger this event on product landing page (PLP), PDP, and homepage.',
          is_enabled: false
        }
      ]
    }
  },

  // ✅ UPDATED SCRIPT (Purchase event_id = Purchase_<OrderID>)
  script: `window.addEventListener("load", function() {
    if (!{{useGTM}}) {
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
    }
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
      ORDER_CHECKOUT: "order.checkedout",
      ADD_PAYMENT_INFORMATION: "order.payment_information",
      ADD_ADDRESS_INFORMATION: "order.address_information",
      ORDER_PROCESSED: "order.processed",
      ORDER_TRACKING_VIEW: "order_tracking.view",
      REFUND_SUCCESS: "refund.success",
      SEARCH_PRODUCTS: "search.products",
      PINCODE_SERVICEABILITY: "pincode.serviceablility"
    };

    // ✅ FIX 1: Prevent multiple FPI bindings (SPA / multiple injections)
    if (window.__META_PIXEL_FPI_BOUND__) {
      console.log('[Meta Pixel] FPI listeners already bound, skipping re-bind');
      return;
    }
    window.__META_PIXEL_FPI_BOUND__ = true;

    // ✅ FIX 2: Search debounce + TTL dedupe (prevents "fired twice" warnings)
    let __searchTimer = null;
    let __pendingSearch = null;
    const SEARCH_DEBOUNCE_MS = 900; // send after user pauses typing
    const MIN_QUERY_LEN = 2;        // ignore tiny queries
    const SEARCH_TTL_MS = 30000;    // don't send same query again for 30s
    const __searchSeen = {};        // { query: timestamp }

    const scheduleSearch = (sendFn, eventName, eventData, eventId) => {
      const q = (eventData && eventData.search_string) ? String(eventData.search_string).trim() : "";
      if (!q || q.length < MIN_QUERY_LEN) return;

      __pendingSearch = { eventName, eventData, eventId };

      if (__searchTimer) clearTimeout(__searchTimer);
      __searchTimer = setTimeout(() => {
        if (!__pendingSearch) return;

        const latestQ = String(__pendingSearch.eventData.search_string || "").trim();
        const now = Date.now();

        // cleanup old entries
        Object.keys(__searchSeen).forEach(k => {
          if (now - __searchSeen[k] > SEARCH_TTL_MS) delete __searchSeen[k];
        });

        // TTL dedupe: don't send same query repeatedly
        if (!latestQ || latestQ.length < MIN_QUERY_LEN) {
          __pendingSearch = null;
          return;
        }

        if (!__searchSeen[latestQ]) {
          __searchSeen[latestQ] = now;
          sendFn(__pendingSearch.eventName, __pendingSearch.eventData, __pendingSearch.eventId);
          console.log('[Meta Pixel] Search sent (debounced+ttl):', latestQ);
        } else {
          console.log('[Meta Pixel] Search skipped (ttl dedupe):', latestQ);
        }

        __pendingSearch = null;
      }, SEARCH_DEBOUNCE_MS);
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

    // Robust URL param getter (supports query + hash-query)
    const getParamFromUrl = (key) => {
      try {
        const url = new URL(window.location.href);

        const direct = url.searchParams.get(key);
        if (direct) return direct;

        if (url.hash && url.hash.includes("?")) {
          const hashQuery = url.hash.split("?")[1];
          const sp = new URLSearchParams(hashQuery);
          const fromHash = sp.get(key);
          if (fromHash) return fromHash;
        }

        return null;
      } catch (e) {
        return null;
      }
    };

    // ✅ Purchase event_id: Purchase_<OrderID>
    const buildEventId = (eventName, eventData) => {
      if (eventName !== "Purchase") return null;
      if (!eventData || !eventData.order_id) return null;
      return eventName + "_" + eventData.order_id;
    };

    // ✅ Extract search string from your payload shape
    const extractSearchString = (data) => {
      if (!data) return null;
      if (data.search_text) return data.search_text; // your event has this

      // fallback: from suggestions array
      try {
        const first = data.items && data.items[0];
        const qArr = first && first.action && first.action.page && first.action.page.query && first.action.page.query.q;
        if (Array.isArray(qArr) && qArr[0]) return qArr[0];
      } catch (e) {}
      return null;
    };

    const formatEventData = (event, data) => {
      console.log('[Meta Pixel] formatEventData:', event, data);
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
        if (data.order.order_id) eventData.order_id = data.order.order_id;

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

      // ✅ Purchase fallback: order_id from thank-you URL
      if (event === FPI_EVENTS.ORDER_PROCESSED && !eventData.order_id) {
        const oid = getParamFromUrl("order_id");
        if (oid) eventData.order_id = oid;
      }

      // ✅ Search string fix: payload (search_text) -> URL fallback
      if (event === FPI_EVENTS.SEARCH_PRODUCTS) {
        const fromPayload = extractSearchString(data);
        const fromUrl =
          getParamFromUrl("q") ||
          getParamFromUrl("query") ||
          getParamFromUrl("search") ||
          getParamFromUrl("term") ||
          getParamFromUrl("text");

        const q = fromPayload || fromUrl;
        if (q) eventData.search_string = String(q);

        console.log('[Meta Pixel] resolved search_string:', eventData.search_string, 'source:', data && data.source);
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
      try {
        const eventName = getMetaPixelEventName(event);
        console.log('[Meta Pixel] trackEvent:', eventName, data);
        if (!eventName) return;

        const eventData = formatEventData(event, data);
        const eventId = buildEventId(eventName, eventData);
        if (eventId) eventData.event_id = eventId;

        // ✅ GTM only if enabled AND dataLayer exists; else fallback to fbq
        const shouldUseGTM = ({{useGTM}} && Array.isArray(window.dataLayer));

        const sendNow = (evName, evData, evId) => {
          if (shouldUseGTM) {
            window.dataLayer.push({
              event: 'meta_pixel_event',
              fb_event_name: evName,
              fb_event_data: evData,
              fb_event_id: evId
            });
            console.log('Meta Pixel Event (via GTM):', evName, evData, evId);
            return;
          }

          if (!window.fbq) {
            console.warn('[Meta Pixel] fbq not available');
            return;
          }

          if (evId) fbq('track', evName, evData, { eventID: evId });
          else fbq('track', evName, evData);

          console.log('Meta Pixel Event (direct):', evName, evData, evId);
        };

        // ✅ Search: debounce + TTL dedupe
        if (eventName === "Search") {
          scheduleSearch(sendNow, eventName, eventData, eventId);
          console.log('[Meta Pixel] Search scheduled:', eventData.search_string);
          return;
        }

        // Other events: send immediately
        sendNow(eventName, eventData, eventId);
      } catch (e) {
        console.error('[Meta Pixel] trackEvent error:', e);
      }
    };

    const getSkipEvents = () => [];

    if (window.FPI) {
      Object.keys(FPI_EVENTS)
        .filter(ev => !getSkipEvents().includes(FPI_EVENTS[ev]))
        .forEach(event => {
          FPI.event.on(FPI_EVENTS[event], eventData => {
            console.log("FPI [Meta Pixel] " + event);
            trackEvent(FPI_EVENTS[event], eventData);
          });
        });
    } else {
      console.warn('[Meta Pixel] window.FPI not available');
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
    testEventCode: 'test_event_code',
    // Pixel events
    'pixel.addToCart': 'pixel_add_to_cart',
    'pixel.addToWishlist': 'pixel_add_to_wishlist',
    'pixel.initiateCheckout': 'pixel_initiate_checkout',
    'pixel.purchase': 'pixel_purchase',
    'pixel.search': 'pixel_search',
    'pixel.viewContent': 'pixel_view_content',
    // CAPI events
    'capi.addToCart': 'capi_add_to_cart',
    'capi.addToWishlist': 'capi_add_to_wishlist',
    'capi.initiateCheckout': 'capi_initiate_checkout',
    'capi.purchase': 'capi_purchase',
    'capi.search': 'capi_search',
    'capi.viewContent': 'capi_view_content'
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
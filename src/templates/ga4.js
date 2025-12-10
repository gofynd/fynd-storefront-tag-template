/**
 * Google Analytics 4 Template
 */

const createTemplate = require('../utils/createTemplate');

const ga4Template = createTemplate({
  name: 'Google Analytics',
  path: "google-analytics",
  description: "tracks and reports website traffic, providing insights to help optimize your site's performance.",
  image: "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyndnp/wrkr/x5/misc/pictures/free-icon/original/iejFtwUQr-logo.png",
  note:"The APP_ID for your Google Analytics account is available on the Google Analytics Dashboard in **Settings > App Settings > Account Settings > APP ID**.",
  template_id: "1003",
  template_version: "1.0.0",
  category: 'analytics',
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
      label: 'Google Analytics Measurement ID',
      placeholder: 'G-XXXXXXXXXX',
      required: true,
      size: 'medium',
      description: 'GA4 (G-XXXXXXXXXX) or UA ID. Find in Admin → Data Streams.',
      validation: {
        pattern: "/^(G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)$/i",
        message: 'Must be a valid Measurement ID (e.g., G-XXXXXXXXXX or UA-XXXXXXXXX-X)',
      },
    },
  ],
  script: `window.addEventListener("load", function() {
    // Initialize dataLayer and gtag globally BEFORE loading the script
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "{{measurementId}}", { send_page_view: false });

    // Load the GA4 script
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id={{measurementId}}';
    document.head.appendChild(script);

    // Track initial page view
    trackPageView();

    function trackPageView() {
      const currentPath = window.location.pathname + window.location.search;
      
      gtag('event', 'page_view', {
        page_path: currentPath,
        page_title: document.title,
        page_location: window.location.href
      });
      console.log('[GA4] Page view tracked:', currentPath);
    }

    // Override history.pushState for SPA navigation
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState;
      window.history.pushState = function() {
        originalPushState.apply(window.history, arguments);
        setTimeout(trackPageView, 100);
      };

      const originalReplaceState = window.history.replaceState;
      window.history.replaceState = function() {
        originalReplaceState.apply(window.history, arguments);
        setTimeout(trackPageView, 100);
      };
    }

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', function() {
      setTimeout(trackPageView, 100);
    });
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

    // Map FPI events to GA4 recommended e-commerce event names
    const getGA4EventName = (event) => {
      const GA4_EVENTS = {
        [FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW]: "view_item",
        [FPI_EVENTS.ADD_TO_CART]: "add_to_cart",
        [FPI_EVENTS.REMOVE_FROM_CART]: "remove_from_cart",
        [FPI_EVENTS.ORDER_CHECKOUT]: "begin_checkout",
        [FPI_EVENTS.ORDER_PROCESSED]: "purchase",
        [FPI_EVENTS.REFUND_SUCCESS]: "refund",
        [FPI_EVENTS.PRODUCT_LIST_VIEW]: "view_item_list",
        [FPI_EVENTS.COLLECTION_LIST_VIEW]: "view_item_list",
        [FPI_EVENTS.ADD_TO_WISHLIST]: "add_to_wishlist",
        [FPI_EVENTS.VIEW_CART]: "view_cart",
        [FPI_EVENTS.SEARCH_PRODUCTS]: "search",
        [FPI_EVENTS.ADD_PAYMENT_INFORMATION]: "add_payment_info",
        [FPI_EVENTS.ADD_ADDRESS_INFORMATION]: "add_shipping_info",
        [FPI_EVENTS.LOG_IN]: "login",
        [FPI_EVENTS.LOG_OUT]: "logout",
        [FPI_EVENTS.PRODUCT_LIST_CLICK]: "select_item"
      };
      return GA4_EVENTS[event] || null;
    };

    // Format product data to GA4 e-commerce item format
    const formatProductItem = (product, quantity) => {
      if (!product) return null;
      
      const item = {
        item_id: product.id || product.uid || product.slug,
        item_name: product.name
      };
      
      if (product.brand && product.brand.name) {
        item.item_brand = product.brand.name;
      }
      
      if (product.categories && product.categories.length > 0) {
        item.item_category = product.categories[0].name;
        if (product.categories.length > 1) {
          item.item_category2 = product.categories[1].name;
        }
      }
      
      if (product.price) {
        item.price = product.price.effective || product.price.marked;
        item.currency = product.price.currency_code || 'INR';
      }
      
      if (quantity) {
        item.quantity = quantity;
      }
      
      return item;
    };

    // Format event data for GA4
    const formatEventData = (event, data) => {
      const eventData = {};
      
      // Product data (single product view)
      if (data.product) {
        const item = formatProductItem(data.product, 1);
        if (item) {
          eventData.items = [item];
          if (item.price) {
            eventData.value = item.price;
            eventData.currency = item.currency || 'INR';
          }
        }
      }

      // Cart data (multiple items)
      if (data.cart && data.cart.items) {
        eventData.items = data.cart.items.map(cartItem => {
          return formatProductItem(cartItem.product, cartItem.quantity || 1);
        }).filter(Boolean);
        
        if (data.cart.breakup_values) {
          eventData.value = data.cart.breakup_values.raw?.total || 0;
          eventData.currency = data.cart.currency || 'INR';
        }
      }

      // Order/Purchase data
      if (data.order) {
        if (data.order.order_id) {
          eventData.transaction_id = data.order.order_id;
        }
        
        if (data.order.bags && data.order.bags.length > 0) {
          const items = data.order.bags.flatMap(bag => bag.items || []);
          eventData.items = items.map(item => {
            return formatProductItem(item.product, item.quantity || 1);
          }).filter(Boolean);
        }

        if (data.order.total_details) {
          eventData.value = data.order.total_details.total;
          eventData.currency = data.order.total_details.currency || 'INR';
          if (data.order.total_details.delivery_charge) {
            eventData.shipping = data.order.total_details.delivery_charge;
          }
        }
      }

      // Product list data
      if (data.products && Array.isArray(data.products)) {
        eventData.items = data.products.map((product, index) => {
          const item = formatProductItem(product, 1);
          if (item) {
            item.index = index;
          }
          return item;
        }).filter(Boolean);
        
        if (data.list_name || data.collection_name) {
          eventData.item_list_name = data.list_name || data.collection_name;
        }
      }

      // Search data
      if (data.query || data.search_query) {
        eventData.search_term = data.query || data.search_query;
      }

      return eventData;
    };

    const trackEvent = (event, data) => {
      const eventName = getGA4EventName(event);
      if (!eventName) return;
      
      if (!window.gtag) {
        console.warn('[GA4] gtag not available yet');
        return;
      }
      
      const eventData = formatEventData(event, data);
      
      // Send to GA4
      gtag('event', eventName, eventData);
      console.log('[GA4] Event tracked:', eventName, eventData);
    };

    const getSkipEvents = () => [];

    if (window.FPI) {
      Object.keys(FPI_EVENTS)
        .filter(ev => !getSkipEvents().includes(FPI_EVENTS[ev]))
        .forEach(event => {
          FPI.event.on(FPI_EVENTS[event], eventData => {
            console.log("[GA4] FPI " + event);
            trackEvent(FPI_EVENTS[event], eventData);
          });
        });
    }
  }
  
  consumeEvent();`
});

module.exports = ga4Template; 
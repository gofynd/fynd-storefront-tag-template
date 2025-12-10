/**
 * Google Tag Manager Template
 */

const createTemplate = require('../utils/createTemplate');

const gtmTemplate = createTemplate({
  // Required keys
  name: 'Google Tag Manager',
  path: "google-tag-manager",
  description: "Integrate Google Tag Manager for advanced analytics.",
  template_id: "1001",
  template_version: "1.0.0",
  category: 'analytics',
  fields: [
    {
      name: 'gtmId',
      type: 'text',
      label: 'Google Tag Manager ID',
      placeholder: 'GTM-XXXXXXX',
      required: true,
      size: 'full',
      description: 'Container ID from GTM dashboard. Format: GTM-XXXXXXX.',
      validation: {
        pattern: "/^GTM-[A-Z0-9]+$/i",
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
  script: `window.addEventListener("load", function() {
    // Initialize dataLayer globally
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Load GTM script
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id={{gtmId}}';
    f.parentNode.insertBefore(j, f);

    // Track initial page view
    trackPageView();

    function trackPageView() {
      const currentPath = window.location.pathname + window.location.search;
      
      // Push virtual page view to dataLayer
      dataLayer.push({
        event: 'page_view',
        page_path: currentPath,
        page_title: document.title,
        page_location: window.location.href
      });
      console.log('[GTM] Page view tracked:', currentPath);
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

    // Map FPI events to GTM/GA4 Enhanced Ecommerce event names
    const getGTMEventName = (event) => {
      const GTM_EVENTS = {
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
        [FPI_EVENTS.PROFILE_UPDATE]: "profile_update",
        [FPI_EVENTS.PRODUCT_LIST_CLICK]: "select_item",
        [FPI_EVENTS.UPDATE_CART]: "cart_update"
      };
      return GTM_EVENTS[event] || null;
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

    // Format event data for GTM dataLayer
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

      // User data
      if (data.user) {
        eventData.user_id = data.user.id || data.user.uid;
      }

      return eventData;
    };

    const pushToDataLayer = (event, data) => {
      const eventName = getGTMEventName(event);
      if (!eventName) return;

      if (!window.dataLayer) {
        console.warn('[GTM] dataLayer not available yet');
        return;
      }

      const eventData = formatEventData(event, data);

      // Clear previous ecommerce data (GA4 best practice)
      dataLayer.push({ ecommerce: null });
      
      // Push to dataLayer
      dataLayer.push({
        event: eventName,
        ecommerce: eventData
      });
      
      console.log('[GTM] Event pushed:', eventName, eventData);
    };

    const getSkipEvents = () => [];

    if (window.FPI) {
      Object.keys(FPI_EVENTS)
        .filter(ev => !getSkipEvents().includes(FPI_EVENTS[ev]))
        .forEach(event => {
          FPI.event.on(FPI_EVENTS[event], eventData => {
            console.log("[GTM] FPI " + event);
            pushToDataLayer(FPI_EVENTS[event], eventData);
          });
        });
    }
  }
  
  consumeEvent();`,
  
  // Optional keys
  image: "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_tag_manager.svg",
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
});

module.exports = gtmTemplate; 
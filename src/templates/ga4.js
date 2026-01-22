/**
 * Google Analytics 4 Template
 */

const createTemplate = require('../utils/createTemplate');

const ga4Template = createTemplate({
  name: 'Google Analytics',
  path: "google-analytics",
  description: "tracks and reports website traffic, providing insights to help optimize your site's performance.",
  image: "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyndnp/wrkr/x5/misc/pictures/free-icon/original/iejFtwUQr-logo.png",
  help_link: {
    text: "More information about the google analytics and a link to full documentation",
    url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm",
    label: "click here"
  },
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

  const consumeEvent = () => {
    const GA_FPI_EVENTS = {
      // USER
      LOG_IN: 'user.login',
      LOG_OUT: 'user.logout',
      PROFILE_UPDATE: 'user.update',
      // PLP
      PRODUCT_LIST_VIEW: 'product_list.view',
      COLLECTION_LIST_VIEW: 'collection_list.view',
      PRODUCT_LIST_CLICK: 'product_list.click',
      PRODUCT_FILTER: 'product_list.filter',
      PRODUCT_SORT: 'product_list.sort',
      // PDP
      PRODUCT_DETAIL_PAGE_VIEW: 'product.view',
      NOTIFY_PRODUCT: 'notify.product',
      ADD_TO_COMPARE: 'compare.add',
      REMOVE_FROM_COMPARE: 'compare.remove',
      ADD_TO_WISHLIST: 'wishlist.add',
      REMOVE_FROM_WISHLIST: 'wishlist.remove',
      // CART
      VIEW_CART: 'cart.view',
      ADD_TO_CART: 'cart.newProduct',
      REMOVE_FROM_CART: 'cart.remove',
      UPDATE_CART: 'cart.update',
      // ORDER
      ORDER_CHECKOUT: 'order.checkout',
      ADD_PAYMENT_INFORMATION: 'order.payment_information',
      ADD_ADDRESS_INFORMATION: 'order.address_information',
      ORDER_PROCESSED: 'order.processed',
      ORDER_TRACKING_VIEW: 'order_tracking.view',
      // REFUND
      REFUND_SUCCESS: 'refund.success',
      // SEARCH
      SEARCH_PRODUCTS: 'search.products',
      PINCODE_SERVICEABILITY: 'pincode.serviceablility'
    };

    const getGAEventName = (event) => {
      const GA_EVENTS = {
        [GA_FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW]: 'view_item',
        [GA_FPI_EVENTS.ADD_TO_CART]: 'add_to_cart',
        [GA_FPI_EVENTS.REMOVE_FROM_CART]: 'remove_from_cart',
        [GA_FPI_EVENTS.ORDER_CHECKOUT]: 'begin_checkout',
        [GA_FPI_EVENTS.ORDER_PROCESSED]: 'purchase',
        [GA_FPI_EVENTS.REFUND_SUCCESS]: 'refund',
        [GA_FPI_EVENTS.PRODUCT_LIST_VIEW]: 'view_item_list',
        [GA_FPI_EVENTS.COLLECTION_LIST_VIEW]: 'view_collection',
        [GA_FPI_EVENTS.ADD_TO_WISHLIST]: 'add_to_wishlist',
        [GA_FPI_EVENTS.VIEW_CART]: 'view_cart',
        [GA_FPI_EVENTS.SEARCH_PRODUCTS]: 'products_searched',
        [GA_FPI_EVENTS.ADD_PAYMENT_INFORMATION]: 'add_payment_info',
        [GA_FPI_EVENTS.ADD_ADDRESS_INFORMATION]: 'add_shipping_info',
        [GA_FPI_EVENTS.LOG_IN]: 'login',
        [GA_FPI_EVENTS.LOG_OUT]: 'logout',
        [GA_FPI_EVENTS.PROFILE_UPDATE]: 'profile_update'
      };
      return GA_EVENTS[event] || 'not_known';
    };

    const transformDataForGA = (event, eventData) => {
      let payload = {};

      switch (event) {
        case GA_FPI_EVENTS.SEARCH_PRODUCTS: {
          const { search_text } = eventData;
          payload = {
            'query': search_text
          };
          break;
        }

        case GA_FPI_EVENTS.LOG_IN: {
          const { user_id, login_value, method, gender, phone_number, email } = eventData;
          payload = {
            'user_id': user_id,
            'login_value': login_value,
            'method': method,
            'gender': gender,
            'email': email,
            'phone_number': phone_number
          };
          break;
        }

        case GA_FPI_EVENTS.LOG_OUT: {
          const { user_id, phone, email } = eventData;
          payload = {
            'user_id': user_id,
            'phone': phone,
            'email': email
          };
          break;
        }

        case GA_FPI_EVENTS.PROFILE_UPDATE: {
          const { gender, email, phone_number, user_id } = eventData;
          payload = {
            'user_id': user_id,
            'gender': gender,
            'email': email,
            'phone_number': phone_number
          };
          break;
        }

        case GA_FPI_EVENTS.ADD_TO_WISHLIST: {
          const { item } = eventData;
          let item_category = '';
          if (item.categories && item.categories.length) {
            item_category = item.categories[0].name;
          }
          payload.items = [{
            'item_id': item.uid,
            'item_name': item.name,
            'currency': 'INR',
            'discount': item.discount,
            'item_brand': item.brand ? item.brand.name : '',
            'item_category': item_category,
            'price': item.price ? item.price.effective.max : '',
            'quantity': 1
          }];
          break;
        }

        case GA_FPI_EVENTS.REMOVE_FROM_WISHLIST: {
          const { item } = eventData;
          let item_category = '';
          if (item.categories && item.categories.length) {
            item_category = item.categories[0].name;
          }
          payload.items = [{
            'item_id': item.uid,
            'item_name': item.name,
            'currency': 'INR',
            'discount': item.discount,
            'item_brand': item.brand ? item.brand.name : '',
            'item_category': item_category,
            'price': item.price ? item.price.effective.max : '',
            'quantity': 1
          }];
          break;
        }

        case GA_FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW: {
          const { product } = eventData;
          // Get category from categories array or category object
          let item_category = '';
          if (product.categories && product.categories.length) {
            item_category = product.categories[0].name || '';
          } else if (product.category && product.category.name) {
            item_category = product.category.name;
          }

          payload.items = [{
            'item_name': product.name || '',
            'item_id': product.uid || product.id || '',
            'item_brand': product.brand && product.brand.name ? product.brand.name : '',
            'item_category': item_category,
            'price': product.price ? (product.price.max || product.price.effective || product.price.marked || '') : '',
            'quantity': 1,
            'currency': 'INR'
          }];
          break;
        }

        case GA_FPI_EVENTS.PRODUCT_LIST_VIEW: {
          const { items } = eventData;
          const itemsOfListing = [];
          items.forEach(item => {
            let item_category = '';
            if (item.categories && item.categories.length) {
              item_category = item.categories[0].name;
            }
            let objectToBePushed = {
              'item_id': item.item_code ? item.item_code : '',
              'item_name': item.name ? item.name : '',
              'currency': 'INR',
              'discount': item.discount ? item.discount : '',
              'item_brand': item.brand && item.brand.name ? item.brand.name : '',
              'price': item.price && item.price.effective && item.price.effective.max ? item.price.effective.max : '',
              'quantity': 1,
              'item_list_name': eventData.name || 'Product Listing',
              'item_list_id': eventData.slug || eventData.url || 'listing_page',
              'item_uid': item.uid ? item.uid : '',
              'item_category': item_category
            };
            itemsOfListing.push(objectToBePushed);
          });
          payload.item_list_name = eventData.name || 'Product Listing';
          payload.item_list_id = eventData.slug || eventData.url || 'listing_page';
          payload.items = itemsOfListing;
          break;
        }

        case GA_FPI_EVENTS.COLLECTION_LIST_VIEW: {
          payload.items = [{
            item_list_name: eventData.name || 'Product Listing',
            item_list_id: eventData.slug || eventData.url || 'listing_page'
          }];
          break;
        }

        case GA_FPI_EVENTS.ADD_TO_CART: {
          const { cart_id, products } = eventData;
          let itemsToBePushed = [];
          products.forEach(product => {
            // Get category from categories array or category object
            let item_category = '';
            if (product.categories && product.categories.length) {
              item_category = product.categories[0].name || '';
            } else if (product.category && product.category.name) {
              item_category = product.category.name;
            }

            itemsToBePushed.push({
              'item_id': product.uid || product.id || '',
              'item_name': product.name || '',
              'currency': 'INR',
              'item_brand': product.brand && product.brand.name ? product.brand.name : '',
              'price': product.price ? (product.price.effective || product.price.marked || '') : '',
              'quantity': product.quantity ? (product.quantity.current || product.quantity) : 1,
              'item_category': item_category
            });
          });
          payload.items = itemsToBePushed;
          payload.cart_id = cart_id;
          break;
        }

        case GA_FPI_EVENTS.ORDER_CHECKOUT: {
          const { products, cart_id, breakup_values } = eventData;
          const itemsOfBag = [];
          products.forEach(product => {
            // Get category from categories array or category object
            let item_category = '';
            if (product.categories && product.categories.length) {
              item_category = product.categories[0].name || '';
            } else if (product.category && product.category.name) {
              item_category = product.category.name;
            }

            let objectToBePushed = {
              'item_id': product.uid || product.id || '',
              'item_name': product.name || '',
              'currency': 'INR',
              'discount': product.discount || '',
              'item_brand': product.brand && product.brand.name ? product.brand.name : '',
              'price': product.price ? (product.price.effective || product.price.marked || '') : '',
              'quantity': product.quantity ? (product.quantity.current || product.quantity) : 1,
              'item_category': item_category
            };
            itemsOfBag.push(objectToBePushed);
          });
          payload.value = breakup_values && breakup_values.raw ? breakup_values.raw.subtotal : '';
          payload.cart_id = cart_id;
          payload.items = itemsOfBag;
          payload.coupon = breakup_values && breakup_values.raw ? breakup_values.raw.coupon : '';
          payload.coupon_code = breakup_values && breakup_values.coupon ? breakup_values.coupon.code : '';
          payload.shipping = breakup_values && breakup_values.raw ? breakup_values.raw.delivery_charge : '';
          payload.discount = breakup_values && breakup_values.raw ? breakup_values.raw.discount : '';
          payload.currency = 'INR';
          break;
        }

        case GA_FPI_EVENTS.ADD_PAYMENT_INFORMATION: {
          const payment_information = eventData;
          payload.currency = 'INR';
          payload.value = payment_information.value;
          payload.coupon = payment_information.coupon ? payment_information.coupon.coupon_code : '';
          payload.payment_type = payment_information.payment ? payment_information.payment.payment_type : '';
          payload.shipping = payment_information.delivery_charges;
          payload.cart_id = payment_information.cart ? payment_information.cart.cart_id : '';
          break;
        }

        case GA_FPI_EVENTS.ADD_ADDRESS_INFORMATION: {
          const payment_information = eventData;
          payload.currency = 'INR';
          payload.value = payment_information.value;
          payload.coupon = payment_information.coupon ? payment_information.coupon.coupon_code : '';
          payload.pincode = payment_information.pincode;
          payload.cart_id = payment_information.cart ? payment_information.cart.cart_id : '';
          break;
        }

        case GA_FPI_EVENTS.REMOVE_FROM_CART: {
          const { cart_id, products } = eventData;
          let itemsToBePushed = [];
          products.forEach(product => {
            // Get category from categories array or category object
            let item_category = '';
            if (product.categories && product.categories.length) {
              item_category = product.categories[0].name || '';
            } else if (product.category && product.category.name) {
              item_category = product.category.name;
            }

            itemsToBePushed.push({
              'item_id': product.uid || product.id || '',
              'item_name': product.name || '',
              'currency': 'INR',
              'discount': product.discount || '',
              'item_brand': product.brand && product.brand.name ? product.brand.name : '',
              'price': product.price ? (product.price.effective || product.price.marked || '') : '',
              'quantity': product.quantity ? (product.quantity.current || product.quantity) : 1,
              'item_category': item_category
            });
          });
          payload.items = itemsToBePushed;
          payload.cart_id = cart_id;
          break;
        }

        case GA_FPI_EVENTS.VIEW_CART: {
          const { cart_id, products, breakup_values_raw } = eventData;
          payload.cart_id = cart_id;
          let itemsToBePushed = [];
          products.forEach(product => {
            // Get category from categories array or category object
            let item_category = '';
            if (product.categories && product.categories.length) {
              item_category = product.categories[0].name || '';
            } else if (product.category && product.category.name) {
              item_category = product.category.name;
            }

            let objectToBePushed = {
              'item_id': product.uid || product.id || '',
              'item_name': product.name || '',
              'currency': 'INR',
              'discount': product.discount || '',
              'item_brand': product.brand && product.brand.name ? product.brand.name : '',
              'price': product.price ? (product.price.effective || product.price.marked || '') : '',
              'quantity': product.quantity ? (product.quantity.current || product.quantity) : 1,
              'item_category': item_category
            };
            itemsToBePushed.push(objectToBePushed);
          });
          payload.currency = 'INR';
          payload.value = breakup_values_raw ? breakup_values_raw.subtotal : '';
          payload.items = itemsToBePushed;
          break;
        }

        case GA_FPI_EVENTS.UPDATE_CART: {
          const { cart_id, products, operation } = eventData;
          payload.items = products.map(product => {
            // Get category from categories array or category object
            let item_category = '';
            if (product.categories && product.categories.length) {
              item_category = product.categories[0].name || '';
            } else if (product.category && product.category.name) {
              item_category = product.category.name;
            }

            const price = product.price_per_unit && product.price_per_unit.converted ? product.price_per_unit.converted.effective : (product.price ? product.price.effective : 0);
            const quantity = product.quantity ? (product.quantity.current || product.quantity) : 1;
            return {
              'item_name': product.name || '',
              'item_id': product.uid || product.id || '',
              'item_brand': product.brand && product.brand.name ? product.brand.name : '',
              'item_category': item_category,
              'price': !isNaN(price * quantity) ? (price * quantity).toFixed(2) : '',
              'quantity': quantity,
              'currency': 'INR'
            };
          });
          payload.cart_id = cart_id;
          payload.event_action = operation === 'increment_quantity' ? GA_FPI_EVENTS.ADD_TO_CART : operation === 'decrement_quantity' ? GA_FPI_EVENTS.REMOVE_FROM_CART : event;
          break;
        }

        case GA_FPI_EVENTS.ORDER_PROCESSED: {
          const order_data = eventData;
          payload.transaction_id = order_data.order_id;
          payload.value = order_data.breakup_values_raw ? order_data.breakup_values_raw.total : '';
          payload.shipping = order_data.breakup_values_raw ? order_data.breakup_values_raw.delivery_charges : '';
          payload.currency = 'INR';
          payload.coupon = order_data.breakup_values_raw ? order_data.breakup_values_raw.coupon : '';
          payload.items = order_data.items ? order_data.items.map(product => {
            return {
              'item_name': product.name || '',
              'item_id': product.id || '',
              'item_brand': product.brand && product.brand.name ? product.brand.name : ''
            };
          }) : [];
          break;
        }

        case GA_FPI_EVENTS.REFUND_SUCCESS: {
          const { refund_data } = eventData;
          if (refund_data && refund_data.statuses && refund_data.statuses[0] && refund_data.statuses[0].shipments) {
            const shipments = refund_data.statuses[0].shipments;
            payload.transaction_id = Object.keys(shipments)[0];
          }
          break;
        }

        default:
          payload = eventData;
      }

      return payload;
    };

    const pushToDataLayerGA = (event, eventData) => {
      console.log('[GA4] Event:', event);
      console.log('[GA4] eventData:', eventData);

      const payload = transformDataForGA(event, eventData);
      console.log('[GA4] Transformed payload:', payload);

      event = payload.event_action ? payload.event_action : event;
      event = getGAEventName(event);
      if (event === 'not_known') return;

      if (!window.gtag) {
        console.warn('[GA4] gtag not available yet');
        return;
      }

      payload.userAgent = window.navigator.userAgent;
      gtag('event', event, payload);
      console.log('[GA4] Event sent:', event, payload);
    };

    if (FPI) {
      Object.keys(GA_FPI_EVENTS).forEach((event) => {
        FPI.event.on(GA_FPI_EVENTS[event], (eventData) => {
          console.log('FPI GA4 ' + event);
          pushToDataLayerGA(GA_FPI_EVENTS[event], eventData);
        });
      });
    }
  };

  consumeEvent();`
});

module.exports = ga4Template; 
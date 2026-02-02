/**
 * Google Tag Manager Template
 */

const createTemplate = require('../utils/createTemplate');

const gtmTemplate = createTemplate({
  // Required keys
  name: 'Google Tag Manager',
  path: "google-tag-manager",
  description: "Integrate Google Tag Manager for advanced analytics.",
  help_link: {
    text: "More information about the google analytics and a link to full documentation",
    url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm",
    label: "click here"
  },
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

  const consumeGtmEvent = () => {
    const FPI_EVENTS = {
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
      ORDER_CHECKOUT: 'order.checkedout',
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

    const getGTMEventName = (event) => {
      const GTM_EVENTS = {
        [FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW]: 'view_item',
        [FPI_EVENTS.ADD_TO_CART]: 'add_to_cart',
        [FPI_EVENTS.REMOVE_FROM_CART]: 'remove_from_cart',
        [FPI_EVENTS.ORDER_CHECKOUT]: 'begin_checkout',
        [FPI_EVENTS.ORDER_PROCESSED]: 'purchase',
        [FPI_EVENTS.REFUND_SUCCESS]: 'refund',
        [FPI_EVENTS.PRODUCT_LIST_VIEW]: 'view_item_list',
        [FPI_EVENTS.COLLECTION_LIST_VIEW]: 'view_collection',
        [FPI_EVENTS.ADD_TO_WISHLIST]: 'add_to_wishlist',
        [FPI_EVENTS.VIEW_CART]: 'view_cart',
        [FPI_EVENTS.SEARCH_PRODUCTS]: 'products_searched',
        [FPI_EVENTS.ADD_PAYMENT_INFORMATION]: 'add_payment_info',
        [FPI_EVENTS.ADD_ADDRESS_INFORMATION]: 'add_shipping_info',
        [FPI_EVENTS.LOG_IN]: 'login',
        [FPI_EVENTS.LOG_OUT]: 'logout',
        [FPI_EVENTS.PROFILE_UPDATE]: 'profile_update'
      };
      return GTM_EVENTS[event] || 'not_known';
    };

    const transformData = (event, eventData) => {
      let payload = {};
      console.log('[GTM] Event:', event);
      console.log('[GTM] eventData:', eventData);
      switch (event) {
        case FPI_EVENTS.SEARCH_PRODUCTS: {
          const { search_text } = eventData;
          payload = {
            'query': search_text
          };
          break;
        }

        case FPI_EVENTS.LOG_IN: {
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

        case FPI_EVENTS.LOG_OUT: {
          const { user_id, phone, email } = eventData;
          payload = {
            'user_id': user_id,
            'phone': phone,
            'email': email
          };
          break;
        }

        case FPI_EVENTS.PROFILE_UPDATE: {
          const { gender, email, phone_number, user_id } = eventData;
          payload = {
            'user_id': user_id,
            'gender': gender,
            'email': email,
            'phone_number': phone_number
          };
          break;
        }

        case FPI_EVENTS.ADD_TO_WISHLIST: {
          const { item } = eventData;
          let item_category = "";
          if (item.categories && item.categories.length) {
            item_category = item.categories[0].name;
          }
          payload.items = [{
            'item_id': item.uid,
            'item_name': item.name,
            'currency': "INR",
            'discount': item.discount,
            'item_brand': item.brand ? item.brand.name : '',
            'item_category': item_category,
            'price': item.price ? item.price.effective.max : '',
            'quantity': 1
          }];
          break;
        }

        case FPI_EVENTS.REMOVE_FROM_WISHLIST: {
          const { item } = eventData;
          let item_category = "";
          if (item.categories && item.categories.length) {
            item_category = item.categories[0].name;
          }
          payload.items = [{
            'item_id': item.uid,
            'item_name': item.name,
            'currency': "INR",
            'discount': item.discount,
            'item_brand': item.brand ? item.brand.name : '',
            'item_category': item_category,
            'price': item.price ? item.price.effective.max : '',
            'quantity': 1
          }];
          break;
        }

        case FPI_EVENTS.PRODUCT_DETAIL_PAGE_VIEW: {
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

        case FPI_EVENTS.PRODUCT_LIST_VIEW: {
          const { items } = eventData;
          const itemsOfListing = [];
          items.forEach(item => {
            let item_category = "";
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

        case FPI_EVENTS.COLLECTION_LIST_VIEW: {
          payload.items = [{
            item_list_name: eventData.name || 'Product Listing',
            item_list_id: eventData.slug || eventData.url || 'listing_page'
          }];
          break;
        }

        case FPI_EVENTS.ADD_TO_CART: {
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

        case FPI_EVENTS.ORDER_CHECKOUT: {
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

        case FPI_EVENTS.ADD_PAYMENT_INFORMATION: {
          const payment_information = eventData;
          payload.currency = "INR";
          payload.value = payment_information.value;
          payload.coupon = payment_information.coupon.coupon_code;
          payload.payment_type = payment_information.payment.payment_type;
          payload.shipping = payment_information.delivery_charges;
          payload.cart_id = payment_information.cart.cart_id;
          break;
        }

        case FPI_EVENTS.ADD_ADDRESS_INFORMATION: {
          const payment_information = eventData;
          payload.currency = "INR";
          payload.value = payment_information.value;
          payload.coupon = payment_information.coupon.coupon_code;
          payload.pincode = payment_information.pincode;
          payload.cart_id = payment_information.cart.cart_id;
          break;
        }

        case FPI_EVENTS.REMOVE_FROM_CART: {
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

        case FPI_EVENTS.VIEW_CART: {
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

        case FPI_EVENTS.UPDATE_CART: {
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
          payload.event_action = operation === 'increment_quantity' ? FPI_EVENTS.ADD_TO_CART : operation === 'decrement_quantity' ? FPI_EVENTS.REMOVE_FROM_CART : event;
          break;
        }

        case FPI_EVENTS.ORDER_PROCESSED: {
          const order_data = eventData;
          payload.transaction_id = order_data.order_id;
          payload.value = order_data.breakup_values_raw.total;
          payload.shipping = order_data.breakup_values_raw.delivery_charges;
          payload.currency = 'INR';
          payload.coupon = order_data.breakup_values_raw.coupon;
          payload.items = order_data.items.map(product => {
            return {
              'item_name': product.name,
              'item_id': product.id,
              'item_brand': product.brand.name,
              'item_price': product.price,
              'item_quantity': product.quantity,
              'item_category': product.l1_categories || [],
              'item_category2': product.l2_categories || [],
              'item_category3': product.l3_category_name ? [product.l3_category_name] : []
            };
          });
          break;
        }

        case FPI_EVENTS.REFUND_SUCCESS: {
          const { refund_data } = eventData;
          const shipments = refund_data.statuses[0].shipments;
          payload.transaction_id = Object.keys(shipments)[0];
          break;
        }

        default:
          payload = eventData;
      }

      return payload;
    };

    const pushToDataLayer = (event, eventData) => {
      console.log('[GTM] Event:', event);
      console.log('[GTM] eventData:', eventData);
      if (eventData.product) {
        console.log('[GTM] product:', eventData.product);
      }
      if (eventData.products) {
        console.log('[GTM] products:', eventData.products);
      }
      if (eventData.items) {
        console.log('[GTM] items:', eventData.items);
      }
      if (eventData.item) {
        console.log('[GTM] item:', eventData.item);
      }

      const payload = transformData(event, eventData);
      console.log('[GTM] Transformed payload:', payload);

      event = payload.event_action ? payload.event_action : event;
      event = getGTMEventName(event);
      if (event === 'not_known') return;

      dataLayer.push({ ecommerce: null });
      payload.userAgent = window.navigator.userAgent;
      dataLayer.push({
        event,
        ecommerce: payload
      });
      console.log('[GTM] Pushed to dataLayer:', { event, ecommerce: payload });
    };

    function getSkipEvents() {
      let result = [];
      try {
        result = gtmeGetFPISkipEvents();
      } catch (e) {
        console.log("NO_FILTERED_LOGIC_FOUND");
        result = [];
      }
      return result;
    }

    if (FPI) {
      Object.keys(FPI_EVENTS).filter((ev) => {
        const skipEvents = getSkipEvents();
        return skipEvents && skipEvents.includes(ev) ? false : true;
      }).forEach((event) => {
        FPI.event.on(FPI_EVENTS[event], (eventData) => {
           console.log('FPI ' + event);
          pushToDataLayer(FPI_EVENTS[event], eventData);
        });
      });
    }
  };

  consumeGtmEvent();`,
  
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
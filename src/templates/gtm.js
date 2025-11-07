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
});

module.exports = gtmTemplate; 
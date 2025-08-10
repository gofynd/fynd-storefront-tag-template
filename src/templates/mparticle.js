/**
 * mParticle Template
 */

const createTemplate = require('../utils/createTemplate');

const mparticleTemplate = createTemplate({
  name: "mParticle",
  path: "mparticle-tag",
  description: "Customer data platform for mobile and web analytics.",
  template_id: "1010",
  template_version: "1.0.0",
  category: 'analytics',
  img: "https://logo.clearbit.com/mparticle.com",
  note: "Find your API Key in Setup → Inputs → Web. mParticle collects data and forwards it to 300+ integrations.",
  help_link: {
    text: "Learn more about mParticle web SDK in the",
    url: "https://docs.mparticle.com/developers/sdk/web/getting-started/",
    label: "Developer Guide"
  },
  field_mappings: {
    apiKey: "api_key"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "apiKey",
      type: "text",
      label: "API Key",
      placeholder: "YOUR_API_KEY",
      required: true,
      size: "full",
      description: "Find in Setup → Inputs → Web → API Key.",
      validation: {
        pattern: /^[a-zA-Z0-9]{24,}$/,
        message: "API Key must be at least 24 characters"
      }
    }
  ],
  script: `(function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.3;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logPageView","logPurchase","logEvent","logForm","logLink","logSetUserAttribute","logSetUserIdentity","reload","init","logOut","logVirtualPageView","setUserTag","addForwarder"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)})("{{apiKey}}");`
});

module.exports = mparticleTemplate;

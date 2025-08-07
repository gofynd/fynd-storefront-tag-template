/**
 * PushEngage Template
 */

const createTemplate = require('../utils/createTemplate');

const pushengageTemplate = createTemplate({
  name: "PushEngage",
  path: "pushengage-tag",
  description: "Web push notification platform for user engagement.",
  template_id: "1018",
  template_version: "1.0.0",
  img: "https://logo.clearbit.com/pushengage.com",
  note: "Find your App ID in Installation → Web Installation. PushEngage helps re-engage users with web push notifications.",
  help_link: {
    text: "Learn more about PushEngage installation in the",
    url: "https://help.pushengage.com/article/53-web-push-installation-guide",
    label: "Installation Guide"
  },
  field_mappings: {
    appId: "app_id"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "appId",
      type: "text",
      label: "App ID",
      placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      required: true,
      size: "full",
      description: "UUID format App ID from Installation page.",
      validation: {
        pattern: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i,
        message: "Must be a valid UUID format"
      }
    }
  ],
  script: `window._peq=window._peq||[];window._peq.push(["init",{appId:"{{appId}}"}]);(function(){var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src="https://clientcdn.pushengage.com/sdks/pushengage-web-sdk.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();`
});

module.exports = pushengageTemplate;

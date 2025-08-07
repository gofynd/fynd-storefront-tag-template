/**
 * MoEngage Template
 */

const createTemplate = require('../utils/createTemplate');

const moengageTemplate = createTemplate({
  name: "MoEngage",
  path: "moengage-tag",
  description: "Customer engagement platform for personalized messaging.",
  template_id: "1016",
  template_version: "1.0.0",
  img: "https://logo.clearbit.com/moengage.com",
  note: "Find your App ID in App Settings → General. MoEngage powers personalized customer engagement across channels.",
  help_link: {
    text: "Learn more about MoEngage web SDK in the",
    url: "https://developers.moengage.com/hc/en-us/articles/4404674776724",
    label: "Integration Guide"
  },
  field_mappings: {
    appId: "app_id",
    dataCenter: "data_center"
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
      placeholder: "YOUR_APP_ID",
      required: true,
      size: "full",
      description: "Find in App Settings → General → App ID.",
      validation: {
        pattern: /^[A-Z0-9]{24}$/,
        message: "App ID must be 24 uppercase alphanumeric characters"
      }
    },
    {
      name: "dataCenter",
      type: "select",
      label: "Data Center",
      required: true,
      size: "medium",
      description: "Select your MoEngage data center.",
      options: [
        { label: "DC_01 (US)", value: "DC_01" },
        { label: "DC_02 (EU)", value: "DC_02" },
        { label: "DC_03 (IND)", value: "DC_03" }
      ],
      default: "DC_01"
    }
  ],
  script: `(function(i,s,o,g,r,a,m,n){var ld=s.createElement(o);ld.type='text/javascript';ld.async=true;ld.src=g;var s=s.getElementsByTagName(o)[0];s.parentNode.insertBefore(ld,s);i['moengage_object']=r;if(!i[r]){i[r]=function(){(i[r].q=i[r].q||[]).push(arguments)}}a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);i[r].q=i[r].q||[];n=i[r];n=n.init||function(){};n("{{appId}}",{"{{dataCenter}}":true,"enableSpa":true,"swPath":"/serviceworker.js"})})(window,document,'script','https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js','Moengage');`
});

module.exports = moengageTemplate;

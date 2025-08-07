/**
 * CleverTap Template
 */

const createTemplate = require('../utils/createTemplate');

const clevertapTemplate = createTemplate({
  name: "CleverTap",
  path: "clevertap-tag",
  description: "Customer engagement and retention platform.",
  template_id: "1015",
  template_version: "1.0.0",
  img: "https://logo.clearbit.com/clevertap.com",
  note: "Find your Account ID and Token in Settings → Project. CleverTap helps drive user engagement and retention.",
  help_link: {
    text: "Learn more about CleverTap web SDK in the",
    url: "https://developer.clevertap.com/docs/web-quickstart-guide",
    label: "Developer Docs"
  },
  field_mappings: {
    accountId: "account_id",
    region: "region"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "accountId",
      type: "text",
      label: "Account ID",
      placeholder: "XXX-XXX-XXXX",
      required: true,
      size: "full",
      description: "Find in Settings → Project → Account ID.",
      validation: {
        pattern: /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{4}$/,
        message: "Format: XXX-XXX-XXXX (uppercase alphanumeric)"
      }
    },
    {
      name: "region",
      type: "select",
      label: "Region",
      required: false,
      size: "medium",
      description: "Select your data center region.",
      options: [
        { label: "Default (Global)", value: "" },
        { label: "Europe (EU)", value: "eu1" },
        { label: "India", value: "in1" },
        { label: "Singapore", value: "sg1" },
        { label: "US", value: "us1" }
      ],
      default: ""
    }
  ],
  script: `var clevertap={event:[],profile:[],account:[],onUserLogin:[],region:"{{region}}",notifications:[],privacy:[]};clevertap.account.push({id:"{{accountId}}"});(function(){var wzrk=document.createElement('script');wzrk.type='text/javascript';wzrk.async=true;wzrk.src=('https:'==document.location.protocol?'https://d2r1yp2w7bby2u.cloudfront.net':'http://static.clevertap.com')+'/js/clevertap.min.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(wzrk,s);})();`
});

module.exports = clevertapTemplate;

/**
 * Crazy Egg Template
 */

const createTemplate = require('../utils/createTemplate');

const crazyeggTemplate = createTemplate({
  name: "Crazy Egg",
  path: "crazy-egg-tag",
  description: "Heatmaps and user recordings for conversion optimization.",
  template_id: "1012",
  template_version: "1.0.0",
  category: 'recording',
  img: "https://logo.clearbit.com/crazyegg.com",
  note: "Find your Account Number in Account → Tracking Script. Crazy Egg provides heatmaps, scrollmaps, and user recordings.",
  help_link: {
    text: "Learn more about Crazy Egg installation in the",
    url: "https://help.crazyegg.com/article/43-installing-the-tracking-script",
    label: "Help Center"
  },
  field_mappings: {
    accountNumber: "account_number"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "accountNumber",
      type: "text",
      label: "Account Number",
      placeholder: "00123456",
      required: true,
      size: "full",
      description: "8-digit account number from your tracking script.",
      validation: {
        pattern: /^\d{8}$/,
        message: "Account number must be exactly 8 digits"
      }
    }
  ],
  script: `setTimeout(function(){var a=document.createElement("script");var b=document.getElementsByTagName("script")[0];a.src="https://script.crazyegg.com/pages/scripts/{{accountNumber.slice(0,4)}}/{{accountNumber.slice(4,8)}}.js?"+Math.floor(new Date().getTime()/3600000);a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)},1);`
});

module.exports = crazyeggTemplate;

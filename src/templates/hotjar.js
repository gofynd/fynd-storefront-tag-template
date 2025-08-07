/**
 * Hotjar Template
 */

const createTemplate = require('../utils/createTemplate');

const hotjarTemplate = createTemplate({
  name: "Hotjar",
  path: "hotjar-tag",
  description: "Behavior analytics with heatmaps, recordings, and feedback.",
  template_id: "1011",
  template_version: "1.0.0",
  img: "https://logo.clearbit.com/hotjar.com",
  note: "Find your Site ID in Sites & Organizations. Hotjar helps you understand user behavior through heatmaps and session recordings.",
  help_link: {
    text: "Learn more about Hotjar installation in the",
    url: "https://help.hotjar.com/hc/en-us/articles/115011639887-How-to-Install-your-Hotjar-Tracking-Code",
    label: "Installation Guide"
  },
  field_mappings: {
    siteId: "site_id"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "siteId",
      type: "text",
      label: "Site ID",
      placeholder: "1234567",
      required: true,
      size: "full",
      description: "Find in Sites & Organizations → Site Details.",
      validation: {
        pattern: /^\d{6,8}$/,
        message: "Site ID must be 6-8 digits"
      }
    }
  ],
  script: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:{{siteId}},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
});

module.exports = hotjarTemplate;

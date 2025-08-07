/**
 * Mouseflow Template
 */

const createTemplate = require('../utils/createTemplate');

const mouseflowTemplate = createTemplate({
  name: "Mouseflow",
  path: "mouseflow-tag",
  description: "Session replay, heatmaps, funnels, and form analytics.",
  template_id: "1014",
  template_version: "1.0.0",
  img: "https://logo.clearbit.com/mouseflow.com",
  note: "Find your Website ID in your Mouseflow dashboard. Mouseflow records user sessions and generates heatmaps for UX insights.",
  help_link: {
    text: "Learn more about Mouseflow installation in the",
    url: "https://help.mouseflow.com/en/articles/4307352-how-to-install-the-mouseflow-tracking-code",
    label: "Help Center"
  },
  field_mappings: {
    websiteId: "website_id"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "websiteId",
      type: "text",
      label: "Website ID",
      placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      required: true,
      size: "full",
      description: "UUID format website ID from your dashboard.",
      validation: {
        pattern: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i,
        message: "Must be a valid UUID format"
      }
    }
  ],
  script: `window._mfq=window._mfq||[];(function(){var mf=document.createElement("script");mf.type="text/javascript";mf.defer=true;mf.src="//cdn.mouseflow.com/projects/{{websiteId}}.js";document.getElementsByTagName("head")[0].appendChild(mf);})();`
});

module.exports = mouseflowTemplate;

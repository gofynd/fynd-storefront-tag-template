/**
 * Google Analytics 4 Template
 */

const createTemplate = require('../utils/createTemplate');

const ga4Template = createTemplate({
  name: 'Google Analytics',
  path: "google-analytics",
  description: "tracks and reports website traffic, providing insights to help optimize your site's performance.",
  img: "https://cdn.pixelbin.io/v2/falling-surf-7c8bb8/fyndnp/wrkr/x5/misc/pictures/free-icon/original/iejFtwUQr-logo.png",
  note:"The APP_ID for your Google Analytics account is available on the Google Analytics Dashboard in **Settings > App Settings > Account Settings > APP ID**.",
  template_id: "1003",
  template_version: "1.0.0",
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
        pattern: /^(G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)$/i,
        message: 'Must be a valid Measurement ID (e.g., G-XXXXXXXXXX or UA-XXXXXXXXX-X)',
      },
    },
  ],
  script: `(function(){const script=document.createElement("script");script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id={{measurementId}}';script.onload=()=>{window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","{{measurementId}}");};document.head.appendChild(script);}).call(this);`
});

module.exports = ga4Template; 
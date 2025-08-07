/**
 * Adobe Analytics Template
 */

const createTemplate = require('../utils/createTemplate');

const adobeAnalyticsTemplate = createTemplate({
  name: "Adobe Analytics",
  path: "adobe-analytics",
  description: "Track visitor behavior and measure site performance with Adobe Analytics.",
  img: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Web_Logo.svg",
  note: "**Important:** You'll need your Adobe Analytics Report Suite ID from the Admin Console. The tracking server is typically in the format: [namespace].sc.omtrdc.net",
  help_link: {
    text: "Learn more about Adobe Analytics implementation in the",
    url: "https://experienceleague.adobe.com/docs/analytics/implementation/js/overview.html",
    label: "Adobe Documentation"
  },
  template_id: "1005",
  template_version: "1.0.0",
  type: "js",
  sub_type: "inline",
  position: "head",
  pages: [],
  attributes: {
    async: "true"
  },
  compatible_engines: ["react", "vue2"],
  field_mappings: {
    reportSuiteId: "report_suite_id",
    trackingServer: "tracking_server",
    visitorNamespace: "visitor_namespace",
    charSet: "char_set",
    currencyCode: "currency_code",
    trackPageView: "track_page_view",
    trackLinks: "track_links",
    trackDownloadLinks: "track_download_links",
    trackExternalLinks: "track_external_links",
    linkDownloadFileTypes: "link_download_file_types",
    linkInternalFilters: "link_internal_filters",
    linkLeaveQueryString: "link_leave_query_string"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "reportSuiteId",
      type: "text",
      label: "Report Suite ID",
      placeholder: "e.g., mycompanyprod or suite1,suite2",
      required: true,
      size: "full",
      validation: {
        pattern: /^[a-zA-Z0-9_,]+$/,
        message: "Report Suite ID can only contain letters, numbers, underscores, and commas for multiple suites"
      },
      description: "Find in Admin Console → Report Suites. Use commas for multiple (e.g., suite1,suite2).",
      events: {
        blur: function(value, field, formData, component) {
          // Remove spaces and ensure proper formatting
          if (value) {
            const cleaned = value.replace(/\s+/g, '').toLowerCase();
            component.$set(formData, field.name, cleaned);
          }
        }
      }
    },
    {
      name: "trackingServer",
      type: "text",
      label: "Tracking Server",
      placeholder: "e.g., namespace.sc.omtrdc.net",
      required: true,
      size: "full",
      validation: {
        pattern: /^[a-zA-Z0-9.-]+\.(sc\.omtrdc\.net|d1\.sc\.omtrdc\.net|d2\.sc\.omtrdc\.net|d3\.sc\.omtrdc\.net|data\.adobedc\.net)$/,
        message: "Must be a valid Adobe tracking server URL"
      },
      description: "Format: [namespace].sc.omtrdc.net. Find in Report Suites → General → Tracking Server."
    },
    {
      name: "visitorNamespace",
      type: "text",
      label: "Visitor Namespace (Optional)",
      placeholder: "e.g., mycompany",
      required: false,
      size: "medium",
      validation: {
        pattern: /^[a-zA-Z0-9_]*$/,
        message: "Can only contain letters, numbers, and underscores"
      },
      description: "Prevents cookie conflicts in multi-domain tracking. Use company name or unique ID."
    },
    {
      name: "charSet",
      type: "select",
      label: "Character Set",
      required: false,
      size: "medium",
      default: "UTF-8",
      options: [
        { label: "UTF-8 (Recommended)", value: "UTF-8" },
        { label: "ISO-8859-1", value: "ISO-8859-1" },
        { label: "SHIFT_JIS", value: "SHIFT_JIS" },
        { label: "BIG5", value: "BIG5" },
        { label: "EUC-KR", value: "EUC-KR" }
      ],
      description: "Character encoding for data collection. UTF-8 supports all languages and special characters."
    },
    {
      name: "currencyCode",
      type: "select",
      label: "Currency Code",
      required: false,
      size: "medium",
      default: "USD",
      searchable: true,
      options: [
        { label: "USD - US Dollar", value: "USD" },
        { label: "EUR - Euro", value: "EUR" },
        { label: "GBP - British Pound", value: "GBP" },
        { label: "INR - Indian Rupee", value: "INR" },
        { label: "JPY - Japanese Yen", value: "JPY" },
        { label: "CNY - Chinese Yuan", value: "CNY" },
        { label: "AUD - Australian Dollar", value: "AUD" },
        { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "CHF - Swiss Franc", value: "CHF" },
        { label: "SGD - Singapore Dollar", value: "SGD" }
      ],
      description: "Default currency for revenue and commerce events. Can be overridden per transaction."
    },
    {
      name: "trackPageView",
      type: "checkbox",
      label: "Track Page Views",
      default: true,
      size: "medium",
      description: "Sends a page view beacon (s.t() call) on each page load with page name, URL, and other page data."
    },
    {
      name: "trackLinks",
      type: "checkbox",
      label: "Enable Link Tracking",
      default: true,
      size: "medium",
      description: "Master switch for automatic link tracking of downloads and external links.",
      events: {
        change: function(value, field, formData, component) {
          // If link tracking is disabled, also disable download and external link tracking
          if (!value) {
            component.$set(formData, 'trackDownloadLinks', false);
            component.$set(formData, 'trackExternalLinks', false);
          }
        }
      }
    },
    {
      name: "trackDownloadLinks",
      type: "checkbox",
      label: "Track Download Links",
      default: true,
      size: "medium",
      description: "Tracks clicks on files with extensions defined below. Sends s.tl() beacon.",
      condition: function(formData) {
        // Only show if link tracking is enabled
        return formData.trackLinks === true;
      }
    },
    {
      name: "trackExternalLinks",
      type: "checkbox",
      label: "Track External Links",
      default: true,
      size: "medium",
      description: "Tracks clicks to external domains (not in Internal Domain Filters). Useful for tracking outbound traffic.",
      condition: function(formData) {
        // Only show if link tracking is enabled
        return formData.trackLinks === true;
      }
    },
    {
      name: "linkDownloadFileTypes",
      type: "text",
      label: "Download File Types",
      placeholder: "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx",
      required: false,
      size: "full",
      default: "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx",
      description: "File extensions to track as downloads. Separate with commas, no spaces. Add custom extensions as needed.",
      condition: function(formData) {
        // Only show if download link tracking is enabled
        return formData.trackDownloadLinks === true;
      }
    },
    {
      name: "linkInternalFilters",
      type: "text",
      label: "Internal Domain Filters",
      placeholder: "javascript:,yourdomain.com",
      required: false,
      size: "full",
      default: "javascript:",
      description: "Domains and protocols treated as internal. External link tracking ignores these. Include your domain and subdomains.",
      condition: function(formData) {
        // Only show if external link tracking is enabled
        return formData.trackExternalLinks === true;
      }
    },
    {
      name: "linkLeaveQueryString",
      type: "checkbox",
      label: "Include Query String in Link Tracking",
      default: false,
      size: "medium",
      description: "Preserves URL parameters (?key=value) in link tracking reports. Enable for campaign tracking in exit links.",
      condition: function(formData) {
        // Only show if link tracking is enabled
        return formData.trackLinks === true;
      }
    }
  ],
  script: `(function() {
  // Create s object and load AppMeasurement library
  window.s_account = '{{reportSuiteId}}';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://cdn.jsdelivr.net/npm/appmeasurement@2.23.0/AppMeasurement.min.js';
  
  script.onload = function() {
      // Initialize Adobe Analytics
      if (window.s) {
          // Configure account and tracking server
          s.account = '{{reportSuiteId}}';
          s.trackingServer = '{{trackingServer}}';
          
          // Set visitor namespace if provided
          const visitorNamespace = '{{visitorNamespace}}'.trim();
          if (visitorNamespace) {
              s.visitorNamespace = visitorNamespace;
          }
          
          // Set character set
          s.charSet = '{{charSet}}' || 'UTF-8';
          
          // Set currency code
          s.currencyCode = '{{currencyCode}}' || 'USD';
          
          // Configure link tracking
          s.trackDownloadLinks = {{trackDownloadLinks}};
          s.trackExternalLinks = {{trackExternalLinks}};
          s.trackInlineStats = {{trackLinks}};
          
          // Set download file types
          const downloadTypes = '{{linkDownloadFileTypes}}'.trim();
          if (downloadTypes) {
              s.linkDownloadFileTypes = downloadTypes;
          }
          
          // Set internal filters
          const internalFilters = '{{linkInternalFilters}}'.trim();
          if (internalFilters) {
              s.linkInternalFilters = internalFilters;
          }
          
          // Set query string option
          s.linkLeaveQueryString = {{linkLeaveQueryString}};
          
          // Initialize the library
          if (typeof s.doPlugins === 'function') {
              s.doPlugins = function(s) {
                  // Custom plugin code can be added here
              };
          }
          
          // Track initial page view if enabled
          if ({{trackPageView}}) {
              s.pageName = document.title;
              s.channel = window.location.pathname.split('/')[1] || 'home';
              s.pageURL = window.location.href;
              s.t();
          }
          
          // Set up automatic link tracking if enabled
          if ({{trackLinks}}) {
              // Adobe Analytics will automatically track links based on configuration
              console.log('[Adobe Analytics] Link tracking enabled');
          }
          
          console.log('[Adobe Analytics] Initialized successfully');
      } else {
          console.error('[Adobe Analytics] Failed to initialize - s object not found');
      }
  };
  
  script.onerror = function() {
      console.error('[Adobe Analytics] Failed to load AppMeasurement library');
  };
  
  document.head.appendChild(script);
})();`
});

module.exports = adobeAnalyticsTemplate; 
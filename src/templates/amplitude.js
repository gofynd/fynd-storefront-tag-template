/**
 * Amplitude Template
 */

const createTemplate = require('../utils/createTemplate');

const amplitudeTemplate = createTemplate({
  name: "Amplitude",
  path: "amplitude-tag",
  description: "Track user behavior and analyze product analytics with Amplitude.",
  img: "https://cdn.brandfetch.io/idJfYlnlFP/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG",
  note: "**Important:** You'll need your Amplitude API Key from your project settings. For EU data residency, make sure to select the EU server zone and use an API key from an Amplitude EU project.",
  help_link: {
    text: "Learn more about Amplitude setup and configuration in the",
    url: "https://www.docs.developers.amplitude.com/data/sdks/browser-2/",
    label: "Amplitude Documentation"
  },
  template_id: "1004",
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
    apiKey: "amplitude_api_key",
    serverZone: "server_zone",
    userId: "user_id",
    appVersion: "app_version",
    sessionTimeout: "session_timeout",
    includeReferrer: "include_referrer",
    includeUtm: "include_utm",
    trackPageViews: "track_page_views",
    trackSessions: "track_sessions",
    trackFormInteractions: "track_form_interactions",
    trackFileDownloads: "track_file_downloads"
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
      placeholder: "e.g., a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      required: true,
      size: "full",
      validation: {
        pattern: /^[a-f0-9]{32}$/,
        message: "API Key must be a 32-character hexadecimal string"
      }
    },
    {
      name: "serverZone",
      type: "select",
      label: "Server Zone",
      required: false,
      size: "medium",
      default: "US",
      options: [
        {
          label: "United States (Default)",
          value: "US"
        },
        {
          label: "European Union",
          value: "EU"
        }
      ],
      description: "Choose EU only if your Amplitude project was created in the EU data center. US is the default for most projects."
    },
    {
      name: "userId",
      type: "text",
      label: "Default User ID (Optional)",
      placeholder: "e.g., {{user.id}} or leave empty",
      required: false,
      size: "medium",
      description: "Set a default user ID for all events. You can use dynamic template variables like {{user.id}}, {{user.email}}, etc."
    },
    {
      name: "appVersion",
      type: "text",
      label: "App Version (Optional)",
      placeholder: "e.g., 1.0.0",
      required: false,
      size: "medium",
      description: "Track your application version with events. Useful for debugging and analyzing feature adoption across versions."
    },
    {
      name: "sessionTimeout",
      type: "number",
      label: "Session Timeout (minutes)",
      placeholder: "30",
      required: false,
      size: "medium",
      default: 30,
      validation: {
        min: 1,
        max: 1440,
        message: "Session timeout must be between 1 and 1440 minutes"
      },
      description: "Minutes of inactivity before a new session starts. Default is 30 minutes. Range: 1-1440 minutes (24 hours)."
    },
    {
      name: "includeReferrer",
      type: "checkbox",
      label: "Track Referrer Information",
      default: true,
      size: "medium",
      description: "Captures referrer URL and domain. Helps identify traffic sources and analyze user acquisition channels."
      // useTooltip: true (default behavior for checkboxes)
    },
    {
      name: "includeUtm",
      type: "checkbox",
      label: "Track UTM Parameters",
      default: true,
      size: "medium",
      description: "Captures UTM parameters (source, medium, campaign, term, content) from URLs for marketing attribution."
    },
    {
      name: "trackPageViews",
      type: "checkbox",
      label: "Track Page Views",
      default: true,
      size: "medium",
      description: "Sends '[Amplitude] Page Viewed' event with URL, title, path, and domain on each page load."
    },
    {
      name: "trackSessions",
      type: "checkbox",
      label: "Track Sessions",
      default: true,
      size: "medium",
      description: "Tracks '[Amplitude] Session Start' and '[Amplitude] Session End' events for user engagement analysis."
    },
    {
      name: "trackFormInteractions",
      type: "checkbox",
      label: "Track Form Interactions",
      default: false,
      size: "medium",
      description: "Tracks '[Amplitude] Form Started' and '[Amplitude] Form Submitted' events with form ID, name, and destination."
    },
    {
      name: "trackFileDownloads",
      type: "checkbox",
      label: "Track File Downloads",
      default: false,
      size: "medium",
      description: "Tracks '[Amplitude] File Downloaded' event with file name, extension, link text, and URL."
    }
  ],
  script: `(function() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = '{{serverZone}}' === 'EU'
    ? 'https://cdn.eu.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz'
    : 'https://cdn.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz';

  script.onload = function() {
    if (!window.amplitude) {
      console.error('[Amplitude] Failed to load SDK');
      return;
    }

    const config = {
      flushIntervalMillis: 1000,
      flushQueueSize: 30,
      defaultTracking: {
        pageViews: {{trackPageViews}},
        sessions: {{trackSessions}},
        formInteractions: {{trackFormInteractions}},
        fileDownloads: {{trackFileDownloads}}
      },
      attribution: {
        disabled: false,
        trackNewCampaigns: true
      }
    };

    if ('{{serverZone}}' === 'EU') {
      config.serverZone = 'EU';
    }

    const sessionTimeout = {{sessionTimeout}};
    if (sessionTimeout) {
      config.sessionTimeout = sessionTimeout * 60 * 1000;
    }

    const appVersion = '{{appVersion}}'.trim();
    if (appVersion) {
      config.appVersion = appVersion;
    }

    if ({{includeReferrer}}) {
      config.attribution.trackPageViews = true;
    }

    const userId = '{{userId}}'.trim();
    if (userId) {
      window.amplitude.init('{{apiKey}}', userId, config);
    } else {
      window.amplitude.init('{{apiKey}}', undefined, config);
    }

    if ({{includeUtm}}) {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          utmParams[param] = value;
        }
      });
      if (Object.keys(utmParams).length > 0) {
        window.amplitude.setUserProperties(utmParams);
      }
    }
  };

  script.onerror = function() {
    console.error('[Amplitude] Failed to load SDK script');
  };

  document.head.appendChild(script);
})();`
});

module.exports = amplitudeTemplate; 
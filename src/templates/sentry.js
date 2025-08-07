/**
 * Sentry Template
 */

const sentryTemplate = {
  name: 'Sentry',
  path: "sentry-tag",
  description: "Monitor errors and performance with Sentry.",
  img: "https://sentry-brand.storage.googleapis.com/sentry-logo-black.png",
  note:"The DSN for your Sentry account is available on the Sentry Dashboard in Settings > Project > Client Keys (*this instructions needs to be changed according to Sentry documentation)",
  help_link: {
    text: "Learn the steps to connect with Sentry by reading the article on",
    url: "https://docs.sentry.io/product/sentry-basics/",
    label: "Help Center"
  },
  template_id: "1002",
  template_version: "1.0.0",
  type: 'js',
  sub_type: 'inline',
  position: 'head',
  pages: [],
  attributes: { async: "true" },
  compatible_engines: ['react', 'vue2'],
  field_mappings: {
    dsn: 'sentry_dsn',
    excludedUrls: 'excluded_urls'
  },
  layout: {
    columns: 2,
    gap: '24px'
  },
  fields: [
    {
      name: 'dsn',
      type: 'text',
      label: 'Sentry DSN',
      placeholder: 'https://xxxxxx@xxx.ingest.sentry.io/xxxxx',
      required: true,
      size: 'full',
      description: 'Find in Settings → Projects → Client Keys (DSN).',
      validation: {
        pattern: /^https?:\/\/[\w.@:\/\-]+$/,
        message: 'Must be a valid DSN URL',
      },
    },
    {
      name: 'excludedUrls',
      type: 'array',
      label: 'URLs to exclude',
      description: 'We have by default added some URLs below, this is to avoid the errors that are reported from the core system. We recommend you to keep this as it is. You can add more URLs here to add to denyURLs in Sentry.',
      help_link: {
        url: "https://docs.sentry.io/platforms/javascript/configuration/filtering/",
        text: "More info"
      },
      default: [
      ],
      size: 'full',
      useTooltip: false,  // Show description as text for array fields
      input_config: {
        type: 'text',
        placeholder: 'Enter URL to exclude',
        button_text: 'Exclude URL',
        input_size: 'large',  // Size for the input within array field
        button_size: 'small', // Size for the button within array field
        validation: {
          pattern: /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3})(\:\d+)?(\/[-a-z\d%_.@~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
          message: 'Enter a valid URL or domain pattern'
        },
        events: {
          // Custom click handler - can be used for additional validation or logging
          click: function(value, field, formData, component) {
            console.log('Adding excluded URL:', value);
            // The actual chip addition is handled by the default addArrayItem method
            // You can add custom validation or processing here if needed
          },
          // Custom remove handler - optional notification when removing
          remove: function(value, index, field, formData, component) {
            console.log('Removed excluded URL:', value);
            // The actual removal is handled by the default removeArrayItem method
          }
        }
      }
    },
  ],
  script: `(function() {
                const script = document.createElement('script');
                script.src = 'https://browser.sentry-cdn.com/9.35.0/bundle.tracing.min.js';
                script.integrity = 'sha384-XvcGe2ErrJucCsy3ffdT1rnrcilIPvF5GfEDumgaFnypaxiXyJqr4p4zdMfDrTcM';
                script.crossOrigin = 'anonymous';
                script.onload = () => {
                    Sentry.init({
                    dsn: '{{dsn}}',
                    sendDefaultPii: true,
                    integrations: [
                        new Sentry.BrowserTracing(),
                        new Sentry.Replay()
                    ],
                    tracesSampleRate: 1.0,
                    replaysSessionSampleRate: 0.1,
                    replaysOnErrorSampleRate: 1.0,
                    denyUrls: [{{excludedUrls}}] || [],
                    });
                };
                document.head.appendChild(script);
                })();`
};

module.exports = sentryTemplate; 
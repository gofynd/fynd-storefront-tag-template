/**
 * Mixpanel Template
 */

const createTemplate = require('../utils/createTemplate');

const mixpanelTemplate = createTemplate({
  // Required keys
  name: 'Mixpanel',
  path: 'mixpanel',
  description: 'Product analytics for user behavior tracking.',
  template_id: '1006',
  template_version: '1.0.0',
  category: 'analytics',
  type: 'js',
  sub_type: 'inline',
  position: 'head',
  attributes: {
    async: 'true'
  },
  compatible_engines: ['react', 'vue2'],
  img: 'https://logo.clearbit.com/mixpanel.com',
  fields: [
    {
      name: 'projectToken',
      type: 'text',
      label: 'Project Token',
      placeholder: 'YOUR_PROJECT_TOKEN',
      required: true,
      size: 'full',
      description: 'Find in Project Settings → Project Token.',
      validation: {
        pattern: /^[a-f0-9]{32}$/,
        message: 'Must be a valid 32-character hex token'
      }
    },
    {
      name: 'apiHost',
      type: 'select',
      label: 'Data Residency',
      required: false,
      size: 'medium',
      description: 'Choose server location for data storage compliance.',
      options: [
        { label: 'US (Default)', value: '' },
        { label: 'EU', value: 'https://api-eu.mixpanel.com' },
        { label: 'India', value: 'https://api-in.mixpanel.com' }
      ],
      default: ''
    },
    {
      name: 'persistence',
      type: 'select',
      label: 'Data Persistence',
      required: false,
      size: 'medium',
      description: 'How to store user data. localStorage is more reliable.',
      options: [
        { label: 'Cookie (Default)', value: 'cookie' },
        { label: 'Local Storage', value: 'localStorage' }
      ],
      default: 'cookie'
    },
    {
      name: 'trackPageviews',
      type: 'checkbox',
      label: 'Track Page Views',
      default: true,
      size: 'medium',
      description: 'Automatically track page views on route changes.'
    },
    {
      name: 'sessionRecording',
      type: 'number',
      label: 'Session Recording %',
      placeholder: '0',
      required: false,
      size: 'medium',
      description: 'Percentage of sessions to record (0-100). 0 = disabled.',
      validation: {
        min: 0,
        max: 100,
        message: 'Must be between 0 and 100'
      },
      default: 0
    },
    {
      name: 'sessionTimeout',
      type: 'number',
      label: 'Session Timeout (minutes)',
      placeholder: '30',
      required: false,
      size: 'medium',
      description: 'Minutes of inactivity before session ends.',
      validation: {
        min: 1,
        max: 1440,
        message: 'Must be between 1 and 1440 minutes'
      },
      default: 30
    },
    {
      name: 'ignoreDnt',
      type: 'checkbox',
      label: 'Ignore Do Not Track',
      default: false,
      size: 'medium',
      description: 'Track users even if browser DNT is enabled.'
    },
    {
      name: 'trackLinks',
      type: 'checkbox',
      label: 'Track All Link Clicks',
      default: false,
      size: 'medium',
      description: 'Automatically track clicks on all links.'
    },
    {
      name: 'ignoreReferrer',
      type: 'checkbox',
      label: 'Ignore Referrer',
      default: false,
      size: 'medium',
      description: 'Do not track referrer information.'
    },
    {
      name: 'secureCookie',
      type: 'checkbox',
      label: 'Secure Cookie',
      default: true,
      size: 'medium',
      description: 'Use secure flag for cookies (HTTPS only).',
      condition: function(formData) {
        return formData.persistence === 'cookie';
      }
    },
    {
      name: 'crossSubdomainCookie',
      type: 'checkbox',
      label: 'Cross Subdomain Cookie',
      default: true,
      size: 'medium',
      description: 'Share cookies across subdomains.',
      condition: function(formData) {
        return formData.persistence === 'cookie';
      }
    },
    {
      name: 'useIpForGeolocation',
      type: 'checkbox',
      label: 'Use IP for Geolocation',
      default: true,
      size: 'medium',
      description: 'Enrich events with geographic data from IP.'
    },
    {
      name: 'batchSize',
      type: 'number',
      label: 'Batch Size',
      placeholder: '50',
      required: false,
      size: 'small',
      description: 'Events per network request (max 50).',
      validation: {
        min: 1,
        max: 50,
        message: 'Must be between 1 and 50'
      },
      default: 50
    },
    {
      name: 'debug',
      type: 'checkbox',
      label: 'Debug Mode',
      default: false,
      size: 'medium',
      description: 'Enable console logging for debugging.'
    },
    {
      name: 'propertyBlacklist',
      type: 'array',
      label: 'Properties to Exclude',
      description: 'Default properties to prevent from tracking.',
      help_link: {
        url: 'https://docs.mixpanel.com/docs/privacy/protecting-user-data#blacklisting-default-properties',
        text: 'Learn more'
      },
      default: [],
      size: 'full',
      input_config: {
        type: 'text',
        placeholder: 'e.g., $referrer, $current_url',
        button_text: 'Add Property',
        input_size: 'medium',
        button_size: 'small',
        validation: {
          pattern: /^[\w$]+$/,
          message: 'Property names can only contain letters, numbers, underscores, and $'
        }
      }
    }
  ],
  script: `(function() {
    // Mixpanel snippet
    (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js':"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
    
    // Initialize with configuration
    var config = {
      debug: {{debug}},
      track_pageview: {{trackPageviews}},
      persistence: '{{persistence}}',
      ignore_dnt: {{ignoreDnt}},
      track_links_timeout: 300,
      batch_size: {{batchSize}},
      batch_flush_interval_ms: 2000,
      disable_persistence: false,
      upgrade: true,
      disable_cookie: false,
      secure_cookie: {{secureCookie}},
      cross_subdomain_cookie: {{crossSubdomainCookie}},
      cross_site_cookie: false,
      store_google: true,
      save_referrer: !{{ignoreReferrer}},
      test: false,
      verbose: false,
      img: false,
      strict_mode: false,
      ip: {{useIpForGeolocation}},
      property_blacklist: [{{propertyBlacklist}}] || []
    };
    
    // Add session recording if enabled
    if ({{sessionRecording}} > 0) {
      config.record_sessions_percent = {{sessionRecording}};
    }
    
    // Add session timeout if specified
    if ({{sessionTimeout}} && {{sessionTimeout}} > 0) {
      config.session_duration = {{sessionTimeout}} * 60 * 1000; // Convert minutes to ms
    }
    
    // Add API host for EU/India residency
    var apiHost = '{{apiHost}}';
    if (apiHost) {
      config.api_host = apiHost;
    }
    
    // Initialize Mixpanel
    mixpanel.init('{{projectToken}}', config);
    
    // Track all link clicks if enabled
    if ({{trackLinks}}) {
      mixpanel.track_links('a', 'Link Click', function(element) {
        return {
          link_text: element.textContent || element.innerText || '',
          link_url: element.href,
          link_target: element.target
        };
      });
    }
  })();`
});

module.exports = mixpanelTemplate; 
# @gofynd/storefront-tag-templates

A comprehensive collection of pre-configured tag templates for analytics, marketing, and tracking services on Fynd Platform storefronts.

## Table of Contents

- [Usage](#usage)
- [Available Templates](#available-templates)
- [Creating a New Template](#creating-a-new-template)
  - [Template Structure](#template-structure)
  - [Required Keys](#required-keys)
  - [Optional Keys](#optional-keys)
  - [Field Configuration](#field-configuration)
  - [Step-by-Step Guide](#step-by-step-guide)
- [Contributing](#contributing)
- [License](#license)



## Usage

### Using Default Templates

```javascript
// Import all templates
const templates = require('@gofynd/storefront-tag-templates');

// Use a specific template
const gtmTemplate = templates.gtm;
const sentryTemplate = templates.sentry;
```

### Using Individual Templates

```javascript
// Import specific templates
const { gtm, ga4, hotjar } = require('@gofynd/storefront-tag-templates');
```

### Optimized Imports by Category

To reduce bundle size, you can import only the category of templates you need:

```javascript
// Import only analytics templates
const analyticsTemplates = require('@gofynd/storefront-tag-templates/analytics');
// Access: gtm, ga4, amplitude, adobeAnalytics, mixpanel, heap, etc.

// Import only session recording templates
const recordingTemplates = require('@gofynd/storefront-tag-templates/recording');
// Access: hotjar, crazyegg, fullstory, mouseflow, logrocket

// Import only customer engagement templates
const engagementTemplates = require('@gofynd/storefront-tag-templates/engagement');
// Access: clevertap, moengage, webengage, pushengage, notifyvisitors, intercom

// Import only A/B testing templates
const testingTemplates = require('@gofynd/storefront-tag-templates/testing');
// Access: optimizely, adobeTarget, abTasty

// Import only feedback/survey templates
const feedbackTemplates = require('@gofynd/storefront-tag-templates/feedback');
// Access: qualaroo, survicate, typeform, usabilla

// Import only error monitoring templates
const monitoringTemplates = require('@gofynd/storefront-tag-templates/monitoring');
// Access: sentry, trackjs
```

### ES Module Imports

```javascript
// Import all templates
import templates from '@gofynd/storefront-tag-templates';

// Import specific categories for smaller bundle size
import analyticsTemplates from '@gofynd/storefront-tag-templates/analytics';
import recordingTemplates from '@gofynd/storefront-tag-templates/recording';
```

### Creating Custom Templates

```javascript
const { createTemplate } = require('@gofynd/storefront-tag-templates');

const myCustomTemplate = createTemplate({
  name: 'My Custom Tag',
  template_id: '2001',
  // ... other configuration
});
```

## Available Templates

### Analytics (10 templates)
- **Google Tag Manager** (`gtm`) - Container-based tag management
- **Google Analytics 4** (`ga4`) - Google's latest analytics platform
- **Amplitude** (`amplitude`) - Product analytics for user behavior
- **Adobe Analytics** (`adobeAnalytics`) - Enterprise analytics solution
- **Mixpanel** (`mixpanel`) - Product analytics with user tracking
- **Heap** (`heap`) - Automatic event tracking analytics
- **Adobe Launch** (`adobeLaunch`) - Adobe's tag management system
- **Segment** (`segment`) - Customer data platform
- **mParticle** (`mparticle`) - Customer data platform
- **Quantcast** (`quantcast`) - Audience measurement

### Session Recording & Heatmaps (5 templates)
- **Hotjar** (`hotjar`) - Heatmaps and session recordings
- **Crazy Egg** (`crazyegg`) - Heatmaps and A/B testing
- **FullStory** (`fullstory`) - Digital experience analytics
- **Mouseflow** (`mouseflow`) - Session replay and heatmaps
- **LogRocket** (`logrocket`) - Session replay with console logs

### A/B Testing & Personalization (3 templates)
- **Optimizely** (`optimizely`) - Experimentation platform
- **Adobe Target** (`adobeTarget`) - Personalization and testing
- **AB Tasty** (`abTasty`) - A/B testing and personalization

### Customer Engagement (6 templates)
- **CleverTap** (`clevertap`) - Customer engagement platform
- **MoEngage** (`moengage`) - Customer engagement automation
- **WebEngage** (`webengage`) - Marketing automation
- **PushEngage** (`pushengage`) - Web push notifications
- **NotifyVisitors** (`notifyvisitors`) - Customer engagement tools
- **Intercom** (`intercom`) - Customer messaging platform

### Surveys & Feedback (4 templates)
- **Qualaroo** (`qualaroo`) - User research and feedback
- **Survicate** (`survicate`) - Customer feedback surveys
- **Typeform** (`typeform`) - Interactive forms and surveys
- **Usabilla** (`usabilla`) - User feedback management

### Other Categories
- **Sentry** (`sentry`) - Error tracking and monitoring
- **TrackJS** (`trackjs`) - JavaScript error monitoring
- **Totango** (`totango`) - Customer success platform

## Creating a New Template

### Template Structure

Every template is a JavaScript object with specific keys that define its behavior and configuration. Here's a complete guide to creating your own template.

### Required Keys

These keys MUST be present in every template:

#### 1. `name` (string)
The display name of your template shown in the UI.

```javascript
name: "Google Analytics 4"
```

#### 2. `path` (string)
Unique URL-friendly identifier for the template.

```javascript
path: "google-analytics-4"
```

#### 3. `description` (string)
Brief description of what the template does.

```javascript
description: "Track user behavior and measure site performance with Google Analytics."
```

#### 4. `template_id` (string)
Unique numeric identifier for the template.

```javascript
template_id: "2001"
```

#### 5. `template_version` (string)
Version number of the template following semantic versioning.

```javascript
template_version: "1.0.0"
```

#### 6. `fields` (array)
Array of form field configurations that users will fill out. See [Field Configuration](#field-configuration) for details.

```javascript
fields: [
  {
    name: "apiKey",
    type: "text",
    label: "API Key",
    required: true
  }
]
```

#### 7. `script` (string)
The JavaScript code template that will be injected into the page. Use `{{fieldName}}` placeholders for dynamic values.

```javascript
script: `(function() {
  var apiKey = '{{apiKey}}';
  // Your tracking code here
})();`
```

### Optional Keys

#### 8. `category` (string)
Categorizes the template for better organization. Common categories:
- `analytics` - Analytics and measurement tools
- `recording` - Session recording and heatmaps
- `testing` - A/B testing and experimentation
- `engagement` - Customer engagement and messaging
- `feedback` - Surveys and feedback collection
- `monitoring` - Error tracking and monitoring
- `performance` - Performance monitoring

```javascript
category: 'analytics'
```

#### 9. `img` (string)
URL to the service's logo image.

```javascript
img: "https://logo.clearbit.com/google.com"
```

#### 10. `note` (string)
Help text shown to users. Supports **markdown** for bold text.

```javascript
note: "Find your **API Key** in Settings → API Keys. This key is required for tracking."
```

#### 11. `help_link` (object)
Link to external documentation.

```javascript
help_link: {
  text: "Learn more about setup in the",
  url: "https://docs.example.com/setup",
  label: "Documentation"
}
```

#### 12. `type` (string)
Script type. Default: `'js'`

```javascript
type: 'js'
```

#### 13. `sub_type` (string)
Script loading method. Options: `'inline'` (default) or `'external'`

```javascript
sub_type: 'inline'
```

#### 14. `position` (string)
Where to inject the script. Options: `'head'` (default) or `'body'`

```javascript
position: 'head'
```

#### 15. `pages` (array)
Specific pages to include the script. Default: `['all']`

```javascript
pages: ['home', 'product', 'checkout']
```

#### 16. `excludePages` (array)
Pages to exclude from script injection.

```javascript
excludePages: ['admin', 'login']
```

#### 17. `attributes` (object)
HTML attributes to add to the script tag.

```javascript
attributes: {
  async: "true",
  defer: "true",
  "data-domain": "example.com"
}
```

#### 18. `compatible_engines` (array)
Template engines this tag works with.

```javascript
compatible_engines: ['react', 'vue2']
```

#### 19. `field_mappings` (object)
Maps template field names to storage keys.

```javascript
field_mappings: {
  apiKey: 'analytics_api_key',
  userId: 'user_identifier'
}
```

#### 20. `layout` (object)
Form layout configuration.

```javascript
layout: {
  columns: 2,        // Number of columns (1, 2, or 3)
  gap: '24px',      // Gap between fields
  responsive: true   // Enable responsive behavior
}
```

#### 21. `saveButtonDisabled` (function)
Custom logic to control save button state.

```javascript
saveButtonDisabled: function(formData, errors, component) {
  // Return true to disable, false to enable
  return formData.apiKey && formData.apiKey.length < 10;
}
```

### Field Configuration

Fields define the form inputs users interact with. Each field is an object with these properties:

#### Basic Field Properties

```javascript
{
  name: "apiKey",              // Field identifier (required)
  type: "text",                // Field type (required)
  label: "API Key",            // Display label (required)
  required: true,              // Is field required?
  size: "medium",              // Field size: small, medium, large, full
  placeholder: "Enter key",    // Placeholder text
  description: "Your API key", // Help text below field
  default: "default-value"     // Default value
}
```

#### Field Types

1. **text** - Single line text input
```javascript
{
  name: "apiKey",
  type: "text",
  label: "API Key",
  validation: {
    pattern: /^[A-Z0-9]+$/,
    message: "Only uppercase letters and numbers allowed"
  }
}
```

2. **textarea** - Multi-line text input
```javascript
{
  name: "customCode",
  type: "textarea",
  label: "Custom JavaScript",
  rows: 5  // Number of visible rows
}
```

3. **number** - Numeric input
```javascript
{
  name: "timeout",
  type: "number",
  label: "Timeout (ms)",
  validation: {
    min: 100,
    max: 10000,
    message: "Must be between 100 and 10000"
  }
}
```

4. **select** - Dropdown selection
```javascript
{
  name: "region",
  type: "select",
  label: "Data Region",
  options: [
    { label: "United States", value: "us" },
    { label: "Europe", value: "eu" },
    { label: "Asia Pacific", value: "apac" }
  ],
  default: "us",
  searchable: true  // Enable search in dropdown
}
```

5. **checkbox** - Boolean toggle
```javascript
{
  name: "enableTracking",
  type: "checkbox",
  label: "Enable Tracking",
  default: true
}
```

6. **array** - Dynamic list of values
```javascript
{
  name: "allowedDomains",
  type: "array",
  label: "Allowed Domains",
  default: [],
  input_config: {
    type: "text",
    placeholder: "example.com",
    button_text: "Add Domain",
    input_size: "medium",
    button_size: "small",
    validation: {
      pattern: /^[a-z0-9.-]+\.[a-z]{2,}$/i,
      message: "Must be a valid domain"
    }
  }
}
```

#### Advanced Field Features

1. **Conditional Fields** - Show/hide based on other fields
```javascript
{
  name: "apiSecret",
  type: "text",
  label: "API Secret",
  condition: function(formData) {
    return formData.authType === 'oauth';
  }
}
```

2. **Field Events** - React to user interactions
```javascript
{
  name: "websiteUrl",
  type: "text",
  label: "Website URL",
  events: {
    blur: function(value, field, formData, component) {
      // Clean up URL on blur
      if (value && !value.startsWith('http')) {
        component.$set(formData, field.name, 'https://' + value);
      }
    },
    change: function(value, field, formData, component) {
      // React to changes
      console.log('URL changed to:', value);
    }
  }
}
```

3. **Validation** - Client-side validation
```javascript
{
  name: "email",
  type: "text",
  label: "Email",
  validation: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address"
  }
}
```

4. **Help Links** - Additional documentation
```javascript
{
  name: "complexField",
  type: "text",
  label: "Complex Configuration",
  help_link: {
    url: "https://docs.example.com/complex-field",
    text: "Learn more"
  }
}
```

### Step-by-Step Guide

#### 1. Create a new file in `src/templates/`

```bash
touch src/templates/myservice.js
```

#### 2. Import the createTemplate helper

```javascript
const createTemplate = require('../utils/createTemplate');
```

#### 3. Define your template

```javascript
const myServiceTemplate = createTemplate({
  // Required fields
  name: "My Service",
  path: "my-service",
  description: "Description of what My Service does",
  template_id: "2001",
  template_version: "1.0.0",
  
  // Categorization
  category: 'analytics',
  
  // Visual elements
  img: "https://logo.clearbit.com/myservice.com",
  note: "Find your **Account ID** in Settings → Account.",
  help_link: {
    text: "Learn more in the",
    url: "https://docs.myservice.com",
    label: "Documentation"
  },
  
  // Technical configuration
  type: 'js',
  sub_type: 'inline',
  position: 'head',
  attributes: {
    async: "true"
  },
  compatible_engines: ['react', 'vue2'],
  
  // Field mappings
  field_mappings: {
    accountId: 'my_service_account_id'
  },
  
  // Layout
  layout: {
    columns: 2,
    gap: '24px'
  },
  
  // Form fields
  fields: [
    {
      name: "accountId",
      type: "text",
      label: "Account ID",
      placeholder: "YOUR_ACCOUNT_ID",
      required: true,
      size: "full",
      description: "Find in Settings → Account",
      validation: {
        pattern: /^[A-Z0-9]{8,}$/,
        message: "Must be at least 8 characters"
      }
    },
    {
      name: "enableTracking",
      type: "checkbox",
      label: "Enable Tracking",
      default: true,
      size: "medium",
      description: "Track page views automatically"
    }
  ],
  
  // Script template
  script: `(function() {
    var accountId = '{{accountId}}';
    var enableTracking = {{enableTracking}};
    
    // Your tracking code here
    var script = document.createElement('script');
    script.src = 'https://cdn.myservice.com/tracker.js?id=' + accountId;
    script.async = true;
    
    if (enableTracking) {
      script.onload = function() {
        window.MyService.init(accountId);
        window.MyService.trackPageView();
      };
    }
    
    document.head.appendChild(script);
  })();`
});

module.exports = myServiceTemplate;
```

#### 4. Add to the main template file

Edit `src/template.js`:

```javascript
// Import your template
const myServiceTemplate = require('./templates/myservice');

// Add to the templates object in the appropriate category
const templates = {
  // Analytics
  gtm: gtmTemplate,
  ga4: ga4Template,
  myservice: myServiceTemplate, // Add your template here
  // ... other templates
};
```

#### 5. Export in index.js

Edit `src/index.js`:

```javascript
// Add individual export
module.exports.myservice = templates.myservice;
```

#### 6. Test your template

```bash
npm run build
npm test
```

### Best Practices

1. **Use meaningful template IDs** - Start from 2000+ for custom templates
2. **Validate user inputs** - Add proper validation patterns
3. **Provide helpful descriptions** - Make fields self-explanatory
4. **Use conditional fields** - Show only relevant options
5. **Handle errors gracefully** - Add try-catch blocks in scripts
6. **Document special requirements** - Use the note field effectively
7. **Test thoroughly** - Verify the generated script works correctly

### Script Template Tips

1. **Use IIFE** - Wrap scripts in immediately invoked function expressions
```javascript
script: `(function() {
  // Your code here
})();`
```

2. **Handle boolean values correctly**
```javascript
var isEnabled = {{enableFeature}}; // Will output: true/false
if (isEnabled) { /* ... */ }
```

3. **Handle arrays**
```javascript
var domains = [{{allowedDomains}}]; // Will output: ["domain1.com", "domain2.com"]
```

4. **Escape special characters** - The template system handles this automatically

5. **Check for required dependencies**
```javascript
if (typeof window.jQuery === 'undefined') {
  console.error('jQuery is required');
  return;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-template`)
3. Add your template following the guide above
4. Add tests for your template
5. Commit your changes (`git commit -am 'Add new template'`)
6. Push to the branch (`git push origin feature/new-template`)
7. Create a Pull Request


## License

MIT © Fynd Platform

---

For more information, visit the [GitHub repository](https://github.com/gofynd/fynd-storefront-tag-template).

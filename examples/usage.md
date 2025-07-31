# Fynd Storefront Tag Templates - Usage Examples

This guide provides comprehensive examples of how to use the Fynd Storefront Tag Templates in various scenarios.

## Table of Contents
- [Basic Usage](#basic-usage)
- [Template Structure](#template-structure)
- [Field Types](#field-types)
- [Custom Validation](#custom-validation)
- [Event Handlers](#event-handlers)
- [Creating Custom Templates](#creating-custom-templates)

## Basic Usage

### Importing Templates

```javascript
// CommonJS
const templates = require('@fynd/storefront-tag-templates');

// ES6 Modules
import templates from '@fynd/storefront-tag-templates';

// Destructuring specific templates
const { gtm, sentry, ga4 } = templates;
```

### Accessing Template Properties

```javascript
// Get Google Tag Manager template
const gtmTemplate = templates.gtm;

console.log(gtmTemplate.name);           // "Google Tag Manager"
console.log(gtmTemplate.template_id);    // "1001"
console.log(gtmTemplate.fields);         // Array of field configurations
console.log(gtmTemplate.script);         // Template script with placeholders
```

## Template Structure

Each template follows this structure:

```javascript
{
  // Required fields
  name: 'Template Name',
  path: 'template-path',
  description: 'Template description',
  template_id: '1001',
  template_version: '1.0.0',
  fields: [...],
  script: '...',
  
  // Optional fields
  img: 'https://example.com/logo.png',
  note: 'Help text for users',
  help_link: {
    text: 'Learn more about',
    url: 'https://docs.example.com',
    label: 'Documentation'
  },
  field_mappings: {
    fieldName: 'api_field_name'
  },
  layout: {
    columns: 2,
    gap: '20px',
    responsive: true
  }
}
```

## Field Types

### Text Field
```javascript
{
  name: 'apiKey',
  type: 'text',
  label: 'API Key',
  placeholder: 'Enter your API key',
  required: true,
  size: 'full',
  validation: {
    pattern: /^[A-Z0-9]{32}$/,
    message: 'Must be 32 alphanumeric characters'
  }
}
```

### Array Field with Chips
```javascript
{
  name: 'allowedDomains',
  type: 'array',
  label: 'Allowed Domains',
  description: 'Add domains to whitelist',
  default: ['example.com'],
  size: 'full',
  input_config: {
    type: 'text',
    placeholder: 'Enter domain',
    button_text: 'Add Domain',
    validation: {
      pattern: /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i,
      message: 'Invalid domain format'
    }
  }
}
```

### Select Field
```javascript
{
  name: 'environment',
  type: 'select',
  label: 'Environment',
  required: true,
  default: 'production',
  options: [
    { label: 'Production', value: 'production' },
    { label: 'Staging', value: 'staging' },
    { label: 'Development', value: 'development' }
  ],
  searchable: true
}
```

### Multiselect Field
```javascript
{
  name: 'enabledFeatures',
  type: 'multiselect',
  label: 'Enable Features',
  options: [
    { label: 'Error Tracking', value: 'errors' },
    { label: 'Performance Monitoring', value: 'performance' },
    { label: 'Session Replay', value: 'replay' }
  ],
  default: ['errors'],
  searchable: true
}
```

### Checkbox Field
```javascript
{
  name: 'enableDebug',
  type: 'checkbox',
  label: 'Enable Debug Mode',
  default: false,
  description: 'Turn on console logging'
}
```

### Number Field
```javascript
{
  name: 'sampleRate',
  type: 'number',
  label: 'Sample Rate (%)',
  default: 100,
  placeholder: 'Enter percentage',
  validation: {
    min: 0,
    max: 100,
    message: 'Must be between 0 and 100'
  }
}
```

## Custom Validation

### Pattern Validation
```javascript
{
  name: 'trackingId',
  type: 'text',
  validation: {
    pattern: /^UA-\d{9}-\d{1}$/,
    message: 'Format: UA-XXXXXXXXX-X'
  }
}
```

### Custom Validation Function
```javascript
{
  name: 'customField',
  type: 'text',
  validation: {
    validate: (value) => {
      if (value.length < 10) {
        return 'Must be at least 10 characters';
      }
      if (value.includes(' ')) {
        return 'Cannot contain spaces';
      }
      return true; // Valid
    }
  }
}
```

## Event Handlers

### Input Events
```javascript
{
  name: 'domain',
  type: 'text',
  events: {
    input: function(value, field, formData, component) {
      // Called on every input change
      console.log('Current value:', value);
    },
    blur: function(value, field, formData, component) {
      // Auto-format on blur
      if (value && !value.startsWith('https://')) {
        component.$set(formData, field.name, 'https://' + value);
      }
    },
    change: function(value, field, formData, component) {
      // Called when value changes
      console.log('Value changed to:', value);
    }
  }
}
```

### Array Field Events
```javascript
{
  name: 'tags',
  type: 'array',
  input_config: {
    events: {
      click: function(value, field, formData, component) {
        // Before adding item
        console.log('Adding:', value);
        // Return false to prevent addition
        return value.length > 3;
      },
      remove: function(value, index, field, formData, component) {
        // Before removing item
        console.log('Removing:', value, 'at index', index);
      }
    }
  }
}
```

### Conditional Fields
```javascript
{
  name: 'apiEndpoint',
  type: 'text',
  condition: function(formData) {
    // Only show if custom environment is selected
    return formData.environment === 'custom';
  }
}
```

## Creating Custom Templates

### Basic Template
```javascript
const myTemplate = {
  name: 'My Analytics Tool',
  path: 'my-analytics',
  description: 'Custom analytics integration',
  template_id: '2001',
  template_version: '1.0.0',
  fields: [
    {
      name: 'accountId',
      type: 'text',
      label: 'Account ID',
      required: true
    }
  ],
  script: `
    window.MyAnalytics = window.MyAnalytics || [];
    window.MyAnalytics.push(['init', '{{accountId}}']);
  `
};
```

### Advanced Template with All Features
```javascript
const advancedTemplate = {
  name: 'Advanced Tracking',
  path: 'advanced-tracking',
  description: 'Comprehensive tracking solution',
  template_id: '3001',
  template_version: '2.0.0',
  img: 'https://example.com/logo.png',
  note: 'Configure your tracking settings below. **Required fields are marked with asterisk.**',
  help_link: {
    text: 'Need help? Check our',
    url: 'https://docs.example.com/setup',
    label: 'setup guide'
  },
  field_mappings: {
    accountId: 'account_id',
    enabledFeatures: 'features',
    customDomains: 'domains'
  },
  layout: {
    columns: 3,
    gap: '24px',
    responsive: true
  },
  fields: [
    {
      name: 'accountId',
      type: 'text',
      label: 'Account ID',
      required: true,
      size: 'large',
      validation: {
        pattern: /^ACC-[0-9]{8}$/,
        message: 'Format: ACC-XXXXXXXX'
      }
    },
    {
      name: 'environment',
      type: 'select',
      label: 'Environment',
      required: true,
      size: 'medium',
      default: 'production',
      options: [
        { label: 'Production', value: 'production' },
        { label: 'Staging', value: 'staging' },
        { label: 'Development', value: 'development' },
        { label: 'Custom', value: 'custom' }
      ]
    },
    {
      name: 'customEndpoint',
      type: 'text',
      label: 'Custom API Endpoint',
      size: 'large',
      placeholder: 'https://api.example.com',
      condition: function(formData) {
        return formData.environment === 'custom';
      },
      validation: {
        pattern: /^https:\/\/.+/,
        message: 'Must be a valid HTTPS URL'
      }
    },
    {
      name: 'enabledFeatures',
      type: 'multiselect',
      label: 'Features',
      size: 'full',
      options: [
        { label: 'Page Views', value: 'pageviews' },
        { label: 'Events', value: 'events' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'User Properties', value: 'users' }
      ],
      default: ['pageviews', 'events']
    },
    {
      name: 'customDomains',
      type: 'array',
      label: 'Track Additional Domains',
      size: 'full',
      description: 'Add domains to track cross-domain activity',
      input_config: {
        type: 'text',
        placeholder: 'example.com',
        button_text: 'Add Domain',
        validation: {
          pattern: /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i,
          message: 'Invalid domain format'
        }
      }
    },
    {
      name: 'debugMode',
      type: 'checkbox',
      label: 'Enable Debug Mode',
      size: 'small',
      default: false
    }
  ],
  script: `
    (function() {
      var config = {
        accountId: '{{accountId}}',
        environment: '{{environment}}',
        endpoint: '{{customEndpoint}}' || 'https://api.tracking.com',
        features: {{enabledFeatures}},
        domains: {{customDomains}},
        debug: {{debugMode}}
      };
      
      // Initialize tracking
      window.Tracker = window.Tracker || [];
      window.Tracker.push(['init', config]);
      
      // Load tracking script
      var script = document.createElement('script');
      script.src = config.endpoint + '/tracker.js';
      script.async = true;
      document.head.appendChild(script);
    })();
  `,
  saveButtonDisabled: function(formData, errors, component) {
    // Custom logic to disable save button
    if (formData.environment === 'custom' && !formData.customEndpoint) {
      return true; // Disable if custom environment but no endpoint
    }
    return !component.isFormValid; // Otherwise use standard validation
  }
};
```

## Integration with Fynd Platform

When integrating these templates with the Fynd Platform:

1. Templates are rendered in the tag management interface
2. Field values are collected through the generated form
3. The `script` template is processed, replacing `{{placeholders}}` with actual values
4. The final script is injected into the storefront

### Example Implementation
```javascript
// Get template
const template = templates.gtm;

// User fills form with values
const formData = {
  gtmId: 'GTM-ABC123'
};

// Process script template
const finalScript = template.script.replace('{{gtmId}}', formData.gtmId);

// Result is injected into page
```

## Best Practices

1. **Validation**: Always include proper validation for critical fields
2. **Defaults**: Provide sensible defaults where applicable
3. **Help Text**: Use `description` and `note` fields to guide users
4. **Responsive Layout**: Use the layout configuration for better UX
5. **Error Messages**: Provide clear, actionable error messages
6. **Event Handlers**: Use events for auto-formatting and enhanced UX
7. **Conditional Fields**: Hide irrelevant fields to reduce complexity

## Troubleshooting

### Common Issues

1. **Validation Errors**: Check regex patterns and error messages
2. **Script Placeholders**: Ensure all `{{placeholders}}` match field names
3. **Field Dependencies**: Use `condition` functions for dependent fields
4. **Array Fields**: Configure `input_config` properly for array inputs

### Debug Mode

Enable debug logging in templates:
```javascript
script: `
  if ({{debugMode}}) {
    console.log('Template initialized with:', {
      field1: '{{field1}}',
      field2: '{{field2}}'
    });
  }
`
```

## Support

For more examples and support:
- [GitHub Repository](https://github.com/yourusername/fynd-storefront-tag-template)
- [Fynd Platform Docs](https://platform.fynd.com/docs)
- [Issue Tracker](https://github.com/yourusername/fynd-storefront-tag-template/issues) 
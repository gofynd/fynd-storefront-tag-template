# Fynd Storefront Tag Templates - Usage Examples

This guide provides comprehensive examples of how to use the Fynd Storefront Tag Templates in various scenarios. This document is intended for form renderer implementation.

## Table of Contents
- [Basic Usage](#basic-usage)
- [Template Structure](#template-structure)
- [Field Types](#field-types)
- [Field Configuration](#field-configuration)
- [Validation](#validation)
- [Event Handlers](#event-handlers)
- [Layout Configuration](#layout-configuration)
- [Data Transformation](#data-transformation)
- [Script Attributes](#script-attributes)
- [Creating Custom Templates](#creating-custom-templates)

## Basic Usage

### Importing Templates

```javascript
// CommonJS
const templates = require('@gofynd/storefront-tag-templates');

// ES6 Modules
import templates from '@gofynd/storefront-tag-templates';

// Destructuring specific templates
const { gtm, sentry, ga4 } = templates;
```

### Accessing Template Properties

```javascript
const template = templates.gtm;

console.log(template.name);           // Display name
console.log(template.template_id);    // Unique ID
console.log(template.fields);         // Array of field configurations
console.log(template.script);         // Template script with placeholders
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
  image: 'https://example.com/logo.png',
  note: 'Help text for users (supports **markdown** for bold)',
  category: 'analytics',  // Template category for grouping
  help_link: {
    text: 'Learn more about',
    url: 'https://docs.example.com',
    label: 'Documentation'
  },
  type: 'js',           // Script type (default: 'js')
  sub_type: 'inline',   // Script subtype (default: 'inline')
  position: 'head',     // Script position (default: 'head')
  pages: [],            // Pages to include (default: ['all'])
  excludePages: [],     // Pages to exclude
  attributes: {},       // Script tag attributes
  compatible_engines: ['react', 'vue2'],
  field_mappings: {
    fieldName: 'api_field_name'
  },
  layout: {
    columns: 2,
    gap: '20px',
    responsive: true
  },
  transformData: function(data) { return data; },  // Data transformation
  saveButtonDisabled: function(formData, errors, component) { return false; }
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
  size: 'full',        // 'small', 'medium', 'large', 'full'
  description: 'Description text shown below label',
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
  useTooltip: false,   // Show description as text instead of tooltip
  help_link: {         // Field-level help link
    url: 'https://docs.example.com/domains',
    text: 'Learn more about domain configuration'
  },
  input_config: {
    type: 'text',
    placeholder: 'Enter domain',
    button_text: 'Add Domain',
    input_size: 'large',   // Size for the input field
    button_size: 'small',  // Size for the add button
    button_disabled: function(inputValue) {
      // Disable button until input has value
      return !inputValue || inputValue.trim() === '';
    },
    validation: {
      pattern: /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i,
      message: 'Invalid domain format'
    },
    events: {
      click: function(value, field, formData, component) {
        console.log('Adding:', value);
      },
      remove: function(value, index, field, formData, component) {
        console.log('Removing:', value, 'at index', index);
      }
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

## Field Configuration

### Field Sizes
```javascript
{
  size: 'small'   // ~25% width
  size: 'medium'  // ~50% width
  size: 'large'   // ~75% width
  size: 'full'    // 100% width
}
```

### Field-level Help Link
```javascript
{
  name: 'fieldName',
  type: 'text',
  label: 'Field Label',
  help_link: {
    url: 'https://docs.example.com/field-help',
    text: 'Learn more about this field'
  }
}
```

### Tooltip vs Description Text
```javascript
{
  name: 'fieldName',
  type: 'array',
  description: 'This is the description text',
  useTooltip: true,   // true = show as tooltip (default)
  useTooltip: false   // false = show as inline text below field
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
  },
  visible: function(formData) {
    // Alternative: use 'visible' property
    return formData.showAdvanced === true;
  }
}
```

## Validation

### Pattern Validation (String)
```javascript
{
  validation: {
    pattern: "/^UA-\\d{9}-\\d{1}$/",  // String format
    message: 'Format: UA-XXXXXXXXX-X'
  }
}
```

### Pattern Validation (RegExp)
```javascript
{
  validation: {
    pattern: /^UA-\d{9}-\d{1}$/,  // RegExp object
    message: 'Format: UA-XXXXXXXXX-X'
  }
}
```

### Custom Validation Function
```javascript
{
  validation: {
    validate: function(value) {
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

### Number Validation
```javascript
{
  validation: {
    min: 0,
    max: 100,
    message: 'Must be between 0 and 100'
  }
}
```

### Array Field Input Validation
```javascript
{
  name: 'urls',
  type: 'array',
  input_config: {
    validation: {
      pattern: /^https?:\/\/.+$/,
      message: 'Must be a valid URL'
    }
  }
}
```

## Event Handlers

### Text Field Events
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
    },
    focus: function(value, field, formData, component) {
      // Called when field receives focus
      console.log('Field focused');
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
        // Called before adding item
        console.log('Adding:', value);
        // Return false to prevent addition
        return value.length > 3;
      },
      remove: function(value, index, field, formData, component) {
        // Called before removing item
        console.log('Removing:', value, 'at index', index);
        // Return false to prevent removal
      }
    }
  }
}
```

### Button Disabled State
```javascript
{
  name: 'urls',
  type: 'array',
  input_config: {
    button_text: 'Add URL',
    button_disabled: function(inputValue) {
      // Return true to disable, false to enable
      return !inputValue || inputValue.trim() === '';
    }
  }
}
```

## Layout Configuration

### Basic Layout
```javascript
{
  layout: {
    columns: 2,      // Number of columns (1, 2, 3, etc.)
    gap: '20px'      // Gap between fields
  }
}
```

### Responsive Layout
```javascript
{
  layout: {
    columns: 3,
    gap: '16px',
    responsive: true  // Enable responsive behavior for mobile
  }
}
```

## Data Transformation

### Transform Data Before Script Injection
Use `transformData` to modify field values before they are injected into the script:

```javascript
{
  transformData: function(data) {
    // Convert array to JSON string for data attributes
    if (data.excludedUrls && Array.isArray(data.excludedUrls)) {
      data.excludedUrlsJson = JSON.stringify(data.excludedUrls);
    } else {
      data.excludedUrlsJson = '[]';
    }
    
    // Add computed fields
    data.timestamp = Date.now();
    
    return data;
  }
}
```

## Script Attributes

### Static Attributes
```javascript
{
  attributes: {
    async: "true",
    defer: "true",
    crossorigin: "anonymous"
  }
}
```

### Dynamic Attributes with Placeholders
```javascript
{
  attributes: {
    async: "true",
    "data-config": "{{configJson}}",
    "data-excluded-urls": "{{excludedUrlsJson}}"
  },
  transformData: function(data) {
    data.configJson = JSON.stringify(data.config);
    data.excludedUrlsJson = JSON.stringify(data.excludedUrls || []);
    return data;
  }
}
```

### Reading Attributes in Script
```javascript
script: `(function() {
  // Find script element with data attribute
  var scripts = document.querySelectorAll('script[data-config]');
  var currentScript = scripts[scripts.length - 1];
  
  if (currentScript) {
    var configData = currentScript.getAttribute('data-config');
    try {
      var config = JSON.parse(configData);
      console.log('Config:', config);
    } catch (e) {
      console.warn('Failed to parse config:', e);
    }
  }
})();`
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
  category: 'analytics',
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
  category: 'analytics',
  image: 'https://example.com/logo.png',
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
  attributes: {
    async: "true",
    "data-domains": "{{domainsJson}}"
  },
  transformData: function(data) {
    data.domainsJson = JSON.stringify(data.customDomains || []);
    return data;
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
      useTooltip: false,
      help_link: {
        url: 'https://docs.example.com/cross-domain',
        text: 'Learn about cross-domain tracking'
      },
      input_config: {
        type: 'text',
        placeholder: 'example.com',
        button_text: 'Add Domain',
        input_size: 'large',
        button_size: 'small',
        button_disabled: function(inputValue) {
          return !inputValue || inputValue.trim() === '';
        },
        validation: {
          pattern: /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i,
          message: 'Invalid domain format'
        },
        events: {
          click: function(value, field, formData, component) {
            console.log('Adding domain:', value);
          },
          remove: function(value, index, field, formData, component) {
            console.log('Removing domain:', value);
          }
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
        debug: {{debugMode}}
      };
      
      // Read domains from data attribute
      var scripts = document.querySelectorAll('script[data-domains]');
      var currentScript = scripts[scripts.length - 1];
      if (currentScript) {
        try {
          config.domains = JSON.parse(currentScript.getAttribute('data-domains'));
        } catch(e) {
          config.domains = [];
        }
      }
      
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

## Integration with Form Renderer

When integrating these templates with the form renderer:

1. Templates are rendered in the tag management interface
2. Field values are collected through the generated form
3. `transformData` is called to prepare data for injection
4. The `script` template is processed, replacing `{{placeholders}}` with actual values
5. `attributes` are applied to the script tag
6. The final script is injected into the storefront

### Field Rendering Priority
1. Check `condition` or `visible` function - skip if returns false
2. Apply field `size` for layout
3. Render label with required indicator if `required: true`
4. Show `description` as tooltip or text based on `useTooltip`
5. Apply validation on input/blur
6. Execute event handlers

### Array Field Rendering
1. Render existing items as chips/tags
2. Show input field with placeholder
3. Show add button (respect `button_disabled` state)
4. Apply `input_config.validation` before adding
5. Execute `events.click` before adding item
6. Execute `events.remove` before removing item

## Best Practices

1. **Validation**: Always include proper validation for critical fields
2. **Defaults**: Provide sensible defaults where applicable
3. **Help Text**: Use `description` and `note` fields to guide users
4. **Responsive Layout**: Use `layout.responsive: true` for better mobile UX
5. **Error Messages**: Provide clear, actionable error messages
6. **Event Handlers**: Use events for auto-formatting and enhanced UX
7. **Conditional Fields**: Hide irrelevant fields to reduce complexity
8. **Data Attributes**: Use `attributes` with `transformData` for complex data injection
9. **Button States**: Use `button_disabled` to prevent invalid submissions

## Troubleshooting

### Common Issues

1. **Validation Errors**: Check regex patterns - use RegExp objects or properly escaped strings
2. **Script Placeholders**: Ensure all `{{placeholders}}` match field names
3. **Field Dependencies**: Use `condition` or `visible` functions for dependent fields
4. **Array Fields**: Configure `input_config` properly for array inputs
5. **Data Injection**: Use `transformData` and `attributes` for complex data types

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
- [GitHub Repository](https://github.com/gofynd/fynd-storefront-tag-template)
- [Fynd Platform Docs](https://platform.fynd.com/docs)
- [Issue Tracker](https://github.com/gofynd/fynd-storefront-tag-template/issues)

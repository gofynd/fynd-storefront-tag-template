# Fynd Storefront Tag Templates

A collection of pre-configured tag templates for Fynd Platform storefronts, including integrations for Google Tag Manager, Sentry, and Google Analytics.

## 📦 Features

- **Google Tag Manager (GTM)** - Advanced analytics and tracking
- **Sentry** - Error monitoring and performance tracking  
- **Google Analytics 4 (GA4)** - Website traffic and user behavior analytics

Each template includes:
- Pre-built scripts with dynamic placeholders
- Form field configurations with validation
- Responsive layouts
- Custom event handlers
- Production-ready code

## 🚀 Installation

### NPM
```bash
npm install @gofynd/storefront-tag-templates
```

### Yarn
```bash
yarn add @gofynd/storefront-tag-templates
```

### CDN
```html
<script src="https://unpkg.com/@gofynd/storefront-tag-templates/dist/templates.umd.js"></script>
```

## 📖 Usage

### CommonJS
```javascript
const templates = require('@gofynd/storefront-tag-templates');
console.log(templates.gtm);
```

### ES6 Modules
```javascript
import templates from '@gofynd/storefront-tag-templates';
console.log(templates.gtm);
```

### Browser
```html
<script src="https://unpkg.com/@gofynd/storefront-tag-templates/dist/templates.umd.js"></script>
<script>
  console.log(window.FyndStorefrontTemplates.gtm);
</script>
```

## 📋 Available Templates

### Google Tag Manager
```javascript
{
  name: 'Google Tag Manager',
  path: 'google-tag-manager',
  template_id: '1001',
  fields: [
    {
      name: 'gtmId',
      type: 'text',
      label: 'Enter Google Tag Manager ID',
      validation: /^GTM-[A-Z0-9]+$/i
    }
  ]
}
```

### Sentry
```javascript
{
  name: 'Sentry',
  path: 'sentry-tag',
  template_id: '1002',
  fields: [
    {
      name: 'dsn',
      type: 'text',
      label: 'Enter Sentry DSN'
    },
    {
      name: 'excludedUrls',
      type: 'array',
      label: 'URLs to exclude'
    }
  ]
}
```

### Google Analytics 4
```javascript
{
  name: 'Google Analytics',
  path: 'google-analytics',
  template_id: '1003',
  fields: [
    {
      name: 'measurementId',
      type: 'text',
      label: 'Enter Google Analytics Property ID',
      validation: /^(G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)$/i
    }
  ]
}
```

## 🏗️ Template Structure

Each template must have these required keys:

- `name` - Display name of the template
- `path` - Unique path identifier
- `description` - Brief description
- `template_id` - Unique template ID
- `template_version` - Version number
- `fields` - Form fields configuration
- `script` - JavaScript template with {{placeholders}}

See the [Template Configuration Guide](./src/template.js) for complete documentation.

## 🛠️ Development

### Prerequisites
- Node.js >= 14.0.0
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/gofynd/fynd-storefront-tag-template.git

# Install dependencies
npm install

# Build for development
npm run build:dev

# Build for production
npm run build

# Watch mode
npm run watch
```

### Scripts
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run watch` - Watch mode for development
- `npm run clean` - Clean build directory
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure
```
fynd-storefront-tag-template/
├── src/
│   └── template.js       # Main template definitions
├── dist/                 # Built files (generated)
│   ├── templates.js      # CommonJS build
│   ├── templates.esm.js  # ES Module build
│   └── templates.umd.js  # UMD build for browsers
├── examples/             # Usage examples
├── webpack.config.js     # Webpack configuration
├── package.json          # Package configuration
└── README.md            # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Fynd Platform Documentation](https://platform.fynd.com/docs)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Sentry Documentation](https://docs.sentry.io/)
- [Google Analytics](https://analytics.google.com/)

## 📞 Support

For issues and feature requests, please [open an issue](https://github.com/gofynd/fynd-storefront-tag-template/issues).

---

Made with ❤️ by the Fynd Platform team 
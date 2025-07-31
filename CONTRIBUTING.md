# Contributing to Fynd Storefront Tag Templates

Thank you for your interest in contributing to Fynd Storefront Tag Templates! We welcome contributions from the community and are grateful for your support.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/fynd-storefront-tag-template.git
   cd fynd-storefront-tag-template
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Process

### Building the Project
```bash
# Development build
npm run build:dev

# Production build
npm run build

# Watch mode
npm run watch
```

### Code Style
- We use ESLint for code linting
- Run `npm run lint` to check your code
- Run `npm run format` to auto-format your code

### Project Structure
```
src/
├── index.js      # Main entry point
└── template.js   # Template definitions
```

## 🎯 Adding a New Template

To add a new template:

1. Open `src/template.js`
2. Add your template to the `templates` object:

```javascript
const templates = {
  // ... existing templates
  
  yourTemplate: createTemplate({
    name: 'Your Template Name',
    path: 'your-template-path',
    description: 'What your template does',
    template_id: 'unique-id',
    template_version: '1.0.0',
    fields: [
      {
        name: 'fieldName',
        type: 'text',
        label: 'Field Label',
        required: true
      }
    ],
    script: `
      // Your template script
      console.log('{{fieldName}}');
    `
  })
};
```

3. Export your template in `src/index.js`:
```javascript
module.exports.yourTemplate = templates.yourTemplate;
```

### Template Guidelines

- **Unique IDs**: Ensure `template_id` is unique
- **Validation**: Add proper validation for fields
- **Documentation**: Include clear descriptions
- **Testing**: Test your template thoroughly
- **Security**: Avoid exposing sensitive data

## 🧪 Testing

Currently, the project uses basic testing. When adding new features:

1. Ensure existing templates still work
2. Test your template with various inputs
3. Verify the generated script works correctly

## 📝 Commit Guidelines

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```bash
git commit -m "feat: add Facebook Pixel template"
git commit -m "fix: correct GTM validation pattern"
git commit -m "docs: update installation instructions"
```

## 🔄 Pull Request Process

1. Update the README.md if needed
2. Update the examples if you've added new features
3. Ensure all commits follow our guidelines
4. Submit a pull request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots if applicable

### PR Title Format
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All existing templates work
- [ ] New template works correctly

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Updated documentation
```

## 🐛 Reporting Issues

### Bug Reports
Include:
- Template name and version
- Steps to reproduce
- Expected vs actual behavior
- Error messages
- Environment details

### Feature Requests
Include:
- Use case description
- Proposed solution
- Alternative solutions considered

## 📚 Resources

- [Template Configuration Guide](./src/template.js)
- [Usage Examples](./examples/usage.md)
- [Fynd Platform Docs](https://platform.fynd.com/docs)

## 🎉 Recognition

Contributors will be recognized in:
- Release notes
- Contributors list
- Project documentation

Thank you for contributing to Fynd Storefront Tag Templates! 
/**
 * Template structure helper
 * Creates a template with default values
 */
const createTemplate = (config) => {
  const defaults = {
    type: 'js',
    sub_type: 'inline',
    position: 'head',
    pages: [],
    attributes: { async: "true" },
    compatible_engines: ['react', 'vue2'],
    field_mappings: {},
    layout: { columns: 2, gap: '20px', responsive: true }
  };
  
  return { ...defaults, ...config };
};

module.exports = createTemplate; 
// Analytics templates
const gtmTemplate = require('./templates/gtm');
const ga4Template = require('./templates/ga4');
const amplitudeTemplate = require('./templates/amplitude');
const adobeAnalyticsTemplate = require('./templates/adobeAnalytics');
const mixpanelTemplate = require('./templates/mixpanel');
const heapTemplate = require('./templates/heap');
const adobeLaunchTemplate = require('./templates/adobeLaunch');
const segmentTemplate = require('./templates/segment');
const mparticleTemplate = require('./templates/mparticle');
const quantcastTemplate = require('./templates/quantcast');
const totangoTemplate = require('./templates/totango');
const posthogTemplate = require('./templates/posthog');
const metaPixelTemplate = require('./templates/metaPixel');

module.exports = {
  gtm: gtmTemplate,
  ga4: ga4Template,
  amplitude: amplitudeTemplate,
  adobeAnalytics: adobeAnalyticsTemplate,
  mixpanel: mixpanelTemplate,
  heap: heapTemplate,
  adobeLaunch: adobeLaunchTemplate,
  segment: segmentTemplate,
  mparticle: mparticleTemplate,
  quantcast: quantcastTemplate,
  totango: totangoTemplate,
  posthog: posthogTemplate,
  metaPixel: metaPixelTemplate
}; 
// Error Tracking & Monitoring templates
const sentryTemplate = require('./templates/sentry');
const trackjsTemplate = require('./templates/trackjs');
const serviceWorkerTemplate = require('./templates/serviceWorker');

module.exports = {
  sentry: sentryTemplate,
//   trackjs: trackjsTemplate
  serviceWorker: serviceWorkerTemplate
}; 
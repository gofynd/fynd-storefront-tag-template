/**
 * FullStory Template
 */

const createTemplate = require('../utils/createTemplate');

const fullstoryTemplate = createTemplate({
  name: "FullStory",
  path: "fullstory-tag",
  description: "Digital experience intelligence platform for session replay and analytics.",
  template_id: "1013",
  template_version: "1.0.0",
  category: 'recording',
  img: "https://logo.clearbit.com/fullstory.com",
  note: "Find your Org ID in Settings → General → Org Id. FullStory captures every user interaction for powerful insights.",
  help_link: {
    text: "Learn more about FullStory installation in the",
    url: "https://help.fullstory.com/hc/en-us/articles/360020828233",
    label: "Developer Guide"
  },
  field_mappings: {
    orgId: "org_id"
  },
  layout: {
    columns: 2,
    gap: "24px"
  },
  fields: [
    {
      name: "orgId",
      type: "text",
      label: "Organization ID",
      placeholder: "XXXXX",
      required: true,
      size: "full",
      description: "Find in Settings → General → Org Id.",
      validation: {
        pattern: /^[A-Z0-9]{3,6}$/,
        message: "Org ID must be 3-6 uppercase alphanumeric characters"
      }
    }
  ],
  script: `window['_fs_host']='fullstory.com';window['_fs_script']='edge.fullstory.com/s/fs.js';window['_fs_org']='{{orgId}}';window['_fs_namespace']='FS';!function(m,n,e,t,l,o,g,y){var s,f,a=function(h){return!(h in m)||(m.console&&m.console.log&&m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'),!1)}(e);function j(b){var h,d=[];function k(){h&&(d.forEach(function(b){var d;try{d=b[h[0]]&&b[h[0]](h[1])}catch(h){return void(m.console&&m.console.log&&m.console.log(h))}d&&d.then?d.then(function(){k()}):k()}),d.length=0)}function r(b){return function(d){h||(h=[b,d],k())}}return b(r,d),r}function i(b){if(!a)return b;var d=window[e];d.q=d.q||[];var h=b.reduce(function(h,b){var d=b;return h[b]=j(function(h,k){d===n?(h(function(h){m._fs_config=h}),v(k)):h(f.wrap(function(){d===t?(m[e]("rec",!1),s.rec=!1,p()):d===l?(m[e]("rec",!s.rec),p()):d===y&&m[e]("identifyAccount",h)}))}),h[b]},{}),k=function(b,d){h[b]||console.warn(b+" is not a valid FullStory function"),h[b](d)};return k}function c(b){b.length>1?f.wrap(function(){var d=b[0],h=1==b.length?b[0]:b[1];m[e](d,h)})():b[0]()}function v(b){b.forEach(c)}function u(){arguments.length>0&&(m[e]?c(arguments):d.push([].slice.call(arguments,0)))}function p(){s.shutdown||f.wrap(function(){s.rec?(m[e]("rec",!1),s.rec=!1,m[e]("rec",!0),s.rec=!0):m[e]("rec",!0)})()}function q(){return s.shutdown?(d.length=0,void(a=!1)):(d.forEach(c),void(d.length=0))}a&&(f=m[e]=i(["ready","begin","beforeShutdown"]),f._v="2.0.0",s=f._s={},s()['catch'](function(){}),o||(o=m[e]),o('setHost',m['_fs_host']),o('setScript',m['_fs_script']),g=m.XMLHttpRequest,m.XMLHttpRequest=function(){var b=new g;return b.open=j(function(h,d){return h(function(){var h=arguments;s.rec&&b.addEventListener("load",function(){200===b.status&&d(function(){o("replayHttp",{method:h[0],url:h[1],status:b.status,response:b.responseText})})}),d()})},b.open),b},a=!0,o.restart=p,o.shutdown=function(){var b=arguments[0],d=!!arguments[1];if(s.shutdown)return void(b&&b());s.shutdown=!0,m[e]("shutdown",{reason:b,immediate:d})},o.opt=function(b){m[e]("opt",{event:b})},o.log=function(){o("log",{level:"info",msg:arguments})},u.apply(m,d))}(window,window['_fs_namespace'],'FS','shutdown','restart',window[window['_fs_namespace']],window['_fs_script'],window['_fs_host']);`
});

module.exports = fullstoryTemplate;

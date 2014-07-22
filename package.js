Package.describe({
  summary: "Url utilities and support for compiling a url into a regular expression.",
  version: "0.1.0",
  git: "https://github.com/eventedmind/iron-url"
});

Package.on_use(function (api) {
  api.use('underscore');
  api.use('iron:core');
  api.imply('iron:core');
  api.addFiles('lib/compiler.js');
  api.addFiles('lib/url.js');
});

Package.on_test(function (api) {
  api.use('iron:url');
  api.use('tinytest');
  api.use('test-helpers');
  api.addFiles('test/url_test.js', ['client', 'server']);
});

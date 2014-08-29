Package.describe({
  summary: "Url utilities and support for compiling a url into a regular expression.",
  version: "0.4.0-rc0",
  git: "https://github.com/eventedmind/iron-url"
});

Package.on_use(function (api) {
  api.use('underscore@1.0.0');
  api.use('iron:core@0.3.2');
  api.imply('iron:core');
  api.add_files('lib/compiler.js');
  api.add_files('lib/url.js');
});

Package.on_test(function (api) {
  api.use('iron:url');
  api.use('tinytest');
  api.use('test-helpers');
  api.add_files('test/url_test.js', ['client', 'server']);
});

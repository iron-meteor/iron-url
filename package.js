Package.describe({
  summary: "Url utilities and support for compiling a url into a regular expression.",
  version: "1.0.6",
  git: "https://github.com/eventedmind/iron-url"
});

Package.on_use(function (api) {
  api.use('underscore@1.0.0');

  api.use('iron:core@1.0.6');
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

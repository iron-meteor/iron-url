Package.describe({
  name: "iron-url",
  summary: "Url utilities and support for compiling a url into a regular expression.",
  version: "0.1.0",
  githubUrl: "https://github.com/eventedmind/iron-url"
});

Package.on_use(function (api) {
  api.add_files('lib/compiler.js');
  api.add_files('lib/url.js');
  api.export('Iron');
});

Package.on_test(function (api) {
  api.use('iron-url');
  api.use('tinytest');
  api.use('test-helpers');
  api.add_files('test/url_test.js', ['client', 'server']);
});

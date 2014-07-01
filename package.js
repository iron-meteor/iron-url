Package.describe({
  name: "iron-path",
  summary: "Compile paths into regular expressions.",
  version: "0.1.0",
  githubUrl: "https://github.com/eventedmind/iron-path"
});

Package.on_use(function (api) {
  api.add_files('lib/compiler.js');
  api.add_files('lib/path.js');
  api.export('Iron');
});

Package.on_test(function (api) {
  api.use('iron-path');
  api.use('tinytest');
  api.use('test-helpers');
  api.add_files('test/path_test.js', ['client', 'server']);
});

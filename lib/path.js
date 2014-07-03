/**
 * Class for taking a path and compiling it into a regular expression.
 *
 * Also has a params method for getting an array of params given a path, and
 * convenience methods for working with the regexp like test and exec.
 *
 * XXX where is resolve?
 *
 */
Path = function (path, options) {
  options = options || {};
  this.options = options;
  this.path = path;
  this.keys = [];
  this.regexp = compilePath(path, this.keys, options); 
};

/**
 * Given a relative or absolute path return
 * a relative path with a leading forward slash and
 * no search string or hash fragment
 *
 * @param {String} path
 * @return {String}
 */
Path.normalize = function (path) {
  var origin = Meteor.absoluteUrl();

  path = path.replace(origin, '');

  var queryStringIndex = path.indexOf('?');
  path = ~queryStringIndex ? path.slice(0, queryStringIndex) : path;

  var hashIndex = path.indexOf('#');
  path = ~hashIndex ? path.slice(0, hashIndex) : path;

  if (path.charAt(0) !== '/')
    path = '/' + path;

  if (path.length > 1 && path.charAt(path.length - 1) === '/')
    path = path.slice(0, path.length - 1);

  return path;
};

/**
 * Returns true if the path matches and false otherwise.
 *
 * @param {String} path
 * @return {Boolean}
 */
Path.prototype.test = function (path) {
  return this.regexp.test(Path.normalize(path));
};

/**
 * Returns the result of calling exec on the compiled path with
 * the given path.
 *
 * @param {String} path
 * @return {Array}
 */
Path.prototype.exec = function (path) {
  return this.regexp.exec(Path.normalize(path));
};

/**
 * Returns an array of parameters given a path. The array may have named
 * properties in addition to indexed values.
 *
 * @param {String} path
 * @return {Array}
 */
Path.prototype.params = function (path) {
  if (!path)
    return [];

  var params = [];
  var m = this.exec(path);
  var queryString;
  var keys = this.keys;
  var key;
  var value;

  if (!m)
    throw new Error('The route named "' + this.name + '" does not match the path "' + path + '"');

  for (var i = 1, len = m.length; i < len; ++i) {
    key = keys[i - 1];
    value = typeof m[i] == 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = params[key.name] !== undefined ?
        params[key.name] : value;
    } else
      params.push(value);
  }

  path = decodeURI(path);

  queryString = path.split('?')[1];
  if (queryString)
    queryString = queryString.split('#')[0];

  params.hash = path.split('#')[1];

  if (queryString) {
    _.each(queryString.split('&'), function (paramString) {
      paramParts = paramString.split('=');
      params[paramParts[0]] = decodeURIComponent(paramParts[1]);
    });
  }

  return params;
};

Iron = Iron || {};
Iron.Path = Path;

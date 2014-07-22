compilePath = function (path, keys, options) {
  if (path instanceof RegExp)
    return path;
  
  path = path
    .replace(/(.)\/$/, '$1')
    .concat(options.strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/#/, '/?#')
    .replace(
      /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,
      function (match, slash, format, key, capture, optional){
        keys.push({ name: key, optional: !! optional });
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '')
          + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '');
      }
    )
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');

  return new RegExp('^' + path + '$', options.sensitive ? '' : 'i');
};

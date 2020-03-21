export function dotNotate(obj,target,prefix) {
  target = target || {},
  prefix = prefix || "";

  Object.keys(obj).forEach(function(key) {
    if ( typeof(obj[key]) === "object" ) {
      dotNotate(obj[key],target,prefix + key + ".");
    } else {
      return target[prefix + key] = obj[key];
    }
  });
  return target;
}


function deepClone(obj) {
  // Handles non-object and null values directly
  if (obj === null || typeof obj !== 'object') return obj;
  
  // Handles Date objects by creating a new instance with the same time
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handles RegExp objects by creating a new instance with the same pattern
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // Handles arrays by cloning each element recursively
  if (Array.isArray(obj)) {
    const clone = [];
    for (const item of obj) {
      clone.push(deepClone(item));
    }
    return clone;
  }
  
  // Handles objects by cloning each property recursively
  const clone = {};
  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      clone[item] = deepClone(obj[item]);
    }
  }
  
  return clone;
}

// Usage example:
// Creates a deep copy of an object, handling nested structures, dates, and regular expressions
const original = { a: 1, b: { c: 2 }, d: new Date(), e: /regex/ };
const copy = deepClone(original);
console.log(copy);

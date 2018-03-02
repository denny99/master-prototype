export default class ObjectTraverser {
  /**
   * search for a property in an object and return value
   * @param {object} object
   * @param {string} property e.g. test.x.y
   * @param {object} [value] value passed object if property not found
   */
  static traverse(object, property, value) {
    /**
     * move down in object
     * @param {object} object current subObject
     * @param {string[]} properties
     * @return {object | null}
     */
    function recursion(object, properties) {
      // set: last property reached
      if (value !== undefined && properties.length === 1) {
        object[properties.pop()] = value;
        return null;
      }

      // try to move down in the object
      let property = properties.pop();

      // final property reached?
      if (properties.length === 0) {
        return object.hasOwnProperty(property) ? object[property] : null;
      }

      // set: if property is missing create empty object
      if (!object.hasOwnProperty(property)) {
        if (value !== undefined) {
          object[property] = {};
        } else {
          // get: prop not found return
          return null;
        }
      }

      // move further down
      return recursion(object[property], properties);
    }

    let properties = property.split('.').reverse();
    return recursion(object, properties);
  }
}
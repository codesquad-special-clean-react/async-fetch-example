export function errorCatcher(fn) {
  try {
    return fn();
  } catch (error) {
    // handle error here
    console.error(error);
  }
}

/**
 * @namespace QnAUtils utility functions
 */
export default {
  /**
   * @deprecated
   */
  reduceArrayObject(array, key) {
    return array.reduce((result, item) => {
      const objectKey = item[key];
      return {
        ...result,
        [objectKey]: result[objectKey] ? [...result[objectKey], item] : [item],
      };
    }, {});
  },
  /**
   * @description simple implementaion of pipe function, receives multiple functions and execute consecutively
   */
  pipe(...functions) {
    return (arg) => functions.reduce((result, func) => func(result), arg);
  },

  processFormToObject(arg) {
    return this.pipe(
      (formElement) => new FormData(formElement),
      Object.fromEntries
    )(arg);
  },
};

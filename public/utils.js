export function errorCatcher(fn) {
  try {
    return fn();
  } catch (error) {
    // handle error here
    console.error(error);
  }
}

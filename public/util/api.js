export const getRequest = (URL) => {
  return Object.keys(URL).map((key) => fetch(URL[key]))
}

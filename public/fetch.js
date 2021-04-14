export default class Fetch {
  constructor() {}

  getData(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(`Get Fetch Error: ${error}`));
  }

  postData(url, body) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    return fetch(url, option)
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        console.log(`POST fetch error: ${error}`);
        return false;
      });
  }
}

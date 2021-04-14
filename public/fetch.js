export default class Fetch {
  constructor() {}

  getData(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(`Get Fetch Error: ${error}`));
  }

  postData(url, body) {
    return fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        console.log(`POST fetch error: ${error}`);
        return false;
      });
  }
  //     return fetch("http://localhost:3001/questions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: title,
  //         question: content,
  //         userId: 3,
  //       }),
  //     })
  //       .then((response) => console.log(response))
  //       .catch((error) => console.log(`POST fetch error: ${error}`));
  //   }
}

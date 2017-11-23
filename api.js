export default () => {
  return new Promise((resolve, reject) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    let myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    };

    let myRequest = new Request("https://appear.pl/pins.json", myInit);

    fetch(myRequest)
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response && response.length > 0) {
          return resolve(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
};

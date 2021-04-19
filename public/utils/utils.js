const delay = (delayTime) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, delayTime);
  });
};

export default delay;

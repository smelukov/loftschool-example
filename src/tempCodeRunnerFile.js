function delayPromise(seconds) {

  const aa = new Promise((resolve) => {

    setTimeout(() => {

      resolve();

    }, seconds);

  });

  return aa.then(() => {
    console.log('resolved');
  });

}
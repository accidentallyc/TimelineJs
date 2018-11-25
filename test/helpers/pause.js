function pause (ms) {
  if(!ms) {
    throw new Error('pause needs an MS as a param');
  }


  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms)
  });
}

global.pause = pause;
function throttle(Fn, delay) {
  let flag = true;
  return function (...args) {
    if (flag) {
      Fn(...args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

export default throttle;

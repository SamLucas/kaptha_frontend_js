export const debounceEvent = (fn, params, wait = 1000, time) => {
  clearTimeout(
    time,
    (time = setTimeout(() => {
      fn(params);
    }, wait))
  );
};

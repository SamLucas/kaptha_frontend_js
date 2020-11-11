export const debounceEvent = (fn, params, wait = 1000, time) => {
  clearTimeout(
    time,
    (time = setTimeout(() => {
      fn(params);
    }, wait))
  );
};

export function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
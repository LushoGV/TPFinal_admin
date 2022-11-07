export const parseTextRequest = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      if (obj[key] === '') {
        obj[key] = null;
      } else {
        obj[key] = `'${obj[key]}'`;
      }
    }
  }

  return obj;
};

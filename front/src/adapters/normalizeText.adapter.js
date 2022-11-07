export const normalizeText = (array) => {
  return array.map((item) => {
    for (let key in item) {
      if (typeof item[key] === 'string') {
        item[key] = item[key].trim();
      }
    }

    return item;
  });
};

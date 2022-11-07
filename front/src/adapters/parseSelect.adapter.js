export const parseSelect = (array, id, name) => {
  return array.map((item) => {
    for (let _ in item) {
      return {
        id: item[id],
        name: item[name],
      };
    }
  });
};

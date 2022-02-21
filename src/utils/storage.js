export const setItem = (key, value) => {
  // let result = null;
  // try {
  //   result = JSON.stringify(value);
  // } catch (error) {
  //   result = value;
  // }
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const removeItem = (key) => localStorage.removeItem(key);

export const getItem = (key) => {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

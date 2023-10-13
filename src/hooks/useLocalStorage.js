function useLocalStorage(key) {
  const setItem = (value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  };

  return { setItem, getItem, removeItem };
}

export default useLocalStorage;

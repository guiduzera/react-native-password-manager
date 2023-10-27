import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);

      return passwords ? JSON.parse(passwords) : [];
    } catch (error) {
      console.log("erro ao pegar item", error);
      return null;
    }
  };

  const setItem = async (key, value) => {
    try {
      let passwords = await getItem(key);

      passwords.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(passwords));

      return true;
    } catch (error) {
      console.log("erro ao salvar", error);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwords = await getItem(key);

      const restPasswords = passwords.filter((password) => password !== item);

      await AsyncStorage.setItem(key, JSON.stringify(restPasswords));

      return restPasswords;
    } catch (error) {
      console.log("erro ao deletar", error);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;

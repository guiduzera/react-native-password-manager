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

  const setItem = async (key, value, identfy) => {
    try {
      let passwords = await getItem(key);

      passwords.push({ id: identfy, name: value });

      await AsyncStorage.setItem(key, JSON.stringify(passwords));

      return true;
    } catch (error) {
      console.log("erro ao salvar", error);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwords = await getItem(key);

      const restPasswords = passwords.filter((password) => password.name !== item);

      await AsyncStorage.setItem(key, JSON.stringify(restPasswords));

      return restPasswords;
    } catch (error) {
      console.log("erro ao deletar", error);
    }
  };

  const editItem = async (key, keyName, newKeyName) => {
    let passwords = await getItem(key);

    const editPasswords = passwords.map((item) => {
      if (item.id === keyName) {
        item.id = newKeyName;
      }

      return item;
    });

    await AsyncStorage.setItem(key, JSON.stringify(editPasswords));

    return editPasswords;
  };

  return {
    getItem,
    setItem,
    removeItem,
    editItem,
  };
};

export default useStorage;

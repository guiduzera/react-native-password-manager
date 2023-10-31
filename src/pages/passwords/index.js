import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../../hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";
import PasswordItem from "./components/passwordItem";
import ModalEditPassword from "./components/modalEditPassword";

export default function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const [passwordEditVisible, setPasswordEditVisible] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState("");
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    const getPasswords = async () => {
      const passwords = await getItem("@pass");

      setListPasswords(passwords);
    };

    getPasswords();
  }, [focused, getItem]);

  const handleDeletePassword = async (password) => {
    const passwords = await removeItem("@pass", password);

    setListPasswords(passwords);
  };

  const handleModalEditPassword = (key) => {
    setPasswordEdit(key);
    setPasswordEditVisible(true);
  };

  const handleModalVisible = () => {
    setPasswordEditVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
      </View>
      {listPasswords.length > 0 ? (
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={listPasswords}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PasswordItem
                passData={item.name}
                removePassword={() => handleDeletePassword(item.name)}
                modalVisible={() => handleModalEditPassword(item.id)}
                passKey={item.id}
              />
            )}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text>Nenhuma senha cadastrada ainda...</Text>
        </View>
      )}
      <Modal visible={passwordEditVisible} animationType="fade" transparent={true}>
        <ModalEditPassword handleClose={handleModalVisible} name={passwordEdit} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
  list: {
    flex: 1,
    paddingTop: 14,
  },
});

import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import useStorage from "../../../hooks/useStorage";

export default function ModalEditPassword({ handleClose, name }) {
  const [textName, setTextName] = useState("");
  const { editItem } = useStorage();

  const handleEditPassword = () => {
    if (!textName) {
      alert("Novo nome da senha é obrigatório!");
      return;
    }

    alert("Senha editada!");

    editItem("@pass", name, textName);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Editar nome</Text>
        <TextInput placeholder={name} style={styles.input} value={textName} onChangeText={(text) => setTextName(text)} placeholderTextColor="#000" />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
          >
            <Text style={styles.buttonSaveText} onPress={handleEditPassword}>Salvar nome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#392de9",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
    marginBottom: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#392de9",
    padding: 8,
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

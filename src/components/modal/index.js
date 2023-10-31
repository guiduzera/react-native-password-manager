import { StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import useStorage from "../../hooks/useStorage";
import { useState } from "react";

export default function ModalPassword({ password, handleClose }) {
  const { setItem } = useStorage();
  const [name, setName] = useState("");

  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(password);

    if (!name) {
      alert("Nome da senha é obrigatório!");
      return;
    }

    await setItem("@pass", password, name);

    alert("Senha salva!");

    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha gerada</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Nome da senha"
        />
        <Pressable
          style={styles.innerPassword}
          onLongPress={handleCopyPassword}
        >
          <Text style={styles.text}>{password}</Text>
          <Ionicons
            name="copy-outline"
            size={24}
            color="#FFF"
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={handleCopyPassword}
          />
        </Pressable>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleCopyPassword}
          >
            <Text style={styles.buttonSaveText}>Salvar senha</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#392de9",
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8,
    position: "relative",
  },
  text: {
    color: "#FFF",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 8,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#392de9",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
    marginBottom: 14,
  }
});

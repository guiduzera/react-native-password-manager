import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import ModalPassword from "../../components/modal";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const generatePassword = () => {
    let password = "";
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+";

    for (let i = 0, n = charset.length; i < limit; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(password);
    setPasswordVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <Text style={styles.title}>{ limit } caracteres</Text>
      <View style={styles.containerSlider}>
        <Slider
          style={styles.slide}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="#ff0000"
          minimumTrackTintColor="#000"
          thumbTintColor="#392de9"
          value={limit}
          onValueChange={(value) => setLimit(value.toFixed(0))}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>
      <Modal visible={passwordVisible} animationType="fade" transparent={true}>
        <ModalPassword password={password} handleClose={ () => setPasswordVisible(false) } />
      </Modal>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 18,
  },
  slide: {
    height: 50,
  },
  containerSlider: {
    marginTop: 14,
    marginBottom: 18,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

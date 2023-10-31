import { useEffect, useState } from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useIsFocused } from "@react-navigation/native";

export default function PasswordItem({
  passData,
  removePassword,
  passKey,
  modalVisible,
}) {
  const [visible, setVisible] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    setVisible(false);
  }, [focused]);

  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(passData);

    alert("Senha copiada!");

    setVisible(false);
  };

  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      {visible ? (
        <>
          <Text style={styles.content}>{passData}</Text>
          <View style={[styles.iconsView, styles.iconsViewVisible]}>
            <Ionicons
              name="eye"
              size={20}
              color="#fff"
              onPress={() => setVisible(!visible)}
            />
            <Ionicons
              name="copy"
              size={20}
              color="#fff"
              onPress={handleCopyPassword}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.content}>{passKey}</Text>
          <View style={styles.iconsView}>
            <Ionicons
              name="ios-pencil-sharp"
              size={20}
              color="#fff"
              onPress={modalVisible}
            />
            <Ionicons
              name="eye-off"
              size={20}
              color="#fff"
              onPress={() => setVisible(!visible)}
            />
            <Ionicons
              name="trash"
              size={20}
              color="#fff"
              onPress={removePassword}
            />
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  content: {
    color: "#FFF",
    fontSize: 18,
  },
  iconsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 80,
  },
  iconsViewVisible: {
    justifyContent: "flex-end",
    gap: 10,
  },
});

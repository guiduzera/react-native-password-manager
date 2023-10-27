import { View, Text, StyleSheet, Pressable } from "react-native";

export default function PasswordItem({ passData, removePassword }) {
    return (
        <Pressable onLongPress={removePassword} style={ styles.container }>
            <Text style={ styles.content }>{passData}</Text>
        </Pressable>
    )
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
    },
    content: {
        color: "#FFF",
        fontSize: 18,
    },
})
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Demo({ children }) {
  return <View style={styles.demo}>{children}</View>;
}

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
});

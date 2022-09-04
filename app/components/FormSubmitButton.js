import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const FormSubmitButton = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting ? "#8CF7D3" : "#8CF7D3";
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={{ fontSize: 23, color: "#1B1C1B", fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "#8CF7D3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormSubmitButton;

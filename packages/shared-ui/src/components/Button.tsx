import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, disabled = false }) => (
  <TouchableOpacity style={[styles.button, disabled && styles.buttonDisabled]} onPress={onPress} disabled={disabled}>
    <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FE452B",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#fe725e",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: "white",
  },
});

export default Button;

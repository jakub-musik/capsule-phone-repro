import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "none",
  multiline = false,
}) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#999"
    keyboardType={keyboardType}
    autoCapitalize={autoCapitalize}
    multiline={multiline}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default Input;

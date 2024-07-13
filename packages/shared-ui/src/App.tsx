import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { NativePasskeysAuth } from "./components/NativePasskeysAuth";
// import { WebviewPasskeysAuth } from "./components/WebviewPasskeysAuth";

interface AppProps {
  isExpo: boolean;
}

const App: React.FC<AppProps> = ({ isExpo }) => {
  const [authMethod, setAuthMethod] = useState<"native" | "webview" | null>(null);

  // const renderAuthComponent = () => {
  //   switch (authMethod) {
  //     case "native":
  //       return <NativePasskeysAuth />;
  //     case "webview":
  //       return <WebviewPasskeysAuth />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isExpo ? "Capsule SDK Expo Example" : "Capsule SDK React Native Example"}</Text>
      <Text style={styles.description}>This app demonstrates the usage of Capsule's SDK for React Native.</Text>

      {/* {!authMethod && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => setAuthMethod("native")}>
            <Text style={styles.buttonText}>Native Passkeys (Recommended)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => setAuthMethod("webview")}>
            <Text style={styles.buttonText}>Webview Passkeys</Text>
          </TouchableOpacity>
        </>
      )}

      {renderAuthComponent()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0a09",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;

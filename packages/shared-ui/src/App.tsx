import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import NativePasskeysAuth from "./components/NativePasskeysAuth";
import WebviewPasskeysAuth from "./components/WebviewPasskeysAuth";

interface AppProps {
  isExpo: boolean;
}

const App: React.FC<AppProps> = ({ isExpo }) => {
  const [authMethod, setAuthMethod] = useState<"native" | "webview" | null>(null);

  const handleBack = () => {
    setAuthMethod(null);
  };

  const renderAuthOptions = () => (
    <View style={styles.content}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{isExpo ? "Capsule SDK Expo Example" : "Capsule SDK React Native Example"}</Text>
        <Text style={styles.description}>
          This app demonstrates the usage of Capsule's SDK for React Native. Please select an authentication method
          below.
        </Text>
      </View>
      <View style={styles.authOptionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAuthMethod("native")}>
          <Text style={styles.buttonText}>Native Passkeys (Recommended)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setAuthMethod("webview")}>
          <Text style={styles.buttonText}>Webview Passkeys</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (authMethod) {
      case "native":
        return <NativePasskeysAuth onBack={handleBack} />;
      case "webview":
        return <WebviewPasskeysAuth onBack={handleBack} />;
      default:
        return renderAuthOptions();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0c0a09",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  authOptionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#d3d3d3",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FE452B",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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

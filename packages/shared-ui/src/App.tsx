import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import NativePasskeysAuth from "./NativePasskeysAuthExample";
import WebviewPasskeysAuth from "./WebviewPasskeysAuthExample";
import PolyfillCrypto from "react-native-webview-crypto"; //

import Header from "./components/Header";
import Button from "./components/Button";

interface AppProps {
  isExpo: boolean;
}

//Note that new versions of Capsule now uses PolyfillCrypto. Make sure to add <PolyfillCrypto /> in your App.tsx file.

const App: React.FC<AppProps> = ({ isExpo }) => {
  const [authMethod, setAuthMethod] = useState<"native" | "webview" | null>(null);

  const handleBack = () => {
    setAuthMethod(null);
  };

  const renderAuthOptions = () => (
    <View style={styles.content}>
      <Header
        title={isExpo ? "Capsule SDK Expo Example" : "Capsule SDK React Native Example"}
        description="This app demonstrates the usage of Capsule's SDK for React Native. Please select an authentication method below."
      />
      <View style={styles.authOptionsContainer}>
        <Button title="Native Passkeys (Recommended)" onPress={() => setAuthMethod("native")} />
        <Button title="Webview Passkeys" onPress={() => setAuthMethod("webview")} />
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
      <PolyfillCrypto />
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
  authOptionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

export default App;

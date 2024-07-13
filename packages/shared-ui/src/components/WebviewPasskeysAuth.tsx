import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";
import InAppBrowser from "react-native-inappbrowser-reborn";

// Step 1: Initialize the Capsule client
const capsule = new CapsuleMobile(Environment.BETA, "YOUR_API_KEY");

export const WebviewPasskeysAuth: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Step 2: Check auth state
  useEffect(() => {
    const checkAuthState = async () => {
      const isLoggedIn = await capsule.isFullyLoggedIn();
      setIsAuthenticated(isLoggedIn);
    };
    checkAuthState();
  }, []);

  // Step 3: Initiate authentication
  const handleAuthentication = async () => {
    try {
      const userExists = await capsule.checkIfUserExists(email);
      if (userExists) {
        // Step 5: Authenticate existing user
        const webAuthLoginUrl = await capsule.initiateUserLogin(email, true);
        await InAppBrowser.open(webAuthLoginUrl);
        await capsule.waitForLoginAndSetup();
        InAppBrowser.close();
        setIsAuthenticated(true);
      } else {
        // Step 4: Create new user and initiate email verification
        await capsule.createUser(email);
        // Show UI for entering verification code
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  // Step 6: Handle verification
  const handleVerification = async () => {
    try {
      const webAuthCreateUrl = await capsule.verifyEmail(verificationCode);
      await InAppBrowser.open(webAuthCreateUrl);
      await capsule.waitForAccountCreation();
      InAppBrowser.close();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Authenticated! Ready to sign messages.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Webview Passkeys Authentication</Text>
      {/* Add input fields for email and verification code */}
      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
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
  text: {
    color: "white",
    fontSize: 16,
  },
});

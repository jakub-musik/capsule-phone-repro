import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";
import { webcrypto } from "crypto";

const capsule = new CapsuleMobile(Environment.BETA, "YOUR_API_KEY");

interface NativePasskeysAuthProps {
  onBack: () => void;
}

const NativePasskeysAuth: React.FC<NativePasskeysAuthProps> = ({ onBack }) => {
  const [authStage, setAuthStage] = useState<"initial" | "verification" | "authenticated">("initial");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [messageToSign, setMessageToSign] = useState<string>("");
  const [signedMessage, setSignedMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkAuthState = async () => {
      const isLoggedIn = await capsule.isFullyLoggedIn();
      console.log("Is logged in:", isLoggedIn);
      if (isLoggedIn) {
        setAuthStage("authenticated");
      }
    };
    checkAuthState();
  }, []);

  const handleAuthentication = async () => {
    setError("");
    try {
      const userExists = await capsule.checkIfUserExists(email);
      console.log("User exists:", userExists);
      if (userExists) {
        await capsule.login();
        setAuthStage("authenticated");
      } else {
        await capsule.createUser(email);
        setAuthStage("verification");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please try again.");
    }
  };

  const handleVerification = async () => {
    setError("");
    try {
      const biometricsId = await capsule.verifyEmailBiometricsId(verificationCode);
      await capsule.registerPasskey(email, biometricsId, webcrypto);
      await capsule.login();
      setAuthStage("authenticated");
    } catch (error) {
      console.error("Verification error:", error);
      setError("Verification failed. Please check your code and try again.");
    }
  };

  const handleSignMessage = async () => {
    setError("");
    try {
    } catch (error) {
      console.error("Signing error:", error);
      setError("Failed to sign message. Please try again.");
    }
  };

  const handleBack = async () => {
    if (authStage === "authenticated") {
      try {
        await capsule.logout();
        setAuthStage("initial");
        setEmail("");
        setVerificationCode("");
        setMessageToSign("");
        setSignedMessage("");
      } catch (error) {
        console.error("Logout error:", error);
        setError("Failed to logout. Please try again.");
      }
    }
    onBack();
  };

  const renderContent = () => {
    switch (authStage) {
      case "initial":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
              <Text style={styles.buttonText}>Authenticate</Text>
            </TouchableOpacity>
          </>
        );
      case "verification":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter verification code"
              placeholderTextColor="#999"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerification}>
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
          </>
        );
      case "authenticated":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter message to sign"
              placeholderTextColor="#999"
              value={messageToSign}
              onChangeText={setMessageToSign}
              multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSignMessage}>
              <Text style={styles.buttonText}>Sign Message</Text>
            </TouchableOpacity>
            {signedMessage !== "" && <Text style={styles.signedMessage}>Signed Message: {signedMessage}</Text>}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {authStage === "initial"
            ? "Native Passkeys Authentication"
            : authStage === "verification"
            ? "Email Verification"
            : "Sign Message"}
        </Text>
        <Text style={styles.description}>
          {authStage === "initial"
            ? "Enter your email to authenticate using native passkeys. If you're a new user, you'll be asked to verify your email."
            : authStage === "verification"
            ? "A verification code has been sent to your email. Please enter it below to complete the authentication process."
            : "Enter a message below to sign it using your authenticated passkey."}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
        {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back to Options</Text>
      </TouchableOpacity>
    </View>
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
  headerContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  contentContainer: {
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
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
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
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 16,
  },
  backButtonText: {
    color: "#FE452B",
    fontSize: 16,
  },
  signedMessage: {
    color: "white",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
});

export default NativePasskeysAuth;

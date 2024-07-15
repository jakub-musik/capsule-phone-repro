import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";
import { webcrypto } from "crypto";
import { AuthenticatedState, Button, Header, Input } from "./components";

interface NativePasskeysAuthProps {
  onBack: () => void;
}

// Step 1: Initialize the Capsule client
const capsule = new CapsuleMobile(Environment.BETA, "d0b61c2c8865aaa2fb12886651627271");

const NativePasskeysAuth: React.FC<NativePasskeysAuthProps> = ({ onBack }) => {
  const [authStage, setAuthStage] = useState<"initial" | "verification" | "authenticated">("initial");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [messageToSign, setMessageToSign] = useState<string>("");
  const [signedMessage, setSignedMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletId, setWalletId] = useState<string>("");
  const [recoveryShare, setRecoveryShare] = useState<string>("");

  useEffect(() => {
    const initCapsule = async () => {
      try {
        // Step 2: Initialize Capsule. Only needed for async storage setup.
        await capsule.init();
        await checkAuthState();
      } catch (error) {
        console.error("Capsule init error:", error);
        setError("Failed to initialize Capsule. Please try again.");
      }
    };
    initCapsule();
  }, []);

  // Step 3: Check the authentication state
  const checkAuthState = async () => {
    try {
      const isLoggedIn = await capsule.isFullyLoggedIn();
      if (isLoggedIn) {
        const wallets = capsule.getWallets();
        const firstWallet = Object.values(wallets)[0];
        if (firstWallet) {
          setWalletId(firstWallet.id);
          setWalletAddress(firstWallet.address ?? "");
          setAuthStage("authenticated");
        }
      }
    } catch (error) {
      console.error("Auth state check error:", error);
      setError("Failed to check authentication state.");
    }
  };

  // Step 4: Handle user authentication
  const handleAuthentication = async () => {
    setError("");
    try {
      const userExists = await capsule.checkIfUserExists(email);
      if (userExists) {
        await handleLogin();
      } else {
        await handleCreateUser();
      }
    } catch (checkUserError) {
      console.error("Error checking user existence:", checkUserError);
      setError("Unable to verify user status. Please try again later.");
    }
  };

  // Step 5: Handle user login
  const handleLogin = async () => {
    try {
      const wallet = await capsule.login();
      setWalletId(wallet.id!);
      setWalletAddress(wallet.address!);
      setAuthStage("authenticated");
    } catch (loginError) {
      console.error("Login error:", loginError);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  // Step 6: Handle new user creation
  const handleCreateUser = async () => {
    try {
      await capsule.createUser(email);
      setAuthStage("verification");
    } catch (createUserError) {
      console.error("User creation error:", createUserError);
      setError("Failed to create user. Please try again or contact support.");
    }
  };

  // Step 7: Handle email verification and passkey registration
  const handleVerification = async () => {
    setError("");
    try {
      const biometricsId = await capsule.verifyEmailBiometricsId(verificationCode);
      if (biometricsId === "") {
        setError("Verification code is incorrect. Please try again.");
        return;
      }
      await capsule.registerPasskey(email, biometricsId, webcrypto);
      const [, share] = await capsule.createWallet(false);
      setRecoveryShare(share ?? "");
      const wallet = await capsule.login();
      setWalletId(wallet.id!);
      setWalletAddress(wallet.address!);
      setAuthStage("authenticated");
    } catch (error) {
      console.error("Verification error:", error);
      setError("Verification failed. Please check your code and try again.");
    }
  };

  // Step 8: Handle message signing
  const handleSignMessage = async () => {
    setError("");
    if (!walletId || !messageToSign.trim()) {
      setError("Please enter a message to sign.");
      return;
    }
    const base64Message = Buffer.from(messageToSign, "utf-8").toString("base64");
    try {
      const signatureResponse = await capsule.signMessage(walletId, base64Message);
      if ("signature" in signatureResponse) {
        setSignedMessage(`0x${signatureResponse.signature}`);
      } else {
        console.log("Signature denied. Review URL:", signatureResponse.transactionReviewUrl);
        console.log("Pending transaction ID:", signatureResponse.pendingTransactionId);
        setError("Signature request was denied. Please review the transaction.");
      }
    } catch (error) {
      console.error("Signing error:", error);
      setError("Failed to sign message. Please try again.");
    }
  };

  // Step 9: Handle logout
  const handleBack = async () => {
    if (authStage === "authenticated") {
      try {
        await capsule.logout();
        resetState();
      } catch (error) {
        console.error("Logout error:", error);
        setError("Failed to logout. Please try again.");
      }
    }
    onBack();
  };

  const resetState = () => {
    setAuthStage("initial");
    setEmail("");
    setVerificationCode("");
    setMessageToSign("");
    setSignedMessage("");
    setError("");
    setWalletAddress("");
    setWalletId("");
  };

  const renderContent = () => {
    switch (authStage) {
      case "initial":
        return (
          <Input value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />
        );
      case "verification":
        return (
          <Input
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Enter verification code"
            keyboardType="numeric"
          />
        );
      case "authenticated":
        return (
          <AuthenticatedState
            walletId={walletId}
            walletAddress={walletAddress}
            recoveryShare={recoveryShare}
            messageToSign={messageToSign}
            setMessageToSign={setMessageToSign}
            handleSignMessage={handleSignMessage}
            signedMessage={signedMessage}
          />
        );
    }
  };

  const getActionButton = () => {
    switch (authStage) {
      case "initial":
        return <Button title="Authenticate" onPress={handleAuthentication} disabled={!email.trim()} />;
      case "verification":
        return <Button title="Verify Code" onPress={handleVerification} disabled={!verificationCode.trim()} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          authStage === "initial"
            ? "Native Passkeys Authentication"
            : authStage === "verification"
            ? "Email Verification"
            : "Sign Message"
        }
        description={
          authStage === "initial"
            ? "Enter your email to authenticate using native passkeys. If you're a new user, you'll be asked to verify your email."
            : authStage === "verification"
            ? "A verification code has been sent to your email. Please enter it below to complete the authentication process."
            : "Enter a message below to sign it using your authenticated passkey."
        }
      />
      <View style={styles.contentContainer}>
        {renderContent()}
        {getActionButton()}
        {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back to Options</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  signedMessage: {
    color: "white",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
  rnButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 16,
  },
  backButtonText: {
    color: "#FE452B",
    fontSize: 16,
  },
});

export default NativePasskeysAuth;

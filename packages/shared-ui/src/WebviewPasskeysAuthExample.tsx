import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { AuthenticatedState, Button, Header, Input } from "./components";

// Capsule React Native SDK integration example for Passkey via Webview authentication and message signing.
// This tutorial provides a step-by-step guide to implement Capsule's authentication flow.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

interface WebviewPasskeysAuthProps {
  onBack: () => void;
}

// Step 1: Set up your Capsule API key
// Obtain your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Step 2: Set the Capsule environment
// Choose between Environment.DEVELOPMENT or Environment.PRODUCTION based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// Step 3: (Optional) Customize the Capsule SDK integration
// These options allow you to tailor the look and feel of the Capsule integration
// For a full list of constructor options, visit:
// https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options
const constructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};

// Step 4: Initialize the Capsule client
// Create a new Capsule instance with your environment, API key, and optional constructor parameters
const capsuleClient = new CapsuleMobile(CAPSULE_ENVIRONMENT, CAPSULE_API_KEY, undefined, constructorOpts);

export const WebviewPasskeysAuth: React.FC<WebviewPasskeysAuthProps> = ({ onBack }) => {
  const [authStage, setAuthStage] = useState<"initial" | "verification" | "authenticated">("initial");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [messageToSign, setMessageToSign] = useState<string>("");
  const [signedMessage, setSignedMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletId, setWalletId] = useState<string>("");
  const [recoveryShare, setRecoveryShare] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Step 5: Check user's login status and initialize capsule for async storage (if needed)
  // This effect runs on component mount to determine if the user is already logged in
  useEffect(() => {
    const initCapsule = async () => {
      setIsLoading(true);
      try {
        await capsuleClient.init();
        await checkAuthState();
      } catch (error) {
        console.error("Capsule init error:", error);
        setError("Failed to initialize Capsule. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    initCapsule();
  }, []);

  // Step 5.1: Check user's authentication state
  const checkAuthState = async () => {
    try {
      const isLoggedIn = await capsuleClient.isFullyLoggedIn();
      if (isLoggedIn) {
        const wallets = capsuleClient.getWallets();
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

  // Step 6: Handle user authentication
  const handleAuthentication = async () => {
    setError("");
    setIsLoading(true);
    try {
      const userExists = await capsuleClient.checkIfUserExists(email);
      if (userExists) {
        await handleLogin();
      } else {
        await handleCreateUser();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 6.1: Handle user login
  const handleLogin = async () => {
    try {
      const webAuthLoginUrl = await capsuleClient.initiateUserLogin(email, true);
      await InAppBrowser.open(webAuthLoginUrl);
      await capsuleClient.waitForLoginAndSetup();
      InAppBrowser.close();
      const wallets = capsuleClient.getWallets();
      const firstWallet = Object.values(wallets)[0];
      if (firstWallet) {
        setWalletId(firstWallet.id);
        setWalletAddress(firstWallet.address ?? "");
      }
      setAuthStage("authenticated");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  // Step 6.2: Handle new user creation
  const handleCreateUser = async () => {
    try {
      await capsuleClient.createUser(email);
      setAuthStage("verification");
    } catch (error) {
      console.error("User creation error:", error);
      setError("Failed to create user. Please try again or contact support.");
    }
  };

  // Step 7: Handle email verification and wallet creation
  const handleVerification = async () => {
    setError("");
    setIsLoading(true);
    try {
      const webAuthCreateUrl = await capsuleClient.verifyEmail(verificationCode);
      await InAppBrowser.open(webAuthCreateUrl);
      const recoverySecret = await capsuleClient.waitForPasskeyAndCreateWallet();
      InAppBrowser.close();
      const wallets = capsuleClient.getWallets();
      const firstWallet = Object.values(wallets)[0];
      if (firstWallet) {
        setWalletId(firstWallet.id);
        setWalletAddress(firstWallet.address ?? "");
        setAuthStage("authenticated");
      }
      setAuthStage("authenticated");
    } catch (error) {
      console.error("Verification error:", error);
      setError("Verification failed. Please check your code and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 8: Handle message signing
  const handleSignMessage = async () => {
    setError("");
    setIsLoading(true);
    if (!walletId || !messageToSign.trim()) {
      setError("Please enter a message to sign.");
      setIsLoading(false);
      return;
    }
    try {
      const base64Message = Buffer.from(messageToSign, "utf-8").toString("base64");
      const signatureResponse = await capsuleClient.signMessage(walletId, base64Message);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Step 9: Handle logout
  const handleBack = async () => {
    if (authStage === "authenticated") {
      try {
        await capsuleClient.logout();
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
    setRecoveryShare("");
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
            isLoading={isLoading}
          />
        );
    }
  };

  const getActionButton = () => {
    switch (authStage) {
      case "initial":
        return (
          <>
            <Button title="Create Passkey" onPress={handleCreateUser} disabled={!email.trim()} loading={isLoading} />
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: "#d3d3d3" }} />
              <View>
                <Text style={{ width: 50, textAlign: "center", fontWeight: "bold", color: "white" }}>OR</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "#d3d3d3" }} />
            </View>
            <Button title="Login with Passkey" onPress={handleLogin} loading={isLoading} />
          </>
        );
      case "verification":
        return (
          <Button
            title="Verify Code"
            onPress={handleVerification}
            disabled={!verificationCode.trim()}
            loading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          authStage === "initial"
            ? "Webview Passkeys Authentication"
            : authStage === "verification"
            ? "Email Verification"
            : "Sign Message"
        }
        description={
          authStage === "initial"
            ? "Enter your email to authenticate using webview passkeys. If you're a new user, you'll be asked to verify your email."
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

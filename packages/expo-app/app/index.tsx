import { SafeAreaView, Text } from "react-native";
import PolyfillCrypto from "react-native-webview-crypto";
import { CapsuleMobile, Environment } from "@usecapsule/react-native-wallet";

interface AppProps {
  isExpo: boolean;
}

const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

const constructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};

const capsuleClient = new CapsuleMobile(CAPSULE_ENVIRONMENT, CAPSULE_API_KEY, undefined, constructorOpts);

const Index: React.FC<AppProps> = ({ isExpo }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0c0a09" }}>
      <PolyfillCrypto />
    </SafeAreaView>
  );
};

export default Index;

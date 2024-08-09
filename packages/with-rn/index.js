import "./shim";
import { AppRegistry } from "react-native";
import App from "@rn-integration-examples/shared-ui";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

# React Native App Example for Capsule Integration

This folder contains a React Native app example demonstrating Capsule integration. Use this as a reference for setting up your own React Native app with Capsule.

## Key Focus Areas

When setting up your own app using this example, pay attention to the following:

### 1. Polyfilling in metro.config.js

Ensure your `metro.config.js` includes the necessary polyfills:

```javascript
extraNodeModules: {
  ...nodeLibs,
  crypto: require.resolve('react-native-crypto'),
  stream: require.resolve('readable-stream'),
  process: require.resolve('process'),
},
```

### 2. Shimming

Copy the appropriate `shim.js` file for React Native and import it at the top of your app's root file. See the `index.js` file in this folder for an example.

For more information on polyfilling, refer to the [Capsule documentation](https://docs.usecapsule.com/getting-started/initial-setup/react-native-and-expo-setup#polyfill-libraries).

## Required Libraries

Install the following libraries for Capsule integration and necessary polyfills:

```
@react-native-async-storage/async-storage
@usecapsule/react-native-passkey
@usecapsule/react-native-wallet
node-libs-react-native
process
react-native-base64
react-native-crypto
react-native-get-random-values
react-native-inappbrowser-reborn
react-native-keychain
react-native-modpow
react-native-randombytes
react-native-webview
react-native-webview-crypto
readable-stream
```

After installing new packages, always run the following commands in the `ios` folder:

```
bundler install
bundler exec pod install
```

## App Implementation

The actual app implementation is located in the `shared-ui` folder. The `index.js` file in this folder simply imports the App component from `shared-ui`.

## iOS Configuration

For iOS, you need to add Capsule API URLs to associated domains:

1. Open `ios/Runner.xcworkspace` in Xcode.
2. Navigate to Signing & Capabilities and add the capability "Associated Domains".
3. Add a new associated domain for each environment:
   - Beta: `webcredentials:app.beta.usecapsule.com`
   - Prod: `webcredentials:app.usecapsule.com`
4. Send your full App ID to Capsule, formatted as `<TEAM_ID>.bundleIdentifier`.

## Authentication Flows

Refer to the `shared-ui` folder for different authentication flows with end-to-end example files showing Capsule setup and completing auth flows with passkeys, both native and webview-based.

For more detailed information about Capsule integration, please refer to our [official documentation](https://docs.usecapsule.com).

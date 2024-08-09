# Shared UI Components and Capsule Integration Examples

This folder contains shared React Native components and Capsule integration examples that can be used across both vanilla React Native and Expo applications.

## Purpose

The purpose of this shared folder is to demonstrate Capsule integrations independent of app-specific configurations. This allows developers to focus on the core integration logic while referring to the `with-rn` or `with-expo` folders for environment-specific setups.

## Key Components

- [NativePasskeysAuthExample.tsx](./src/NativePasskeysAuthExample.tsx): Example of implementing authentication using native Passkeys.
- [WebviewPasskeysAuthExample.tsx](./src/WebviewPasskeysAuthExample.tsx): Example of implementing authentication using Webview Passkeys.
- [SolanaNativePasskeysAuthExample.tsx](./src/SolanaNativePasskeysAuthExample.tsx): Example of implementing authentication using native Passkeys and Soalana.

## Important Notes

1. **Crypto Polyfill**: The root `App` component now uses `PolyfillCrypto` from "react-native-webview-crypto". Make sure to include `<PolyfillCrypto />` in your App component. This brings window.crypto.subtle to the RN application.

2. **Dependencies**: All dependencies are installed at the app level (in `with-rn` or `with-expo`) rather than in `shared-ui`. This is because mobile apps need to reference the correct `package.json` to resolve mobile-specific installations for iOS and Android.

3. **Polyfills and Shims**: All necessary polyfilling and shimming happen at the app level. Refer to the individual app folders (`with-rn` and `with-expo`) for these configurations.

## Capsule API Key

To use the Capsule SDK, you'll need an API key. You can obtain one by signing up at the [Capsule Developer Portal](https://developer.usecapsule.com/).

## Further Information

For more detailed information about Capsule integration, please refer to our [official documentation](https://docs.usecapsule.com).

## Questions and Support

If you have any questions or need support, please refer to the main README in the root of this repository for troubleshooting steps and contact information.

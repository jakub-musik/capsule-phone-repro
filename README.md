# Capsule React Native Integration Examples

Welcome to the Capsule React Native Integration Examples monorepo! This repository demonstrates how to integrate the Capsule React Native SDK with various Vanilla React Native and Expo React Native, providing developers with practical, end-to-end examples for different authentication and wallet integration scenarios.

## What is this Monorepo?

This monorepo serves as a comprehensive resource for developers looking to integrate Capsule into their React Native mobile applications. It showcases:

1. Framework-specific implementations (Vanilla React Native, Expo)
2. Shared components and examples that work across both Vanilla React Native and Expo
3. Various authentication flows and wallet integration techniques

By structuring our examples this way, we provide a clear path for developers to understand both the framework-specific configurations and the shared logic that can be applied across different React Native environments.

## Repository Structure

The monorepo is organized into one primary directory:

### [`packages/`](./packages/)

Contains individual example applications, each configured for their framework and a shared packages and components used by the example applications

- [`with-rn`](./packages/with-rn/): Example using React Native scaffolded with the React Native Community CLI.
- [`with-expo`](./packages/with-expo/): Example using Expo
- [`shared-ui`](./packages/shared-ui/): Houses shared React Native components and example implementations with end-to-end examples for various Capsule integration scenarios

Each of these applications demonstrates how to set up and use Capsule within its specific framework context. You can reference the app folders for app specific configurations and the shared-ui for Capsule integration examples.

## Integration Examples

The [`packages/shared-ui/src`](./packages/shared-ui/src/) folder contains dedicated files for each React Native Capsule integration flow. Here's a brief overview:

- [**NativePasskeysAuthExample**](./packages/shared-ui/src/NativePasskeysAuthExample.tsx): Shows how to implement authentication using native Passkeys (**Recommended**).
- [**WebviewPasskeysAuthExample**](./packages/shared-ui/src/WebviewPasskeysAuthExample.tsx): Demonstrates email-based authentication using the Webview and Capsules Web Portal.
- [**SolanaNativePasskeysAuthExample**](./packages/shared-ui/src/SolanaNativePasskeysAuthExample.tsx): Illustrates how to implement Solana wallet integration with native Passkeys authentication.
- [**PhonePasskeysAuthExample**](./packages//shared-ui/src/PhonePasskeysAuthExample.tsx): Shows how to implement the same auth as NativePasskeysAuthExample but using a Phone number.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn (v1.22.22 or later)
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/capsule-org/rn-integration-examples.git
   cd rn-integration-examples
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. For the React Native app:

   ```sh
   cd packages/with-rn/ios
   bundler install
   bundler exec pod install
   cd ../../..
   ```

4. For the Expo app:

   ```sh
   cd packages/with-expo
   npx expo prebuild
   cd ../..
   ```

   > [!NOTE]  
   > For phone based authentication use the latest dev tag release of the SDK package.

### Running Examples

You can start the React Native and Expo applications:

- Start React Native App:

  ```sh
  yarn start:rn
  ```

- Start Expo App:

  ```sh
  yarn start:expo
  ```

  For iOS:

  ```sh
  npx expo run:ios
  ```

  For Android:

  ```sh
  npx expo run:android
  ```

### Clean Installation

If you need to perform a clean installation:

1. Make the clean script executable:

   ```sh
   chmod +x scripts/clean.sh
   ```

2. Run the clean script:
   ```sh
   yarn clean
   ```

This script will clean all caches and node_modules folders. It's recommended to run this when you encounter persistent issues.

## Troubleshooting

If you encounter any issues:

1. Try performing a clean installation using the `yarn clean` command as described above.

2. For the React Native app, ensure all dependencies are installed:

   ```sh
   cd packages/with-rn
   yarn install
   cd ios
   bundler install
   bundler exec pod install
   ```

3. For the Expo app, try rebuilding:

   ```sh
   cd packages/with-expo
   npx expo prebuild --clean
   ```

4. If Metro bundler issues persist, try clearing the cache:

   ```sh
   yarn start --reset-cache
   ```

5. For Android issues, try cleaning the gradle build:
   ```sh
   cd packages/with-rn/android
   ./gradlew clean
   ```

Remember, running `yarn clean` in the root directory will handle cache cleaning for yarn, metro, watchman, and other related caches. This is often a good first step when troubleshooting persistent issues.

For further troubleshooting, please refer to the [Capsule documentation](https://docs.usecapsule.com/troubleshooting/troubleshooting).

## Learn More

For more detailed information about Capsule integration, please refer to our [official documentation](https://docs.usecapsule.com).

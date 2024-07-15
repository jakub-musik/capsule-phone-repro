# Capsule React Native Integration Examples

Welcome to the Capsule React Native Integration Examples monorepo! This repository demonstrates how to integrate the Capsule Reaact Native SDK with various Vanilla React Native and Expo React Native, providing developers with practical, end-to-end examples for different authentication and wallet integration scenarios.

## What is this Monorepo?

This monorepo serves as a comprehensive resource for developers looking to integrate Capsule into their React Native mobile applications. It showcases:

1. Framework-specific implementations (Vanilla React Native, Expo)
2. Shared components and examples that work across both Vanilla React Native and Expo
3. Various authentication flows and wallet integration techniques

By structuring our examples this way, we provide a clear path for developers to understand both the framework-specific configurations and the shared logic that can be applied across different React Native environments.

## Repository Structure

The monorepo is organized into two one primary directory:

### [`packages/`](./packages/)

Contains individual example applications, each configured for their framework and a shared packages and components used by the example applications

- [`rn-app`](./packages/rn-app/): Example using React Native scaffolded with the React Native Community CLI.
- [`expo-app`](./packages/expo-app/): Example using Expo
- [`shared-ui`](./packages/shared-ui/): Houses shared React Native components and example implementations with end-to-end examples for various Capsule integration scenarios

Each of these applications demonstrates how to set up and use Capsule within its specific framework context. You can reference the app folders for app specific configurations and the shared-ui for Capsule integration examples.

## Integration Examples

The [`packages/shared-ui/src`](./packages/shared-ui/src/) folder contains dedicated files for each React Native Capsule integration flow. Here's a brief overview:

- [**NativePasskeysAuthExample**](./packages/shared-ui/src//NativePasskeysAuthExample.tsx): Shows how to implement authentication using native Passkeys (**Recommended**).
- [**WebviewPasskeysAuthExample**](./packages/shared-ui/src/WebviewPasskeysAuthExample.tsx): Demonstrates email-based authentication using the Webview and Capsules Web Portal.

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

3. Install iOS dependencies:
   ```sh
   cd packages/rn-app/ios
   bundler install
   bundler exec pod install
   cd ../../..
   ```

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

### Clean Installation

If you need to perform a clean installation:

```sh
yarn clean-install
```

## Why This Structure?

1. **Shared UI Components**: The `packages/shared-ui` directory contains shared components used by both the React Native and Expo apps.
2. **Native and Webview Examples**: Both native and webview implementations of Passkeys authentication are demonstrated.
3. **Monorepo Benefits**: This structure allows for easy sharing of code and dependencies between different parts of the project.
4. **Framework Flexibility**: Developers can see how to integrate Capsule in both React Native CLI and Expo environments.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed in both the root and individual package directories.
2. For iOS issues, try cleaning the build folder and reinstalling pods:
   ```sh
   cd packages/rn-app/ios
   bundler exec pod deintegrate
   bundler install
   bundler exec pod install
   ```
3. For Android issues, try cleaning the gradle build:
   ```sh
   cd packages/rn-app/android
   ./gradlew clean
   ```
4. If Metro bundler issues persist, try clearing the cache:
   ```sh
   yarn start --reset-cache
   ```

For further troubleshooting, please refer to the [Capsule documentation](https://docs.usecapsule.com/troubleshooting/troubleshooting).

## Learn More

For more detailed information about Capsule integration, please refer to our [official documentation](https://docs.usecapsule.com).

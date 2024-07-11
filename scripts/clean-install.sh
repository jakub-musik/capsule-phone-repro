#!/bin/bash

set -e

# Function to clean a package
clean_package() {
  echo "Cleaning $1..."
  rm -rf "packages/$1/node_modules"
  rm -f "packages/$1/yarn.lock"
  
  if [ "$1" = "react-native-app" ]; then
    rm -rf "packages/$1/ios/Pods"
    rm -f "packages/$1/ios/Podfile.lock"
    rm -rf "packages/$1/android/.gradle"
    rm -rf "packages/$1/android/app/build"
  elif [ "$1" = "expo-app" ]; then
    rm -rf "packages/$1/.expo"
  fi
}

# Clean root
echo "Cleaning root..."
rm -rf node_modules
rm -f yarn.lock

# Clean packages
clean_package "react-native-app"
clean_package "expo-app"
clean_package "shared-ui"

# Clean Yarn cache
echo "Cleaning Yarn cache..."
yarn cache clean

# Reinstall dependencies
echo "Reinstalling dependencies..."
yarn install

# Install CocoaPods if react-native-app exists
if [ -d "packages/react-native-app" ]; then
  echo "Installing CocoaPods..."
  cd packages/react-native-app/ios && pod install && cd ../../..
fi

echo "Clean install completed!"
#!/usr/bin/env bash

set -e

# Function to clean a package
clean_package() {
  echo "Cleaning $1..."
  rm -rf "packages/$1/node_modules"
  rm -f "packages/$1/yarn.lock"
  
  if [ "$1" = "rn-app" ]; then
    rm -rf "packages/$1/ios/Pods"
    rm -f "packages/$1/ios/Podfile.lock"
    rm -rf "packages/$1/android/.gradle"
    rm -rf "packages/$1/android/app/build"
  fi
}

# Clean root
echo "Cleaning root..."
rm -rf node_modules
rm -f yarn.lock

# Clean packages
clean_package "rn-app"
clean_package "shared-ui"

# Clean Yarn cache
echo "Cleaning Yarn cache..."
yarn cache clean

# Fresh install
echo "Performing fresh install..."
yarn install

# Run bundle install and pod install for rn-app
echo "Running bundle install and pod install for rn-app..."
cd packages/rn-app/ios
bundle install
bundle exec pod install
cd ../../..

echo "Clean and install process completed."
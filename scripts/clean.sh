#!/usr/bin/env bash

set -e

clean_package() {
  echo "Cleaning $1..."
  rm -rf "packages/$1/node_modules"
  rm -f "packages/$1/yarn.lock"
  rm -f "packages/$1/package-lock.json"
  rm -rf "packages/$1/.nyc_output"
  rm -rf "packages/$1/coverage"
  rm -rf "packages/$1/dist"
  rm -rf "packages/$1/build"
  
  if [ "$1" = "rn-app" ]; then
    rm -rf "packages/$1/ios/Pods"
    rm -f "packages/$1/ios/Podfile.lock"
    rm -rf "packages/$1/ios/build"
    rm -rf "packages/$1/ios/DerivedData"
    rm -rf "packages/$1/android/.gradle"
    rm -rf "packages/$1/android/app/build"
    rm -rf "packages/$1/android/build"
    rm -rf "packages/$1/.expo"
    rm -rf "packages/$1/web-build"
  fi
}

echo "Cleaning root..."
rm -rf node_modules
rm -f yarn.lock
rm -f package-lock.json
rm -rf .nyc_output
rm -rf coverage
rm -rf dist
rm -rf build

clean_package "with-rn"
clean_package "with-expo"
clean_package "shared-ui"

echo "Cleaning Yarn cache..."
yarn cache clean

echo "Cleaning npm cache..."
npm cache clean --force

echo "Cleaning watchman watches..."
watchman watch-del-all || true

echo "Cleaning Metro bundler cache..."
rm -rf $TMPDIR/metro-*

echo "Cleaning React Native cache..."
rm -rf $TMPDIR/react-*

echo "Cleaning Xcode derived data and archives..."
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Developer/Xcode/Archives

echo "Cleaning Android build cache..."
rm -rf ~/.gradle/caches

echo "Cleanup complete!"
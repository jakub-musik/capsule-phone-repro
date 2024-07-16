const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const nodeLibs = require('node-libs-react-native');

const monorepoPackages = {
  '@rn-integration-examples/shared-ui': path.join(__dirname, '../shared-ui'),
};

const config = {
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '..'),
  ],
  resolver: {
    extraNodeModules: {
      ...nodeLibs,
      crypto: require.resolve('react-native-crypto'),
      stream: require.resolve('readable-stream'),
      process: require.resolve('process'),
      ...monorepoPackages,
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

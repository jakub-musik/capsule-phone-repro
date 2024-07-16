const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const nodeLibs = require("node-libs-react-native");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

const monorepoPackages = {
  "@rn-integration-examples/shared-ui": path.resolve(workspaceRoot, "packages/shared-ui"),
};

// 1. Watch all files within the monorepo
config.watchFolders = [path.resolve(workspaceRoot, "node_modules"), path.resolve(workspaceRoot, "packages")];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

// 4. Extra node modules and polyfills
config.resolver.extraNodeModules = {
  ...nodeLibs,
  crypto: require.resolve("react-native-crypto"),
  stream: require.resolve("readable-stream"),
  process: require.resolve("process"),
  ...monorepoPackages,
};

// 5. Configure the transformer
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
  },
});

module.exports = config;

module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
      },
    ],
    [
      "module-resolver",
      {
        alias: {
          "@rn-integration-examples/shared-ui": "../shared-ui/src",
        },
      },
    ],
  ],
};

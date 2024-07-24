module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@rn-integration-examples/shared-ui': '../shared-ui/src',
        },
      },
    ],
  ],
};

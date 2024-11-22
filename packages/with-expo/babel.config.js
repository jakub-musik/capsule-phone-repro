module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
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
};

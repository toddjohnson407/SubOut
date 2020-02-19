module.exports = function(api) {
  api.cache(true);
  const presets = ['babel-preset-expo', 'module:react-native-dotenv'];
  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ["./"],
        extensions: ['.tsx, .js, .ts, .json, .ios.js, .android.js', '.base.js'],
        alias: {
          "@base": "./",
          "@assets": "./assets",
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@utils": "./src/utils"
        }
      }
      
    ]
  ];
  return { presets, plugins };
};

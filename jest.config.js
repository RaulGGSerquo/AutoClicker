module.exports ={
  preset : 'react-native',
  transformIgnorePatterns: [
      '/node_modules/(?!(@react-native|react-native|react-native-iphone-x-helper|react-native-vector-icons)/).*/'
  ],
  setupFiles: ["./src/tests/jestSetup.js"]
}
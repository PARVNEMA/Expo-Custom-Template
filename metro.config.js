// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require(require.resolve('nativewind/metro'));

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });

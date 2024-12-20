const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      process: require.resolve("process"),
    },
  },
};

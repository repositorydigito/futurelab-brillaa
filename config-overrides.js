module.exports = function override(config) {
    config.resolve.fallback = {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      process: require.resolve("process"),
    };
    return config;
  };
  
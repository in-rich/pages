const SVGLoader = (config) => {
  config.module.rules.push({ test: /\.svg$/i, loader: "@svgr/webpack" });
  return config;
};

const YMLLoader = (config) => {
  config.module.rules.push({ test: /\.ya?ml$/i, use: "yaml-loader" });
  return config;
};

module.exports = {
  SVGLoader,
  YMLLoader,
};

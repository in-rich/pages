import type { NextConfig } from "next";

import { CSSCamelCaseLoader, SVGLoader, YMLLoader } from "./compilers";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  webpack(config) {
    config = CSSCamelCaseLoader(config);
    config = SVGLoader(config);
    config = YMLLoader(config);
    config.module.unknownContextCritical = false;
    return config;
  },
};

export default nextConfig;

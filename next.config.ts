import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashscope-result-bj.oss-cn-beijing.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "dashscope-result-sh.oss-cn-shanghai.aliyuncs.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

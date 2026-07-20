import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // TODO: 행사가 여러 개가 되면 루트에 행사 목록 페이지를 만들고 이 리다이렉트는 제거
      {
        source: "/",
        destination: "/samsung-executive-dinner",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

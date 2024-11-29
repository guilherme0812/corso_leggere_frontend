/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // Allows all paths from this domain
      },
    ],
  },
  env: {
    LEGGERE_API_URL: process.env.LEGGERE_API_URL,
  },
};

export default nextConfig;

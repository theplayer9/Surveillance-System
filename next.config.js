/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve = {...config.resolve, fallback: {
      fs: false
    }}
    // Important: return the modified config
    return config
  },
}

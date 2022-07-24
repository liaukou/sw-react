const withLess = require('next-with-less')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['upload.wikimedia.org'],
  },
}

module.exports = withLess(nextConfig)

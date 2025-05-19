/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: [ 'packages/utils' ],
  serverSideActions: true,
};

module.exports = nextConfig;

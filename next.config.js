const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // This config ensures we load React from this project, not the libraries. Avoid duplicate React error
      react: path.join(__dirname, 'node_modules/react'),
      // Testing the metamask-react project locally. Can't manage with `npm link`
      'metamask-react': path.join(__dirname, '../VGLoic/metamask-react'),
    };
    return config;
  },
};

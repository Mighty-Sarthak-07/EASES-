import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }]
  }
};

const sentryConfig = {
  org: "jsm-x9",
  project: "javascript-nextjs",

  // Only run Sentry build steps if the auth token is present
  dryRun: !process.env.SENTRY_AUTH_TOKEN,

  silent: true,
  widenClientFileUpload: false,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false,
  telemetry: false,

  // Disable all source map uploading
  sourcemaps: {
    disable: true,
  },

  // Disable release creation at build time
  release: {
    create: false,
    finalize: false,
    deploy: {
      env: process.env.VERCEL_ENV || 'production',
    },
  },
};

export default withSentryConfig(nextConfig, sentryConfig);
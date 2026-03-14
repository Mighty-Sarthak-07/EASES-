import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://e2e116ba859c86f653c31c204700115b@o4511014636421120.ingest.us.sentry.io/4511014641336320",

  tracesSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  debug: false,

  allowUrls: [
    /https?:\/\/localhost/,
    /https?:\/\/.*\.vercel\.app/,
  ],

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  tracePropagationTargets: [
    'localhost',
    /^https:\/\/.*\.vercel\.app/,
  ],
});

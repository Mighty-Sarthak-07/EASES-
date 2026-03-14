import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://e2e116ba859c86f653c31c204700115b@o4511014636421120.ingest.us.sentry.io/4511014641336320",

  tracesSampleRate: 1.0,
});

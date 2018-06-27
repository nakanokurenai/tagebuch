export default {
  SENTRY_DSN: process.env.SENTRY_DSN,
  ENV: process.env.NODE_ENV.env,
  TITLE: process.env.TAGEBUCH_TITLE || 'Das Tagebuch'
}

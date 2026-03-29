// This file configures the initialization of Sentry on the client.
// This is the new standard for Next.js 15+ with @sentry/nextjs v8+
import * as Sentry from "@sentry/nextjs";

console.log("Sentry Client Instrumentation Initializing...");

if (typeof window !== "undefined") {
  Sentry.init({
    dsn: "https://f25e64c95a91f88f1cd4292f0f091ce3@o4507578446643200.ingest.us.sentry.io/4510816453656576",

    // Enable debug mode to see detailed logs during development
    debug: process.env.NODE_ENV === "development",

    integrations: [
      Sentry.replayIntegration(),
      Sentry.feedbackIntegration({
        // Additional SDK configuration goes in here
        autoInject: false,
        colorScheme: "dark",
        isNameRequired: true,
        isEmailRequired: true,
        buttonLabel: "Report a Bug",
        submitButtonLabel: "Send Bug Report",
        formTitle: "Report a Bug",
        addScreenshotLabel: "Add a screenshot",
        descriptionPlaceholder: "What's the bug? What did you expect?",
        successMessageText: "Thank you for your report!",
      }),
    ],

    // Define how likely traces are sampled.
    tracesSampleRate: 1.0,

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Define how likely Replay events are sampled.
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Enable sending user PII
    sendDefaultPii: true,

    // Show Crash-Report modal when an exception occurs
    beforeSend(event) {
      if (event.exception && event.event_id) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
  });
}

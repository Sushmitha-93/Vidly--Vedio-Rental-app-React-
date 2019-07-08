//import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://15ab3bccf8b54494b6db30399b667c1a@sentry.io/1479678"
  // });
}

function log(error) {
  // //Logging error using sentry.io
  // Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log
};

export const cloudrunUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : process.env.CLOUD_RUN_URL;

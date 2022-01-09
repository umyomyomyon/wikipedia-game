export const cloudrunUrl =
  process.env.REACT_APP_ENV === "development"
    ? "http://127.0.0.1:8000"
    : process.env.REACT_APP_CLOUD_RUN_URL;

export const COLORS = {
  primary: "#6558F5",
  secondary: "#D3455B",
};

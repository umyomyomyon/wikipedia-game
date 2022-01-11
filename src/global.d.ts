declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ENV: "production" | "development";
  }
}

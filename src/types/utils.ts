export type ConstantsTypes<
  T extends { [key: string]: string | number | boolean | undefined }
> = {
  [K in keyof T]: T[K];
}[keyof T];

export interface Result {
  createdAt: Date;
  start: string;
  goal: string;
  results: UserResult[];
}

export type UserResult = Readonly<{
  uuid: string;
  name: string;
  urls: string[];
  isSurrendered: boolean;
}>;

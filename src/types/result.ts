export interface Result {
  createdAt: Date;
  start: string;
  goal: string;
  results: UserResult[];
}

export type UserResult = { uuid: string; name: string; urls: string[] };

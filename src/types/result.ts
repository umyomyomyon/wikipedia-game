export interface Result {
  createdAt: any;
  start: string;
  goal: string;
  results: UserResult[];
}

type UserResult = { uuid: string; name: string; urls: string[] };

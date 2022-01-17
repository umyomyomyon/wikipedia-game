export interface UserData {
  name: string;
  uuid: string;
  isDone: boolean;
  isSurrendered: boolean;
}

export interface UserObj {
  [uuid: string]: {
    name: string;
    isDone: boolean;
    isSurrendered: boolean;
  };
}

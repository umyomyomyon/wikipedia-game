interface _UserData {
  name: string;
  uuid: string;
  isDone: boolean;
  isSurrendered: boolean;
}

interface _UserObj {
  [uuid: string]: {
    name: string;
    isDone: boolean;
    isSurrendered: boolean;
  };
}

export type UserData = Readonly<_UserData>;
export type UserObj = Readonly<_UserObj>;

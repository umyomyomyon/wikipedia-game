import React, { useState } from "react";
import { useRecoilValue } from "recoil";

// mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// components
import { Target } from "./Target";
import { UrlList } from "./Lists/URLList";
import { URLField } from "./Forms/URLField";
import { UserList } from "./Lists/UserList";

// types
import { UserData } from "../../types/user";

import { dummyUserList } from "../general/UserList";
import { validateWikipediaUrl } from "../../utils/validations";
import { useRoomData } from "../../hooks/firebase";

//atoms
import { roomId as roomIdAtom } from "../../recoil/atoms/room";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const _useRoomData = (): {
  users: UserData[];
  isReady: boolean;
  start: string;
  goal: string;
} => {
  return {
    users: dummyUserList,
    isReady: true,
    start: "https://ja.wikipedia.org/wiki/World_Wide_Web",
    goal: "https://ja.wikipedia.org/wiki/%E5%8B%95%E7%9A%84%E8%A8%88%E7%94%BB%E6%B3%95",
  };
};

export const GameContent: React.FC = (): JSX.Element => {
  const roomId = useRecoilValue(roomIdAtom);
  const { users, start, goal } = useRoomData(true, roomId);
  const [url, setUrl] = useState<string>("");
  const [urlError, setURLError] = useState<boolean>(false);
  const [urls, setUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleDoneClick = () => {
    if (!url) return;
    const isValidWikipediaURL = validateWikipediaUrl(url);
    if (!isValidWikipediaURL) {
      setURLError(true);
      return;
    }

    // urlsを更新
    const _urls = [...urls];
    _urls.push(url);
    setUrls(_urls);

    //formをクリア
    setUrl("");
  };

  const handleReturnClick = () => {
    // formをクリア
    setUrl("");

    // urlsの一番最後を削除
    // const _urls = urls; とすると値渡しにならないのでスプレット構文で配列をコピーする
    const _urls = [...urls];
    _urls.pop();

    // urlsを更新
    setUrls(_urls);
  };

  const handleFocus = () => {
    setURLError(false);
  };

  return (
    <React.Fragment>
      <UserList users={users} />
      <Container maxWidth="sm" sx={{ height: "100vh", position: "relative" }}>
        <Wrapper>
          {start && <Target startOrGoal="start" url={start} />}
          <UrlList urls={urls} />
          <URLField
            url={url}
            error={urlError}
            handleChange={handleChange}
            handleClick={handleDoneClick}
            handleReturnClick={handleReturnClick}
            handleFocus={handleFocus}
          />
          {goal && <Target startOrGoal="goal" url={goal} />}
        </Wrapper>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          disabled={urls.length === 0}
          sx={{
            position: "absolute",
            maxWidth: 300,
            left: 0,
            right: 0,
            bottom: 20,
            margin: "auto",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>DONE</Typography>
        </Button>
      </Container>
    </React.Fragment>
  );
};

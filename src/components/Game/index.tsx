import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

// components
import { Target } from "./Target";
import { UrlList } from "./Lists/URLList";
import { URLField } from "./Forms/URLField";
import { UserList } from "./Lists/UserList";
import { DoneButton } from "./Buttons/DoneButton";
import { SurrenderButton } from "./Buttons/SurrenderButton";

import { validateWikipediaUrl } from "../../utils/validations";
import { useRoomData } from "../../hooks/firebase";
import { done } from "../../utils/room";

//atoms
import { roomId as roomIdAtom } from "../../recoil/atoms/room";
import { mode as modeAtom } from "../../recoil/atoms/mode";
import {
  userUuid as userUuidAtom,
  userName as userNameAtom,
} from "../../recoil/atoms/user";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const GameContent: React.FC = (): JSX.Element => {
  const roomId = useRecoilValue(roomIdAtom);
  const userUuid = useRecoilValue(userUuidAtom);
  const userName = useRecoilValue(userNameAtom);
  const setMode = useSetRecoilState(modeAtom);

  const [url, setUrl] = useState<string>("");
  const [urlError, setURLError] = useState<boolean>(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isSurrendered, setIsSurrendered] = useState<boolean>(false);
  const [isSubscribeRoomData, setIsSubscribeRoomData] = useState<boolean>(true);

  const { users, host, status, start, goal } = useRoomData(
    isSubscribeRoomData,
    roomId
  );

  const formEnable = !isDone && !isSurrendered;

  useEffect(() => {
    if (status === "ENDED") {
      setMode("result");
      return () => setIsSubscribeRoomData(false);
    }
  }, [status]);

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

  const handleDone = () => {
    if (!roomId || !userUuid) return;
    done(roomId, userUuid, true, false, urls, userName).then(() =>
      setIsDone(true)
    );
  };

  const handleCancel = () => {
    if (!roomId || !userUuid) return;
    done(roomId, userUuid, false, false).then(() => {
      setIsDone(false);
      setIsSurrendered(false);
    });
  };

  const handleSurrender = () => {
    if (!roomId || !userUuid) return;
    done(roomId, userUuid, true, true, [], userName).then(() =>
      setIsSurrendered(true)
    );
  };

  return (
    <React.Fragment>
      <UserList users={users} host={host} />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Wrapper>
          {start && <Target startOrGoal="start" url={start} />}
          <UrlList urls={urls} />
          {formEnable && (
            <URLField
              url={url}
              error={urlError}
              handleChange={handleChange}
              handleClick={handleDoneClick}
              handleReturnClick={handleReturnClick}
              handleFocus={handleFocus}
            />
          )}
          {goal && <Target startOrGoal="goal" url={goal} />}
          {!isSurrendered && (
            <SurrenderButton handleSurrender={handleSurrender} />
          )}
        </Wrapper>
        <DoneButton
          disabled={urls.length === 0}
          isDone={isDone}
          isSurrendered={isSurrendered}
          handleDone={handleDone}
          handleCancel={handleCancel}
        />
      </Container>
    </React.Fragment>
  );
};

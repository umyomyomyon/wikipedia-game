const extractTitleFromURL = (url: string): string => {
  const decoded = decodeURI(url);
  const splited = decoded.split(".wikipedia.org/wiki/");
  return splited[splited.length - 1];
};

const validateURL = (value: string): boolean => {
  // eslint-disable-next-line
  const REGEX = /^(https)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/;
  return value.match(REGEX) ? true : false;
};

const validateWikipediaUrl = (url: string): boolean => {
  const isURL = validateURL(url);
  if (!isURL) return false;
  const REGEX = /^https:\/\/ja.wikipedia.org\/wiki\/.+$/;
  return url.match(REGEX) ? true : false;
};

const validateRoomId = (roomId: number): boolean => {
  return roomId >= 10000 && roomId <= 99999;
};

const validateUserName = (userName: string): boolean => {
  return userName.length <= 15;
};

export {
  extractTitleFromURL,
  validateWikipediaUrl,
  validateRoomId,
  validateUserName,
};

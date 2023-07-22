const generateTimeString = (seconds: number) => {
  const minutesInt = Math.floor(seconds / 60);
  let minutesString;
  if (minutesInt < 10) {
    minutesString = `0${minutesInt}`;
  } else {
    minutesString = `${minutesInt}`;
  }
  const secondsInt = (seconds % 3600) % 60;
  let secondsString: string;
  if (secondsInt < 10) {
    secondsString = `0${secondsInt}`;
  } else {
    secondsString = `${secondsInt}`;
  }
  return `${minutesString}:${secondsString}`;
};

export default generateTimeString;

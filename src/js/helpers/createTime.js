export function getTimeComponents(time, format = 24, timeZone) {
  let hours = (Math.floor((time / 1000 / 60 / 60) % 24) + timeZone) % format;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

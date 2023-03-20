export function formatTime(timeInSeconds: number) {
  const minutesAmount = Math.floor(timeInSeconds / 60);
  const secondsAmount = Math.floor(timeInSeconds % 60);

  const minutes = `${minutesAmount}`.padStart(2, '0');
  const seconds = `${secondsAmount}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function formatHumanReadTime(timeInSeconds: number) {
  const time = formatTime(timeInSeconds);

  let humanReadableTime = '';

  const [minutes, seconds] = time.split(':');

  const minutesFormatted = Number(minutes);
  const secondsFormatted = Number(seconds);

  humanReadableTime += `${minutesFormatted} ${
    minutesFormatted === 1 ? 'minute' : 'minutes'
  }, `;
  humanReadableTime += `${secondsFormatted} ${
    secondsFormatted === 1 ? 'second' : 'seconds'
  }`;

  return humanReadableTime;
}

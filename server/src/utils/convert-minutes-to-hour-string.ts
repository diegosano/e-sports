export function convertMinutesToHourString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutesLeft.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}`;
}

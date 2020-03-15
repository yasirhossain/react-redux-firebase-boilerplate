// miliseconds in a...
const MIN = 1000 * 60;
const HOUR = MIN * 60;

function formatMsToHuman(duration, msInUnit, unit) {
  const intDiv = Math.floor(duration / msInUnit);
  // eslint-disable-next-line no-use-before-define
  return `${intDiv}${unit} ${msToHuman(duration - (intDiv * msInUnit))}`;
}

export default function msToHuman(duration) {
  if (duration < MIN) {
    return '';
  }

  if (duration < HOUR) {
    return formatMsToHuman(duration, MIN, 'm');
  }

  return formatMsToHuman(duration, HOUR, 'h');
}

export default function truncateMiddle(str: string, length: number): string {
  if (str.length <= length) {
    return str;
  }
  const mid: number = Math.floor(str.length / 2);
  const start: number = mid - Math.floor(length / 2);
  const end: number = start + length;
  const truncatedString: string = str.slice(0, start) + '....' + str.slice(end);
  return truncatedString;
}

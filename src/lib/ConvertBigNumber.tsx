export default function ConvertBigNumber(num: number): number {
  const value = num / 1000000000000000000000;
  const truncatedNumber = Number(value.toString().slice(0, -10));

  return truncatedNumber;
}

export default function ConvertBigNumber(n: number): string {
  return (n / 1e18).toLocaleString('fullwide', { useGrouping: true, maximumSignificantDigits: 21 });
}

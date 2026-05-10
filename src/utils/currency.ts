export function formatINR(amount: number): string {
  const str = Math.abs(amount).toString();
  let lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return (amount < 0 ? '-' : '') + '\u20B9' + formatted;
}

const DECIMAL_COUNT = 18;

export const fromWei = (amount: string) => {
  const prepend = new Array(Math.max(0, DECIMAL_COUNT + 1 - amount.length)).fill('0').join('');
  const amountWithLeadingZeros = `${prepend}${amount}`;
  const decimals = amountWithLeadingZeros.substring(amountWithLeadingZeros.length - DECIMAL_COUNT);
  const integers = amountWithLeadingZeros.substring(0, amountWithLeadingZeros.length - DECIMAL_COUNT);
  return `${integers}.${decimals}`.replace(/\.?0+$/g, '');
};

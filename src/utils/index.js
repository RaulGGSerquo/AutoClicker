const formatNumber = (number) => {
  const format = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];

  const digits = number >= 1000 ? 2 : 0;
  const item = format.slice().reverse().find(elem => number >= elem.value);
  return item ? (number / item.value).toFixed(digits) + item.symbol : '0';
}

export { formatNumber };
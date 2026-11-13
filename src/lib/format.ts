const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatInr(amount: number): string {
  return inr.format(amount);
}

export function formatDuration(nights: number): string {
  return `${nights}N / ${nights + 1}D`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getMonthLabel(month: string) {
  return new Date(2000, Number(month) - 1, 1).toLocaleString("en-us", {
    month: "long",
  });
}

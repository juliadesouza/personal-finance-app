import { type DateOption, type Period } from "@/types/date";

export const ALL = "all";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(value: string): string {
  const [year, month, day] = value.split(" ")[0].split("-");
  return `${day}/${month}/${year}`;
}

export function getMonthLabel(month: string) {
  return new Date(2000, Number(month) - 1, 1).toLocaleString("en-us", {
    month: "long",
  });
}

export function getDefaultPeriod(dates: DateOption[]): Period {
  if (dates.length === 0) return { year: ALL, month: ALL };

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const yearData = dates.find((d) => d.year === year);

  if (!yearData) {
    return { year: dates[0].year, month: dates[0].months[0] ?? ALL };
  }
  return {
    year,
    month: yearData.months.includes(month)
      ? month
      : (yearData.months[0] ?? ALL),
  };
}

export const formatDateForInput = (date: string) => date.split(" ")[0];

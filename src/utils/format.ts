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

export function getDefaultPeriod(dateOptions: DateOption[]): Period {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const current = `${year}-${month}`;

  const available = dateOptions
    .flatMap((d) => d.months.map((m) => `${d.year}-${m}`))
    .sort();

  if (!available.length) return { year, month };

  const target = available.includes(current)
    ? current
    : (available.filter((p) => p < current).at(-1) ?? available[0]);

  const [y, m] = target.split("-");
  return { year: y, month: m };
}

export const formatDateForInput = (date: string) => date.split(" ")[0];

export function getPageItems(
  page: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (page >= totalPages - 3) {
    return [
      1,
      "...",
      ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i),
    ];
  }
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

export const formatMonth = (value: string) =>
  new Date(`${value}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
  });

export const formatMonthLong = (value: string) =>
  new Date(`${value}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

import { getMonthName } from "@/lib/utils";

export const FormatDateRange = (range: string): string => {
  if (!range.includes("&to=")) return "";

  const [fromStr, toStr] = range.split("&to=");
  const from = new Date(fromStr);
  const to = new Date(toStr);

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return "";
  }

  const formatDate = (date: Date): string => {
    const day = date.getUTCDate();
    const month = getMonthName(date.getUTCMonth());
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  return `${formatDate(from)} - ${formatDate(to)}`;
};

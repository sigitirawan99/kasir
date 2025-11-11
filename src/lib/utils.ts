import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number as Indonesian currency (Rupiah)
 * @param value - Number to format
 * @param includePrefix - Whether to include "Rp" prefix (default: false)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, includePrefix = false): string {
  const formatted = value.toLocaleString("id-ID");
  return includePrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Format number as Indonesian currency with "Rp" prefix
 * @param value - Number to format
 * @returns Formatted currency string with "Rp" prefix
 */
export function formatCurrencyWithPrefix(value: number): string {
  return formatCurrency(value, true);
}

/**
 * Get Indonesian month names
 * @returns Array of month names
 */
export function getMonthNames(): string[] {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
}

/**
 * Get month name by index
 * @param monthIndex - Month index (0-11)
 * @returns Month name
 */
export function getMonthName(monthIndex: number): string {
  const months = getMonthNames();
  return months[monthIndex] ?? "";
}

/**
 * Format date to Indonesian locale string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDateLocale(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleDateString("id-ID", options);
}

/**
 * Format time to Indonesian locale string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted time string
 */
export function formatTimeLocale(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleTimeString("id-ID", options);
}

/**
 * Format date with day and month name (e.g., "24 Okt")
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDateWithMonth(date: Date): string {
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  return `${day} ${month}`;
}

/**
 * Format chart tooltip value as currency
 * @param value - Value to format
 * @param label - Label for the tooltip
 * @returns Formatted tooltip array [formattedValue, label]
 */
export function formatChartTooltipCurrency(
  value: number | string,
  label = "Total"
): [string, string] {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return [`Rp${formatCurrency(numValue)}`, label];
}

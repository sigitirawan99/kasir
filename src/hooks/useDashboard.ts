import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SalesDataItem, DataSales, SalesData } from "@/lib/types";
import { generateDateRangeQuery } from "@/components/dashboard/GenerateDateRange";
import { convertDate } from "@/components/ConvertDate";

// Query untuk sales amount chart (Line Chart)
export function useSalesAmountChart(range?: string) {
  const dateRange = range || generateDateRangeQuery();

  return useQuery({
    queryKey: ["salesAmountChart", dateRange],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get<SalesDataItem[]>(
        `dashboards/sales_amount_chart?from=${dateRange}&filter=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!dateRange,
  });
}

// Query untuk sales per hour (Bar Chart)
export function useSalesPerHour(date?: Date) {
  const selectedDate = date || new Date();
  const filterDate = convertDate(selectedDate);

  return useQuery({
    queryKey: ["salesPerHour", filterDate],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get<SalesData[]>(
        `dashboards/sales_amount_chart?filter=${filterDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    enabled: !!filterDate,
  });
}

// Query untuk top products
export function useTopProducts(range?: string) {
  const dateRange = range || generateDateRangeQuery();

  return useQuery({
    queryKey: ["topProducts", dateRange],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get<DataSales[]>(
        `dashboards/top_products?from=${dateRange}&filter=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!dateRange,
  });
}

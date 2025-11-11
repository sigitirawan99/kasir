"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  HandCoins,
  ShoppingCart,
  SquareArrowOutUpRight,
  TrendingUp,
} from "lucide-react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { useMemo } from "react";
import { generateDateRangeQuery } from "../../../components/dashboard/GenerateDateRange";
import { FormatDateRange } from "@/components/dashboard/FormatDateRange";
import { type ChartDataItem, DataCardItem } from "@/lib/types";
import {
  formatCurrency,
  formatDateWithMonth,
  formatChartTooltipCurrency,
} from "@/lib/utils";
import { useSalesAmountChart } from "@/hooks/useDashboard";

export default function LineChartSales() {
  const range = generateDateRangeQuery();
  const { data: apiData, isLoading } = useSalesAmountChart(range);

  const chartData: ChartDataItem[] = useMemo(() => {
    if (!apiData) return [];
    return apiData.map((item) => ({
      date: formatDateWithMonth(new Date(item.date)),
      price: item.total,
    }));
  }, [apiData]);

  const dataCard: DataCardItem[] = useMemo(() => {
    if (!apiData) {
      return [
        {
          title: "Total Penjualan",
          value: "0",
          icon: HandCoins,
          color: "text-green-600",
          bgIconColor: "bg-green-100",
          bgColor: "bg-green-50",
        },
        {
          title: "Total Transaksi",
          value: "0",
          icon: ShoppingCart,
          color: "text-blue-600",
          bgIconColor: "bg-blue-100",
          bgColor: "bg-blue-50",
        },
        {
          title: "Rata-rata/Hari",
          value: "0",
          icon: TrendingUp,
          color: "text-purple-600",
          bgIconColor: "bg-purple-100",
          bgColor: "bg-purple-50",
        },
      ];
    }

    const totalPenjualan = apiData.reduce((sum, item) => sum + item.total, 0);
    const totalTransaksi = apiData.reduce((sum, item) => sum + item.count, 0);
    const daysWithSales = apiData.filter((item) => item.total > 0).length;
    const rataRata = daysWithSales > 0 ? totalPenjualan / daysWithSales : 0;

    return [
      {
        title: "Total Penjualan",
        value: formatCurrency(totalPenjualan),
        icon: HandCoins,
        color: "text-green-600",
        bgIconColor: "bg-green-100",
        bgColor: "bg-green-50",
      },
      {
        title: "Total Transaksi",
        value: totalTransaksi.toString(),
        icon: ShoppingCart,
        color: "text-blue-600",
        bgIconColor: "bg-blue-100",
        bgColor: "bg-blue-50",
      },
      {
        title: "Rata-rata/Hari",
        value: formatCurrency(Math.round(rataRata)),
        icon: TrendingUp,
        color: "text-purple-600",
        bgIconColor: "bg-purple-100",
        bgColor: "bg-purple-50",
      },
    ];
  }, [apiData]);

  const formatRange = FormatDateRange(range);

  return (
    <div className="w-full">
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md text-gray-900">
                Penjualan Bulan Ini
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                {formatRange}
              </CardDescription>
            </div>
            <button className="text-xs text-black flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md cursor-pointer font-medium shadow-xs hover:bg-gray-100">
              Lihat detail
              <SquareArrowOutUpRight size={15} />
            </button>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 mb-4">
            {dataCard.map((data, index) => {
              const IconComponent = data.icon;
              return (
                <DashboardCard
                  key={index}
                  title={data.title}
                  value={data.value}
                  icon={<IconComponent />}
                  iconBgColor={data.bgIconColor}
                  iconColor={data.color}
                  valueColor={data.color}
                  bgColor={data.bgColor}
                />
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="-mt-8">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="none"
                stroke="#f0f0f0"
                vertical={false}
                horizontal={true}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
                interval={1}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
                tickFormatter={(value) => `${value / 1000} rb`}
              />
              <Tooltip
                formatter={(value) =>
                  formatChartTooltipCurrency(value as number)
                }
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="linear"
                dataKey="price"
                stroke="#e76e50"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#e76e50" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

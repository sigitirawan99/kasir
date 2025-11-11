"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, ShoppingCart, Clock, HandCoins } from "lucide-react";
import { useState, useMemo } from "react";
import { DatePicker } from "@/components/dashboard/DatePicker";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { type ChartData } from "@/lib/types";
import {
  formatCurrencyWithPrefix,
  formatDateLocale,
  formatTimeLocale,
  formatChartTooltipCurrency,
} from "@/lib/utils";
import { useSalesPerHour } from "@/hooks/useDashboard";

export default function BarChartSales() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const { data: rawData, isLoading } = useSalesPerHour(selectedDate);

  const chartData: ChartData[] = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];
    return rawData.map((item) => {
      const d = new Date(item.date);
      const time = formatTimeLocale(d, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return { time, value: item.total };
    });
  }, [rawData]);

  const {
    totalSales,
    totalTransactions,
    averagePerHour,
    busiestHour,
    averagePerTransaction,
  } = useMemo(() => {
    if (!rawData || rawData.length === 0) {
      return {
        totalSales: 0,
        totalTransactions: 0,
        averagePerHour: 0,
        busiestHour: "--:--",
        averagePerTransaction: 0,
      };
    }

    const totalSales = rawData.reduce((acc, curr) => acc + curr.total, 0);
    const totalTransactions = rawData.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
    const hoursActive = rawData.length;
    const averagePerHour = totalSales / hoursActive;
    const averagePerTransaction =
      totalTransactions > 0 ? totalSales / totalTransactions : 0;

    const busiest = rawData.reduce((prev, curr) =>
      curr.total > prev.total ? curr : prev
    );
    const busiestTime = formatTimeLocale(new Date(busiest.date), {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      totalSales,
      totalTransactions,
      averagePerHour,
      busiestHour: busiestTime,
      averagePerTransaction,
    };
  }, [rawData]);

  const onDateChange = (selected: Date | undefined) => {
    setSelectedDate(selected);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between max-h-96">
          <div className="grid gap-1">
            <CardTitle>Penjualan Per Hari</CardTitle>
            <CardDescription>
              {selectedDate
                ? formatDateLocale(selectedDate, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </CardDescription>
          </div>
          <DatePicker onDateChange={onDateChange} />
        </div>
      </CardHeader>

      <CardContent className="-mt-4">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-3">
          <DashboardCard
            title="Total Penjualan"
            value={formatCurrencyWithPrefix(totalSales)}
            icon={<HandCoins />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            valueColor="text-green-600"
            bgColor="bg-green-50"
          />
          <DashboardCard
            title="Total Transaksi"
            value={totalTransactions.toString()}
            icon={<ShoppingCart />}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            valueColor="text-blue-600"
            bgColor="bg-blue-50"
          />
          <DashboardCard
            title="Rata-rata/Jam"
            value={formatCurrencyWithPrefix(Math.round(averagePerHour))}
            icon={<TrendingUp />}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            valueColor="text-purple-600"
            bgColor="bg-purple-50"
          />
          <DashboardCard
            title="Jam Tersibuk"
            value={busiestHour}
            icon={<Clock />}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            valueColor="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Bar Chart */}
        <div className="space-y-4">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <Tooltip
                  formatter={(value) =>
                    formatChartTooltipCurrency(value as number)
                  }
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                  cursor={false}
                />
                <CartesianGrid
                  strokeDasharray="none"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={(value) => `${value / 1000} rb`}
                />
                <Bar dataKey="value" fill="#e76e50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>

      <div className="flex justify-between p-2 text-xs text-gray-700 bg-gray-100 w-full h-full rounded-b-lg -mb-4 border">
        {averagePerTransaction ? (
          <span className="flex items-center gap-2 text-gray-500">
            <TrendingUp size={16} /> Rata-rata{" "}
            {formatCurrencyWithPrefix(averagePerTransaction)} per transaksi
          </span>
        ) : (
          <span className="flex items-center gap-2 text-gray-500">
            <TrendingUp size={16} /> Belum Ada Transaksi
          </span>
        )}
      </div>
    </Card>
  );
}

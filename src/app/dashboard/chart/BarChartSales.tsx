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
import { useEffect, useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { DatePicker } from "@/components/dashboard/DatePicker";
import api from "@/lib/api";
import { convertDate } from "../../components/ConvertDate";

interface SalesData {
  date: string;
  total: number;
  count: number;
}

interface ChartData {
  time: string;
  value: number;
}

export default function BarChartSales() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [averagePerHour, setAveragePerHour] = useState<number>(0);
  const [busiestHour, setBusiestHour] = useState<string>("-");
  const [averagePerTransaction, setAveragePerTransaction] = useState<number>(0);

  const date = convertDate(selectedDate!);

  const onDateChange = (selected: Date | undefined) => {
    setSelectedDate(selected);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get(`dashboards/sales_amount_chart?filter=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const rawData: SalesData[] = res.data;

        if (rawData.length === 0) {
          setChartData([]);
          setTotalSales(0);
          setTotalTransactions(0);
          setAveragePerHour(0);
          setAveragePerTransaction(0);
          setBusiestHour("--:--");
          return;
        }

        const transformed: ChartData[] = rawData.map((item) => {
          const d = new Date(item.date);
          const time = d.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return { time, value: item.total };
        });

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
        const busiestTime = new Date(busiest.date).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setChartData(transformed);
        setTotalSales(totalSales);
        setTotalTransactions(totalTransactions);
        setAveragePerHour(averagePerHour);
        setAveragePerTransaction(averagePerTransaction);
        setBusiestHour(busiestTime);
      })
      .catch((err) => console.error("Chart error:", err));
  }, [date]);

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between max-h-96">
          <div className="grid gap-1">
            <CardTitle>Penjualan Per Hari</CardTitle>
            <CardDescription>
              {selectedDate?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
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
            value={`Rp ${totalSales.toLocaleString("id-ID")}`}
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
            value={`Rp ${averagePerHour.toLocaleString("id-ID")}`}
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
                  formatter={(value) => [
                    `Rp${value.toLocaleString("id-ID")}`,
                    "Total",
                  ]}
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
                  domain={[0, 120000]}
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
            <TrendingUp size={16} /> Rata-rata Rp{" "}
            {averagePerTransaction.toLocaleString("id-ID")} per transaksi
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

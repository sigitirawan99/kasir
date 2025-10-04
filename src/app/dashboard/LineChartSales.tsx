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
import DashboardCard from "../../components/dashboard/DashboardCard";

const data = [
  { date: "1 Sep", price: 0 },
  { date: "4 Sep", price: 0 },
  { date: "7 Sep", price: 0 },
  { date: "10 Sep", price: 0 },
  { date: "13 Sep", price: 0 },
  { date: "16 Sep", price: 0 },
  { date: "19 Sep", price: 0 },
  { date: "20 Sep", price: 0 },
  { date: "21 Sep", price: 0 },
  { date: "22 Sep", price: 50000 },
  { date: "23 Sep", price: 150000 },
  { date: "24 Sep", price: 220000 },
  { date: "25 Sep", price: 180000 },
  { date: "26 Sep", price: 80000 },
  { date: "27 Sep", price: 20000 },
  { date: "28 Sep", price: 5000 },
  { date: "29 Sep", price: 0 },
  { date: "30 Sep", price: 0 },
];

const dataCard = [
  {
    title: "Total Penjualan",
    value: "115.000",
    icon: HandCoins,
    color: "text-green-600",
    bgIconColor: "bg-green-100",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Transaksi",
    value: "1",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgIconColor: "bg-blue-100",
    bgColor: "bg-blue-50",
  },
  {
    title: "Rata-rata/Hari",
    value: "115.000",
    icon: TrendingUp,
    color: "text-purple-600",
    bgIconColor: "bg-purple-100",
    bgColor: "bg-purple-50",
  },
];

export default function LineChartSales() {
  return (
    <div className="w-full">
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md font-semibold text-gray-900">
                Penjualan Bulan Ini
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                1 Sep 2025 - 30 Sep 2025
              </CardDescription>
            </div>
            <button className="text-xs text-black flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md cursor-pointer font-medium shadow-xs hover:bg-gray-100">
              Lihat detail
              <SquareArrowOutUpRight size={15} />
            </button>
          </div>
          <div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {dataCard.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <DashboardCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    icon={<IconComponent />}
                    iconBgColor={metric.bgIconColor}
                    iconColor={metric.color}
                    valueColor={metric.color}
                    bgColor={metric.bgColor}
                  />
                );
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={data}
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
                tick={{ fontSize: 12, fill: "#4A4A4A" }}
                interval={2}
              />
              <YAxis
                domain={[0, 250000]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#4A4A4A" }}
                tickFormatter={(value) => `${value / 1000} rb`}
                ticks={[0, 55000, 110000, 165000, 220000]}
              />
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
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
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

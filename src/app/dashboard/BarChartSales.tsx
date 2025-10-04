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
import { useState } from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { DatePicker } from "@/components/dashboard/DatePicker";

const dailyData = [
  { time: "16:00", value: 100000 },
  { time: "16:00", value: 115000 },
];

const dailyMetrics = [
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
    title: "Rata-rata/Jam",
    value: "115.000",
    icon: TrendingUp,
    color: "text-purple-600",
    bgIconColor: "bg-purple-100",
    bgColor: "bg-purple-50",
  },
  {
    title: "Jam Tersibuk",
    value: "16:00",
    icon: Clock,
    color: "text-orange-600",
    bgIconColor: "bg-orange-100",
    bgColor: "bg-orange-50",
  },
];

export default function BarChartSales() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const onDateChange = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between max-h-96">
          <div className="grid gap-1">
            <CardTitle>Penjualan Perhari</CardTitle>
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
        {/* Metrics Cards */}
        <div className="grid lg:grid-cols-4 gap-4 mb-4">
          {dailyMetrics.map((metric, index) => {
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

        {/* Bar Chart */}
        <div className="space-y-4">
          <div className="h-45">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
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
                  horizontal={true}
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

          {/* Chart Footer */}
        </div>
      </CardContent>
      <div className="flex justify-between p-2 text-xs text-gray-700 bg-gray-100 w-full h-full rounded-b-lg -mb-4 border">
        <span>Rata-rata Rp 115.000 per transaksi</span>
      </div>
    </Card>
  );
}

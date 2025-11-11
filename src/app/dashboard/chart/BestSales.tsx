"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SquareArrowOutUpRight } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { generateDateRangeQuery } from "../../../components/dashboard/GenerateDateRange";
import { formatCurrencyWithPrefix } from "@/lib/utils";
import { useTopProducts } from "@/hooks/useDashboard";

export default function BestSales() {
  const range = generateDateRangeQuery();
  const { data: dataSales = [], isLoading } = useTopProducts(range);
  return (
    <Card className="shadow-sm border border-gray-200 sm:w-1/2 w-full mt-4 sm:mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md text-gray-900">
            Produk Terlaris
          </CardTitle>
          <button className="text-xs text-black flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md cursor-pointer font-medium shadow-xs hover:bg-gray-100">
            Lihat Semua
            <SquareArrowOutUpRight size={15} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-75">
          <div className="space-y-2">
            {[...dataSales]
              .sort((a, b) => b.totalQuantity - a.totalQuantity)
              .map((sale, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 justify-between p-1 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  <div className="w-10 h-10 bg-blue-200 rounded-md flex items-center justify-center">
                    <div className="absolute -top-1 w-6 h-6 rounded-full bg-yellow-500 ml-8 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">#1</span>
                    </div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {sale.productName}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <ShoppingBag size={12} />
                      {sale.totalQuantity} units
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-green-600">
                    {formatCurrencyWithPrefix(sale.totalRevenue)}
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

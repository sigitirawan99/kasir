import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SquareArrowOutUpRight } from "lucide-react";
import { ShoppingBag } from "lucide-react";

export default function RecentSales() {
  const recentSales = [
    {
      name: "Polo T-Shirt",
      units: 1,
      amount: "Rp 115.000",
    },
    {
      name: "Baju",
      units: 2,
      amount: "Rp 215.000",
    },
    {
      name: "Kas & Bank",
      units: 3,
      amount: "Rp 115.000",
    },
  ];
  return (
    <Card className="shadow-sm border border-gray-200 sm:w-1/2 w-full mt-4 sm:mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-semibold text-gray-900">
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
            {[...recentSales]
              .sort((a, b) => b.units - a.units)
              .map((sale, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 justify-between p-1 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  <div className="w-10 h-10 bg-blue-200 rounded-md flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {sale.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <ShoppingBag size={12} />
                      {sale.units} units
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-green-600">
                    {sale.amount}
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

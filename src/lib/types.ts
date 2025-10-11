export type Organization = {
  name: string;
  logo: string;
  id: string;
  slug: string;
};

export type DataSales = {
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
};

export interface SalesData {
  date: string;
  total: number;
  count: number;
}

export interface ChartData {
  time: string;
  value: number;
}

export interface SalesDataItem {
  date: string;
  total: number;
  count: number;
}

export interface ChartDataItem {
  date: string;
  price: number;
}

export interface DataCardItem {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgIconColor: string;
  bgColor: string;
}

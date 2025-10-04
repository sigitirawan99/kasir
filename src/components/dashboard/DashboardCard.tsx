interface StatsCardProps {
  bgColor: string;
  title: string;
  value: string;
  valueColor: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

const DashboardCard: React.FC<StatsCardProps> = ({
  bgColor,
  title,
  value,
  valueColor,
  icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="">
      <div
        className={`${bgColor} rounded-md p-2 transition-all duration-400 hover:shadow-lg hover:-translate-y-1 border`}
      >
        <div className="flex items-center gap-4">
          <div className={`${iconBgColor} ${iconColor} p-2 rounded-full`}>
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-xs">{title}</p>
            <p className={`text-lg font-bold ${valueColor}`}>{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

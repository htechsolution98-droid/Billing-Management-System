import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  gradientFrom,
  gradientTo,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-14 h-14 ${iconBgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === "up"
                ? "bg-green-50 text-green-600"
                : trend === "down"
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : trend === "down" ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      
      {/* Progress bar */}
      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-1000`}
          style={{ width: `${Math.min((value / 200) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatCard;

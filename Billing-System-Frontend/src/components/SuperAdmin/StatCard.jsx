import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color,
  gradientFrom,
  gradientTo,
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return { bg: "bg-blue-50", icon: "text-blue-600", gradient: "from-blue-500 to-blue-600" };
      case "emerald":
        return { bg: "bg-emerald-50", icon: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600" };
      case "purple":
        return { bg: "bg-purple-50", icon: "text-purple-600", gradient: "from-purple-500 to-purple-600" };
      case "orange":
        return { bg: "bg-orange-50", icon: "text-orange-600", gradient: "from-orange-500 to-orange-600" };
      case "pink":
        return { bg: "bg-pink-50", icon: "text-pink-600", gradient: "from-pink-500 to-pink-600" };
      case "cyan":
        return { bg: "bg-cyan-50", icon: "text-cyan-600", gradient: "from-cyan-500 to-cyan-600" };
      default:
        return { bg: "bg-gray-50", icon: "text-gray-600", gradient: "from-gray-500 to-gray-600" };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
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
      <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
      
    </div>
  );
};

export default StatCard;

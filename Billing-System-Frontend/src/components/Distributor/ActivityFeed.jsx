import { 
  UserPlus, 
  PackagePlus, 
  UserCircle, 
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Clock
} from "lucide-react";

const ActivityFeed = ({ activities = [] }) => {
  // Default activities if none provided
  const defaultActivities = [
    {
      id: 1,
      type: "nuser_created",
      message: "New Nuser created",
      detail: "Amit Sharma was added",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "product_added",
      message: "Product added",
      detail: "Rice - 50kg bag added to inventory",
      time: "15 minutes ago",
      icon: PackagePlus,
      color: "bg-emerald-500",
    },
    {
      id: 3,
      type: "customer_registered",
      message: "Customer registered",
      detail: "Ravi Patel from Ahmedabad",
      time: "1 hour ago",
      icon: UserCircle,
      color: "bg-purple-500",
    },
    {
      id: 4,
      type: "stock_updated",
      message: "Product stock updated",
      detail: "Oil stock increased by 20 units",
      time: "2 hours ago",
      icon: RefreshCw,
      color: "bg-orange-500",
    },
    {
      id: 5,
      type: "order_placed",
      message: "New order received",
      detail: "Order #1234 for ₹5,000",
      time: "3 hours ago",
      icon: ShoppingCart,
      color: "bg-pink-500",
    },
    {
      id: 6,
      type: "sales_milestone",
      message: "Sales milestone reached",
      detail: "Monthly target 80% achieved",
      time: "5 hours ago",
      icon: TrendingUp,
      color: "bg-indigo-500",
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type) => {
    switch (type) {
      case "nuser_created":
        return UserPlus;
      case "product_added":
        return PackagePlus;
      case "customer_registered":
        return UserCircle;
      case "stock_updated":
        return RefreshCw;
      case "order_placed":
        return ShoppingCart;
      case "sales_milestone":
        return TrendingUp;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            <p className="text-xs text-gray-500">Latest updates from your business</p>
          </div>
        </div>
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {displayActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div
              key={activity.id || index}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 ${activity.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">
                  {activity.message}
                </p>
                <p className="text-gray-500 text-sm truncate">{activity.detail}</p>
              </div>

              {/* Time */}
              <span className="text-xs text-gray-400 flex-shrink-0">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium hover:border-emerald-300 hover:text-emerald-600 transition-colors">
        Load More Activities
      </button>
    </div>
  );
};

export default ActivityFeed;

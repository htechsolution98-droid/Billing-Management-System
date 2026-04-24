import {
  UserPlus,
  Users,
  PackagePlus,
  FileText,
  LogIn,
  Clock,
  CheckCircle2,
} from "lucide-react";

const ActivityFeed = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: "distributor_created",
      message: "New distributor created",
      detail: "Rohan Traders was added by SuperAdmin",
      time: "2 minutes ago",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      type: "nuser_added",
      message: "New Nuser added",
      detail: "Amit Sharma joined under Rohan Traders",
      time: "15 minutes ago",
      color: "bg-violet-500",
    },
    {
      id: 3,
      type: "product_added",
      message: "Product added",
      detail: "Rice Basmati - 50kg added to inventory",
      time: "1 hour ago",
      color: "bg-blue-500",
    },
    {
      id: 4,
      type: "bill_generated",
      message: "Bill generated",
      detail: "Invoice #INV-2026-001 for Rs 5,000",
      time: "2 hours ago",
      color: "bg-orange-500",
    },
    {
      id: 5,
      type: "user_login",
      message: "User login activity",
      detail: "Distributor logged in from Mumbai",
      time: "3 hours ago",
      color: "bg-cyan-500",
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type) => {
    switch (type) {
      case "distributor_created":
        return UserPlus;
      case "nuser_added":
        return Users;
      case "product_added":
        return PackagePlus;
      case "bill_generated":
        return FileText;
      case "user_login":
        return LogIn;
      default:
        return Clock;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Activities</h3>
            <p className="text-xs text-gray-500">Latest system updates</p>
          </div>
        </div>
        <button className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {displayActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div
              key={activity.id || index}
              className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${activity.color} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800">{activity.message}</p>
                  {index === 0 && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
                </div>
                <p className="truncate text-sm text-gray-500">{activity.detail}</p>
              </div>

              <span className="flex-shrink-0 text-xs text-gray-400">{activity.time}</span>
            </div>
          );
        })}
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 font-medium text-gray-500 transition-colors hover:border-emerald-300 hover:text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
        Mark all as read
      </button>
    </div>
  );
};

export default ActivityFeed;

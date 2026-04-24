import { Users, UserCircle, Package, FileText, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActionPanel = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: "add-distributor",
      label: "Add Distributor",
      description: "Register new distributor",
      path: "/add-distributor",
      icon: Users,
      bgColor: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: "add-nuser",
      label: "Add Nuser",
      description: "Create new user account",
      path: "/add-nuser",
      icon: UserCircle,
      bgColor: "bg-violet-50",
      hoverColor: "hover:bg-violet-100",
      textColor: "text-violet-600",
      borderColor: "border-violet-200",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      id: "add-product",
      label: "Add Product",
      description: "Add product to inventory",
      path: "#",
      icon: Package,
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      id: "view-reports",
      label: "View Reports",
      description: "Check analytics & reports",
      path: "#",
      icon: FileText,
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const handleActionClick = (action) => {
    if (action.path && !action.path.startsWith("#")) {
      navigate(action.path);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
          <p className="text-xs text-gray-500">Frequently used operations</p>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`
                w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 group
                ${action.bgColor} ${action.hoverColor} ${action.textColor} ${action.borderColor}
                hover:shadow-md
              `}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800">{action.label}</h4>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
              <ArrowRight className={`w-5 h-5 ${action.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </button>
          );
        })}
      </div>

      {/* System Status */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-gray-800">System Status</p>
            <p className="text-xs text-emerald-600">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;

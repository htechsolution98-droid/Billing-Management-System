import { Tag, Package, Users, FolderOpen, Plus } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      id: "add-brand",
      label: "Add Brand",
      icon: Tag,
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      id: "add-product",
      label: "Add Product",
      icon: Package,
      bgColor: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      id: "add-customer",
      label: "Add Customer",
      icon: Users,
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      id: "add-category",
      label: "Add Category",
      icon: FolderOpen,
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`
                flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                ${action.bgColor} ${action.hoverColor} ${action.textColor} ${action.borderColor}
                hover:shadow-md hover:-translate-y-0.5
              `}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

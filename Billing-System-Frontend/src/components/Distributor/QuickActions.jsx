import { useState } from "react";
import { Users, Package, ShoppingCart, FileText, Plus } from "lucide-react";
import DistAddNuserModal from "./DistAddNuserModal.jsx";

const QuickActions = ({ user }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const actions = [
    {
      id: "add-nuser",
      label: "Add Nuser",
      icon: Users,
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      onClick: () => setIsAddModalOpen(true),
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
      id: "view-customers",
      label: "View Customers",
      icon: ShoppingCart,
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      id: "generate-report",
      label: "Generate Report",
      icon: FileText,
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
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
                onClick={action.onClick}
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

      <DistAddNuserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        distributorId={user?._id}
      />
    </>
  );
};

export default QuickActions;

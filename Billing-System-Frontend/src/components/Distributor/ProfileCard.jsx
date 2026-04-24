import { User, Building2, Mail, Phone, BadgeCheck } from "lucide-react";

const ProfileCard = ({ user }) => {
  const profileItems = [
    { icon: User, label: "Distributor Name", value: user.name || "N/A" },
    { icon: Building2, label: "Firm Name", value: user.firmName || user.name || "N/A" },
    { icon: Mail, label: "Email", value: user.email || "N/A" },
    { icon: Phone, label: "Mobile Number", value: user.mobile || "N/A" },
    { icon: BadgeCheck, label: "Role", value: user.role || "Distributor" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Distributor Profile</h3>
      </div>

      <div className="space-y-4">
        {profileItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;

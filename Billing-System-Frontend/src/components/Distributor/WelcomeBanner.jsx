import { Store, TrendingUp, Calendar } from "lucide-react";

const WelcomeBanner = ({ userName, firmName }) => {
  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good Evening";
  }

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 lg:p-8 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-emerald-200" />
            <span className="text-emerald-100 text-sm">{greeting}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Welcome back, {userName || "Distributor"}! 👋
          </h2>
          <p className="text-emerald-100 text-sm lg:text-base">
            Here's what's happening with <span className="font-semibold">{firmName || "your business"}</span> today.
          </p>
        </div>

        {/* Right Stats */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
              <Store className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-emerald-200">Business</p>
            <p className="font-semibold">Active</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-emerald-200">Growth</p>
            <p className="font-semibold">+24%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

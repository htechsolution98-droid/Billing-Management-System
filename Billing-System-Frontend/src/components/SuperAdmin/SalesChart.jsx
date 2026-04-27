import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";

const SalesChart = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const salesData = [45, 52, 48, 65, 72, 68];
  const revenueData = [120, 145, 132, 168, 195, 185];

  const maxSales = Math.max(...salesData);
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Sales Overview</h3>
            <p className="text-xs text-gray-500">Monthly performance metrics</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-600">
          <TrendingUp className="h-3 w-3" />
          +18.5%
        </span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
          <div className="mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-xs text-gray-500">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">350</p>
          <p className="text-xs text-emerald-600">+12% from last month</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <div className="mb-1 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-gray-500">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">Rs 1,015K</p>
          <p className="text-xs text-blue-600">+8% from last month</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex h-48 items-end justify-between gap-2">
          {months.map((month, index) => {
            const salesHeight = (salesData[index] / maxSales) * 100;
            const revenueHeight = (revenueData[index] / maxRevenue) * 100;

            return (
              <div key={month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end gap-1">
                  <div
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-500 hover:opacity-80"
                    style={{ height: `${salesHeight}%` }}
                    title={`Sales: ${salesData[index]}`}
                  ></div>
                  <div
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-500 hover:opacity-80"
                    style={{ height: `${revenueHeight}%` }}
                    title={`Revenue: Rs ${revenueData[index]}K`}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-500">{month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-gray-600">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Revenue (Rs K)</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;

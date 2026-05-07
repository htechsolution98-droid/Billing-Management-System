import { useState, useRef, useEffect } from "react";
import { Palette, Check, Moon, Sun, Monitor } from "lucide-react";

const themes = [
  {
    id: "emerald",
    name: "Emerald",
    description: "Fresh & Professional",
    icon: Monitor,
    colors: {
      primary: "from-emerald-600 to-teal-600",
      primaryLight: "from-emerald-50 to-teal-50",
      primaryBorder: "border-emerald-100",
      primaryText: "text-emerald-600",
      primaryBg: "bg-emerald-600",
      hoverBg: "hover:bg-emerald-50",
      hoverText: "hover:text-emerald-600",
      activeBg: "from-emerald-500 to-teal-600",
      gradientBg: "from-slate-50 to-emerald-50",
      spinner: "border-emerald-600",
    },
  },
  {
    id: "blue",
    name: "Ocean",
    description: "Calm & Trustworthy",
    icon: Monitor,
    colors: {
      primary: "from-blue-600 to-cyan-600",
      primaryLight: "from-blue-50 to-cyan-50",
      primaryBorder: "border-blue-100",
      primaryText: "text-blue-600",
      primaryBg: "bg-blue-600",
      hoverBg: "hover:bg-blue-50",
      hoverText: "hover:text-blue-600",
      activeBg: "from-blue-500 to-cyan-600",
      gradientBg: "from-slate-50 to-blue-50",
      spinner: "border-blue-600",
    },
  },
  {
    id: "black",
    name: "Noir",
    description: "Sleek & Sophisticated",
    icon: Monitor,
    colors: {
      primary: "from-gray-900 to-black",
      primaryLight: "from-gray-100 to-gray-200",
      primaryBorder: "border-gray-200",
      primaryText: "text-gray-900",
      primaryBg: "bg-gray-900",
      hoverBg: "hover:bg-gray-100",
      hoverText: "hover:text-black",
      activeBg: "from-black to-gray-800",
      gradientBg: "from-slate-50 to-gray-100",
      spinner: "border-gray-900",
    },
  },
  {
    id: "orange",
    name: "Sunset",
    description: "Warm & Energetic",
    icon: Sun,
    colors: {
      primary: "from-orange-600 to-amber-600",
      primaryLight: "from-orange-50 to-amber-50",
      primaryBorder: "border-orange-100",
      primaryText: "text-orange-600",
      primaryBg: "bg-orange-600",
      hoverBg: "hover:bg-orange-50",
      hoverText: "hover:text-orange-600",
      activeBg: "from-orange-500 to-amber-600",
      gradientBg: "from-slate-50 to-orange-50",
      spinner: "border-orange-600",
    },
  },
  {
    id: "rose",
    name: "Rose",
    description: "Elegant & Passionate",
    icon: Monitor,
    colors: {
      primary: "from-rose-600 to-pink-600",
      primaryLight: "from-rose-50 to-pink-50",
      primaryBorder: "border-rose-100",
      primaryText: "text-rose-600",
      primaryBg: "bg-rose-600",
      hoverBg: "hover:bg-rose-50",
      hoverText: "hover:text-rose-600",
      activeBg: "from-rose-500 to-pink-600",
      gradientBg: "from-slate-50 to-rose-50",
      spinner: "border-rose-600",
    },
  },
  {
    id: "indigo",
    name: "Midnight",
    description: "Dark & Sophisticated",
    icon: Moon,
    colors: {
      primary: "from-indigo-600 to-blue-700",
      primaryLight: "from-indigo-50 to-blue-100",
      primaryBorder: "border-indigo-100",
      primaryText: "text-indigo-600",
      primaryBg: "bg-indigo-600",
      hoverBg: "hover:bg-indigo-50",
      hoverText: "hover:text-indigo-600",
      activeBg: "from-indigo-500 to-blue-700",
      gradientBg: "from-slate-50 to-indigo-50",
      spinner: "border-indigo-600",
    },
  },
];

const ThemeToggle = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentThemeData = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
        title="Change Theme"
      >
        <Palette className="w-5 h-5 text-gray-600" />
        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          Theme
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Choose Theme</h3>
            <p className="text-xs text-gray-500 mt-1">
              Select a color theme for your dashboard
            </p>
          </div>

          <div className="p-2 max-h-80 overflow-y-auto">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = currentTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gray-50 ring-2 ring-gray-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.colors.primary} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-800">{theme.name}</p>
                    <p className="text-xs text-gray-500">{theme.description}</p>
                  </div>

                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export { themes };
export default ThemeToggle;

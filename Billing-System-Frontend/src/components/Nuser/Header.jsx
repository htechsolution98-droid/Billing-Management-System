import { useState, useRef, useEffect } from "react";
import {
  Bell,
  LogOut,
  User,
  Settings,
  X,
  Pencil,
  Save,
  Loader2,
  Upload,
  Building2,
  Mail,
  Phone,
  CreditCard,
  Banknote,
  Shield,
  BadgeCheck,
  Calendar,
  FileText,
  ChevronDown,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const API_ORIGIN = "http://localhost:5000";

const Header = ({ user, onLogout, currentTime }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Profile modal states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Fetch full profile data when modal opens
  const fetchProfile = async () => {
    try {
      setProfileLoading(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      const res = await axiosInstance.get(
        `/nuserapi/get/${userData?._id || userData?.id}`,
      );
      const data = res.data?.data || res.data || {};
      setProfileData(data);
      setEditForm({
        fullName: data.fullName || "",
        firmName: data.firmName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        aadhaar: data.aadhaar || "",
        gst: data.gst || "",
        pan: data.pan || "",
        bankName: data.bankName || "",
        ifsc: data.ifsc || "",
        accountNumber: data.accountNumber || "",
        accountHolderName: data.accountHolderName || "",
      });
    } catch (err) {
      console.error("Fetch profile error:", err);
      // Fallback to localStorage + props
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const fallback = {
        ...userData,
        fullName: userData.fullName || userData.name || "",
        firmName: userData.firmName || userData.businessName || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        aadhaar: userData.aadhaar || "",
        gst: userData.gst || "",
        pan: userData.pan || "",
        bankName: userData.bankName || "",
        ifsc: userData.ifsc || "",
        accountNumber: userData.accountNumber || "",
        accountHolderName: userData.accountHolderName || "",
        usercode: userData.usercode || "",
        status: userData.status || "active",
        role: userData.role || "nuser",
        createdAt: userData.createdAt,
      };
      setProfileData(fallback);
      setEditForm({
        fullName: fallback.fullName,
        firmName: fallback.firmName,
        email: fallback.email,
        mobile: fallback.mobile,
        aadhaar: fallback.aadhaar,
        gst: fallback.gst,
        pan: fallback.pan,
        bankName: fallback.bankName,
        ifsc: fallback.ifsc,
        accountNumber: fallback.accountNumber,
        accountHolderName: fallback.accountHolderName,
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleOpenProfile = () => {
    setOpen(false);
    setIsEditMode(false);
    setLogoFile(null);
    fetchProfile();
    setIsProfileOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      const data = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          data.append(key, value);
        }
      });
      if (logoFile) {
        data.append("firmLogo", logoFile);
      }

      const userData = JSON.parse(localStorage.getItem("user"));
      await axiosInstance.put(
        `/nuserapi/update/${userData?._id || userData?.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      // Refresh profile data
      await fetchProfile();
      setIsEditMode(false);
      setLogoFile(null);
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Error updating profile");
    } finally {
      setSaveLoading(false);
    }
  };

  const getLogoUrl = (logoPath) => {
    if (!logoPath) return "";
    if (logoPath.startsWith("http")) return logoPath;
    if (logoPath.startsWith("/uploads/")) return `${API_ORIGIN}${logoPath}`;
    if (logoPath.startsWith("uploads/")) return `${API_ORIGIN}/${logoPath}`;
    return `${API_ORIGIN}/uploads/${logoPath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all bg-gray-50 focus:bg-white text-sm";
  const labelClass =
    "text-xs font-medium text-gray-500 uppercase tracking-wider";

  return (
    <>
      <header className="sticky top-0 z-30 h-24 border-b border-gray-100 bg-white/80 px-6 shadow-sm backdrop-blur-md">
        <div className="flex h-full items-center justify-between">
          {/* Left */}
          <div className="ml-12 lg:ml-0">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div
              className="relative flex items-center gap-3 pl-4 border-l border-gray-200"
              ref={dropdownRef}
            >
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-gray-800 text-sm">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-violet-600 capitalize">
                    {user.role || "User"}
                  </p>
                </div>

                <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center rounded-lg font-bold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-[9999] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {/* Menu Items */}
                  <div className="p-1.5">
                    {/* My Profile */}
                    <button
                      onClick={handleOpenProfile}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>My Profile</span>
                    </button>

                    {/* Settings */}
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span>Settings</span>
                    </button>

                    {/* Divider */}
                    <div className="my-1 border-t border-gray-100"></div>

                    {/* Logout */}
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileOpen && profileData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsProfileOpen(false);
              setIsEditMode(false);
              setLogoFile(null);
            }}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isEditMode ? "Edit Profile" : "My Profile"}
                    </h2>
                    <p className="text-violet-100 text-sm">
                      {profileData.usercode || profileData.email || ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditMode && (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsEditMode(false);
                      setLogoFile(null);
                    }}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {profileLoading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-600" />
                  <p className="text-gray-400 mt-2 text-sm">
                    Loading profile...
                  </p>
                </div>
              ) : isEditMode ? (
                /* Edit Mode Form */
                <form onSubmit={handleSave} className="p-6 space-y-6">
                  {/* Firm Logo */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                      {logoFile ? (
                        <img
                          src={URL.createObjectURL(logoFile)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : profileData.firmLogo ? (
                        <img
                          src={getLogoUrl(profileData.firmLogo)}
                          alt="Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-colors text-sm font-medium">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-violet-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={editForm.fullName}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Aadhaar</label>
                        <input
                          type="text"
                          name="aadhaar"
                          value={editForm.aadhaar}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Mobile</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={editForm.mobile}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-violet-600" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={labelClass}>Firm Name</label>
                        <input
                          type="text"
                          name="firmName"
                          value={editForm.firmName}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>GST Number</label>
                        <input
                          type="text"
                          name="gst"
                          value={editForm.gst}
                          onChange={handleEditChange}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>PAN Number</label>
                        <input
                          type="text"
                          name="pan"
                          value={editForm.pan}
                          onChange={handleEditChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-violet-600" />
                      Bank Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={labelClass}>Bank Name</label>
                        <input
                          type="text"
                          name="bankName"
                          value={editForm.bankName}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>IFSC Code</label>
                        <input
                          type="text"
                          name="ifsc"
                          value={editForm.ifsc}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Account Number</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={editForm.accountNumber}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Account Holder</label>
                        <input
                          type="text"
                          name="accountHolderName"
                          value={editForm.accountHolderName}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditMode(false);
                        setLogoFile(null);
                        fetchProfile();
                      }}
                      className="flex-1 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/30 transition-all disabled:opacity-50"
                    >
                      {saveLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      {saveLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <div className="p-6 space-y-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <div className="w-20 h-20 rounded-2xl bg-violet-100 flex items-center justify-center overflow-hidden border border-violet-200">
                      {profileData.firmLogo ? (
                        <img
                          src={getLogoUrl(profileData.firmLogo)}
                          alt="Firm Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-violet-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {profileData.fullName || profileData.name || "User"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {profileData.firmName || profileData.businessName || ""}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                          {profileData.status || "Active"}
                        </span>
                        <span className="px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium capitalize">
                          {profileData.role || "Nuser"}
                        </span>
                        {profileData.usercode && (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            {profileData.usercode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-violet-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard
                        icon={User}
                        label="Full Name"
                        value={profileData.fullName || profileData.name}
                      />
                      <InfoCard
                        icon={Shield}
                        label="Aadhaar"
                        value={profileData.aadhaar}
                      />
                      <InfoCard
                        icon={Mail}
                        label="Email"
                        value={profileData.email}
                      />
                      <InfoCard
                        icon={Phone}
                        label="Mobile"
                        value={profileData.mobile}
                      />
                    </div>
                  </div>

                  {/* Business Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-violet-600" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard
                        icon={Building2}
                        label="Firm Name"
                        value={profileData.firmName || profileData.businessName}
                      />
                      <InfoCard
                        icon={BadgeCheck}
                        label="GST Number"
                        value={profileData.gst}
                      />
                      <InfoCard
                        icon={FileText}
                        label="PAN Number"
                        value={profileData.pan}
                      />
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-violet-600" />
                      Bank Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard
                        icon={Building2}
                        label="Bank Name"
                        value={profileData.bankName}
                      />
                      <InfoCard
                        icon={CreditCard}
                        label="IFSC Code"
                        value={profileData.ifsc}
                      />
                      <InfoCard
                        icon={CreditCard}
                        label="Account Number"
                        value={profileData.accountNumber}
                      />
                      <InfoCard
                        icon={User}
                        label="Account Holder"
                        value={profileData.accountHolderName}
                      />
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      Member since {formatDate(profileData.createdAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Info Card Component for View Mode
const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
      <Icon className="w-4 h-4 text-violet-600" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-sm font-medium text-gray-800 truncate">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default Header;

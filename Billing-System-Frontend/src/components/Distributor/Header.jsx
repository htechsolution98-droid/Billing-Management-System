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
  MapPin,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const API_ORIGIN = "http://localhost:5000";

const Header = ({ user, onLogout, currentTime, isProfileOpen: externalIsProfileOpen, setIsProfileOpen: externalSetIsProfileOpen }) => {
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
  const [headerName, setHeaderName] = useState(user?.name || "User");

  // Fetch updated profile silently on mount to ensure header displays correct name
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await axiosInstance.get("/distributorapi/distributorprofile");
        const data = res.data?.data || res.data || {};
        if (data.name) {
          setHeaderName(data.name);
          const localUser = JSON.parse(localStorage.getItem("user")) || {};
          if (localUser.name !== data.name) {
            localUser.name = data.name;
            localStorage.setItem("user", JSON.stringify(localUser));
          }
        }
      } catch (err) {
        console.error("Silent profile fetch error", err);
      }
    };
    fetchHeaderData();
  }, []);

  // Effect to watch for external profile modal trigger
  useEffect(() => {
    if (externalIsProfileOpen) {
      handleOpenProfile();
    }
  }, [externalIsProfileOpen]);

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
      const res = await axiosInstance.get("/distributorapi/distributorprofile");
      const data = res.data?.data || res.data || {};
      setProfileData(data);
      setEditForm({
        name: data.name || "",
        firmName: data.firmName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        aadhaar: data.aadhaar || "",
        gst: data.gst || "",
        pan: data.pan || "",
        state: data.state || "",
        district: data.district || "",
        area: data.area || "",
        companypan: data.companypan || "",
      });
    } catch (err) {
      console.error("Fetch profile error:", err);
      // Fallback to localStorage + props
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setProfileData(userData);
      setEditForm({
        name: userData.name || "",
        firmName: userData.firmName || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        aadhaar: userData.aadhaar || "",
        gst: userData.gst || "",
        pan: userData.pan || "",
        state: userData.state || "",
        district: userData.district || "",
        area: userData.area || "",
        companypan: userData.companypan || "",
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
      await axiosInstance.put("/distributorapi/distributorprofile-update", editForm);

      // Update local state and localStorage immediately
      if (editForm.name) {
        setHeaderName(editForm.name);
        const localUser = JSON.parse(localStorage.getItem("user")) || {};
        localUser.name = editForm.name;
        localStorage.setItem("user", JSON.stringify(localUser));
      }

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
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-gray-50 focus:bg-white text-sm";
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
                   <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                  <p className="text-xs text-emerald-600 capitalize">
                    {user.role}
                  </p>
                </div>

                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center rounded-lg font-bold text-sm">
                  {headerName.charAt(0).toUpperCase()}
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
              if (externalSetIsProfileOpen) externalSetIsProfileOpen(false);
              setIsEditMode(false);
              setLogoFile(null);
            }}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isEditMode ? "Edit Profile" : "My Profile"}
                    </h2>
                    <p className="text-emerald-100 text-sm">
                      {profileData.distributorCode || profileData.email || ""}
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
                      if (externalSetIsProfileOpen) externalSetIsProfileOpen(false);
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
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
                  <p className="text-gray-400 mt-2 text-sm">
                    Loading profile...
                  </p>
                </div>
              ) : isEditMode ? (
                /* Edit Mode Form **********************************************************************/
                <form onSubmit={handleSave} className="p-6 space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
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
                      <Building2 className="w-4 h-4 text-emerald-600" />
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
                      <div className="space-y-1.5">
                        <label className={labelClass}>Company PAN</label>
                        <input
                          type="text"
                          name="companypan"
                          value={editForm.companypan}
                          onChange={handleEditChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Location Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className={labelClass}>State</label>
                        <input
                          type="text"
                          name="state"
                          value={editForm.state}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>District</label>
                        <input
                          type="text"
                          name="district"
                          value={editForm.district}
                          onChange={handleEditChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelClass}>Area</label>
                        <input
                          type="text"
                          name="area"
                          value={editForm.area}
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
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50"
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
                    <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center overflow-hidden border border-emerald-200">
                      {profileData.corpo_certino ? (
                        <img
                          src={getLogoUrl(profileData.corpo_certino)}
                          alt="Certificate"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-emerald-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {profileData.name || "User"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {profileData.firmName || ""}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                          {profileData.isActive ? "Active" : "Inactive"}
                        </span>
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                          {profileData.role || "Distributor"}
                        </span>
                        {profileData.distributorCode && (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            {profileData.distributorCode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard
                        icon={User}
                        label="Full Name"
                        value={profileData.name}
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
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard
                        icon={Building2}
                        label="Firm Name"
                        value={profileData.firmName}
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
                      <InfoCard
                        icon={FileText}
                        label="Company PAN"
                        value={profileData.companypan}
                      />
                    </div>
                  </div>

                  {/* Location Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Location Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InfoCard
                        icon={MapPin}
                        label="State"
                        value={profileData.state}
                      />
                      <InfoCard
                        icon={MapPin}
                        label="District"
                        value={profileData.district}
                      />
                      <InfoCard
                        icon={MapPin}
                        label="Area"
                        value={profileData.area}
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
      <Icon className="w-4 h-4 text-emerald-600" />
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

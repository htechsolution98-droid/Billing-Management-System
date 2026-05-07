import { useEffect, useState } from "react";
import { Users ,Eye} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import DistViewNuserModal from "./DistViewNuserModal";
import DistEditNuserModal from "./DistEditNuserModal";
import DistAddNuserModal from "./DistAddNuserModal";
import { Plus } from "lucide-react";

const DistNuserTable = ({ distributorId }) => {
  const [nusers, setNusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedNuser, setSelectedNuser] = useState(null);

  const fetchNusers = async () => {
    if (!distributorId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/nuserapi/get`);
      setNusers(res.data.data || []);
    } catch (error) {
      console.error("Fetch NUsers Error:", error);
      setNusers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNusers();
  }, [distributorId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this NUser?")) return;
    try {
      await axiosInstance.delete(`/nuserapi/nuser/delete/${id}`);
      fetchNusers();
    } catch (error) {
      console.error("Delete NUser Error:", error);
      alert("Failed to delete NUser");
    }
  };

  const handleUpdate = async (updatedNuser) => {
    try {
      await axiosInstance.put(
        `/nuserapi/nuser/update/${updatedNuser._id}`,
        updatedNuser,
      );
      fetchNusers();
      alert("NUser updated successfully");
    } catch (error) {
      console.error("Update NUser Error:", error);
      alert("Failed to update NUser");
    }
  };

  const handleView = (nuser) => {
    setSelectedNuser(nuser);
    setViewModalOpen(true);
  };

  const handleEdit = (nuser) => {
    setSelectedNuser(nuser);
    setEditModalOpen(true);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Manage NUsers</h3>
            <p className="text-sm text-gray-500">Your registered NUsers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            Total: {nusers.length}
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading NUsers...</div>
        ) : (
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-black w-16">ID</th>
                {["Name", "Firm", "Email", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-black"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {nusers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-sm text-gray-400"
                  >
                    No NUsers found.
                  </td>
                </tr>
              ) : (
                nusers.map((nuser, index) => {
                  const initials =
                    nuser.fullName
                      ?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "N";

                  return (
                    <tr
                      key={nuser._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-black">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          
                          <span className="text-sm font-medium text-gray-800 truncate">
                            {nuser.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 font-medium text-gray-800 py-4 text-sm text-gray-600 truncate">
                        {nuser.firmName || "-"}
                      </td>
                      <td className="px-6 font-medium text-gray-800 py-4 text-sm text-gray-600 truncate">
                        {nuser.email || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${nuser.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {nuser.status || "active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(nuser)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            
                          </button>
                          <button
                            onClick={() => handleEdit(nuser)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(nuser._id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      <DistViewNuserModal
        isOpen={viewModalOpen}
        nuser={selectedNuser}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedNuser(null);
        }}
      />

      <DistEditNuserModal
        isOpen={editModalOpen}
        nuser={selectedNuser}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedNuser(null);
        }}
        onUpdate={handleUpdate}
      />

      <DistAddNuserModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        distributorId={distributorId}
        onSuccess={fetchNusers}
      />
    </div>
  );
};

export default DistNuserTable;

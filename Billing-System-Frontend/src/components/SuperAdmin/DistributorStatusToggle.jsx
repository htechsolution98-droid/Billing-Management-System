import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { X } from 'lucide-react';

const DistributorStatusToggle = ({ distributorId, isActive, token }) => {
  const [currentStatus, setCurrentStatus] = useState(isActive);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const url = currentStatus
        ? `/distributorapi/distributor/diactivate/${distributorId}`
        : `/distributorapi/distributor/activate/${distributorId}`;
        
      await axiosInstance.patch(url, {});

      setCurrentStatus(!currentStatus);
      setShowModal(false);
      alert(`Distributor successfully ${currentStatus ? 'deactivated' : 'activated'}!`);
      
    } catch (error) {
      console.error("Error changing distributor status:", error);
      alert("Failed to change distributor status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
          currentStatus ? 'bg-emerald-500' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={currentStatus}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            currentStatus ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                {currentStatus ? 'Deactivate Distributor?' : 'Activate Distributor?'}
              </h3>
              <button
                onClick={toggleModal}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to {currentStatus ? 'deactivate' : 'activate'} this distributor? 
                {currentStatus 
                  ? ' They will no longer have access to the system.' 
                  : ' They will regain access to the system.'}
              </p>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={toggleModal}
                disabled={loading}
                className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                  currentStatus 
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                }`}
              >
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DistributorStatusToggle;

import React from "react";

const DashboardTiles = ({ Icon, count, label }) => {
  return (
    <div className="border border-gray-300 rounded-lg h-[120px] w-[200px] bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="p-2 rounded-md bg-blue-50">
          <Icon size={25} color="#3B82F6" />
        </div>
        <p className="text-3xl font-semibold">{count}</p>
      </div>
      <p className="text-end text-sm">{label} </p>
    </div>
  );
};

export default DashboardTiles;

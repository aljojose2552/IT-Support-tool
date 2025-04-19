import React, { useEffect, useState } from "react";
import { userRequset } from "../../../apis/requestMethods";
import { LuTicketCheck, LuTickets } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import DashboardTiles from "../../../Components/DashboardTiles/DashboardTiles";
import DataTable from "../../../Components/DataTable/DataTable";
import { updateResValues } from "../../../utils/functions/updateTicketApiValues";
import Loader from "../../../Components/Loader/Loader";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketList, setTicketList] = useState([]);

  const [dashboardStats, setDashboardStats] = useState({
    totalTickets: 0,
    totalUsers: 0,
    totalEngineers: 0,
    resolvedTickets: 0,
  });

  const columns = [
    { label: "ID", field: "id", width: "5%" },
    { label: "Title", field: "title", width: "10%" },
    { label: "Description", field: "description", width: "18%" },
    { label: "Department", field: "department", width: "10%" },
    { label: "Created By", field: "userName", width: "10%" },
    { label: "Assign To", field: "engName", width: "10%" },
    { label: "Status", field: "status", width: "10%" },
  ];

  const fetchTicketList = async () => {
    try {
      const res = await userRequset.get("/admin/get-latest-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdashbaordStats = async () => {
    try {
      const res = await userRequset.get("/admin/get-admin-stats");
      if (res.data && res.data.success) {
        setDashboardStats(res.data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchTicketList(), fetchdashbaordStats()]);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLists();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex items-center gap-10 mb-5">
        <DashboardTiles
          Icon={LuTickets}
          count={dashboardStats.totalTickets}
          label={"Total Tickets"}
        />
        <DashboardTiles
          Icon={FaUsers}
          count={dashboardStats.totalUsers}
          label={"Total Users"}
        />
        <DashboardTiles
          Icon={FaUserGear}
          count={dashboardStats.totalEngineers}
          label={"Total Engineers"}
        />
        <DashboardTiles
          Icon={LuTicketCheck}
          count={dashboardStats.resolvedTickets}
          label={"Completed Tickets"}
        />
      </div>
      <h4 className="text-2xl">Latest Tickets</h4>
      <DataTable columns={columns} data={ticketList} admin />
    </>
  );
};

export default AdminDashboard;

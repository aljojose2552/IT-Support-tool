import React, { useEffect, useState } from "react";
import { userRequset } from "../../../apis/requestMethods";
import Loader from "../../../Components/Loader/Loader";
import DashboardTiles from "../../../Components/DashboardTiles/DashboardTiles";
import {
  LuTicketCheck,
  LuTicketMinus,
  LuTicket,
  LuTickets,
} from "react-icons/lu";
import { updateResValues } from "../../../utils/functions/updateTicketApiValues";
import DataTable from "../../../Components/DataTable/DataTable";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [LatestTickets, setLatestTickets] = useState([]);
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    resolved: 0,
  });

  const columns = [
    { label: "ID", field: "id", width: "5%" },
    { label: "Title", field: "title", width: "10%" },
    { label: "Description", field: "description", width: "18%" },
    { label: "Department", field: "department", width: "10%" },
    { label: "Assign To", field: "engName", width: "10%" },
    { label: "Status", field: "status", width: "10%" },
  ];

  const fetchLatestCreatedTickets = async () => {
    try {
      const res = await userRequset.get("/ticket/get-latest-created-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setLatestTickets(tktData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEngineerTicketStats = async () => {
    try {
      const res = await userRequset.get("/ticket/get-created-tickets-stats");
      if (res.data && res.data.success) {
        setTicketStats(res.data.stats);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchEngineerTicketStats(),
          fetchLatestCreatedTickets(),
        ]);
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
          count={ticketStats.total}
          label={"Total Created Tickets"}
        />
        <DashboardTiles
          Icon={LuTicket}
          count={ticketStats.pending}
          label={"Pending Tickets"}
        />
        <DashboardTiles
          Icon={LuTicketMinus}
          count={ticketStats.progress}
          label={"Tickets In Progress"}
        />
        <DashboardTiles
          Icon={LuTicketCheck}
          count={ticketStats.resolved}
          label={"Completed Tickets"}
        />
      </div>
      <h4 className="text-2xl">Latest Tickets</h4>
      <DataTable columns={columns} data={LatestTickets} admin />
    </>
  );
};

export default UserDashboard;

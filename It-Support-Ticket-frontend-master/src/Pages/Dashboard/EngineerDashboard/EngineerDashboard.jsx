import React, { useEffect, useState } from "react";
import {
  LuTicketCheck,
  LuTicketMinus,
  LuTicket,
  LuTickets,
} from "react-icons/lu";
import DashboardTiles from "../../../Components/DashboardTiles/DashboardTiles";
import { userRequset } from "../../../apis/requestMethods";
import DataTable from "../../../Components/DataTable/DataTable";
import { updateResValues } from "../../../utils/functions/updateTicketApiValues";
import Loader from "../../../Components/Loader/Loader";

const EngineerDashboard = () => {
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
    { label: "Created By", field: "userName", width: "10%" },
    { label: "Status", field: "status", width: "10%" },
  ];

  const fetchLatestAssignedTickets = async () => {
    try {
      const res = await userRequset.get("/ticket/get-latest-assigned-tickets");
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
      const res = await userRequset.get("/ticket/get-assinged-tickets-stats");
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
          fetchLatestAssignedTickets(),
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
          label={"Total Assigned Tickets"}
        />
        <DashboardTiles
          Icon={LuTicket}
          count={ticketStats.pending}
          label={"Assigned Tickets"}
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
      <DataTable columns={columns} data={LatestTickets} />
    </>
  );
};

export default EngineerDashboard;

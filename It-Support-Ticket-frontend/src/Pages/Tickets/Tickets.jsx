import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import AddTicketModal from "./AddTicketModal/AddTicketModal";
import { userRequset } from "../../apis/requestMethods";
import { useSelector } from "react-redux";
import { userState } from "../../redux/auth/authSlice";
import AssignTicketModal from "./AssignTicketModal/AssignTicketModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import Loader from "../../Components/Loader/Loader";
import HeadingWithButton from "../../Components/HeadingWithButton/HeadingWithButton";
import { updateResValues } from "../../utils/functions/updateTicketApiValues";
import { addTicketForValidation } from "../../utils/functions/formValidations";
import { useSnackbar } from "../../context/SnackbarContext";

const emptyData = {
  title: "",
  description: "",
  department: "",
};

const columns = [
  { label: "ID", field: "id", width: "5%" },
  { label: "Title", field: "title", width: "10%" },
  { label: "Description", field: "description", width: "18%" },
  { label: "Department", field: "department", width: "10%" },
  { label: "Created By", field: "userName", width: "10%" },
  { label: "Assign To", field: "engName", width: "10%" },
  { label: "Status", field: "status", width: "10%" },
  { label: "Actions", field: "actions", width: "12%" },
];

const Tickets = () => {
  const { user } = useSelector(userState);
  const { showSnackbar } = useSnackbar();
  const { role } = user;
  const [isLoading, setIsLoading] = useState(true);
  const [addTicket, setAddTicket] = useState(false);
  const [assignTicketModal, setAssignTicketModal] = useState(false);
  const [TicketList, setTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [engineerList, setEngineerList] = useState([]);
  const [formError, setFormError] = useState({});
  const [ticketData, setTicketData] = useState({
    ...emptyData,
  });
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const showAddButton = user.role === "admin" || user.role === "user";

  const fetchAssignedTickets = async () => {
    setIsLoading(true);
    try {
      const res = await userRequset.get("/ticket/get-assinged-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCreatedTickets = async () => {
    setIsLoading(true);
    try {
      const res = await userRequset.get("/ticket/get-createdby-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTicketList = async () => {
    setIsLoading(true);
    try {
      const res = await userRequset.get("/ticket/get-all-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEngineersBasedDepartment = async (department) => {
    try {
      const res = await userRequset.get(
        `/engineer/get-all-engineers?department=${department}`
      );
      if (res.data && res.data.success) {
        setEngineerList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTicketData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAddTicket(false);
    setIsView(false);
    setIsEdit(false);
    setTicketData({ ...emptyData });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const validationError = addTicketForValidation(ticketData);
    if (Object.keys(validationError).length > 0) {
      setFormError(validationError);
      return;
    }
    try {
      const res = isEdit
        ? await userRequset.put(
            `ticket/update-ticket/${ticketData._id}`,
            ticketData
          )
        : await userRequset.post("/ticket/create-ticket", ticketData);
      // console.log(res);
      if (res.data && res.data.success) {
        setTicketData({ ...emptyData });
        if (role === "user") {
          fetchCreatedTickets();
        } else {
          fetchTicketList();
        }
        showSnackbar(res.data.message);
        handleClose();
      }
    } catch (err) {
      console.log(err);
      showSnackbar(err?.response?.data?.message, "error");
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      const res = await userRequset.patch(
        `/ticket/status-update-ticket/${ticketData._id}`,
        { status: status }
      );
      if (res.data && res.data.success) {
        fetchAssignedTickets();
        handleClose();
        showSnackbar(res.data.message);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, "error");
    }
  };

  const handleAssignTicket = (row) => {
    setSelectedTicket(row);
    setAssignTicketModal(true);
    fetchEngineersBasedDepartment(row.department);
  };

  const handleView = (row) => {
    console.log("View clicked:", row);
    setTicketData(row);
    setIsView(true);
    setAddTicket(true);
  };

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    setIsEdit(true);
    setTicketData(row);
    setAddTicket(true);
  };

  const handleDelete = (row) => {
    setDeleteId(row._id);
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteId("");
    setDeleteModal(false);
  };

  const deleteTicket = async () => {
    try {
      const res = await userRequset.delete(`/ticket/delete-ticket/${deleteId}`);
      if (res.data && res.data.success) {
        fetchTicketList();
        handleCloseDeleteModal();
        showSnackbar(res.data.message);
      }
    } catch (err) {
      console.log(err);
      // alert(err?.response?.data?.message || "something went wrong");
      showSnackbar(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    if (role === "engineer") {
      fetchAssignedTickets();
    } else if (role === "user") {
      fetchCreatedTickets();
    } else {
      fetchTicketList();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <HeadingWithButton
        buttonLabel={"Add Ticket"}
        handleClickButton={() => setAddTicket(true)}
        heading={"Ticket List"}
        notShowButton={!showAddButton}
      />
      <DataTable
        columns={columns}
        data={TicketList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        handleAssignTicket={handleAssignTicket}
      />
      <AddTicketModal
        open={addTicket}
        ticketData={ticketData}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isView={isView}
        handleStatusUpdate={handleStatusUpdate}
        formError={formError}
      />

      {role === "admin" && (
        <AssignTicketModal
          setOpen={setAssignTicketModal}
          open={assignTicketModal}
          engineerList={engineerList}
          selectedTicket={selectedTicket}
          fetchList={fetchTicketList}
        />
      )}

      <DeleteModal
        handleSubmit={deleteTicket}
        handleClose={handleCloseDeleteModal}
        label={"Ticket"}
        open={deleteModal}
      />
    </div>
  );
};

export default Tickets;

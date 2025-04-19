import React, { useEffect, useState } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import { Button } from "@mui/material";
import AddEngineerModal from "./AddEngineerModal/AddEngineerModal";
import { userRequset } from "../../apis/requestMethods";
import Loader from "../../Components/Loader/Loader";
import { userState } from "../../redux/auth/authSlice";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import HeadingWithButton from "../../Components/HeadingWithButton/HeadingWithButton";
import { validateEngineerForm } from "../../utils/functions/formValidations";
import { useSnackbar } from "../../context/SnackbarContext";
const emptyData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  department: "",
  designation: "",
};

const Engineers = () => {
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [addEngineer, setAddEngineer] = useState(false);
  const [engineerList, setEngineerList] = useState([]);
  const [engineerData, setEngineerData] = useState({
    ...emptyData,
  });
  const [formError, setFormError] = useState({});
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    { label: "ID", field: "id", width: "5%" },
    { label: "Name", field: "name", width: "20%" },
    { label: "Email", field: "email", width: "15%" },
    { label: "Department", field: "department", width: "15%" },
    { label: "Phone", field: "phone", width: "15%" },
    { label: "Designation", field: "designation", width: "15%" },
    { label: "Actions", field: "actions", width: "15%" },
  ];

  const fetchEngineerList = async () => {
    setIsLoading(true);
    try {
      const res = await userRequset.get("/engineer/get-all-engineers");
      if (res.data && res.data.success) {
        const engData = await res.data.data.map((item, ind) => {
          const newItem = {
            ...item,
            id: ind + 1,
            name: `${item.firstname} ${item.lastname}`,
          };
          return newItem;
        });
        setEngineerList(engData);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(engineerList);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEngineerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAddEngineer(false);
    setIsView(false);
    setIsEdit(false);
    setEngineerData({ ...emptyData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEngineerForm(engineerData);

    if (Object.keys(validationError).length > 0) {
      setFormError(validationError);
      return;
    }
    try {
      const res = isEdit
        ? await userRequset.put(
            `engineer/update-engineer/${engineerData._id}`,
            engineerData
          )
        : await userRequset.post("/engineer/create-engineer", engineerData);
      // console.log(res);
      if (res.data && res.data.success) {
        setEngineerData({ ...emptyData });
        fetchEngineerList();
        handleClose();
        showSnackbar(res.data.message);
      }
    } catch (err) {
      console.log(err);
      showSnackbar(err?.response?.data?.message, "error");
    }
  };

  const handleView = (row) => {
    console.log("View clicked:", row);
    setEngineerData(row);
    setIsView(true);
    setAddEngineer(true);
  };

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    setIsEdit(true);
    setEngineerData(row);
    setAddEngineer(true);
  };

  const handleDelete = (row) => {
    setDeleteId(row._id);
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteId("");
    setDeleteModal(false);
  };

  const deleteEngineer = async () => {
    try {
      const res = await userRequset.delete(
        `/engineer/delete-engineer/${deleteId}`
      );
      if (res.data && res.data.success) {
        fetchEngineerList();
        handleCloseDeleteModal();
        showSnackbar(res.data.message);
      }
    } catch (err) {
      console.log(err);
      showSnackbar(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    fetchEngineerList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <HeadingWithButton
        buttonLabel={"Add Engineer"}
        handleClickButton={() => setAddEngineer(true)}
        heading={"Engineer List"}
      />
      <DataTable
        columns={columns}
        data={engineerList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      <AddEngineerModal
        open={addEngineer}
        engineerData={engineerData}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isView={isView}
        formError={formError}
      />

      <DeleteModal
        handleSubmit={deleteEngineer}
        handleClose={handleCloseDeleteModal}
        label={"Engineer"}
        open={deleteModal}
      />
    </div>
  );
};

export default Engineers;

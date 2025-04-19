import { useSelector } from "react-redux";
import { userState } from "../../redux/auth/authSlice";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import EngineerDashboard from "./EngineerDashboard/EngineerDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";

const Dashboard = () => {
  const { user } = useSelector(userState);

  if (user.role === "admin") {
    return <AdminDashboard />;
  }
  if (user.role === "engineer") {
    return <EngineerDashboard />;
  }
  return <UserDashboard />;
};

export default Dashboard;

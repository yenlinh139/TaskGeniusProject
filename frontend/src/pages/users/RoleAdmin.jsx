import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ListUser from "./ListUser";
import { useState } from "react";

function RoleAdmin() {
  const { isLoading } = useSelector((state) => state.appStore);
  const [userEdit, setUserEdit] = useState({
    name: "",
    email: "",
    password: "",
    avarta: null,
  });

  return (
    <>
      <div className="row shadow-sm containerListUser">
        <ListUser setUserEdit={setUserEdit} />
      </div>

      <EditUserModal userEdit={userEdit} />
      <CreateUserModal />
    </>
  );
}

export default RoleAdmin;

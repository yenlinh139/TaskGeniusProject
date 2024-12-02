import { useSelector } from "react-redux";
import RoleAdmin from "./RoleAdmin";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListUser } from "../../store/actions/userAction";

function WrapperUsers() {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUser())
  },[])

  return (
    <div className="container">
      {Number(userInfo?.role) === 1 ? <RoleAdmin /> : null}
      {isLoading && <Loading />}
    </div>
  );
}

export default WrapperUsers;

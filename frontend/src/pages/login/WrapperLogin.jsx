import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_SIGNUP } from "../../store/constants";
import Login from "./Login";
import SignUp from "./SignUp";
import "./style.scss";

function WrapperLogin() {
  // const []
  const { isShowSignUp } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  const handleShowSignUp = () => {
    dispatch({
      type: SET_SHOW_SIGNUP,
      payload: !isShowSignUp,
    });
  };

  return (
    <div className="containerLogin">
      <div className="mainLogin">
        <input
          className="inputLogin"
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isShowSignUp}
          onChange={handleShowSignUp}
        />
        <Login />
        <SignUp />
      </div>
    </div>
  );
}

export default WrapperLogin;

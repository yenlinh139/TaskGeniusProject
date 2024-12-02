import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../../store/actions/authAction";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.name === "email") {
        password.current.focus(); // Chuyển focus sang ô password khi nhấn Enter ở ô email
      } else {
        handleLogin(); // Gọi hàm login khi nhấn Enter ở ô password
      }
    }
  };

  const handleLogin = () => {
    dispatch(
      login(
        {
          email: email.current.value,
          password: password.current.value,
        },
        () => navigate("/")
      )
    );
  };

  const handleLoginWithGoogle = () => {
    dispatch(loginWithGoogle(() => navigate("/")));
  };

  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="labelLogin" htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input
          className="inputLogin"
          type="email"
          name="email"
          placeholder="Email"
          ref={email}
          onKeyDown={handleKeyPress}
        />
        <input
          className="inputLogin"
          type="password"
          name="pswd"
          placeholder="Password"
          ref={password}
          onKeyDown={handleKeyPress}
        />
        <button
          type="button"
          className="btnLogin btnLoginSubmit"
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <div className="auth-divider text-center text-white fs-6 my-4">Or</div>
        <button
          type="button"
          className="btnLogin btnLightHover"
          onClick={() => handleLoginWithGoogle()}
        >
          <i className="fa-brands fa-google"></i> Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;

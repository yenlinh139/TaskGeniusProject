import { useRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authAction";

// eslint-disable-next-line react/prop-types
function SignUp() {
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);

  const handleKeyPress = (event, nextFieldRef) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành vi submit mặc định
      if (nextFieldRef) {
        nextFieldRef.current.focus(); // Di chuyển tiêu điểm đến trường tiếp theo
      } else {
        handleSignUp(); // Gọi hàm đăng ký nếu đã đến ô cuối
      }
    }
  };

  const handleSignUp = async () => {
    dispatch(
      signUp({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      })
    );
  };

  return (
    <div className="signUp">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="labelLogin" htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input
          className="inputLogin"
          type="text"
          name="name"
          placeholder="Name"
          ref={name}
          onKeyDown={(e) => handleKeyPress(e, email)}
        />
        <input
          className="inputLogin"
          type="email"
          name="email"
          placeholder="Email"
          ref={email}
          onKeyDown={(e) => handleKeyPress(e, password)}
        />
        <input
          className="inputLogin"
          type="password"
          name="pswd"
          placeholder="Password"
          ref={password}
          onKeyDown={(e) => handleKeyPress(e, confirmPassword)}
        />
        <input
          className="inputLogin"
          type="password"
          name="pswd"
          placeholder="Confirm Password"
          ref={confirmPassword}
          onKeyDown={(e) => handleKeyPress(e, null)}
        />
        <button
          type="button"
          className="btnLogin btnLoginSubmit"
          onClick={() => handleSignUp()}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;

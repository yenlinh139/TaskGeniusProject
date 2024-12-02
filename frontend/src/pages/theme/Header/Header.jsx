import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageAVT from "../../../assets/avatarUser.png";
import { ROUTES } from "../../../common/constants";
import { logout } from "../../../store/actions/authAction";
import "./style.scss";

function Header({ openSidebar }) {
  const { userInfo } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    // Kiểm tra nếu click bên ngoài dropdown thì đóng nó
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện click toàn trang khi dropdown mở
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Gỡ bỏ sự kiện khi component bị hủy
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login);
    setIsOpen(false);
  };

  return (
    <div className="shadow-lg bg-white container-fruit">
      <div id="header">
        <div className="row w-100">
          <div className="col-8 d-flex ">
            <div className="header-left">
              <button className="sidebar-button" onClick={openSidebar}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <h2 className="align-items-center">Welcome to Our Page</h2>
            </div>
          </div>
          <div className="col-4 text-end">
            <div className="dropdownHeader" ref={dropdownRef}>
              <button
                type="button"
                className="dropdownHeader-toggle"
                onClick={toggleDropdown}
              >
                <span className="smallScreenSpan">{userInfo.name}</span>&nbsp;
                <img
                  src={userInfo?.avarta || imageAVT}
                  alt="User Avatar"
                  className="avatar"
                />
              </button>
              {isOpen && (
                <ul className="dropdownHeader-menu">
                  <li>
                    <a href={ROUTES.setting}>Setting</a>
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

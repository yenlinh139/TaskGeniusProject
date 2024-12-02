import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { updateUserByUser } from "../../store/actions/userAction";
import { REQUIRE_PASSWORD } from "../../common/messageError";
import avatarDefault from "../../assets/avatarUser.png";
import { ToastCommon } from "../../components/ToastCommon";
import { TOAST } from "../../common/constants";
import ModalConfirm from "../../components/ModalConfirm";
import { UPDATE } from "../../common/messageConfirm";

function SettingUser() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  const [formState, setFormState] = useState({
    ...userInfo,
    password: "",
    confirmPassword: "",
  });
  const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [updatedFormState, setUpdatedFormState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = (checked) => {
    setToggleUpdatePassword(checked);
  };

  const handleSubmit = () => {
    const errors = {};
    if (toggleUpdatePassword && !formState.password) {
      errors.password = REQUIRE_PASSWORD;
    } else if (
      toggleUpdatePassword &&
      formState.password !== formState.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const { confirmPassword, ...updatedFormState } = formState;
    setUpdatedFormState(updatedFormState);
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    dispatch(updateUserByUser(updatedFormState));
    setShowConfirmModal(false);
  };

  const getAvatarUrl = () => {
    if (formState.avarta instanceof File) {
      return URL.createObjectURL(formState.avarta);
    } else {
      if (!userInfo.avarta || userInfo.avarta.length === 0) {
        return avatarDefault;
      } else {
        return userInfo.avarta;
      }
    }
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpg", "image/png", "image/jpeg"].includes(file.type)) {
      setFormState((prev) => ({
        ...prev,
        avarta: file,
      }));
    } else {
      ToastCommon(TOAST.ERROR, "File type invalid");
    }
  };

  const handleAttachFile = () => {
    document.getElementById("input-upload").click();
  };

  const handleRemoveFile = () => {
    if (!userInfo.avarta || userInfo.avarta.length === 0) {
      setFormState((prev) => ({
        ...prev,
        avarta: avatarDefault,
      }));
    }
    setFormState((prev) => ({
      ...prev,
      avarta: userInfo.avarta,
    }));
  };

  return (
    <div className="infoUser">
      <div className="containerInfo">
        <h2>Change avatar</h2>
        <div className="row mt-4">
          <div className="col-12 col-md-3 mb-2 text-center">
            <img
              id="avatar-edit"
              src={getAvatarUrl()}
              className="rounded-circle avatar"
              alt="example placeholder"
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleChangeAvatar}
              id="input-upload"
              className="d-none"
            />
          </div>
          <div className="col-12 col-md-9 d-flex align-items-center containerButtonImg">
            <button
              className="btn btn-outline-primary buttonImg"
              onClick={handleAttachFile}
            >
              <i className="fa-solid fa-paperclip"></i> &nbsp; Change picture
            </button>
            <button
              className="btn btn-outline-danger ms-3 buttonImg"
              onClick={handleRemoveFile}
            >
              <i className="fa-solid fa-xmark"></i> &nbsp; Delete picture
            </button>
          </div>
        </div>

        <h2 className="mt-5">General</h2>
        <div className="row mt-4">
          <div className="col-3">Name</div>
          <div className="col-9">
            <input
              type="text"
              className="form-control widthInput py-1"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3">Email</div>
          <div className="col-9">
            <input
              type="text"
              className="form-control widthInput py-1"
              name="email"
              value={formState.email}
              disabled
            />
          </div>
        </div>

        <h2 className="mt-5">
          <div className="form-check form-switch">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Update New Password
            </label>
            <input
              className="form-check-input cursor-pointer"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={toggleUpdatePassword}
              onChange={(e) => handleTogglePassword(e.target.checked)}
            />
          </div>
        </h2>

        {toggleUpdatePassword && (
          <div className="mt-4">
            <div className="row">
              <div className="col-3 text-end">Password</div>
              <div className="col-9">
                <input
                  type="password"
                  className={`form-control widthInput py-1 ${
                    errorMessages.password ? "border-danger" : ""
                  }`}
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                {errorMessages.password && (
                  <p className="text-danger">{errorMessages.password}</p>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3 text-end">Confirm Password</div>
              <div className="col-9">
                <input
                  type="password"
                  className="form-control widthInput py-1"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                />
                {errorMessages.confirmPassword && (
                  <p className="text-danger">{errorMessages.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-5">
          <button className="btn btn-primary px-5" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <ModalConfirm
          message={UPDATE.user}
          onConfirm={confirmAction}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

export default SettingUser;

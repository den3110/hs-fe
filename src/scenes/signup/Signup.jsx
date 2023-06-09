
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import signupapi from "../../api/signup";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Đăng ký
              </p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  label="Tên tài khoản"
                  id="form1"
                  type="text"
                  className="w-100"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  id="form2"
                  type="email"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Họ và tên"
                  id="form2"
                  type="text"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Mật khẩu"
                  id="form3"
                  type="password"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size="lg" />
                <MDBInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Repeat your password"
                  id="form4"
                  type="password"
                />
              </div>

              <div className="mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="I agree to the Term of use and Privacy Policy"
                />
              </div>

              <MDBBtn
                onClick={async () => {
                  try {
                    const result = await signupapi(userName, email, fullName, password);
                    if (result?.status === "success") {
                      swal("Thông báo", "Đăng ký thành công", "success").then(
                        () =>
                          navigate("/login")
                      );
                    } else {
                      swal(
                        "Thông báo",
                        "Đăng ký thất bại, Email đã tồn tại, vui lòng thử với email khác",
                        "error"
                      );
                    }
                  } catch (e) {
                    console.log(e)
                    swal("Thông báo", "Lỗi không xác định", "error");
                  }
                }}
                className="mb-4"
                size="lg"
              >
                Đăng ký
              </MDBBtn>
              <div>Bạn đã có tài khoản ?</div>
              <Button type={"primary"} onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;

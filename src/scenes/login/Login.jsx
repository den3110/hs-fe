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
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "antd";
import loginapi from "../../api/login";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
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
                Đăng nhập
              </p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  label="Tên tài khoản"
                  id="form2"
                  type="text"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="form3"
                  type="password"
                />
              </div>

              <MDBBtn
                onClick={async () => {
                  try {
                    const result = await loginapi(account, password);
                    if (result?.status === "success") {
                      swal("Thông báo", "Đăng nhập thành công", "success")
                        .then(() =>
                          Cookies.set("accessToken", result?.data?.token)
                        )
                        .then(() => Cookies.set("uid", result?.data?.userId))
                        .then(() => window.location.href= window.location.origin+ "/team")

                    } else {
                      swal(
                        "Thông báo",
                        "Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác",
                        "error"
                      );
                    }
                  } catch (error) {
                    swal(
                      "Thông báo",
                      "Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác",
                      "error"
                    );
                  }
                }}
                className="mb-4"
                size="lg"
              >
                Đăng nhập
              </MDBBtn>
              <div>Bạn chưa có tài khoản ?</div>
              <Button type={"primary"} onClick={() => navigate("/signup")}>
                Đăng ký
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

export default Login;

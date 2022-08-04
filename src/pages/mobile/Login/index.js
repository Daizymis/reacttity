import { Form, Input, Button, Checkbox, message } from "antd";
import "@/assets/css/login.scss";
import utils from "../../../utils";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router";
function Login(props) {
  console.log(props);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const onFinish = (values) => {
    if (values.password && values.username) {
      utils.http.post("/user/login", values).then((res) => {
        localStorage.setItem("setToken", res.token || "");
        if (res.code === 200) {
          message.success("登录成功");
          props.login(values);
          // Cookies.setCookie("login", "LOGIN_OK");
          // if (values.remember) {
          //   Cookies.setCookie("isChecked", this.isChecked);
          //   Cookies.setCookie("userName", this.postData.username);
          //   Cookies.setCookie("passWord", this.postData.password);
          // }

          // const shortId = Cookies.getCookie("shortId");
          // const shortUrl = Cookies.getCookie("shortUrl");
          if (res.shortUrl != null) {
            navigate("/e/" + shortId + "/" + shortUrl);
          } else {
            navigate("/menu");
          }

          navigate("/menu");
        } else {
          message.error(res.data.msg);
        }
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [user, setUser] = useState();
  const [count, setCount] = useState();
  const test = () => {
    setUser("hello world");
    setUser("ooooo");
    setCount(33);
    setCount(22);
  };
  return (
    <div className="login-nav">
      <span>
        {count}
        {user}
      </span>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-nav"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" htmlType="submit" onClick={test}>
            test
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    login(value) {
      dispatch({
        type: "setUserInfo",
        value,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    state,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

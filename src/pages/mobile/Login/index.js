import { Form, Input, Button, Checkbox, message } from 'antd';
import '@/assets/css/login.scss';
import utils from '../../../utils';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';
function Login () {
    const dispatch = useDispatch()
    useEffect(()=>{
        
    },[]);
    const onFinish = (values) => {
      if(values.password && values.username) {

        utils.http.post('/user/login',values).then(res => {
          localStorage.setItem('setToken', res.token || '');
          if(res.code === 200) {
            message.success('登录成功')
            dispatch({type: 'SET_USER_INFO', data: values});
            Cookies.setCookie('login', 'LOGIN_OK');
            if (values.remember) {
              Cookies.setCookie('isChecked', this.isChecked);
              Cookies.setCookie('userName', this.postData.username);
              Cookies.setCookie('passWord', this.postData.password);
            }

            const shortId = Cookies.getCookie('shortId');
            const shortUrl = Cookies.getCookie('shortUrl');
            let history = createBrowserHistory();
            if (shortUrl != null) {
              history.push('/e/' + shortId + '/' + shortUrl);
            } else {
              history.push("/menu");
            }
            
          }else {
            message.error(res.data.msg);
          }
        })
      }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [user, setUser] = useState();
    return (
        <div className='login-nav'>
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
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    )
}
export default Login;
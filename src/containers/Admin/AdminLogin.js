import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import { useLocation } from 'react-router-dom'
import { API_URL } from '../../constants/appConstants'
import axios from 'axios'
import Footer from '../../components/Footer'
import './AdminLogin.scss'

const FormItem = Form.Item

const openNotification = (placement) => {
  notification.error({
    description: 'Incorrect username or password.',
    placement,
  })
}

const AdminLogin = (props) => {
  const { history } = props
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const [findPassword, setFindPassword] = useState(false)

  useEffect(() => {
    if (location.state && location.state.findPassword) {
      console.log(location)
      setFindPassword(true)
    }
  }, [location])

  const onFinish = async (values) => {
    setLoading(true)
    const { email, password } = values
    const body = {
      email,
      password,
    }

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    try {
      const { data } = await axios.post(`${API_URL}/admin/logins`, body, config)
      console.log(data)
      localStorage.clear()
      localStorage.setItem('token', data.data.result.token)
      setLoading(false)
      history.push('/admin-member')
    } catch (error) {
      console.log(error.response)
      openNotification('topRight')
      setLoading(false)
    }
  }

  const handleOk = () => {
    setFindPassword(false)
  }

  const onRegister = () => {
    history.push('/register')
  }

  return (
    <div
      className="admin-login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        paddingTop: '15rem',
      }}
    >
      <Row justify="center" gutter={24} style={{ textAlign: 'center' }}>
        <Col span={24}>
          <h1>GEM BOX</h1>
        </Col>
        <Col xs={20} sm={7} md={10} lg={7} xl={5}>
          <Form onFinish={onFinish}>
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input size="large" placeholder="이메일" type="text" />
            </FormItem>

            <FormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                size="large"
                type="password"
                placeholder="비밀번호 8자리"
              />
            </FormItem>

            <FormItem>
              <Button
                disabled={loading}
                className="btn-login"
                htmlType="submit"
              >
                로그인
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={6} sm={5} md={5} lg={5} xl={2}>
          <Button
            className="btn-login"
            onClick={() => history.push('/admin-find-account')}
          >
            계정찾기
          </Button>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default AdminLogin

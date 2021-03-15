import React, { useState } from 'react'

import { Form, Input, Button, Row, Col, Modal } from 'antd'
import Footer from '../../components/Footer'

import adminApi from '../../api/AdminAPI'
import './AdminFindAccount.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import firebase from '../../constants/firebase';
import { API_URL } from '../../constants/appConstants'
import axios from 'axios'

const AdminFindAccount = (props) => {
  console.log(props)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [bodySubmit, setBodySubmit] = useState({
    phone: '',
    verify_code: '',
  })
  const [loading, setLoading] = useState(false)
  const onChange = (e) => {
    let str_phone = e.target.value.toString().trim()
    let slicePhone = str_phone.slice(1)
    let convertToCountryPhone = '+82'.concat(slicePhone)
    setPhoneInput(convertToCountryPhone)
    setBodySubmit({ ...bodySubmit, [e.target.name]: e.target.value })
  }

  const [phoneInput, setPhoneInput] = useState('')
  const { phone, verify_code } = bodySubmit;
  const [firebaseToken, setFirebaseToken] = useState('')
  const [account, setAccount] = useState({});

  const verify = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
    })

    firebase
    .auth()
    .signInWithPhoneNumber(phoneInput, recaptcha)
    .then(function (confirmationResult) {
      console.log(confirmationResult)
      window.confirmationResult = confirmationResult
    })
    .catch(function (error) {
      alert(error.message)
    })

    // setLoading(true)
    // adminApi
    //   .verifyPhoneNumber({ phone })
    //   .then((value) => {
    //     console.log('success')
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //     console.log(error.response)
    //     setLoading(false)
    //   })
  }

  const findAccount = async () => {
    console.log(firebaseToken)
    console.log(phoneInput)

    const config = {
      headers: {
        'Firebase-Auth-Token': firebaseToken,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
    }

    const { data } = await axios.put(
      `${API_URL}/admin/findaccount`,
      {phone: phone},
      config,
    )
    console.log(data)

    if (data.success == true){
      setAccount(data.data.result)
      setIsModalVisible(true)
    }



    // setLoading(true)
    // adminApi
    //   .findAccount(bodySubmit)
    //   .then((value) => {
    //     console.log(value)
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //     console.log(error.response)
    //     setLoading(false)
    //   })
  }

  const onChangeVerifyCode = async (e) => {
    if (e.target.value && e.target.value.length >= 6){
      window.confirmationResult
      .confirm(e.target.value)
      .then(function (result) {
        setFirebaseToken(result.user.za)
        console.log(result.user.za)
      })
      .catch(function (error) {
        console.log(error)
      })
    }


  }

  const onFinish = async (values) => {
    findAccount()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleOk = () => {
    setIsModalVisible(false);
    props.history.push('admin-login')
  };

  return (
    <div
      className="admin-find-account"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        paddingTop: '17rem',
      }}
    >
      <Row justify="center" gutter={24} style={{ textAlign: 'center' }}>
        <Col span={24}>
          <h1>GEM BOX</h1>
        </Col>
        <Col
          xs={20}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <div className="verified" style={{ display: 'flex' }}>
            <Form.Item>
              <div id="recaptcha"></div>
            </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your 핸드폰 번호 입력',
                  },
                ]}
              >
                <Input
                  onChange={onChange}
                  name="phone"
                  placeholder="핸드폰 번호 입력"
                  type="text"
                />
              </Form.Item>
              <Button disabled={loading} onClick={verify}>
                인증번호 전송
              </Button>
            </div>

            <Form.Item
              name="verify_code"
              rules={[
                {
                  required: true,
                  message: 'Please input your 인증번호 입력',
                },
              ]}
            >
              <Input
                onChange={onChangeVerifyCode}
                name="verify_code"
                placeholder="인증번호 입력"
                type="text"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: '3rem' }}>
              <Button
                style={{ width: '7rem' }}
                className="btn-login"
                htmlType="submit"
                disabled={loading}
              >
                확인
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Footer />
      <Modal title={'계정'} visible={isModalVisible} footer={false} onCancel={handleOk}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '30px' }}>
            <p>Id</p>
            <p>{account.id}</p>
          </div>
          <div>
            <p>Password</p>
            <p>{account.password}</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminFindAccount

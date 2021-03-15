import React, { useState, useRef } from 'react'
import firebase from '../../constants/firebase'
import {
  Row,
  Col,
  Input,
  Modal,
  Button,
  Form,
  message,
  Checkbox,
  Image,
  Spin,
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { API_URL } from '../../constants/appConstants'
import Footer from '../../components/Footer'
import axios from 'axios'
import './SignUp.scss'

const FormItem = Form.Item

const SignUp = (props) => {
  const [verifiedPhone, setVerifiedPhone] = useState(false) // For show or hidden input to type code sms
  const [signUp, setSignUp] = useState(false) // For Moal SignUp
  const [basePdf, setBasePdf] = useState('') // For convert pdf-file
  const [resendSms, setResemdSms] = useState('')
  const [loading, setLoading] = useState(false)
  const [validatePassword, setValidatePassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNameOfFileUpload, setShowNameOfFileUpload] = useState('')

  const [bodyphone, setBodyPhone] = useState({
    email: '',
    password: '',
    nameAndCompany: '',
    phone: '',
  })
  // const [valueOfPhoneInput, setValueOfPhoneInput] = useState()

  // For Add more URL
  const [url, seturl] = useState([])
  const [inputs, setInputs] = useState({ inputs: ['input-0'] }) // For Add more input

  const onChangeUrl = (e, indexOfInput) => {
    const urlTemp = JSON.parse(JSON.stringify(url))
    urlTemp[indexOfInput] = e.target.value
    seturl(urlTemp)
  }

  const appendInput = () => {
    var newInput = `input-${inputs.inputs.length}`
    setInputs((prevState) => ({ inputs: prevState.inputs.concat([newInput]) }))
  }

  // For Verify Phone
  const [phoneInput, setPhoneInput] = useState('')
  const [firebaseToken, setFirebaseToken] = useState('')
  const onChange = (e) => {
    // setBodyPhone({ ...bodyphone, [e.target.name]: e.target.value })
    let phone = e.target.value
    let str_phone = phone.toString().trim()
    let slicePhone = str_phone.slice(1)
    let convertToCountryPhone = '+82'.concat(slicePhone)
    setPhoneInput(convertToCountryPhone)
  }
  const { nameAndCompany, email, password, phone } = bodyphone
  const inputRef = useRef()
  const focus = () => {
    inputRef.current.focus()
  }

  const verifySmsCode = () => {
    setVerifiedPhone(true)
    setResemdSms('재전송')
    // const config = {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // }

    // const name = nameAndCompany.split('/')[0]
    // const body = {
    //   email,
    //   password,
    //   name,
    //   phone,
    // }

    // try {
    //   const { data } = await axios.post(`${API_URL}/verify`, body, config)
    //   console.log(data)
    // } catch (error) {
    //   console.log(error.response)
    // }
    // 0936467794

    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
    })
    var number = phoneInput
    // firebase
    //   .auth()
    //   .signInWithPhoneNumber(number, recaptcha)
    //   .then(function (e) {
    //     var code = prompt('Enter the otp', '')
    //     console.log(e);
    //     if (code === null) return
    //     e.confirm(code)
    //       .then(function (result) {
    //         // console.log(result.user.za)
    //         setFirebaseToken(result.user.za)
    //       })
    //       .catch(function (error) {
    //         console.error(error)
    //         Modal.error({
    //           content: '"Invalid Verification Code"'
    //         })
    //       })
    //   })
    //   .catch(function (error) {
    //     console.error(error)
    //   })

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult
      })
      .catch(function (error) {
        alert(error.message)
      })
  }

  const [otp, setOtp] = useState('')
  const codeVerifyOtp = () => {
    var code = otp
    window.confirmationResult
      .confirm(code)
      .then(function (result) {
        setFirebaseToken(result.user.za)
        console.log(result.user)
      })
      .catch(function (error) {
        alert(error.message)
        window.location = '/signup'
      })
  }

  // Verify Email
  const [emailVerify, setEmailVerify] = useState({ email: '' })
  const handleInputBlur = async () => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    try {
      const { data } = await axios.get(
        `${API_URL}/check?email=${emailVerify.email}`,
        config,
      )
      console.log(data)
    } catch (error) {
      console.log(error.response)
      message.error('Email Existed')
    }
  }

  // Submit
  const onFinish = async (values) => {
    setLoading(true)
    values.business_license = basePdf
    values.url_market = url
    values.name = values.nameAndCompany.split('/')[0].trim()
    values.company = values.nameAndCompany.split('/')[1].trim()
    console.log('Success:', values)

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Firebase-Auth-Token': firebaseToken,
      },
    }

    if (validatePassword.length < 6) {
      message.error('The password is not enough characters')
      return
    }

    const {
      confirmPassword,
      email,
      business_license,
      password,
      phone,
      url_market,
      verify_code,
      name,
      company,
    } = values

    const body = {
      confirmPassword,
      email,
      business_license,
      password,
      phone,
      url_market,
      verify_code,
      name,
      company,
    }
    try {
      const { data } = await axios.post(`${API_URL}/signup`, body, config)
      //   console.log(data)
      setSignUp(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.response)
      if (
        error.response.status === 400 &&
        error.response.data.data.message === 'Verify Code Invalid'
      ) {
        message.error('SMS code is invalid or expired!')
      }
    }
  }

  const handleOk = () => {
    setSignUp(false)
    props.history.push('/')
  }

  const onFindPassword = () => {
    props.history.push({
      pathname: '/',
      state: { findPassword: true },
    })
  }

  // For PDF file
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const uploadPdfFile = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    const data = base64.split(',').slice(1)[0]
    setBasePdf(data)
  }

  return (
    <div className="signup">
      <Row gutter={24}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <h1 className="logo">GEM BOX</h1>
        </Col>
      </Row>

      <Row gutter={24} justify="center">
        <Col
          xs={24}
          sm={24}
          md={18}
          lg={24}
          xl={24}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col
            className="background-color"
            xs={24}
            sm={24}
            md={16}
            lg={9}
            xl={6}
          >
            <div>
              <h1>회원가입</h1>
            </div>
            <Form onFinish={onFinish}>
              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input
                  placeholder="이메일*"
                  type="text"
                  onChange={(e) => {
                    setEmailVerify({ email: e.target.value })
                  }}
                  name="email"
                  value={email}
                  onBlur={handleInputBlur}
                />
              </FormItem>
              <FormItem
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your 비밀번호 8자리!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value.length >= 8) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(
                          'Password must contain at least 8 characters',
                        )
                      }
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="비밀번호 8자리*"
                  type="text"
                  onChange={(e) => {
                    setValidatePassword(e.target.value)
                  }}
                />
              </FormItem>
              <FormItem
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please input your 비밀번호 재확인',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        'The two passwords that you entered do not match!',
                      )
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="비밀번호 재확인*"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    onChange(e)
                  }}
                />
              </FormItem>
              <br />
              <FormItem
                name="nameAndCompany"
                rules={[
                  {
                    required: true,
                    message: 'Please input your 이름 / 업체명*',
                  },
                ]}
              >
                <Input
                  placeholder="이름 / 업체명*"
                  type="text"
                  name="nameAndCompany"
                  // value={name}
                  onChange={onChange}
                />
              </FormItem>
              <FormItem
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your 핸드폰 번호 입력',
                  },
                ]}
                style={{ display: 'flex' }}
              >
                <Input
                  placeholder="핸드폰 번호 입력*"
                  suffix={
                    <Button
                      onClick={verifySmsCode}
                      className="send-sms"
                      type="text"
                    >
                      {/* {resendSms ? resendSms : '인증번호 전송'} */}
                      인증번호 전송
                    </Button>
                  }
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </FormItem>
              {verifiedPhone ? (
                <FormItem
                  name="verify_code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your 인증번호 입력',
                    },
                  ]}
                >
                  <Input
                    onBlur={codeVerifyOtp}
                    placeholder="인증번호 입력"
                    type="text"
                    ref={inputRef}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </FormItem>
              ) : (
                ''
              )}
              <FormItem>
                <div id="recaptcha"></div>
              </FormItem>
              <br />
              {inputs.inputs.map((input, index) => (
                <Input
                  key={index}
                  placeholder="신청 마켓 url 입력*"
                  type="text"
                  style={{ marginBottom: '2px' }}
                  onChange={(e) => {
                    onChangeUrl(e, index)
                  }}
                  suffix={
                    <Button
                      style={{ borderColor: '#A6B0CF' }}
                      onClick={appendInput}
                    >
                      +
                    </Button>
                  }
                />
              ))}
              <br />
              <br />
              <FormItem
                name="file"
                rules={[
                  {
                    required: true,
                    message: 'Please attach your PDF file',
                  },
                ]}
                style={{ border: '1px dashed #A6B0CF', padding: '1rem' }}
              >
                <Row gutter={24} justify="center">
                  <Col span={18} style={{ textAlign: 'center' }}>
                    {showNameOfFileUpload ? (
                      <p>{showNameOfFileUpload}</p>
                    ) : (
                      <>
                        <Image src="/img/Upload.png" />
                        <p
                          style={{
                            fontWeight: '400',
                            fontSize: '10px',
                            color: '#14141A',
                            marginTop: '16px',
                            marginBottom: '0',
                          }}
                        >
                          사업자 등록증 pdf 또는 이미지 첨부
                        </p>
                        <p
                          style={{
                            fontWeight: '400',
                            fontSize: '10px',
                            color: '#14141A',
                          }}
                        >
                          or
                        </p>
                      </>
                    )}
                    <label className="custom-file-upload">
                      <Input
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        name="selectedFile"
                        onChange={(e) => {
                          uploadPdfFile(e)
                          if (e.target.files && e.target.files[0].name) {
                            setShowNameOfFileUpload(e.target.files[0].name)
                          }
                        }}
                      />
                      Browse
                    </label>
                  </Col>
                </Row>
              </FormItem>
              <br />
              <br />
              <br />
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject('Should accept agreement'),
                  },
                ]}
              >
                <Checkbox>
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    (필수)
                  </span>{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    개인정보 수집 및 이용
                  </span>
                </Checkbox>
              </Form.Item>
              <div className="agreement">
                <p>
                  <span style={{ color: '#A6B0CF' }}>■</span> 수집하는 개인정보
                  항목회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은
                  개인정보를 수집하고 있습니다.ο 수집항목 : 이름, 업체명 ,
                  비밀번호, 휴대폰 번호 , 이메일 , 사업자등록증, 법정대리인정보
                  , 서비스 이용기록 , 접속 로그 , 접속 IP 정보ο 개인정보
                  수집방법 : 홈페이지(회원가입) , 서면양식
                </p>
                <p>
                  <span style={{ color: '#A6B0CF' }}>■</span> 개인정보의 수집 및
                  이용목적 회사는 수집한 개인정보를 다음의 목적을 위해
                  활용합니다. ο 서비스 제공에 관한 계약 이행 및 서비스 제공에
                  따른 요금정산 콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는
                  청구지 등 발송ο 회원 관리회원제 서비스 이용에 따른 본인확인 ,
                  개인 식별, 고지사항 전달 ο 마케팅 및 광고에 활용접속 빈도 파악
                  또는 회원의 서비스 이용에 대한 통계
                </p>
                <p>
                  <span style={{ color: '#A6B0CF' }}>■</span> 개인정보의 보유 및
                  이용기간 회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외
                  없이 해당 정보를 지체 없이 파기합니다.
                </p>
              </div>
              <Row gutter={24} justify="center">
                <Col
                  span={24}
                  style={{ textAlign: 'center', marginTop: '24px' }}
                >
                  <FormItem>
                    <Button
                      style={{
                        width: '10rem',
                        backgroundColor: '#3F537D',
                        color: '#fff',
                        marginTop: '50px',
                      }}
                      disabled={loading}
                      size="large"
                      shape="round"
                      htmlType="submit"
                      className="submit"
                    >
                      {loading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ color: '#fff' }} />
                          }
                        />
                      ) : (
                        ''
                      )}
                      <span style={loading ? { marginLeft: '5px' } : {}}>
                        회원가입 신청
                      </span>
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Row gutter={24}>
              <Col span={24} style={{ marginTop: '23px' }}>
                <Button
                  type="text"
                  onClick={onFindPassword}
                  className="btn-forgot-password"
                  style={{ padding: '0' }}
                >
                  비밀번호 찾기
                </Button>
                <h4
                  style={{
                    fontWeight: '500',
                    fontSize: '12px',
                    color: '#333333',
                  }}
                >
                  오직 잼팩토리와 협약된 계정만 사용가능합니다
                </h4>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>

      <Footer />
      <Modal
        visible={signUp}
        onOk={handleOk}
        okText="확인"
        onCancel={() => setSignUp(false)}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className="modal-signup">
          <Row gutter={24} align="middle" style={{ flexDirection: 'column' }}>
            <Col span={24}>
              <h1
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: '30px',
                  color: '#495057',
                }}
              >
                회원가입 신청
              </h1>
            </Col>
            <Col span={15}>
              <Image width={250} src="/img/signup-modal.png" />
            </Col>
            <Col span={15}>
              <p
                style={{
                  fontWeight: '700',
                  fontSize: '14px',
                  color: '#74788D',
                  textAlign: 'center',
                  marginTop: '40px',
                }}
              >
                관리자 승인 후 사용가능합니다승인 완료시 등록하신 이메일로 안내
                메일 보내드리겠습니다
              </p>
            </Col>
            <Col span={24}>
              <Button
                onClick={() => {
                  setSignUp(false)
                  props.history.push('/')
                }}
                style={{
                  width: '10rem',
                  backgroundColor: '#3F537D',
                  color: '#fff',
                  marginTop: '50px',
                }}
                className="btn-modal-forgot-password"
                shape="round"
                size="large"
              >
                확인
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
}

export default SignUp

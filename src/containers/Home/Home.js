import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import homeApi from '../../api/HomeAPI'

import {
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  Divider,
  Spin,
  Popover,
} from 'antd'

import Footer from '../../components/Footer'
import GroupButton from './GroupButton/GroupButton'
import './home.scss'

const Home = (props) => {
  const [loading, setLoading] = useState(false)
  // Handle Data
  const [dataTopBander, setDataTopBander] = useState([])
  const [dataTopProduct, setDataTopProduct] = useState([])

  const id1 = [1, 11]
  const dataTopBander1 = dataTopBander.slice(0, 10).map((db) => {
    db.id = id1[0]++
    return db
  })

  const dataTopBander2 = dataTopBander.slice(10, 20).map((db) => {
    db.id = id1[1]++
    return db
  })

  const id2 = [1, 11]
  const dataTopProduct1 = dataTopProduct.slice(0, 10).map((db) => {
    db.id = id2[0]++
    return db
  })

  const dataTopProduct2 = dataTopProduct.slice(10, 20).map((db) => {
    db.id = id2[1]++
    return db
  })

  const RenderData = (props) => {
    const data = props.data
    return (
      <>
        {data.map((db, i) => (
          <React.Fragment key={i}>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <li
                style={{
                  flexBasis: '15%',
                  fontWeight: '700',
                  fontSize: '20px',
                  color: '#495057',
                }}
              >
                {db.id}
              </li>

              <li style={{ flexBasis: '55%' }}>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <li
                    style={{
                      fontWeight: '400',
                      fontSize: '12px',
                      color: '#74788D',
                    }}
                  >
                    {db.market_name}
                  </li>
                  <Popover content={db.bander_name ? db.bander_name : db.name}>
                    <li className="style-text-home">
                      <a
                        target="_blank"
                        style={{
                          fontWeight: 700,
                          fontSize: '14px',
                          color: '#495057',
                        }}
                        href={db.bander_name ? db.bander_url : db.url}
                      >
                        {db.bander_name ? db.bander_name : db.name}
                      </a>
                    </li>
                  </Popover>
                </ul>
              </li>

              <li
                style={{
                  flexBasis: '30%',
                  textAlign: 'end',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: '#495057',
                }}
              >
                {db.revenue ? (
                  <NumberFormat
                    value={db.revenue}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'₩'}
                  />
                ) : (
                  db.sold
                )}
              </li>
            </ul>
            <Divider className="edit-margin" />
          </React.Fragment>
        ))}
      </>
    )
  }

  // Date Picker
  const [day, setDay] = useState([])
  const date = new Date()
  const currentMonth = moment.utc(date).format('YYYY-MM')

  const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate)
    return datum / 1000
  }

  const onChange = (date, dateString) => {
    const startDay = dateString.concat('-01')
    const allDayInMonth = moment(dateString, 'YYYY-MM').daysInMonth()
    const endDay = dateString.concat(`-${allDayInMonth}`)

    const startAndEndDay = []
    startAndEndDay.unshift(toTimestamp(endDay))
    startAndEndDay.unshift(toTimestamp(startDay))
    setDay(startAndEndDay)
  }

  /* Get Data */
  const callApiHome = async (params) => {
    setLoading(true)
    await Promise.all([
      homeApi
        .getTopRevenue(params)
        .then((value) => {
          if (value && value.data && value.data.result) {
            setDataTopBander(value.data.result)
          }
        })
        .catch((err) => console.log(err.response)),
      homeApi
        .getTopSell(params)
        .then((value) => {
          if (value && value.data && value.data.result) {
            setDataTopProduct(value.data.result)
          }
        })
        .catch((err) => console.log(err.response)),
    ])
    setLoading(false)
  }

  const getData = () => {
    const params = {
      start: day[0] ? day[0] : allDateOfCurrentMonth[0],
      end: day[1] ? day[1] : allDateOfCurrentMonth[1],
    }
    callApiHome(params)
  }

  // Get data of current month
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD')
  const allDateOfCurrentMonth = [
    toTimestamp(startOfMonth),
    toTimestamp(endOfMonth),
  ]
  useEffect(() => {
    const params = {
      start: allDateOfCurrentMonth[0],
      end: allDateOfCurrentMonth[1],
    }
    callApiHome(params)
  }, [])

  return (
    <div className="home-page">
      <GroupButton redirect={props.history.push} clickable="a" />

      <Row className="aggregate-month card-border">
        <h1
          style={{
            marginRight: '41px',
            paddingTop: '5px',
            color: '#495057',
            fontWeight: '700px',
            fontSize: '16px',
          }}
        >
          기간
        </h1>
        <Col xl={20} className="date-picker">
          <DatePicker
            defaultValue={moment(currentMonth, 'YYYY-MM')}
            onChange={onChange}
            bordered={false}
            picker="month"
          />
          <Button
            style={{
              background: '#42abbc',
              borderColor: '#42abbc',
              fontWeight: 'bold',
            }}
            disabled={loading}
            type="primary"
            onClick={getData}
          >
            적용하기
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row
          className="site-card-wrapper"
          style={{ marginTop: '24px' }}
          gutter={[32, 32]}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            className="style-small-device"
          >
            <Card title="TOP 20 매출 벤더">
              <Row gutter={32}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <RenderData data={dataTopBander1} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <RenderData data={dataTopBander2} />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            className="style-small-device"
          >
            <Card title="TOP 20 판매 상품">
              <Row gutter={32}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <RenderData data={dataTopProduct1} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <RenderData data={dataTopProduct2} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
      <Footer marginTop={'80vh'} />
    </div>
  )
}

export default Home

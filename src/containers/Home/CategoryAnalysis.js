import React, { useState, useEffect } from 'react'
import homeApi from '../../api/HomeAPI'
import NumberFormat from 'react-number-format'

import GroupButton from './GroupButton/GroupButton'
import Footer from '../../components/Footer'
import { DatePicker, Button, Row, Col, Card, Spin, Popover } from 'antd'
import { MinusOutlined, LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import Market1 from '../../images/market1.png'
import Market2 from '../../images/market2.png'
import Market3 from '../../images/market3.png'
import Market4 from '../../images/market4.png'
import Market5 from '../../images/market5.png'
import Market6 from '../../images/market6.png'
import Market7 from '../../images/market7.png'
import Market8 from '../../images/market8.png'

import './CategoryAnalysis.scss'
import CategoryList from '../CategoryList/CategoryList'

const CategoryAnalysis = (props) => {
  const [loading, setLoading] = useState(false)
  const [totalSale, setTotalSale] = useState([])
  const [spinning, setSpinning] = useState(false)
  const [topProduct, setTopProduct] = useState({
    topcoupang: [],
    topauction: [],
    topsmartstore: [],
    topwemake: [],
    toptmon: [],
    topinterpark: [],
    top11str: [],
    topgmarket: [],
  })

  /* Render Data */
  let id = [1, 1, 1, 1, 1, 1, 1, 1]
  const topcoupang = topProduct.topcoupang.map((value) => {
    value.id = id[0]++
    return value
  })

  const topauction = topProduct.topauction.map((value) => {
    value.id = id[1]++
    return value
  })

  const topsmartstore = topProduct.topsmartstore.map((value) => {
    value.id = id[2]++
    return value
  })

  const topwemake = topProduct.topwemake.map((value) => {
    value.id = id[3]++
    return value
  })

  const toptmon = topProduct.toptmon.map((value) => {
    value.id = id[4]++
    return value
  })

  const topinterpark = topProduct.topinterpark.map((value) => {
    value.id = id[5]++
    return value
  })

  const top11str = topProduct.top11str.map((value) => {
    value.id = id[6]++
    return value
  })

  const topgmarket = topProduct.topgmarket.map((value) => {
    value.id = id[7]++
    return value
  })

  const RenderData = (props) => {
    const data = props.data
    return (
      <>
        {data.map((product, i) => (
          <React.Fragment key={i}>
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                fontWeight: '400',
                fontSize: '16px',
                color: '#495057',
              }}
            >
              <li style={{ flexBasis: '10%', fontWeight: 'bold' }}>
                {product.id}
              </li>

              <Popover content={product.name}>
                <li className="style-text-home" style={{ flexBasis: '60%' }}>
                  <a
                    style={{
                      fontWeight: '400',
                      fontSize: '16px',
                      color: '#495057',
                    }}
                    href={product.url}
                    target="_blank"
                  >
                    {product.name}
                  </a>
                </li>
              </Popover>

              <li style={{ flexBasis: '30%', textAlign: 'end' }}>
                <NumberFormat
                  value={product.seller_price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'₩'}
                />
              </li>
            </ul>
          </React.Fragment>
        ))}
      </>
    )
  }

  /* Chart */
  const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map((key) => {
      const newKey = newKeys[key] || key
      return { [newKey]: obj[key] }
    })
    return Object.assign({}, ...keyValues)
  }

  const dataChartRename = totalSale.map((data) => {
    const newKeys = { market_name: 'name', total: 'y' }
    const renamedObj = renameKeys(data, newKeys)

    const convetToNumber = parseInt(renamedObj.y)
    return { ...renamedObj, y: convetToNumber }
  })

  const options = {
    chart: {
      height: 600,
      type: 'pie',
      renderTo: 'container',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        colors: [
          '#ffc26f',
          '#d185d8',
          '#8784d7',
          '#fe7c69',
          '#caeefb',
          '#9bdbaf',
          '#fff1b6',
          '#febeb3',
        ],
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      pointFormat:
        '<tr><td</td>' +
        '<td style="text-align: right"><b>{point.y} ₩ </b></td></tr>',
      footerFormat: '</table>',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '2020년 완구 총 점유율 분석',
      align: 'left',
      style: {
        color: '#495057',
      },
    },
    series: [
      {
        name: 'Brands',
        // colorByPoint: true,
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        data: dataChartRename,
      },
    ],
  }

  const titileCard = (props) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#495057' }}>
        {category} TOP10
      </h3>
      <h3 style={{ fontWeight: '700', fontSize: '24px', color: '#495057' }}>
        {props}
      </h3>
    </div>
  )

  /* DatePicker */
  const [datePicker, setDatePicker] = useState([])
  const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate)
    return datum / 1000
  }

  const onChange = (date, dateString) => {
    let storeDay = [toTimestamp(dateString[0]), toTimestamp(dateString[1])]
    setDatePicker(storeDay)
  }

  /* For render total sale component */
  const markets = [
    { market: '11번가', img: Market1 },
    { market: 'G마켓', img: Market2 },
    { market: '쿠팡', img: Market3 },
    { market: '인터파크', img: Market4 },
    { market: '옥션', img: Market5 },
    { market: '스마트스토어', img: Market6 },
    { market: '티몬', img: Market7 },
    { market: '위메프', img: Market8 },
  ]

  /* Select category */
  const [category, setCategory] = useState('완구')

  /* Get data */
  const callApiHome = async (params) => {
    setSpinning(true)
    await Promise.all([
      homeApi
        .getTotalSell(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTotalSale(value.data.result)
            setSpinning(false)
          }
        })
        .catch((err) => {
          setSpinning(true)
          console.log(err.response)
        }),

      homeApi
        .getTopCoupang(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              topcoupang: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTopauction(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              topauction: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTopSmartstore(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              topsmartstore: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTopWemake(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              topwemake: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTopTmon(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              toptmon: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTopInterpark(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              topinterpark: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTop11str(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              top11str: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),

      homeApi
        .getTopGmarket(params)
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setTopProduct((prevState) => ({
              ...prevState,
              topgmarket: value.data.result,
            }))
          }
        })
        .catch((err) => console.log(err.response)),
    ])
  }
  const getData = async () => {
    setLoading(true)
    const params = {
      start: datePicker[0],
      end: datePicker[1],
      key: category,
    }

    await callApiHome(params)
    setLoading(false)
  }

  const onChangeCategory = (value) => {
    setCategory(value)
  }

  /* Current month and get data */
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD')
  // useEffect(async () => {
  //   let allDateOfCurrentMonth = [
  //     toTimestamp(startOfMonth),
  //     toTimestamp(endOfMonth),
  //   ]

  //   const params = {
  //     start: allDateOfCurrentMonth[0],
  //     end: allDateOfCurrentMonth[1],
  //     key: '국내기저귀',
  //   }
  //   console.log(params)
  //   await callApiHome(params)
  // }, [])

  return (
    <div className="category-analysis">
      <GroupButton redirect={props.history.push} clickable="b" />

      <Row
        gutter={16}
        className="aggregate-month card-border"
        justify="space-between"
        align="middle"
      >
        <Col xs={17} sm={21} md={21} lg={21} xl={22} className="date-picker">
          <Row gutter={[4, 4]}>
            <Col xs={24} sm={3} md={3} lg={2} xl={1}>
              <h1
                style={{
                  paddingTop: '3px',
                  color: '#495057',
                  fontWeight: '700px',
                  fontSize: '16px',
                }}
              >
                집계 월
              </h1>
            </Col>
            <Col xs={24} sm={10} md={10} lg={8} xl={5}>
              <DatePicker.RangePicker
                defaultValue={[moment(startOfMonth), moment(endOfMonth)]}
                onChange={onChange}
                separator={<MinusOutlined />}
              />
            </Col>
            <Col xs={24} sm={2} md={2} lg={2} xl={2}>
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
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined style={{ color: '#fff' }} />}
                  />
                ) : (
                  ''
                )}
                <span style={loading ? { marginLeft: '5px' } : {}}>
                  적용하기
                </span>
              </Button>
            </Col>
          </Row>
        </Col>

        <Col
          xs={7}
          sm={3}
          md={3}
          lg={3}
          xl={2}
          style={{ textAlign: 'center' }}
          className="category-analysis"
        >
          <CategoryList
            category={category}
            onChangeCategory={(value) => onChangeCategory(value)}
          />
        </Col>
      </Row>

      <Row
        gutter={24}
        className="chart card-border"
        style={{
          marginTop: '24px',
          marginBottom: '24px',
        }}
        justify="center"
      >
        <Col style={{ textAlign: 'center' }} span={24}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            {...props}
          />
        </Col>

        <Col span={24} style={{ marginTop: '150px' }}>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#495057',
            }}
          >
            총 매출액
          </h1>
          <Row>
            {markets.map((market, i) => (
              <Col
                key={i}
                xs={12}
                sm={12}
                md={6}
                lg={3}
                xl={3}
                style={{ textAlign: 'center' }}
                className="total-sale"
              >
                <div className="style-border">
                  <img src={market.img} />
                  <span className="style-market">{market.market}</span>
                </div>
                <p
                  style={{
                    paddingTop: '1rem',
                    fontWeight: '400',
                    fontSize: '16px',
                    color: '#495057',
                  }}
                >
                  {totalSale.map((total, i) => {
                    if (total.market_name === market.market) {
                      return (
                        <NumberFormat
                          key={i}
                          value={total.total}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'₩'}
                        />
                      )
                    }
                  })}
                </p>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('11번가')} bordered={false}>
                <RenderData data={top11str} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('G마켓')} bordered={false}>
                <RenderData data={topgmarket} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('쿠팡')} bordered={false}>
                <RenderData data={topcoupang} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('인터파크')} bordered={false}>
                <RenderData data={topinterpark} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('옥션')} bordered={false}>
                <RenderData data={topauction} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('스마트스토어')} bordered={false}>
                <RenderData data={topsmartstore} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('티몬')} bordered={false}>
                <RenderData data={toptmon} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Card title={titileCard('위메프')} bordered={false}>
                <RenderData data={topwemake} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Footer />
    </div>
  )
}

export default CategoryAnalysis

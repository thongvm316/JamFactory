import React, { useState, useEffect } from 'react'
import moment from 'moment'
import homeApi from '../../api/HomeAPI'
import NumberFormat from 'react-number-format'

import { DatePicker, Button, Row, Col, Select, Card, Spin, Modal } from 'antd'
import { MinusOutlined, LoadingOutlined } from '@ant-design/icons'
import Footer from '../../components/Footer'
import GroupButton from './GroupButton/GroupButton'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import * as hcnd from 'highcharts/modules/no-data-to-display'

import './AnalysisMarket.scss'
// import axios from 'axios'
const { Option } = Select

hcnd(Highcharts)

const AnalysisMarket = (props) => {
  const [selectMarket, setSelectMarket] = useState('11번가')
  const [loading, setLoading] = useState(false)
  const [loadingUseEfect, setLoadingUseEfect] = useState(false)
  const [marketTotalSale, setMarketTotalSale] = useState(0)

  // Handle data
  const [data, setData] = useState([])

  const data1 = data.slice(0, 10)
  const data2 = data.slice(10, 20)

  const RenderData = (props) => {
    const data = props.data
    return (
      <>
        {data.map((product, i) => (
          <React.Fragment key={i}>
            <ul
              className='ul-list'
              style={{
                fontWeight: '400',
                fontSize: '16px',
                color: '#495057',
                display: 'flex',
                listStyle: 'none',
                justifyContent: 'space-between',
              }}
            >
              <li
                style={{ fontWeight: 700, fontSize: '16px', color: '#495057' }}
              >
                {product.category_tag}
              </li>
              <li
                style={{ fontWeight: 400, fontSize: '12px', color: '#74788D' }}
              >
                <NumberFormat
                  value={product.total}
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

  // DatePicker
  const [datePicker, setDatePicker] = useState([])
  const [hackValue, setHackValue] = useState()
  const [value, setValue] = useState()
  const [dates, setDates] = useState([])
  const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate)
    return datum / 1000
  }

  const onChangeRangePicker = (val) => {
    setValue(val)
    if (val && val[0] && val[1]) {
      const start = moment(val[0]).format('YYYY-MM-DD')
      const end = moment(val[1]).format('YYYY-MM-DD')
      if (start === end) {
        setValue('')
      }
      let storeDay = [toTimestamp(start), toTimestamp(end)]
      setDatePicker(storeDay)
    }
  }

  // const onCalendarChange = (val) => {
  //   if (val && val[0]) {
  //     const daysInMonth = parseInt(moment(val[0], 'YYYY-MM').daysInMonth())
  //     const day = parseInt(moment(val[0]).format('DD'))
  //     if (daysInMonth === day) {
  //       modal('시작일은 월의 마지막 일자가 될 수 없습니다')
  //       return
  //     }
  //   }

  //   if (val && val[1]) {
  //     const day = parseInt(moment(val[1]).format('DD'))
  //     if (1 === day) {
  //       modal('시작일을 마지막 일자로 선택 할 수 없습니다')
  //       return
  //     }
  //   }

  //   if (val && val[0] && val[1]) {
  //     const startDate = parseInt(moment(val[0]).format('DD'))
  //     const endDate = parseInt(moment(val[1]).format('DD'))

  //     if (startDate === endDate) {
  //       modal('시작일은 종료일과 같을 수 없습니다')

  //       return
  //     }
  //   }

  //   setDates(val)
  // }

  // const disabledDate = (current) => {
  //   const daysInMonth = parseInt(moment(current, 'YYYY-MM').daysInMonth())

  //   if (!dates || dates.length === 0) {
  //     const date =
  //       (current && moment(current).format('DD') === 1) ||
  //       (current && moment(current).format('DD') === 15) ||
  //       (current && moment(current).format('DD') === daysInMonth)

  //     return !date
  //   } else {
  //     if (dates[0]) {
  //       return !(
  //         (moment(dates[0]).format('YYYY-MM') ===
  //           moment(current).format('YYYY-MM') &&
  //           current &&
  //           moment(current).format('DD') === 1) ||
  //         (moment(dates[0]).format('YYYY-MM') ===
  //           moment(current).format('YYYY-MM') &&
  //           current &&
  //           moment(current).format('DD') === 15) ||
  //         (moment(dates[0]).format('YYYY-MM') ===
  //           moment(current).format('YYYY-MM') &&
  //           current &&
  //           moment(current).format('DD') === daysInMonth)
  //       )
  //     }

  //     if (dates[1]) {
  //       return !(
  //         (moment(dates[1]).format('YYYY-MM') ===
  //           moment(current).format('YYYY-MM') &&
  //           current &&
  //           moment(current).format('DD') === 1) ||
  //         (moment(dates[1]).format('YYYY-MM') ===
  //           moment(current).format('YYYY-MM') &&
  //           current &&
  //           moment(current).format('DD') === 15) ||
  //         (moment(dates[1]).format('YYYY-MM') ===
  //           moment(current).format('YYYY-MM') &&
  //           current &&
  //           moment(current).format('DD') === daysInMonth)
  //       )
  //     }
  //   }
  // }

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([])
      setDates([])
    } else {
      setHackValue(undefined)
    }
  }

  const modal = (text) => {
    Modal.error({
      title: '에러',
      content: text,
    })
  }

  /* Option of chart */
  const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map((key) => {
      const newKey = newKeys[key] || key
      return { [newKey]: obj[key] }
    })
    return Object.assign({}, ...keyValues)
  }

  // Chart 1
  const titleOfChartOne = `${selectMarket} 카테고리별 분석`
  const colorsChart1 = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
  ]

  const dataOfChartOne = data.map((data) => {
    const newKeys = { category_tag: 'name', total: 'y' }
    const renamedObj = renameKeys(data, newKeys)
    const parseToNum = parseInt(renamedObj.y)
    return { name: renamedObj.name, y: parseToNum }
  })
  // console.log(dataOfChartOne)

  const options = {
    chart: {
      height: 600,
      type: 'pie',
      renderTo: 'container',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        colors: colorsChart1,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      pointFormat:
        '<tr><td</td>' +
        '<td style="text-align: right"><b>₩{point.y}</b></td></tr>',
      footerFormat: '</table>',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: titleOfChartOne,
      align: 'left',
      style: {
        color: '#495057',
      },
    },
    series: [
      {
        name: 'Brands',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        data: dataOfChartOne,
      },
    ],
  }

  // Chart 2
  const getTextCategories = data.map((data) => {
    return data.category_tag
  })
  const categories = {
    categories: getTextCategories,
  }

  const dataOfTotalLineAndColumnChart = data.map((data) => {
    const newKeys = { category_tag: 'name', total: 'y' }
    const renamedObj = parseInt(renameKeys(data, newKeys).y)
    const color = '#'.concat(Math.floor(Math.random() * 16777215).toString(16))
    return { y: renamedObj, color }
  })

  const dataOfTotalSoldLineAndColumnChart = data.map((data) => {
    return parseInt(data.total_sold)
  })

  const optionsLineAndColumnChart = {
    title: '',
    chart: {
      zoomType: 'xy',
    },
    xAxis: [categories],
    yAxis: [
      {
        labels: false,
        title: false,
        gridLineColor: 'transparent',
      },
      {
        // Secondary yAxis
        title: false,
        labels: false,
        opposite: true,
        gridLineColor: 'transparent',
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: '',
        type: 'column',
        yAxis: 1,
        data: dataOfTotalLineAndColumnChart,
        tooltip: {
          valuePrefix: '₩',
        },
      },
      {
        name: '',
        type: 'spline',
        data: dataOfTotalSoldLineAndColumnChart,
        tooltip: {
          valueSuffix: '',
        },
        marker: {
          enabled: false,
        },
        color: '#34C38F',
      },
    ],
  }

  // Select Market
  function handleChangeSelectMarket(value) {
    setSelectMarket(value)
    setIsCallApi(false)
  }

  // Get Data
  const getData = async () => {
    const params = {
      start: datePicker[0] ? datePicker[0] : allDateOfCurrentMonth[0],
      end: datePicker[1] ? datePicker[1] : allDateOfCurrentMonth[1],
      key: selectMarket,
    }
    try {
      setLoading(true)
      const value = await homeApi.getAnalysisMarket(params)
      if (value && value.data.result && value.data.result.total_sale) {
        setData(value.data.result.total_sale)
      }
      setLoading(false)
      setIsCallApi(true)
    } catch (error) {
      setLoading(false)
      setIsCallApi(true)
      console.log(error.response)
    }
  }

  /* Current month and get data */
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD')
  let allDateOfCurrentMonth = [
    toTimestamp(startOfMonth),
    toTimestamp(endOfMonth),
  ]
  useEffect(async () => {
    setLoadingUseEfect(true)
    const params = {
      start: allDateOfCurrentMonth[0],
      end: allDateOfCurrentMonth[1],
      key: selectMarket,
    }
    try {
      const value = await homeApi.getAnalysisMarket(params)
      if (value && value.data.result && value.data.result.total_sale) {
        setData(value.data.result.total_sale)
        setLoadingUseEfect(false)
        setIsCallApi(true)
      }
    } catch (error) {
      console.log(error.response)
      setLoadingUseEfect(false)
      setIsCallApi(true)
    }
  }, [])

  useEffect(async () => {
    const params = {
      start: allDateOfCurrentMonth[0],
      end: allDateOfCurrentMonth[1],
      key: selectMarket,
    }
    try {
      const res = await homeApi.getMarketTotalSale(params)
      setMarketTotalSale(
        res.data.result.total_sale === null ? 0 : res.data.result.total_sale,
      )
      setIsCallApi(true)
    } catch (error) {
      console.log(error.response)
      setIsCallApi(true)
    }
  }, [])

  /* Get Market Total Sale */
  const getMarketTotalSale = async () => {
    const params = {
      start: datePicker[0] ? datePicker[0] : allDateOfCurrentMonth[0],
      end: datePicker[1] ? datePicker[1] : allDateOfCurrentMonth[1],
      key: selectMarket,
    }
    try {
      const res = await homeApi.getMarketTotalSale(params)
      setMarketTotalSale(
        res.data.result.total_sale === null ? 0 : res.data.result.total_sale,
      )
      setIsCallApi(true)
    } catch (error) {
      console.log(error.response)
      setIsCallApi(true)
    }
  }

  /* Call API when change market */
  const [isCallApi, setIsCallApi] = useState(true)
  useEffect(() => {
    if (isCallApi) return
    getData()
    getMarketTotalSale()
  }, [selectMarket])

  return (
    <div className='analysis-market'>
      <GroupButton redirect={props.history.push} clickable='c' />

      <Row
        gutter={16}
        className='aggregate-month card-border'
        justify='space-between'
        align='middle'
      >
        <Col xs={14} sm={20} md={20} lg={21} xl={22} className='date-picker'>
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
                기간
              </h1>
            </Col>
            <Col xs={24} sm={10} md={10} lg={10} xl={4}>
              <DatePicker.RangePicker
                defaultValue={[moment(startOfMonth), moment(endOfMonth)]}
                separator={<MinusOutlined />}
                value={hackValue || value}
                // disabledDate={disabledDate}
                // onCalendarChange={(val) => onCalendarChange(val)}
                onChange={(val) => onChangeRangePicker(val)}
                onOpenChange={onOpenChange}
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
                type='primary'
                onClick={() => {
                  getData()
                  getMarketTotalSale()
                }}
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

        <Col xs={10} sm={4} md={4} lg={3} xl={2} style={{ textAlign: 'end' }}>
          <Select onChange={handleChangeSelectMarket} defaultValue='11번가'>
            <Option value='11번가'>11번가</Option>
            <Option value='G마켓'>G마켓</Option>
            <Option value='쿠팡'>쿠팡</Option>
            <Option value='인터파크'>인터파크</Option>
            <Option value='옥션'>옥션</Option>
            <Option value='스마트스토어'>스마트스토어</Option>
            <Option value='티몬'>티몬</Option>
            <Option value='위메프'>위메프</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }} className='card-border'>
        <Col span={24}>
          <h1 style={{ display: 'inline-block', marginBottom: '0px' }}>
            {selectMarket} 총매출
          </h1>
          <h1
            style={{
              display: 'inline-block',
              marginLeft: '25px',
              marginBottom: '0px',
            }}
          >
            <NumberFormat
              value={marketTotalSale}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₩'}
            />
          </h1>
        </Col>
      </Row>

      {loadingUseEfect ? (
        <Spin className='spin-usefect' size='large' />
      ) : (
        <>
          <Row
            gutter={16}
            className='chart-one card-border'
            style={{ marginTop: '24px' }}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                {...props}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Row gutter={[16, 16]} justify='center'>
                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                  <Card title='매출액' style={{ borderRadius: '16px' }}>
                    <RenderData data={data1} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={10} xl={10}>
                  <Card title='매출액' style={{ borderRadius: '16px' }}>
                    <RenderData data={data2} />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginTop: '40px' }} className='chart-two card-border'>
            <Col span={24}>
              <HighchartsReact
                highcharts={Highcharts}
                options={optionsLineAndColumnChart}
                {...props}
              />
            </Col>
          </Row>
        </>
      )}

      <Footer />
    </div>
  )
}

export default AnalysisMarket

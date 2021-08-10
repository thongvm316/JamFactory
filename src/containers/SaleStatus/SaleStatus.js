import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Input, DatePicker, Space, Table, Modal } from 'antd'
import { MinusOutlined } from '@ant-design/icons'

import fileDownload from 'js-file-download'
import moment from 'moment'
import * as _ from 'lodash'
import NumberFormat from 'react-number-format'
import saleStatusAPI from '../../api/SaleStatusAPI'

import SaleStatus1 from '../../images/SaleStatus1.png'
import SaleStatus2 from '../../images/SaleStatus2.png'
import SaleStatus3 from '../../images/SaleStatus3.png'
import SaleStatus4 from '../../images/SaleStatus4.png'

import Market1 from '../../images/market1.png'
import Market2 from '../../images/market2.png'
import Market3 from '../../images/market3.png'
import Market4 from '../../images/market4.png'
import Market5 from '../../images/market5.png'
import Market6 from '../../images/market6.png'
import Market7 from '../../images/market7.png'
import Market8 from '../../images/market8.png'
import Footer from '../../components/Footer'
import './SaleStatus.scss'
import saleStatusApi from '../../api/SaleStatusAPI'

const SaleStatus = () => {
  // Table
  const goToStore = (record) => {
    var win = window.open(record.url, '_blank')
    win.focus()
  }
  const columns = [
    {
      title: '상품명',
      render: (record) => {
        // console.log(record)
        return (
          <a
            style={{
              fontWeight: 500,
              fontSize: '16px',
              color: '#74788D',
            }}
            onClick={() => goToStore(record)}
          >
            {record.name}
          </a>
        )
      },
    },
    {
      title: '카테고리',
      dataIndex: 'category_tag',
      sorter: (a, b) => a.category_tag.length - b.category_tag.length,
    },
    {
      title: '마켓명',
      dataIndex: 'market_name',
      sorter: (a, b) => a.market_name.length - b.market_name.length,
    },
    {
      title: '가격',
      dataIndex: 'seller_price',
      render: (text) => (
        <NumberFormat
          value={text}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₩'}
        />
      ),
      sorter: {
        compare: (a, b) => a.seller_price - b.seller_price,
      },
    },
    {
      title: '리뷰',
      dataIndex: 'review',
      sorter: {
        compare: (a, b) => a.review - b.review,
      },
    },
    {
      title: '판매수',
      dataIndex: 'sold',
      sorter: {
        compare: (a, b) => a.sold - b.sold,
      },
    },
  ]

  /* DatePicker */
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

  /* Get Data */
  const [valueOfSearchInput, setValueOfSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataSearch, setDataSearch] = useState([])
  const [listMarket, setListMarket] = useState([])
  const [data, setData] = useState({
    totalProductCount: [],
    totalReviewCount: [],
    saleCountRank: [],
    saleRank: [],
  })

  const getValueOfInputSearch = (e) => {
    setValueOfSearchInput(e.target.value)
    setDataSearch([])
  }

  /* Get data */
  const lastItemOfDataSearch = _.last(dataSearch) ? _.last(dataSearch).id : 0
  const [lastIndex, setLastIndex] = useState(lastItemOfDataSearch)
  const loadMore = () => {
    setLastIndex(lastItemOfDataSearch)
  }

  const getData = () => {
    const params = {
      start: datePicker[0] ? datePicker[0] : allDateOfCurrentMonth[0],
      end: datePicker[1] ? datePicker[1] : allDateOfCurrentMonth[1],
      key: valueOfSearchInput,
      lastIndex: lastIndex,
    }
    setLoading(true)

    saleStatusApi
      .getDataSearch(params)
      .then((value) => {
        if (
          value &&
          value.data &&
          value.data.result &&
          value.data.result.product
        ) {
          if (lastIndex > 0) {
            setDataSearch(dataSearch.concat(value.data.result.product))
          } else {
            setDataSearch(value.data.result.product)
          }
        }

        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response)
      })
  }

  /* Use when load more */
  useEffect(() => {
    if (datePicker.length === 0) {
      return
    }
    getData()
  }, [lastIndex])

  useEffect(() => {
    Promise.all([
      saleStatusAPI
        .getProductCount()
        .then((value) => {
          if (value && value.data && value.data.result) {
            setData((prevState) => ({
              ...prevState,
              totalProductCount: value.data.result,
            }))
          }
        })
        .catch((error) => console.log(error.response)),

      saleStatusAPI
        .getReviewInfo({
          start: allDateOfCurrentMonth[0],
          end: allDateOfCurrentMonth[1],
        })
        .then((value) => {
          if (value && value.data && value.data.result) {
            setData((prevState) => ({
              ...prevState,
              totalReviewCount: value.data.result,
            }))
          }
        })
        .catch((error) => console.log(error.response)),

      saleStatusAPI
        .getSaleInfo({
          start: allDateOfCurrentMonth[0],
          end: allDateOfCurrentMonth[1],
        })
        .then((value) => {
          if (value && value.data && value.data.result) {
            setData((prevState) => ({
              ...prevState,
              saleCountRank: value.data.result,
            }))
          }
        })
        .catch((error) => console.log(error.response)),

      saleStatusAPI
        .getRevenueInfo({
          start: allDateOfCurrentMonth[0],
          end: allDateOfCurrentMonth[1],
        })
        .then((value) => {
          if (value && value.data && value.data.result) {
            setData((prevState) => ({
              ...prevState,
              saleRank: value.data.result,
            }))
          }
        })
        .catch((error) => console.log(error.response)),

      saleStatusAPI
        .getListMarket({
          start: allDateOfCurrentMonth[0],
          end: allDateOfCurrentMonth[1],
        })
        .then((value) => {
          console.log(value)
          if (value && value.data && value.data.result) {
            setListMarket(value.data.result)
          }
        })
        .catch((error) => console.log(error.response)),
    ])
  }, [])

  /*  For render market of user set */
  const newListMarket = listMarket.map((market) => {
    const { market_name, url } = market
    if (market_name === '11번가') {
      return { market_name, url, img: Market1 }
    }

    if (market_name === 'G마켓') {
      return { market_name, url, img: Market2 }
    }

    if (market_name === '쿠팡') {
      return { market_name, url, img: Market3 }
    }

    if (market_name === '인터파크') {
      return { market_name, url, img: Market4 }
    }

    if (market_name === '옥션') {
      return { market_name, url, img: Market5 }
    }

    if (market_name === '스마트스토어') {
      return { market_name, url, img: Market6 }
    }

    if (market_name === '티몬') {
      return { market_name, url, img: Market7 }
    }

    if (market_name === '위메프') {
      return { market_name, url, img: Market8 }
    }
  })

  /* Get Excel */
  const getExcelFile = async () => {
    setLoading(true)
    const params = {
      start: datePicker[0] ? datePicker[0] : allDateOfCurrentMonth[0],
      end: datePicker[1] ? datePicker[1] : allDateOfCurrentMonth[1],
      key: valueOfSearchInput,
      lastIndex: lastItemOfDataSearch,
    }

    saleStatusApi
      .getExcelFile(params)
      .then((value) => {
        console.log('Success')
        fileDownload(value, 'data.xls')
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response)
        setLoading(false)
      })
  }

  /* Get data of current month */
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD')
  const allDateOfCurrentMonth = [
    toTimestamp(startOfMonth),
    toTimestamp(endOfMonth),
  ]
  useEffect(() => {
    setLoading(true)
    const params = {
      start: allDateOfCurrentMonth[0],
      end: allDateOfCurrentMonth[1],
      key: valueOfSearchInput,
      lastIndex: lastIndex,
    }
    saleStatusApi
      .getDataSearch(params)
      .then((value) => {
        if (
          value &&
          value.data &&
          value.data.result &&
          value.data.result.product
        ) {
          if (lastIndex > 0) {
            setDataSearch(dataSearch.concat(value.data.result.product))
          } else {
            setDataSearch(value.data.result.product)
          }
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response)
      })
  }, [])

  /* Make Random Id */
  const guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    )
  }

  return (
    <div className='sale-status'>
      <Row justify='space-around'>
        <Col
          sm={24}
          md={11}
          lg={11}
          xl={5}
          className='card-item-border card-item'
        >
          <div className='card-item-text'>
            <h2 style={{ color: '#2A4EAA', marginBottom: '0' }}>총 상품 수</h2>
            <h2
              style={{ color: '#6E798C', fontSize: '36px', fontWeight: '700' }}
            >
              {data.totalProductCount ? data.totalProductCount : ''}개
            </h2>
          </div>
          <div className='card-item-icon'>
            <img src={SaleStatus1 ? SaleStatus1 : ''} alt='alt-img' />
          </div>
        </Col>
        <Col
          sm={24}
          md={11}
          lg={11}
          xl={5}
          className='card-item-border card-item'
        >
          <div className='card-item-text'>
            <h2 style={{ color: '#2A4EAA', marginBottom: '0' }}>총 리뷰</h2>
            <h2
              style={{
                color: '#6E798C',
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '0',
              }}
            >
              {data.totalReviewCount.review_rank
                ? data.totalReviewCount.review_rank
                : ''}
              위
            </h2>
            <p
              style={{ fontSize: '16px', fontWeight: '500', color: '#495057' }}
            >
              {data.totalReviewCount.total_review
                ? data.totalReviewCount.total_review
                : ''}
              건
            </p>
          </div>
          <div className='card-item-icon'>
            <img src={SaleStatus2 ? SaleStatus2 : ''} alt='alt-img' />
          </div>
        </Col>
        <Col
          sm={24}
          md={11}
          lg={11}
          xl={5}
          className='card-item-border card-item'
        >
          <div className='card-item-text'>
            <h2 style={{ color: '#2A4EAA', marginBottom: '0' }}>
              종합 판매순위
            </h2>
            <h2
              style={{ color: '#6E798C', fontSize: '36px', fontWeight: '700' }}
            >
              {data.saleCountRank.sale_rank ? data.saleCountRank.sale_rank : ''}
              위
            </h2>
          </div>
          <div className='card-item-icon'>
            <img src={SaleStatus3 ? SaleStatus3 : ''} alt='alt-img' />
          </div>
        </Col>
        <Col
          sm={24}
          md={11}
          lg={11}
          xl={5}
          className='card-item-border card-item'
        >
          <div className='card-item-text'>
            <h2 style={{ color: '#2A4EAA', marginBottom: '0' }}>
              종합 매출순위
            </h2>
            <h2
              style={{
                color: '#6E798C',
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '0',
              }}
            >
              {data.saleRank.revenue_rank ? data.saleRank.revenue_rank : ''}위
            </h2>
            <p
              style={{ fontSize: '16px', fontWeight: '500', color: '#495057' }}
            >
              <NumberFormat
                value={data.saleRank.revenue ? data.saleRank.revenue : ''}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₩ '}
              />
            </p>
          </div>
          <div className='card-item-icon'>
            <img src={SaleStatus4 ? SaleStatus4 : ''} alt='alt-img' />
          </div>
        </Col>
      </Row>

      <Row className='bar-style'>
        <Col
          sm={24}
          md={24}
          lg={24}
          xl={24}
          className='card-border info-search'
        >
          <Space className='space-small' style={{ marginRight: '2rem' }}>
            <DatePicker.RangePicker
              bordered={false}
              defaultValue={[moment(startOfMonth), moment(endOfMonth)]}
              separator={<MinusOutlined />}
              value={hackValue || value}
              // disabledDate={disabledDate}
              // onCalendarChange={(val) => onCalendarChange(val)}
              onChange={(val) => onChangeRangePicker(val)}
              onOpenChange={onOpenChange}
            />
            <Button
              style={{ backgroundColor: '#71c4d5', border: 'none' }}
              onClick={getData}
              type='primary'
              disabled={loading}
            >
              적용하기
            </Button>
          </Space>
          <Space>
            <Input
              style={{ borderRadius: '6px' }}
              onChange={getValueOfInputSearch}
              placeholder='Search'
            />
            <Button
              disabled={loading}
              style={{ backgroundColor: '#71c4d5', border: 'none' }}
              type='primary'
              onClick={getExcelFile}
            >
              EXCEL
            </Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={24} className='market-of-user'>
        {newListMarket.map((market, i) => (
          <Col
            key={i}
            xs={12}
            sm={6}
            md={6}
            lg={3}
            xl={3}
            style={{ textAlign: 'center' }}
            className='total-sale'
          >
            <a href={market.url ? market.url : ''} target='_blank'>
              <img src={market.img} alt='alt-img' />
              <span
                style={{
                  fontWeight: '400',
                  fontSize: '16px',
                  color: '#495057',
                  marginLeft: '.5rem',
                }}
              >
                {market.market_name}
              </span>
            </a>
          </Col>
        ))}
      </Row>

      <Row>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataSearch}
            pagination={false}
            scroll={{ x: 1300 }}
            rowKey={() => guidGenerator()}
          />
        </Col>

        <Col span={24} style={{ textAlign: 'center', marginTop: '2rem' }}>
          {dataSearch.length && dataSearch.length >= 100 ? (
            <Button
              disabled={loading}
              onClick={loadMore}
              className='btn-light-blue border-radius-6'
              style={{
                backgroundColor: '#71c4d5',
                border: 'none',
                marginLeft: '10px',
              }}
              type='primary'
            >
              LOAD MORE
            </Button>
          ) : (
            ''
          )}
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default SaleStatus

import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Row, Col, Table, Modal, Select } from 'antd'
import Filter from './Filter'
import Chart from './Chart'
import './ProductSearch.scss'
import { API_URL } from '../../constants/appConstants'
import axios from 'axios'
import fileDownload from 'js-file-download'
import * as _ from 'lodash'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import NumberFormat from 'react-number-format'
import saleStatusApi from '../../api/SaleStatusAPI'
import { useLastLocation } from 'react-router-last-location';

const { Option } = Select

const ProductSearch = (props) => {
  const convertToTimeStamp = (strDate) => {
    var datum = Date.parse(strDate)
    return datum / 1000
  }
  const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD')
  let allDateOfCurrentMonth = [
    convertToTimeStamp(startOfMonth),
    convertToTimeStamp(endOfMonth),
  ]
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastIndex, setLastIndex] = useState(0)
  // const [getParamsFilter, setGetParamsFilter] = useState(null)
  // const [sortIndex, setSortIndex] = useState(0)
  const [filters, setFilters] = useState({})
  const [paramsOfGetExcelFile, setParamsOfGetExcelFile] = useState('')
  console.log(paramsOfGetExcelFile);
  const [visible, setVisible] = useState(false)
  // const [loadMoreFilterOrSort, setLoadMoreFilterOrSort] = useState({
  //   isFilter: false,
  //   isSort: false,
  // })
  // const [triggerSortLoadMore, setTriggerSortLoadMore] = useState({
  //   seller_price_asc: false,
  //   seller_price_desc: false,
  //   review_asc: false,
  //   review_desc: false,
  //   sold_asc: false,
  //   sold_desc: false,
  // })
  let lastLocation = useLastLocation();
  let productSearchOptions = JSON.parse(localStorage.getItem('product-search-options'))


  useEffect(() => {
    getProducts()
  }, [filters, lastIndex])

  // useEffect(() => {
  //   if (sortIndex == 0) return
  //   if (triggerSortLoadMore.seller_price_asc == true) {
  //     sortApi('seller_price', 'asc')
  //   }
  //   if (triggerSortLoadMore.seller_price_desc == true) {
  //     sortApi('seller_price', 'desc')
  //   }
  //   if (triggerSortLoadMore.review_asc == true) {
  //     sortApi('review', 'asc')
  //   }
  //   if (triggerSortLoadMore.review_desc == true) {
  //     sortApi('review', 'desc')
  //   }
  //   if (triggerSortLoadMore.sold_asc == true) {
  //     sortApi('sold', 'asc')
  //   }
  //   if (triggerSortLoadMore.sold_desc == true) {
  //     sortApi('sold', 'desc')
  //   }
  // }, [sortIndex])

  const showModal = () => {
    // if (!lastLocation || lastLocation.pathname != '/product-detail'){
    //   localStorage.setItem('product-search-options', null)
    // }
    setVisible(true)
  }
  const handleOk = (values) => {
    setLastIndex(0)
    setFilters(values)
    setVisible(false)
  }

  const getProducts = async () => {
    setLoading(true)
    let params = '';

    let filterOptions = {}

    if (lastLocation && lastLocation.pathname == '/product-detail') {

      if (productSearchOptions) {
        filterOptions = productSearchOptions

      } else {
        filterOptions = filters;
      }

    }
    if (!lastLocation || lastLocation.pathname != '/product-detail'){
      filterOptions = filters;
    }

    if (filterOptions && filterOptions.category && filterOptions.category === '전체보기') {
      delete filterOptions['category']
    }

    if (filterOptions && filterOptions.markets && filterOptions.markets.length) {
      _.each(filterOptions.markets, (market, index) => {
        params += `&market[]=${market}`
      })
    }

    for (const key in filterOptions) {
      if (filterOptions[key]) {

        if (key == 'maxPrice' && filterOptions[key] == 300000){

        } else {
          params += `&${key}=${filterOptions[key]}`

        }

      }
    }

    setParamsOfGetExcelFile(params)

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('token-user'),
      },
    }
    try {
      const res = await axios.get(
        `${API_URL}/product/search?lastIndex=${lastIndex}${params}`,
        config,
      )
      // console.log(res)

      if (res.status == 200) {
        if (lastIndex > 0) {
          setProductList(productList.concat(res.data.data.result))
        } else {
          setProductList(res.data.data.result)
        }
      }
      setLoading(false)
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.statusText == 'Unauthorized'
      ) {
        localStorage.clear()
        props.history.push('/')
      }
      setLoading(false)
    }
    if (typeof filters === 'object') {
      filters.category = '전체보기'
    }
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  // Of Modal Chart
  const [visibleTwo, setVisibleTwo] = useState(false)
  const showModalTwo = () => {
    setVisibleTwo(true)
  }
  const handleOkTwo = (e) => {
    setVisibleTwo(false)
  }
  const handleCancelTwo = (e) => {
    setVisibleTwo(false)
  }

  const goToWeb = (e, record) => {
    e.stopPropagation()
    var win = window.open(record.url, '_blank')
    win.focus()
  }

  /* ---- Of Table ---- */
  const [stateSort, setStateSort] = useState({
    sortedInfo: null,
  })
  let { sortedInfo } = stateSort
  sortedInfo = sortedInfo || {}
  const handleChangeTable = (pagination, filters, sorter) => {
    setStateSort({
      sortedInfo: sorter,
    })
  }

  // const SortSellerPrice = () => (
  //   <>
  //     <div className="style-sort">
  //       <p
  //         onClick={() => {
  //           sortApi('seller_price', 'asc')
  //           setTriggerSortLoadMore({
  //             ...triggerSortLoadMore,
  //             seller_price_asc: true,
  //             seller_price_desc: false,
  //             review_asc: false,
  //             review_desc: false,
  //             sold_asc: false,
  //             sold_desc: false,
  //           })
  //         }}
  //       >
  //         오름차순
  //       </p>
  //       <p
  //         onClick={() => {
  //           sortApi('seller_price', 'desc')
  //           setTriggerSortLoadMore({
  //             ...triggerSortLoadMore,
  //             seller_price_asc: false,
  //             seller_price_desc: true,
  //             review_asc: false,
  //             review_desc: false,
  //             sold_asc: false,
  //             sold_desc: false,
  //           })
  //         }}
  //       >
  //         내림차순
  //       </p>
  //       {/* <p>취소</p> */}
  //     </div>
  //   </>
  // )

  // const SortReview = () => (
  //   <>
  //     <div className="style-sort">
  //       <p
  //         onClick={() => {
  //           sortApi('review', 'asc')
  //           setTriggerSortLoadMore({
  //             ...triggerSortLoadMore,
  //             seller_price_asc: false,
  //             seller_price_desc: false,
  //             review_asc: true,
  //             review_desc: false,
  //             sold_asc: false,
  //             sold_desc: false,
  //           })
  //         }}
  //       >
  //         오름차순
  //       </p>
  //       <p
  //         onClick={() => {
  //           sortApi('review', 'desc')
  //           setTriggerSortLoadMore({
  //             ...triggerSortLoadMore,
  //             seller_price_asc: false,
  //             seller_price_desc: false,
  //             review_asc: false,
  //             review_desc: true,
  //             sold_asc: false,
  //             sold_desc: false,
  //           })
  //         }}
  //       >
  //         내림차순
  //       </p>
  //       {/* <p>취소</p> */}
  //     </div>
  //   </>
  // )

  // const SortSold = () => (
  //   <>
  //     <div className="style-sort">
  //       <p
  //         onClick={() => {
  //           sortApi('sold', 'asc')
  //           setTriggerSortLoadMore({
  //             ...triggerSortLoadMore,
  //             seller_price_asc: false,
  //             seller_price_desc: false,
  //             review_asc: false,
  //             review_desc: false,
  //             sold_asc: true,
  //             sold_desc: false,
  //           })
  //         }}
  //       >
  //         오름차순
  //       </p>
  //       <p
  //         onClick={() => {
  //           sortApi('sold', 'desc')
  //           setTriggerSortLoadMore({
  //             ...triggerSortLoadMore,
  //             seller_price_asc: false,
  //             seller_price_desc: false,
  //             review_asc: false,
  //             review_desc: false,
  //             sold_asc: false,
  //             sold_desc: true,
  //           })
  //         }}
  //       >
  //         내림차순
  //       </p>
  //       {/* <p>취소</p> */}
  //     </div>
  //   </>
  // )

  const columns = [
    {
      title: '상품명',
      dataIndex: 'name',
    },
    {
      title: '벤더명',
      dataIndex: 'bander_name',
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
      // title: <Popover content={<SortSellerPrice />}>가격</Popover>,
      title: '가격',
      render: (record) => {
        return (
          <NumberFormat
            value={record.seller_price}
            displayType={'text'}
            thousandSeparator={true}
          />
        )
      },
      defaultSortOrder: false,
      sorter: (a, b) => a.seller_price - b.seller_price,
    },
    {
      // title: <Popover content={<SortReview />}>리뷰</Popover>,
      title: '리뷰',
      key: '리뷰',
      render: (record) => (
        <NumberFormat
          value={record.review}
          displayType={'text'}
          thousandSeparator={true}
        />
      ),
      defaultSortOrder: false,
      sorter: (a, b) => a.review - b.review,
    },
    {
      // title: <Popover content={<SortSold />}>판매수</Popover>,
      title: '판매수',
      key: '판매수',
      render: (record) => (
        <NumberFormat
          value={record.sold}
          displayType={'text'}
          thousandSeparator={true}
        />
      ),
      defaultSortOrder: false,
      sorter: (a, b) => a.sold - b.sold,
    },
  ]

  /*---- Sort API ----*/
  const loadMore = () => {
    // if (loadMoreFilterOrSort.isFilter) {
    //   const lengthData = productList.length
    //   setLastIndex(productList[lengthData - 1].id)
    // }

    // if (loadMoreFilterOrSort.isSort) {
    //   setSortIndex(productList.length)
    // }
    const lengthData = productList.length
    setLastIndex(productList[lengthData - 1].id)
  }

  // const sortApi = (field, sort) => {
  //   const getData = async () => {
  //     setLoading(true)
  // setLoadMoreFilterOrSort({
  //   ...loadMoreFilterOrSort,
  //   isFilter: false,
  //   isSort: true,
  // })
  // const addSortParam = getParamsFilter.concat(`&sort=${field},${sort}`)
  //     const config = {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'X-Auth-Token': localStorage.getItem('token-user'),
  //       },
  //     }
  //     try {
  //       const res = await axios.get(
  //         `${API_URL}/product/search?sortIndex=${sortIndex}${addSortParam}`,
  //         config,
  //       )
  //       console.log(res)

  //       if (res.status == 200) {
  //         // if (sortIndex > 0) {
  //         //   if (lastIndex > 0) {
  //         //     setProductList([])
  //         //   }
  //         //   setProductList(productList.concat(res.data.data.result))
  //         // } else {
  //         //   setProductList(res.data.data.result)
  //         // }
  //         if (lastIndex > 0) {
  //           setProductList([])
  //         }
  //         setProductList(res.data.data.result)
  //       }
  //       setLoading(false)
  //     } catch (error) {
  //       if (error.response.statusText == 'Unauthorized') {
  //         localStorage.clear()
  //         props.history.push('/')
  //       }
  //       setLoading(false)
  //     }
  //   }
  //   getData()
  // }

  const [countSelected, setCountSelected] = useState(0)

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      )
      setCountSelected(selectedRows.length)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
      setCountSelected(selectedRows.length)
    },
  }

  // RanggePicker
  const { RangePicker } = DatePicker
  const [valueDate, setValueDate] = useState([])
  const onChange = (dateString) => {
    // console.log('Formatted Selected Time: ', dateString);
    let startDay = convertToTimeStamp(dateString[0])
    let endDay = convertToTimeStamp(dateString[1])
    setValueDate([startDay, endDay])
  }

  const getExcelFile = async () => {
    setLoading(true)

    const lengthData = productList.length

    let params = `lastIndex=${productList[lengthData - 1].id}`
    params += `${paramsOfGetExcelFile}`
    console.log(params);

    // if (filters && filters.markets && filters.markets.length) {
    //   _.each(filters.markets, (market, index) => {
    //     params += `&market[]=${market}`
    //   })
    // }

    // for (const key in filters) {
    //   if (filters[key]) {
    //     params += `&${key}=${filters[key]}`
    //   }
    // }

    saleStatusApi
      .getExcelFileProduct(params)
      .then((value) => {
        fileDownload(value, 'data.xls')
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response)
        setLoading(false)
      })
  }

  return (
    <div className="product-search">
      <Row className="card-border" style={{ marginBottom: '2rem' }}>
        <Col span={24} className="wraper-actions">
          <div>
            <Button
              className="main-btn-style border-radius-6"
              onClick={showModal}
              disabled={loading}
            >
              검색
            </Button>
          </div>
          <div className="input-product-search" style={{ display: 'flex' }}>
            <Button
              disabled={loading}
              className="btn-light-blue border-radius-6"
              onClick={getExcelFile}
              style={{
                backgroundColor: '#71c4d5',
                border: 'none',
                marginLeft: '10px',
              }}
              type="primary"
            >
              EXCEL
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="res-small-device card-border">
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={productList}
            pagination={false}
            loading={loading}
            rowKey={(record) => uuidv4()}
            scroll={{ x: 1300 }}
            onChange={handleChangeTable}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  let state = { product: record }

                  if (filters && filters.start && filters.end) {
                    state.data = { start: filters.start, end: filters.end }
                  }

                  props.history.push({
                    pathname: '/product-detail',
                    state,
                  })
                },
              }
            }}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center', marginTop: '2rem' }}>
          {productList.length ? (
            <Button
              onClick={loadMore}
              className="btn-light-blue border-radius-6"
              style={{
                backgroundColor: '#71c4d5',
                border: 'none',
                marginLeft: '10px',
              }}
              type="primary"
              disabled={loading}
            >
              LOAD MORE
            </Button>
          ) : (
            ''
          )}
        </Col>
      </Row>

      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="style-btn"
        footer={false}
      >
        <Filter onOk={(values) => handleOk(values)} />
      </Modal>

      <Modal
        visible={visibleTwo}
        onOk={handleOkTwo}
        onCancel={handleCancelTwo}
        width={1000}
        className="style-btn"
        sorter={true}
        footer={[
          <Button key="back" onClick={handleOkTwo}>
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: '#f4f2ff',
              border: 'none',
              color: '#6b5db0',
              fontWeight: 700,
            }}
            key="submit"
            type="primary"
            onClick={handleCancelTwo}
          >
            OK
          </Button>,
        ]}
      >
        <Chart />
      </Modal>
    </div>
  )
}

export default ProductSearch

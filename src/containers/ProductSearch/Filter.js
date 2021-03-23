import React, { useState } from 'react'
import {
  Checkbox,
  Row,
  Col,
  Slider,
  Button,
  Input,
  Select,
  Modal,
  DatePicker,
} from 'antd'
import { LineOutlined } from '@ant-design/icons'

import './Filter.scss'
import CategoryList from '../CategoryList/CategoryList'
import moment from 'moment'
import NumberFormat from 'react-number-format'

const { RangePicker } = DatePicker
const { Option } = Select

const Filter = (props) => {
  const [hackValue, setHackValue] = useState()
  const [value, setValue] = useState()
  const [dates, setDates] = useState([])

  const [price, setPrice] = useState([50000, 7500000])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [filter, setFilter] = useState({ searchBy: '0', category: '전체보기' })

  function onChangeMarket(value) {
    setFilter({ ...filter, markets: value })
  }

  function onChangeSlider(value) {
    // setFilter({ ...filter, price: value })
    setFilter({ ...filter, minPrice: value[0], maxPrice: value[1] })
  }

  const handleChangeCategory = (value) => {
    setFilter({ ...filter, category: value })
  }

  const onSave = () => {
    props.onOk(filter)
  }

  const minReviews = (e) => {
    // const review = filter.reviews;
    // review[0] = e.target.value
    // setFilter({ ...filter, reviews: review })

    setFilter({ ...filter, minReview: e.target.value })
  }

  const maxReviews = (e) => {
    // const review = filter.reviews;
    // review[1] = e.target.value
    // setFilter({ ...filter, reviews: review })

    setFilter({ ...filter, maxReview: e.target.value })
  }

  const setMinSale = (e) => {
    // const search = filter.searchs;
    // search[0] = e.target.value
    // setFilter({ ...filter, searchs: search })

    setFilter({ ...filter, minSale: e.target.value })
  }

  const setMaxSale = (e) => {
    // const search = filter.searchs;
    // search[1] = e.target.value
    // setFilter({ ...filter, searchs: search })

    setFilter({ ...filter, maxSale: e.target.value })
  }

  const onChangeSearch = (e) => {
    setFilter({ ...filter, key: e.target.value })
  }

  const onChangeStartDate = (date, dateString) => {
    setFilter({ ...filter, start: moment(dateString).unix() })
  }

  const onChangeEndDate = (date, dateString) => {
    setFilter({ ...filter, end: moment(dateString).unix() })
  }

  const handleChangeSearchBy = (value) => {
    setFilter({ ...filter, searchBy: value })
  }

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([])
      setDates([])
    } else {
      setHackValue(undefined)
    }
  }

  const disabledDate = (current) => {
    const daysInMonth = parseInt(moment(current, 'YYYY-MM').daysInMonth())

    if (!dates || dates.length === 0) {
      const date =
        (current && moment(current).format('DD') == 1) ||
        (current && moment(current).format('DD') == 15) ||
        (current && moment(current).format('DD') == daysInMonth)

      return !date
    } else {
      if (dates[0]) {
        return !(
          (moment(dates[0]).format('YYYY-MM') ==
            moment(current).format('YYYY-MM') &&
            current &&
            moment(current).format('DD') == 1) ||
          (moment(dates[0]).format('YYYY-MM') ==
            moment(current).format('YYYY-MM') &&
            current &&
            moment(current).format('DD') == 15) ||
          (moment(dates[0]).format('YYYY-MM') ==
            moment(current).format('YYYY-MM') &&
            current &&
            moment(current).format('DD') == daysInMonth)
        )
      }

      if (dates[1]) {
        return !(
          (moment(dates[1]).format('YYYY-MM') ==
            moment(current).format('YYYY-MM') &&
            current &&
            moment(current).format('DD') == 1) ||
          (moment(dates[1]).format('YYYY-MM') ==
            moment(current).format('YYYY-MM') &&
            current &&
            moment(current).format('DD') == 15) ||
          (moment(dates[1]).format('YYYY-MM') ==
            moment(current).format('YYYY-MM') &&
            current &&
            moment(current).format('DD') == daysInMonth)
        )
      }
    }
  }

  const onChangeRangePicker = (val) => {
    setValue(val)

    if (val && val[0] && val[1]) {
      const startDate = parseInt(moment(val[0]).format('DD'))
      const endDate = parseInt(moment(val[1]).format('DD'))

      if (startDate == endDate) {
        setValue('')
      }

      setFilter({
        ...filter,
        start: moment(val[0]).unix(),
        end: moment(val[1]).unix(),
      })
    } else {
      setFilter({ ...filter, start: '', end: '' })
    }
  }

  const onCalendarChange = (val) => {
    if (val && val[0]) {
      const daysInMonth = parseInt(moment(val[0], 'YYYY-MM').daysInMonth())
      const day = parseInt(moment(val[0]).format('DD'))
      if (daysInMonth == day) {
        modal('시작일은 월의 마지막 일자가 될 수 없습니다')
        return
      }
    }

    if (val && val[1]) {
      const day = parseInt(moment(val[1]).format('DD'))
      if (1 == day) {
        modal('시작일을 마지막 일자로 선택 할 수 없습니다')
        return
      }
    }

    if (val && val[0] && val[1]) {
      const startDate = parseInt(moment(val[0]).format('DD'))
      const endDate = parseInt(moment(val[1]).format('DD'))

      if (startDate == endDate) {
        modal('시작일은 종료일과 같을 수 없습니다')

        return
      }
    }

    setDates(val)
  }

  const modal = (text) => {
    Modal.error({
      title: '에러',
      content: text,
    })
  }

  return (
    <div className="modal">
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={4}>
          <h4>시작일, 종료일</h4>
        </Col>
        <Col span={16}>
          <RangePicker
            value={hackValue || value}
            // disabledDate={disabledDate}
            // onCalendarChange={val => onCalendarChange(val)}
            onChange={(val) => onChangeRangePicker(val)}
            onOpenChange={onOpenChange}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: '2rem' }}>
        <Col span={4}>
          <h4>검색</h4>
        </Col>
        <Col span={15}>
          <Input style={{ marginRight: '5px' }} onChange={onChangeSearch} />
        </Col>
        <Col span={5}>
          <Select
            onChange={handleChangeSearchBy}
            defaultValue="2"
            className="select-after"
          >
            <Option value="0">카테고리</Option>
            <Option value="1">밴더명</Option>
            <Option value="2">제품명</Option>
          </Select>
        </Col>
      </Row>

      {/* <Row style={{ marginBottom: '2rem' }}>
                <Col span={4}><h4>Search By</h4></Col>
                <Col span={20}>
                    <Select onChange={handleChangeSearchBy} defaultValue="0" className="select-after">
                        <Option value="0">밴더명</Option>
                        <Option value="1">제품명</Option>
                    </Select>
                </Col>
            </Row> */}

      <Row>
        <Col span={4}>
          <h4>마켓</h4>
        </Col>
        <Col span={20}>
          <Checkbox.Group onChange={onChangeMarket}>
            <Row>
              <Col span={6}>
                <Checkbox value="11번가">11번가</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="G마켓">G마켓</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="쿠팡">쿠팡</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="위메프">위메프</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="티몬">티몬</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="인터파크">인터파크</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="스마트스토어">스마트스토어</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="전제 선택">전제 선택</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>

      <Row style={{ marginTop: '2rem' }}>
        <Col span={4}>
          <h4>카테고리</h4>
        </Col>
        <Col className="select-category-analysis">
          <CategoryList
            category={filter.category}
            onChangeCategory={(value) => handleChangeCategory(value)}
          />
          {/* <p style={{ padding: '.5rem 1.5rem', backgroundColor: '#F8F8FB' }}>
            전체보기
          </p> */}
        </Col>
      </Row>

      <Row className="price" style={{ marginTop: '2rem' }}>
        <Col span={4}>
          <h4>가격</h4>
        </Col>
        <Col span={20}>
          <Row>
            <Col span={1}>
              <div>₩ 0</div>
            </Col>
            <Col span={19}>
              <Slider
                step={1000}
                min={0}
                max={100000000}
                range
                defaultValue={[filter.minPrice, filter.maxPrice]}
                onChange={onChangeSlider}
                onAfterChange={onChangeSlider}
              />
            </Col>
            <Col span={4}>
              <div>₩ 100,000,000</div>
            </Col>

            <Col span={4}>
              <div style={{ color: '#42ABBC' }}>
                <NumberFormat
                  value={filter.minPrice}
                  displayType={'text'}
                  prefix={'₩'}
                  thousandSeparator={true}
                />
              </div>
            </Col>
            <Col span={16}></Col>
            <Col span={4}>
              <div style={{ color: '#42ABBC' }}>
                <NumberFormat
                  value={filter.maxPrice}
                  displayType={'text'}
                  prefix={'₩'}
                  thousandSeparator={true}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="search-number-of-review" style={{ marginBottom: '1rem' }}>
        <Col span={4}>
          <h4>리뷰수 검색</h4>
        </Col>
        <Col span={20}>
          <Row>
            <Input.Group compact>
              <Input
                onChange={minReviews}
                style={{ width: 150, textAlign: 'center' }}
                suffix="최소"
              />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#f4f2ff !important',
                  border: 'none',
                  margin: '0 1rem',
                }}
                placeholder="~"
                disabled
              />
              <Input
                onChange={maxReviews}
                style={{
                  width: 150,
                  textAlign: 'center',
                }}
                suffix="최소"
              />
            </Input.Group>
          </Row>
        </Col>
      </Row>

      <Row className="sale-search" style={{ marginBottom: '1rem' }}>
        <Col span={4}>
          <h4>판매수 검색</h4>
        </Col>
        <Col span={20}>
          <Row>
            <Input.Group compact>
              <Input
                onChange={setMinSale}
                style={{ width: 150, textAlign: 'center' }}
                suffix="최소"
              />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#f4f2ff !important',
                  border: 'none',
                  margin: '0 1rem',
                }}
                placeholder="~"
                disabled
              />
              <Input
                onChange={setMaxSale}
                className="site-input-right"
                style={{
                  width: 150,
                  textAlign: 'center',
                }}
                suffix="최소"
              />
            </Input.Group>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: 'center', marginTop: '2rem' }}>
          <span className="btn-save" onClick={onSave}>
            확인
          </span>
        </Col>
      </Row>

      {/* <Row className='jam-factory-average'>
                <Col span={4}>
                    <h4>잼팩토리 평균</h4>
                </Col>
                <Col span={20}>
                    <Button className='style-btn'>잼팩토리 평균판매 건 보다 높은 상품 보기 </Button>
                    <Button className='style-btn'>잼팩토리 평균판매 건 보다 낮은 상품 보기 </Button>
                </Col>
            </Row> */}

      {/* <Row className='modal-btn' style={{ justifyContent: 'center' }}>
                <Col style={{ padding: '1rem'}} span={3}><Button  className='style-btn' >적용하기</Button></Col>
            </Row> */}
    </div>
  )
}

export default Filter

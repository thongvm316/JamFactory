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

import './Filter.scss'
import CategoryList from '../CategoryList/CategoryList'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useLastLocation } from 'react-router-last-location';

const { RangePicker } = DatePicker
const { Option } = Select

const Filter = (props) => {
  const [hackValue, setHackValue] = useState()
  const [value, setValue] = useState()
  const [dates, setDates] = useState([])

  const [filter, setFilter] = useState({ category: '카테고리 선택' })

  let lastLocation = useLastLocation();
  let productSearchOptions = lastLocation && lastLocation.pathname == '/product-detail' ? JSON.parse(localStorage.getItem('product-search-options')) : filter

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
    localStorage.setItem('product-search-options', JSON.stringify(filter))
    props.onOk(filter)
  }

  const minReviews = (e) => {
    setFilter({ ...filter, minReview: e.target.value })
  }

  const maxReviews = (e) => {
    setFilter({ ...filter, maxReview: e.target.value })
  }

  const setMinSale = (e) => {
    setFilter({ ...filter, minSale: e.target.value })
  }

  const setMaxSale = (e) => {
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

  const onChangeRangePicker = (val) => {
    setValue(val)
    console.log(val)
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
        rangePicker: val
      })
    } else {
      setFilter({ ...filter, start: '', end: ''})
    }
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
            defaultValue={productSearchOptions && productSearchOptions.rangePicker ? [moment(productSearchOptions.rangePicker[0]), moment(productSearchOptions.rangePicker[1])] : ''}
            value={hackValue || value}
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
          <Input style={{ marginRight: '5px' }} defaultValue={productSearchOptions && productSearchOptions.key ? productSearchOptions.key : ''} onChange={onChangeSearch} />
        </Col>
        <Col span={5}>
          <Select
            onChange={handleChangeSearchBy}
            defaultValue={productSearchOptions && productSearchOptions.searchBy ? productSearchOptions.searchBy : '1'}
            className="select-after"
          >
            <Option value="0">카테고리</Option>
            <Option value="1">밴더명</Option>
            <Option value="2">제품명</Option>
          </Select>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <h4>마켓</h4>
        </Col>
        <Col span={20}>
          <Checkbox.Group defaultValue={productSearchOptions && productSearchOptions.markets ? productSearchOptions.markets : ''} onChange={onChangeMarket}>
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
            category={productSearchOptions && productSearchOptions.category ? productSearchOptions.category : filter.category}
            onChangeCategory={(value) => handleChangeCategory(value)}
          />
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
                defaultValue={[productSearchOptions && productSearchOptions.minPrice ? productSearchOptions.minPrice : '', productSearchOptions && productSearchOptions.maxPrice ? productSearchOptions.maxPrice : '']}
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
                  value={productSearchOptions && productSearchOptions.minPrice ? productSearchOptions.minPrice : filter.minPrice}
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
                  value={productSearchOptions && productSearchOptions.maxPrice ? productSearchOptions.maxPrice : filter.maxPrice}
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
                defaultValue={productSearchOptions && productSearchOptions.minReview ? productSearchOptions.minReview : ''}
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
                defaultValue={productSearchOptions && productSearchOptions.maxReview ? productSearchOptions.maxReview : ''}
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
                defaultValue={productSearchOptions && productSearchOptions.minSale ? productSearchOptions.minSale : ''}
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
                defaultValue={productSearchOptions && productSearchOptions.maxSale ? productSearchOptions.maxSale : ''}
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

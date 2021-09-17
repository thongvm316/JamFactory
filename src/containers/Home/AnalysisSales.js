import React, { useState, useEffect } from 'react'
import './AnalysisSales.scss'
import GroupButton from './GroupButton/GroupButton'
import {
    DatePicker,
    Button,
    Row,
    Select,
    Col,
    Spin
} from 'antd'
import { market_list, category_list, API_URL } from '../../constants/appConstants'
import moment from 'moment';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
const { Option } = Select

const AnalysisSales = (props) => {
    const paramsInterface = {
        year: moment().format('YYYY'),
        market: '11번가',
        category: '',
    }

    const [params, setParams] = useState(paramsInterface);
    const [months, setMonths] = useState();
    const [values, setValues] = useState();
    const [spinning, setSpinning] = useState(true);
    const [categories, setCategories] = useState([]);
    const [firstUpdate, setFirstUpdate] = useState(false);



    const onChangeDatePicker = (year, yearString) => {
        setParams({ ...params, year: yearString })
    }

    const onChangeMarket = (market) => {
        setParams({ ...params, market })
    }

    const onChangeCategory = (category) => {
        setParams({ ...params, category })
    }

    useEffect(() => {
        onGetCategory()
    }, [params.market])

    useEffect(() => {
        onFilter()
    }, [firstUpdate])

    const onGetCategory = async () => {
        setCategories([])
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': `${localStorage.getItem('token-user')}`,
            },
        }
        try {
            const { data } = await axios.get(`${API_URL}/home/listcategory?market=${params.market}`, config)
            if (data.success) {
                setCategories(data.data.result)
                setParams({ ...params, category: data.data.result[0] })
                setFirstUpdate(true)
            }

        } catch (error) {

        }
    }

    const onFilter = async () => {
        setValues([]);
        setSpinning(true)
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': `${localStorage.getItem('token-user')}`,
            },
        }
        try {
            const { data } = await axios.get(`${API_URL}/home/categoryanalyze?year=${params.year}&market=${params.market}&category=${params.category}`, config)
            if (data.success) {
                let months = data.data.result.map(item => item.month)
                let values = data.data.result.map(item => parseInt(item.sale) || '')
                setMonths(months);
                setValues(values);
            }
            setSpinning(false)

        } catch (error) {
            setSpinning(false)
        }
    }
    var colors = ['#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A', '#FF4A4A'];
    const options = {
        title: '',

        subtitle: {
            text: ''
        },

        yAxis: {
            labels: {
                enabled: false
            },
            enabled: false,
            title: {
                text: ''
            }
        },

        xAxis: {
            categories: months,
            labels: {
                formatter: function () {
                    return this.value + '월'
                },
            },
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return '₩ ' + String(this.y).replace(/(.)(?=(\d{3})+$)/g, '$1,')
                    },
                }
            },
            pie: {
                colors: colors
            }
        },
        colors: colors,
        series: [{
            name: 'Installation',
            data: values
        }],
        legend: {
            enabled: false
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }
    return (
        <div className='analysis-market'>
            <GroupButton redirect={props.history.push} clickable='d' />
            <Row className="aggregate-month card-border" style={{ marginBottom: 20 }}>
                <div className="filters">
                    <div className="params">
                        <div className="label">
                            집계 년도
                        </div>
                        <div className="option">
                            <DatePicker
                                defaultValue={moment()} format={'YYYY'}
                                onChange={onChangeDatePicker}
                                bordered={false}
                                picker="year"
                            />
                        </div>
                    </div>
                    <div className="params">
                        <div className="label">
                            마켓
                        </div>
                        <div className="option">
                            <Select
                                style={{ width: 200 }}
                                onChange={onChangeMarket}
                                defaultValue={market_list[0]}
                            >
                                {
                                    market_list.map(market => {
                                        return (
                                            <Option key={market} value={market}>{market}</Option>

                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="params">
                        <div className="label">
                            카테고리
                        </div>
                        <div className="option">
                            <Select
                                style={{ width: 200 }}
                                onChange={onChangeCategory}
                                value={params.category}
                            >
                                {
                                    categories.map(category => {
                                        return (
                                            <Option key={category} value={category}>{category}</Option>

                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <Button
                        onClick={() => onFilter()}
                        className='btn-light-blue border-radius-6'
                        style={{
                            backgroundColor: '#42abbc',
                            border: 'none',
                        }}
                        type='primary'>
                        적용하기
                    </Button>
                </div>
            </Row>


            <Row gutter={24} style={{ backgroundColor: 'white' }}>
                <Col span={24} style={{ paddingLeft: 40, paddingTop: 20, marginBottom: 60 }}>
                    <div>판매 추이 그래프</div>
                </Col>
                <Col span={24}>
                    <Spin spinning={spinning}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                            {...props}
                        />
                    </Spin>
                </Col>

            </Row>
        </div>
    )
}

export default AnalysisSales
import React, { useState, useEffect } from 'react'
import './MarketSaleStatusChart.scss'
import { API_URL } from '../../constants/appConstants'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { Spin } from 'antd'
import moment from 'moment'

const MarketSaleStatusChart = (props) => {
  const [data, setData] = useState([])
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    getData()
  }, [props.year])

  /* Chart */
  const convertData = (data, isGetRevenue, isGetSold) => {
    const dataForRender = ['', '', '', '', '', '', '', '', '', '', '', '']
    if (isGetRevenue) {
      data.map((item) => {
        let parseToNumber = parseInt(item.created)
        if (parseToNumber === 1) {
          dataForRender[0] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 2) {
          dataForRender[1] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 3) {
          dataForRender[2] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 4) {
          dataForRender[3] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 5) {
          dataForRender[4] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 6) {
          dataForRender[5] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 7) {
          dataForRender[6] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 8) {
          dataForRender[7] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 9) {
          dataForRender[8] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 10) {
          dataForRender[9] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 11) {
          dataForRender[10] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
        if (parseToNumber === 12) {
          dataForRender[11] = {
            y: parseInt(item.revenue),
            name: item.bander_name,
          }
        }
      })
    }

    if (isGetSold) {
      data.map((item) => {
        let parseToNumber = parseInt(item.created)
        if (parseToNumber === 1) {
          dataForRender[0] = parseInt(item.sold)
        }
        if (parseToNumber === 2) {
          dataForRender[1] = parseInt(item.sold)
        }
        if (parseToNumber === 3) {
          dataForRender[2] = parseInt(item.sold)
        }
        if (parseToNumber === 4) {
          dataForRender[3] = parseInt(item.sold)
        }
        if (parseToNumber === 5) {
          dataForRender[4] = parseInt(item.sold)
        }
        if (parseToNumber === 6) {
          dataForRender[5] = parseInt(item.sold)
        }
        if (parseToNumber === 7) {
          dataForRender[6] = parseInt(item.sold)
        }
        if (parseToNumber === 8) {
          dataForRender[7] = parseInt(item.sold)
        }
        if (parseToNumber === 9) {
          dataForRender[8] = parseInt(item.sold)
        }
        if (parseToNumber === 10) {
          dataForRender[9] = parseInt(item.sold)
        }
        if (parseToNumber === 11) {
          dataForRender[10] = parseInt(item.sold)
        }
        if (parseToNumber === 12) {
          dataForRender[11] = parseInt(item.sold)
        }
      })
    }

    return dataForRender
  }

  const optionsLineAndColumnChart = {
    title: '',
    chart: {
      zoomType: 'xy',
      width: 350,
    },
    xAxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      labels: {
        formatter: function () {
          return this.value + '월'
        },
      },
    },
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
    // tooltip: {
    //   shared: true,
    // },
    credits: {
      enabled: false,
    },
    legend: false,
    plotOptions: {
      column: {
        states: {
          hover: {
            color: '#FFC26F',
          },
        },
      },
      series: {
        marker: {
          enabled: false,
        },
        lineWidth: 6,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat:
        '<small style="color: #1890ff; font-size: 15px">{point.key}</small><table>',
      pointFormat:
        '<tr><td style="color: {series.color}">{series.name} </td>' +
        '<td style="text-align: left"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
    },
    series: [
      {
        name: '',
        type: 'column',
        yAxis: 1,
        data: convertData(data, true, false),
        tooltip: {
          valueSuffix: '  매출액',
          valuePrefix: '₩',
        },
        color: '#ECE9F1',
      },
      {
        name: '',
        type: 'spline',
        data: convertData(data, false, true),
        tooltip: {
          valueSuffix: '  판매건수',
        },
      },
    ],
  }

  const getData = async () => {
    setSpinning(true)
    const currentYear = moment().year()
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('token-user'),
      },
    }
    try {
      const res = await axios.get(
        `${API_URL}/product/detail/marketsalestatus?market=${
          props.market
        }&productId=${props.productId}&year=${
          props.year ? props.year : currentYear
        }`,
        config,
      )
      if (res.status === 200) {
        setData(res.data.data.result)
      }
    } catch (error) {
      console.log(error.response)
      setSpinning(false)
      if (error && error.response && error.response.statusText) {
        if (error.response.statusText === 'Unauthorized') {
          localStorage.clear()
          props.history.push('/')
        }
      }
    }
    setSpinning(false)
  }

  return (
    <div>
      <Spin tip='Loading...' spinning={spinning}>
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsLineAndColumnChart}
          {...props}
        />
        <div className='market'>{props.market}</div>
      </Spin>
    </div>
  )
}

export default MarketSaleStatusChart

import React from 'react'
import { Layout, Menu, Image } from 'antd'
import { NavLink } from 'react-router-dom'
import Home from '../images/Home.png'
import Search from '../images/search.png'
import Vendorsearch from '../images/vendorsearch.png'
import Chart from '../images/chart.png'
import './Sidebar.scss'

const Sidebar = (props) => {
  const { collapsed } = props

  return (
    <Layout.Sider
      style={{ background: '#414955', height: 'auto' }}
      className="sidebar-left-menu"
      collapsedWidth="0"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        theme="dark"
        style={{ background: '#414955' }}
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item className="app-menu-item" key="/home">
          <h1
            to=""
            style={{ fontWeight: '900', color: 'white', fontSize: '24px' }}
          >
            GEM BOX
          </h1>
        </Menu.Item>
        <Menu.Item
          style={{ marginTop: '50px' }}
          className="app-menu-item"
          key="/page1"
        >
          <NavLink to="/home">
            <Image src={Home} style={{ marginRight: '11px' }} />홈
          </NavLink>
        </Menu.Item>
        <Menu.Item className="app-menu-item" key="/page2">
          <NavLink to="/product-search">
            <Image src={Search} style={{ marginRight: '11px' }} />
            상품 검색
          </NavLink>
        </Menu.Item>
        <Menu.Item className="app-menu-item" key="/page3">
          <NavLink to="/vendor-search">
            <Image src={Vendorsearch} style={{ marginRight: '11px' }} />
            밴더 검색
          </NavLink>
        </Menu.Item>
        <Menu.Item className="app-menu-item" key="/page5">
          <NavLink to="/sale-status">
            <Image src={Chart} style={{ marginRight: '11px' }} />
            나의 판매 현황
          </NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}
export default Sidebar

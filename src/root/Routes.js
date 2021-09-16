import React from 'react'
import { Switch } from 'react-router-dom'

import SignUp from '../containers/Register/SignUp'
import Login from '../containers/Login'

import LoginLayout from '../components/LoginLayout'
import RegisterLayout from '../components/RegisterLayout'

import Home from '../containers/Home/Home'
import CategoryAnalysis from '../containers/Home/CategoryAnalysis'
import AnalysisMarket from '../containers/Home/AnalysisMarket'

import ProductSearch from '../containers/ProductSearch/ProductSearch'
import ProductDetail from '../components/ProductDetail/ProductDetail'
import VendorSearch from '../containers/VendorSearch/VendorSearch'
import SaleStatus from '../containers/SaleStatus/SaleStatus'

import AdminMember from '../containers/Admin/AdminMember/AdminMember'
import MemberDetail from '../containers/Admin/AdminMember/MemberDetail'
import AdminLogin from '../containers/Admin/AdminLogin'
import AdminFindAccount from '../containers/Admin/AdminFindAccount'
import AdminMemberRequest from '../containers/Admin/AdminMemberRequest/AdminMemberRequest'
import AdminMemberRequestDetail from '../containers/Admin/AdminMemberRequest/AdminMemberRequestDetail'
import UserDetail from '../containers/UserDetail/UserDetail'
import AdminSetting from '../containers/Admin/AdminSetting'

import PrivateRoute from './PrivateRoute'
import AppRoute from './AppRoute'

import AdminMemberContextProvider from '../lib/admin/AdminMemberContext'
import UserDetailContextProvider from '../lib/userdetail/UserDetailContext'
import AnalysisSales from '../containers/Home/AnalysisSales'

const Routes = () => {
  return (
    <AdminMemberContextProvider>
      <Switch>
        {/* Admin */}
        <AppRoute
          exact
          path="/admin-login"
          component={AdminLogin}
          layout={LoginLayout}
        />
        <AppRoute
          exact
          path="/admin-find-account"
          component={AdminFindAccount}
          layout={LoginLayout}
        />

        <PrivateRoute
          exact
          showSiderBar={false}
          path="/admin-member"
          dataToken={'token'}
          component={AdminMember}
        />
        <PrivateRoute
          exact
          showSiderBar={false}
          path="/member-detail"
          dataToken={'token'}
          component={MemberDetail}
        />
        <PrivateRoute
          exact
          showSiderBar={false}
          path="/member-request"
          dataToken={'token'}
          component={AdminMemberRequest}
        />
        <PrivateRoute
          exact
          showSiderBar={false}
          path="/member-request-detail"
          dataToken={'token'}
          component={AdminMemberRequestDetail}
        />

        <PrivateRoute
          exact
          showSiderBar={false}
          path="/admin-setting"
          dataToken={'token'}
          component={AdminSetting}
        />

        {/* Signup - Login */}
        <AppRoute exact path="/" component={Login} layout={LoginLayout} />
        <AppRoute
          exact
          path="/signup"
          component={SignUp}
          layout={RegisterLayout}
        />

        {/* Home Page */}
        <PrivateRoute
          showSiderBar={true}
          exact
          path="/home"
          dataToken={'token-user'}
          component={Home}
        />
        <PrivateRoute
          showSiderBar={true}
          exact
          path="/category-analysis"
          dataToken={'token-user'}
          component={CategoryAnalysis}
        />
        <PrivateRoute
          showSiderBar={true}
          exact
          path="/analysis-sales"
          dataToken={'token-user'}
          component={AnalysisSales}
        />
        <PrivateRoute
          showSiderBar={true}
          exact
          path="/analysis-market"
          dataToken={'token-user'}
          component={AnalysisMarket}
        />

        <PrivateRoute
          showSiderBar={true}
          dataToken={'token-user'}
          exact
          path="/product-search"
          component={ProductSearch}
        />
        <PrivateRoute
          showSiderBar={true}
          dataToken={'token-user'}
          exact
          path="/vendor-search"
          component={VendorSearch}
        />
        <PrivateRoute
          showSiderBar={true}
          dataToken={'token-user'}
          exact
          path="/product-detail"
          component={ProductDetail}
        />

        <PrivateRoute
          showSiderBar={true}
          dataToken={'token-user'}
          exact
          path="/sale-status"
          component={SaleStatus}
        />
        <UserDetailContextProvider>
          <PrivateRoute
            showSiderBar={true}
            dataToken={'token-user'}
            exact
            path="/user-detail"
            component={UserDetail}
          />
        </UserDetailContextProvider>
      </Switch>
    </AdminMemberContextProvider>
  )
}
export default Routes

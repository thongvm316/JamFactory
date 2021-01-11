import React from 'react';
import { Switch } from "react-router-dom";

import SignUp from '../containers/Register/SignUp'
import Login from '../containers/Login';

import LoginLayout from '../components/LoginLayout'
import RegisterLayout from '../components/RegisterLayout'

import Home from '../containers/Home/Home';
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
import UserDetail from '../containers/UserDetail/UserDetail';
import AdminSetting from '../containers/Admin/AdminSetting'

import PrivateRoute from './PrivateRoute'
import AppRoute from './AppRoute';

const Routes = () => {
    return (
        <Switch>
            {/* Admin */}
            <AppRoute exact path="/admin-login" component={AdminLogin} layout={LoginLayout} />
            <AppRoute exact path="/admin-find-account" component={AdminFindAccount} layout={LoginLayout} />
            <PrivateRoute exact path="/admin-member" component={AdminMember} />
            <PrivateRoute exact path="/member-detail" component={MemberDetail} />
            <PrivateRoute exact path="/member-request" component={AdminMemberRequest} />
            <PrivateRoute exact path="/member-request-detail" component={AdminMemberRequestDetail} />
            <PrivateRoute exact path="/admin-setting" component={AdminSetting} />

            {/* Signup - Login */}
            <AppRoute exact path="/" component={Login} layout={LoginLayout} />
            <AppRoute exact path="/signup" component={SignUp} layout={RegisterLayout} />

            {/* Home Page */}
            <AppRoute exact path="/home" component={Home} />
            <AppRoute exact path="/category-analysis" component={CategoryAnalysis} />
            <AppRoute exact path="/analysis-market" component={AnalysisMarket} />

            <AppRoute exact path="/product-search" component={ProductSearch} />
            <AppRoute exact path="/vendor-search" component={VendorSearch} />
            <AppRoute exact path="/sale-status" component={SaleStatus} />
            <AppRoute exact path="/product-detail" component={ProductDetail} />
            <AppRoute exact path="/user-detail" component={UserDetail} />
        </Switch>
    )
}
export default Routes;


import React, { Component } from 'react'
import {Row,Col} from 'antd'
import axios from 'axios'
import './index.less'
import Util from './../../utils/utils'
import {connect} from 'react-redux'
class Header extends Component {
    state={
        sysTime:""
    }
    componentWillMount(){
        this.setState({
            userName:'山海藏着星辰'
        })
        setInterval(()=>{
            let sysTime=Util.formateDate(new Date().getTime());
            this.setState({sysTime})
        },1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData(){
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=7083679848914704be906e0a9e4f089b")
        .then(res=>{
            console.log("res",res.data.now.text);
            this.setState({
                weather:res.data.now.text
            })
        })
    }

    render() {
        const menuType=this.props.menuType;
        return (
            <div className="header">
               <Row className="header-top">
                   {
                       menuType?
                            <Col span={6} className="logo">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>Imooc 通用管理系统</span>
                            </Col>:''
                   }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="javasrcipt:;">退出</a>
                    </Col>
               </Row>
              {
                  menuType?'':
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            {this.props.menuName}
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>
              }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        menuName:state.menuName
    }
}
export default connect(mapStateToProps)(Header)
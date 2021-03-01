import React, { Component } from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import echartTheme from './../echartTheme' //导入主题
//导入饼图  核心组件
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'//一根线
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend' //副标题
import 'echarts/lib/component/markPoint' //一个点
import ReactEcharts from 'echarts-for-react'
export default class Line extends Component {
    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }
    getOption1=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis',
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO订单量',
                    type:'line',
                    data:[
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name:'摩拜订单量',
                    type:'line',
                    data:[
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                }
            ]
        }
        return option
    }
    getOption3=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'//自定义
            },
            xAxis:{
                boundaryGap:false,
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle:{}
                }
            ]
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="折线图表之一">
                    <ReactEcharts option={this.getOption1()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card title="折现图表之二">
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card title="折现图表之三">
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}


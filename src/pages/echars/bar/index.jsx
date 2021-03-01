import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
//导入柱形图 核心组件
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip' //一根线
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend' //副标题
import 'echarts/lib/component/markPoint' // 一个点
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {
    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme); //注入主题 不注入的话不能使用
    }
    getOption1=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{ //鼠标划入显示数据
                trigger:'axis'
            },
            xAxis:{//x轴展示的数据
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{//y轴展示数据
                type:'value'
            },
            series:[//数据源 要跟上面的x轴一一对应
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,2000,1500,3000,2000,1200,800]
                }
            ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑乘订单'
            },
            legend:{//副标题
                data:['OFO','摩拜','哈罗']
            },
            tooltip:{
                trrigger:'axis'
            },
            xAxis:{//x轴展示的数据
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type:'bar',
                    data:[2000,3000,5500,7000,8000,12000,20000]
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[1500,3000,4500,6000,8000,10000,15000]
                },
                {
                    name:'哈罗',
                    type:'bar',
                    data:[1000,2000,2500,4000,6000,7000,8000]
                },
            ]
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption1()} theme="Imooc" style={{height:500}}/>
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}

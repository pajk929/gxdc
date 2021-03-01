import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../themeLight'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'//一根线
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend' //副标题
import 'echarts/lib/component/markPoint' //一个点
import ReactEcharts from 'echarts-for-react'
export default class Pie extends Component {
    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }
    getOption1=()=>{
        let option={
            title:{
                text:'用户骑行订单',
                x:'center'//标题水平方向居中
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom: 20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',//自定义
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:1000,
                            name:'周二'
                        },
                        {
                            value:2000,
                            name:'周三'
                        },
                        {
                            value:1500,
                            name:'周四'
                        },
                        {
                            value:3000,
                            name:'周五'
                        },
                        {
                            value:2000,
                            name:'周六'
                        },
                        {
                            value:1200,
                            name:'周日',
                        },
                    ]
                }
            ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom: 20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',//自定义
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:['50%','80%'],
                    center:['50%','60%'],
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:1000,
                            name:'周二'
                        },
                        {
                            value:2000,
                            name:'周三'
                        },
                        {
                            value:1500,
                            name:'周四'
                        },
                        {
                            value:3000,
                            name:'周五'
                        },
                        {
                            value:2000,
                            name:'周六'
                        },
                        {
                            value:1200,
                            name:'周日',
                        },
                    ]
                }
            ]
        }
        return option
    }
    getOption3=()=>{
        let option={
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom: 20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',//自定义
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:1000,
                            name:'周二'
                        },
                        {
                            value:2000,
                            name:'周三'
                        },
                        {
                            value:1500,
                            name:'周四'
                        },
                        {
                            value:3000,
                            name:'周五'
                        },
                        {
                            value:2000,
                            name:'周六'
                        },
                        {
                            value:1200,
                            name:'周日',
                        },
                    ].sort((a,b)=>{
                        return a.value-b.value
                    }),
                    roseType:'radius',//南丁格尔图
                    animationType:'scale',
                    animationEasing:'elasticOut',
                    animationDelay:function (idx){
                        return Math.random() * 200
                    }
                }
            ]
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="饼图表之一">
                    <ReactEcharts option={this.getOption1()} theme="Imooc" style={{height: 500}}/>
                </Card>
                <Card title="饼图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height: 500}}/>
                </Card>
                <Card title="饼图表之三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height: 500}}/>
                </Card>
            </div>
        )
    }
}

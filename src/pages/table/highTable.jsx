import React, { Component } from 'react'
import {Card,Table, Modal,message,Badge} from 'antd'
import axios from './../../axios/index'
export default class HighTable extends Component {
    state={
        dataSource2:[]
    }
    params={
        page:1
    }
    componentDidMount(){
        this.request() //强求ajax数据
    }
    //动态获取mock数据
    request=()=>{
        axios.ajax({
            url:'/table/high/list',
            data:{
                parans:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            if(res.code===0){
                res.result.list.map((item,index)=>{
                    return item.key=index
                })
            }
            console.log("result.list",res.result.list);
            this.setState({
                dataSource:res.result.list,
            })
        })
    }
    //点一下为升序 再点一下为降序
    handleChange=(pagination,filters,sorter)=>{
        console.log("sorter",sorter);
        this.setState({
            sortOrder:sorter.order
        })
    }
    //多选执行删除操作
    handleDelete = ()=>{
        let rows = this.state.selectedRows;
        let ids=[];
        rows.map(item=>{
            return ids.push(item.id);
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}  `,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns=[
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){//处理当前字段 对当前字段进行格式化
                    return sex=1? '男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){//处理当前字段 对当前字段进行格式化
                    let config={
                        '1':'山海藏着星辰',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(abc){//处理当前字段 对当前字段进行格式化
                    let config={
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[abc]
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            },
        ]
        const columns2 = [
            {
                title:'id',
                key:'id',
                width:80,
                fixed:'left',//固定
                dataIndex:'id'
            },
            {
                title:"用户名",
                width:80,
                fixed:'left',
                dataIndex: 'userName'
            },{
                title:"性别",
                width:80,
                dataIndex:'sex',
                render(sex){ //处理当前字段 对当前字段进行格式化
                    return sex= 1 ?'男':'女'
                }
            },{
                title:"状态",
                width:80,
                dataIndex:"state",
                render(state){
                    let config = {
                        '1':'山海藏着星辰',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },{
                title:"爱好",
                width:80,
                dataIndex:'interest',
                render(abc){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[abc];
                }
            },{
                title:"生日",
                width:120,
                key:"brithday1",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday2",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday3",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday4",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday5",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday6",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday7",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday8",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday9",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday10",
                dataIndex:'birthday'
            },{
                title:"生日",
                width:120,
                key:"brithday11",
                dataIndex:'birthday'
            },{
                title:"地址",
                width:120,
                fixed:'right',//右侧固定
                dataIndex:'address'
            },{
                title:'早起时间',
                width:80,
                fixed:'right',//右侧固定
                dataIndex:'time'
            }
        ]
        const columns3=[
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){//处理当前字段 对当前字段进行格式化
                    return sex=1? '男':'女'
                }
            },
            {
                title:'年龄',
                key:'age',
                dataIndex:'age',
                sorter:(a,b)=>{ //排序
                    return a.age-b.age;
                },
                sortOrder:this.state.sortOrder //升序还是降序
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){//处理当前字段 对当前字段进行格式化
                    let config={
                        '1':'山海藏着星辰',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(abc){//处理当前字段 对当前字段进行格式化
                    let config={
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[abc]
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            },
        ]
        const columns4=[
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){//处理当前字段 对当前字段进行格式化
                    return sex=1? '男':'女'
                }
            },
            {
                title:'年龄',
                key:'age',
                dataIndex:'age',
                sorter:(a,b)=>{ //排序
                    return a.age-b.age;
                },
                sortOrder:this.state.sortOrder //升序还是降序
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){//处理当前字段 对当前字段进行格式化
                    let config={
                        '1':'山海藏着星辰',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(abc){//处理当前字段 对当前字段进行格式化
                    let config={
                        '1':<Badge status="success" text="成功"/>,
                        '2':<Badge status="error" text="报错"/>,
                        '3':<Badge status="default" text="正常"/>,
                        '4':<Badge status="processing" text="进行中"/>,
                        '5':<Badge status="warning" text="警告"/>,
                    }
                    return config[abc]
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            },
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered // 表格边框
                        columns={columns} //表头
                        dataSource={this.state.dataSource}//数据源
                        pagination={false}//是否有分页  默认是有的
                        scroll={{y:240}} //y轴高度为240 
                    />
                </Card>
                <Card title="左侧固定" style={{margin:'10px 0'}}>
                    <Table
                        bordered // 表格边框
                        columns={columns2} //表头
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1920}}
                    />
                </Card>
                <Card title="表格排序" style={{margin:'10px 0'}}>
                    <Table
                        bordered // 表格边框
                        columns={columns3} //表头
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange} //控制升序或降序
                    />
                </Card>
                <Card title="操作按钮" style={{margin:'10px 0'}}>
                    <Table
                        bordered // 表格边框
                        columns={columns4} //表头
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}

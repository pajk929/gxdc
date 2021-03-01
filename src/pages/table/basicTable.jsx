import React, { Component } from 'react'
import {Card,Table, Modal,Button,message} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
export default class BasicTable extends Component {
    state={
        dataSource2:[]
    }
    params={
        page:1
    }
    componentDidMount(){
        const dataSource =[
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:"1",
                interest: '1',
                birthday:'2020-12-21',
                address: "北京市海淀区奥林匹克公园",
                time :"09:00"
            },
            {
                id:'1',
                userName:'Tom',
                sex:'1',
                state:"1",
                interest: '1',
                birthday:'2020-12-21',
                address: "北京市海淀区奥林匹克公园",
                time :"09:00"
            },
            {
                id:'2',
                userName:'Susan',
                sex:'1',
                state:"1",
                interest: '1',
                birthday:'2020-12-21',
                address: "北京市海淀区奥林匹克公园",
                time :"09:00"
            }
        ]
        dataSource.map((item,index)=>{
            return item.key=index
        })
        this.setState({
            dataSource
        })
        this.request() //强求ajax数据
    }
    //动态获取mock数据
    request=()=>{
        let _this=this
        axios.ajax({
            url:'/table/list',
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
                dataSource2:res.result.list,
                selectedRowKeys:[], //多选 选中行的下标
                selectedRows:null, //多选 选中行的内容
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page=current;
                    this.request();
                })
            })
        })
    }
    //点击每一行触发的函数
    onRowClick=(record,index)=>{
        let selectKey = [index]; //点击每一行获得的下标 record 为选中一行的信息
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},用户爱好：${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey, // 保存选中某行的下标
            selectedItem:record  //保存选中某行的信息
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
        const colums=[
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
        const selectedRowKeys=this.state.selectedRowKeys;
        const rowSelection={
            type:'radio', // 指定单选还是多选
            selectedRowKeys //职工选中项的key数组，需要和onchange进行配合 是个数组
        }
        const rowCheckSelection={
            type:'checkbox', //多选
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{ //selectedRowKeys 选中行下标 selectedRows 选中行的内容
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered // 表格边框
                        columns={colums} //表头
                        dataSource={this.state.dataSource}//数据源
                        pagination={false}//是否有分页  默认是有的
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
                    <Table
                        bordered // 表格边框
                        columns={colums} //表头
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{margin:'10px 0'}}>
                    <Table
                        bordered // 表格边框
                        rowSelection={rowSelection} //表格行是否可选择
                        onRow={(record,index)=>{//record是每一行的内容 index是每一行的下标
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index); // 点击行触发
                                }
                            }
                        }} //设置行属性
                        columns={colums} //表头
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-多选" style={{margin:'10px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered // 表格边框
                        rowSelection={rowCheckSelection} //表格行是否可选择
                        columns={colums} //表头
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{margin:'10px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered // 表格边框
                        columns={colums} //表头
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination} //分页
                    />
                </Card>
            </div>
        )
    }
}

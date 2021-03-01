import React, { Component } from 'react'
import {Card,Button,Form,Modal,message} from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
// const Option=Select.Option;
const FormItem=Form.Item;
export default class Order extends Component {
    state={
        orderInfo:{},
        orderConfirmVisble:false 
    }
    params={
        page:1
    }
    formList=[
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'上海'},{id:'4',name:'石家庄'}]
        },
        {
            type:'时间查询'
        },
        {
            type:"SELECT",
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'1',
            width: 80,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
        }
    ]
    componentDidMount(){
        this.requestList()
    }
    handleFilter=(params)=>{
        console.log("params",params)
        this.params=params;
        this.requestList();
    }
    requestList=()=>{
        axios.requestList(this,'/order/list',this.params,true)//为true的话说明是mock数据
    }
    //订单结束确认
    handleComfirm =()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单进行结束'
            })
            return ;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then(res=>{
            if(res.code===0){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble:true
                })
            }
        })
        // this.setState({
        //     orderConfirmVisble:true
        // })
    }
    //结束订单
    handleFindishOrder=()=>{
        let item =this.state.selectedItem;
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:item.id
            }
        }).then(res=>{
            if(res.code===0){
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble:false
                })
                this.requestList();
            }
        })
        // this.setState({
        //     orderConfirmVisble:true
        // })
    }
    onRowClick=(record,index)=>{
        let selectKey=[index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    //订单详情
    openOrderDetail = ()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return ;
        }
        window.open(`/#/common/order/detail/${item.id}`,`_blank`);
    }
    render() {
        const columns=[
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance',
                render(distance){
                    return distance/1000 + 'Km'
                }
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时长',
                dataIndex:'start_time'
            },
            {
                title:'结束时长',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            },
        ]
        // const selectedRowKeys=this.state.selectedRowKeys
        // const rowSelection={
        //     type:'radio',
        //     selectedRowKeys
        // }
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{
                span:19
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleComfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updataSelectedItem={Utils.updataSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys} //点击一行的key值
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        // rowSelection='checkbox'//去掉之后变单选
                    />

                    {/* <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record,index)=>{//record是每一行的内容 index是每一行的下标
                            return { //配合单选或复选进行使用
                                onClick: ()=>{
                                    this.onRowClick(record,index);
                                }//点击行
                            }
                        }}
                    /> */}
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFindishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量"  {...formItemLayout}>
                            {this.state.orderInfo.battery+'%'}
                        </FormItem>
                        <FormItem label="行程开始时间"  {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置"  {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

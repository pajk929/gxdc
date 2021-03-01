import React, { Component } from 'react'
import {Table} from 'antd'
export default class index extends Component {
    onRowClick=(recod,index)=>{
        let rowSelection=this.props.rowSelection;
        if(rowSelection==='checkbox'){
            let selectedRowKeys=this.props.selectedRowKeys;
            let selectedItem=this.props.selectedItem;
            let selectedIds = this.props.selectedIds; //每一行的id值
            if(selectedIds){
                const i=selectedIds.indexOf(recod.id)
                if(i===-1){
                    selectedIds.push(recod.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(recod)
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            }else{
                selectedIds=[recod.id];
                selectedRowKeys=[index];
                selectedItem=[recod]
            }
            this.props.updataSelectedItem(selectedRowKeys,selectedIds,selectedItem)
        }else{
            let selectedRowKeys=[index] //索引
            let selectedItem=recod //每一行的内容
            this.props.updataSelectedItem(selectedRowKeys,selectedItem)
        }
    }
    tableInit=()=>{
        let row_selection= this.props.rowSelection;
        let selectedRowKeys=this.props.selectedRowKeys;
        const rowSelection={//单选复选的判断操作
            type:'radio',
            selectedRowKeys//点击这一行所在的索引
        }
        if(row_selection===false|| row_selection===null){
            row_selection=false;
        }else if(row_selection==='checkbox'){
            rowSelection.type="checkbox"
        }else{
            row_selection='radio'
        }
        return <Table 
            bordered
            {...this.props}
            rowSelection={row_selection?rowSelection:null} //单选或复选框
            onRow={(record,index)=>{
                return {
                    onClick:()=>{
                      if(!row_selection){
                        return ;
                      }
                      this.onRowClick(record,index)
                    }
                }
            }}
        />
    }
    render() {
      return (
        <div>
            {this.tableInit()}
        </div>
      )
    }
}

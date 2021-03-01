import React from 'react';
import {Select} from 'antd';
const Option=Select.Option
const test={
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data,callback){
        let page={
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,//当前页数
            pageSize:data.result.page_size,//一共几页
            total:data.result.total_count, //总条数
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
        return page
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options=[]
        data.map(item=>{
            return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },
    updataSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){//判断单选还是复选
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
        
    }
    
}
export default test
import axios from 'axios'
import {Modal} from 'antd'
import Utils from './../utils/utils'
export default class Axios{
    static requestList(_this,url,params,isMock){
        var data={
            params:params,
            isMock
        }
        this.ajax({
            url,
            data,
        }).then(data=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item
                });
                _this.setState({
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page=current;
                        _this.requestList();
                    })
                })
            }
        })
    }


    static ajax(options){
        console.log("options",options);
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseUrl=''
        if(options.isMock){
            baseUrl='https://www.fastmock.site/mock/9b78f0274788181f954902b8d23c7aea/gxdc2'//mock地址
        }else{
            baseUrl='https://www.fastmock.site/mock/9b78f0274788181f954902b8d23c7aea/gxdc2'
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then(response=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading =document.getElementById('ajaxLoading');
                    loading.style.display = 'none';  
                }
                if(response.status===200){ //状态码为200 表示成功
                    let res=response.data;
                    if(res.code===0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.message
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}
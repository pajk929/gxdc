import React, { Component } from 'react'
import {Card,Button,notification} from 'antd'
import './ui.less'
export default class Notice extends Component {
    openNotification=(type,direction)=>{
        if(direction){
            notification.config({  //还提供了一个全局配置方法，在调用前提前配置，全局一次生效。
                placement:direction //弹出位置，可选 topLeft topRight bottomLeft bottomRight
            })
        }
        notification[type]({
            message:'发工资了', //	通知提醒标题，必选
            description:"说的什么都是屁话" //	通知提醒内容，必选
        })
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>

                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}

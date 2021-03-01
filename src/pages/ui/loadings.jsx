import React, { Component } from 'react'
import {Card,Spin,Icon,Alert} from 'antd'
import './ui.less'
export default class Loadings extends Component {
    render() {
        const icon=<Icon type="plus" style={{fontSize:"24px"}}/>
        const iconLoading=<Icon type="loading" style={{fontSize:"24px"}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" /> {/*  组件大小 */}
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft:"10px"}}/>
                </Card>
                <Card title="内容遮罩">{/*  警告提示，展现需要关注的信息。 */}
                    <Alert 
                        message="React"
                        description="欢迎你来到这里"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎你来到这里"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎你来到这里"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="欢迎你来到这里"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}

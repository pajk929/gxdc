import React, { Component } from 'react'
import {Card,Tabs,message,Icon} from 'antd'
const TabPane=Tabs.TabPane;
export default class Tab extends Component {
    newTabIndex=0;
    handlecallback=(key)=>{
        message.info("hi 您选择了"+key)
    }
    onChange=(activeKey)=>{ //获取到点击那个页签的key值
        this.setState({
            activeKey
        })
    }
    onEdit=(targetKey,action)=>{
        this[action](targetKey)
    }
    componentWillMount(){
        const panes=[
            {
                title:'Tab 1',
                content:'Tab 1',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'Tab 2',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'Tab 3',
                key:'3'
            }
        ]
        console.log("panes",panes);
        this.setState({
            activeKey:panes[0].key,//默认激活哪一个  -- 当前选中哪一个
            panes// activeKey 当前打开那个页签的key
            
        })
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => { //targetKey 是要删除的目标key
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1"  onChange={this.handlecallback}>
                        <TabPane tab="Tab 1" key="1">欢迎你</TabPane>
                        <TabPane tab="Tab 2" key="2">喜欢你</TabPane>
                        <TabPane tab="Tab 3" key="3">呵护你</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1"  onChange={this.handlecallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">欢迎你</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">喜欢你</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">呵护你</TabPane>
                    </Tabs>
                </Card>

                <Card title="添加删除的页签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange} 
                        activeKey={this.state.activeKey} //当前激活 tab 面板的 key
                        type="editable-card" //可编辑的卡片
                        onEdit={this.onEdit}//新增和删除页签的回调，在 type="editable-card" 时有效
                    >
                       {
                           this.state.panes.map(panel=>{
                               return <TabPane tab={panel.title} key={panel.key}/>
                           })
                       }
                    </Tabs> 
                </Card>
            </div>
        )
    }
}

import React, { Component } from 'react'
import {Menu} from 'antd'//为页面和功能提供导航的菜单列表。
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import MenuConfig from './../../config/menuConfig'
import {switchMenu} from './../../redux/action'
import './index.less'
const {SubMenu} =Menu //子菜单
class NavLeft extends Component {
    state={
        currentKey:''
    }
    handleClick=({item,key})=>{
        const {dispatch}=this.props
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuConfig);
        let currentKey=window.location.hash.replace(/#|\?.*$/g,'')//匹配当前的路由
        this.setState({
            menuTreeNode,currentKey
        })
    }
    //菜单渲染 遍历菜单
    renderMenu=(data)=>{
        return data.map(item=>{
            if(item.children){ //遍历 如果子菜单里还有子菜单 继续遍历 
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                        {/* 回调函数 自己调用自己 再遍历 */}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}//当前需要选中的是哪个菜单
                    theme="dark"//变成深色的
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
            
        )
    }
}
export default connect()(NavLeft)
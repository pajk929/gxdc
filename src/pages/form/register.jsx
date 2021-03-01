import React, { Component } from 'react'
import {Card,Form,Input,Radio,InputNumber,Select,Switch,DatePicker,TimePicker,Upload,Icon, Checkbox, message,Button} from 'antd'
import moment from 'moment'
const FormItem=Form.Item
const RadioGroup = Radio.Group
const Option=Select.Option
const TextArea=Input.TextArea
class register extends Component {
    state={}
    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();//获得所有注册内容的属性值
        console.log(JSON.stringify(userInfo));
        message.success(`${userInfo.userName} 恭喜你通过本次表单组件学习，当前密码为${userInfo.userPwd}`)
    }
    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg:imageUrl,
              loading: false,
            }),
          );
        }
      };
    render() {
        let {getFieldDecorator} =this.props.form;
        const formItemLayout ={
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject={
            minRows: 4,
            maxRows:6
        }
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,//为true名字前面自动加*
                                            message:"用户名不能为空"
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:'18',
                                })(
                                    <InputNumber/>
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue:'2',
                                })(
                                    <Select>
                                        <Option value="1">北京</Option>
                                        <Option value="2">上海</Option>
                                        <Option value="3">广州</Option>
                                        <Option value="4">杭州</Option>
                                        <Option value="5">石家庄</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue:['2','5'],
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游戏</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">打羽毛球</Option>
                                        <Option value="5">遛狗</Option>
                                        <Option value="6">骑行</Option>
                                        <Option value="7">爬山</Option>
                                        <Option value="8">麦霸</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否有对象" {...formItemLayout}>
                            {
                                getFieldDecorator('ismarried',{
                                    valuePropName:'checked', //默认选中
                                    initialValue:true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue:moment("2021-02-19 20:04:59"), //默认选中
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:'河北省石家庄市桥西区',
                                })(
                                    <TextArea autoSize={rowObject}/>
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload 
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg?<img src={this.state.userImg} alt=""/>:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('read',{
                                    valuePropName:'checked'
                                })(
                                    <Checkbox>我已经阅读用过<a href="/#">协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(register)
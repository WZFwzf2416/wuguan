import React, {Component} from 'react'
import './index.scss'
import api from './../../server'
import TSLLogo from './../../static/logo@2x.png'
import { Form, Input, Button, message } from 'antd'


class index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { userName, password } = values;
                let options = {
                    username: userName,
                    password,
                };
                this.setState({
                    loading: true,
                });
                let { data } = await api.login(options);
                if (data.code === 0) {
                    message.success("欢迎您, 尊敬的" + userName);
                    // const { dispatch } = this.props
                    // dispatch(setUserName(userName))
                    sessionStorage.setItem('userName', userName);
                    sessionStorage.setItem('token', data.data.token);
                    this.setState({
                        loading: false,
                    });
                    await this.props.history.push('/main')
                } else {
                    this.setState({
                        loading: false,
                    });
                    message.error(data.message);
                }
            }
        })
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
                <div className="frosted-glass">
                    <div className="logo-contain">
                        <img src={TSLLogo} alt=""/>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'80%'}} hideRequiredMark>
                        <Form.Item {...formItemLayout}>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input autoComplete="off" placeholder="Terminus" style={{color: "#000"}} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input type="password" placeholder="输入密码" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%',height: '40px'}} loading={this.state.loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(index);
export default WrappedNormalLoginForm
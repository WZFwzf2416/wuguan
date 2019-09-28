import React, {Component} from 'react';
import './index.scss'
import {Icon, Modal, Form, Input} from 'antd'

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sheetArr: [],
            visible: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleSubmit = () => {
        const {sheetArr} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err){
                sheetArr.push(values);
                this.setState({
                    visible: false,
                    sheetArr,
                });
            }
        });

    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    sheetForm = () => {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 10},
        };
        return (
            <Form hideRequiredMark onSubmit={this.handleSubmit}>
                <Form.Item label="名称" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入名称!'}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
            </Form>
        )
    };

    render() {
        const {sheetArr} = this.state;
        const {openStatus} = this.props;
        console.log(sheetArr)
        return (
            <div className={openStatus ? 'sheet tabOpenSheet' : 'sheet'}>
                <div className="subSheet active">Sheet01</div>
                {sheetArr.map((item, index) => (
                    <div className="subSheet" key={index}>{item.name}</div>
                ))}
                <div className="plus">
                    <Icon type='plus' onClick={this.showModal}/>
                    <Modal
                        title="添加sheet"
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                        width={400}
                    >
                        {this.sheetForm()}
                    </Modal>
                </div>
            </div>
        );
    }
}

const FormCreate = Form.create({})(index);
export default FormCreate;
import React, {Component} from 'react';
import './index.scss'
import {Form, InputNumber, Button, Input, Icon} from 'antd'
import unlock from './../../static/icon_unlock.svg'
import deleteIcon from './../../static/icon_delete_s.svg'
import gridIcon from './../../static/icon_grid_n.svg'
import shapeIcon from './../../static/icon_shape_n.svg'
import cameraIcon from './../../static/icon_camera_n.svg'
import {SketchPicker} from 'react-color';
import {connect} from 'react-redux'
import {createGrid} from './../../store/action'

const gridValue = state => {
    return {
        gridValue: state.gridValue,
    }
};

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorDisplay: 0,
            color: 'rgba(255,255,255,.5)',
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {color} = this.state;
        this.props.form.validateFields((err, values) => {
            let options = {
                ...values,
                color,
            };
            if (!err) {
                const {dispatch} = this.props;
                dispatch(createGrid(options));
            }
        });
    };

    handleChangeComplete = (color) => {
        const {rgb} = color;
        this.setState({color: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`});
    };

    showColorSelector = () => {
        const {colorDisplay} = this.state;
        this.setState({
            colorDisplay: !colorDisplay
        })
    };

    gridForm = () => {
        const {colorDisplay, color} = this.state;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 24,
                offset: 0,
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form hideRequiredMark onSubmit={this.handleSubmit}>
                <Form.Item label="网格尺寸" {...formItemLayout}>
                    {getFieldDecorator('gridSize', {
                        rules: [{required: true, message: '请输入网格尺寸!'}],
                        initialValue: 70,
                    })(
                        <InputNumber
                            min={1}
                            formatter={value => `${value}px`}
                            parser={value => value.replace('px', '')}
                        />
                    )}
                </Form.Item>
                <Form.Item label="图片宽" {...formItemLayout}>
                    {getFieldDecorator('width', {
                        rules: [{required: true, message: '请输入图片宽!'}],
                        initialValue: 3840,
                    })(
                        <InputNumber
                            min={1}
                            formatter={value => `${value}px`}
                            parser={value => value.replace('px', '')}
                        />
                    )}
                </Form.Item>
                <Form.Item label="图片高" {...formItemLayout}>
                    {getFieldDecorator('height', {
                        rules: [{required: true, message: '请输入图片高!'}],
                        initialValue: 1858,
                    })(
                        <InputNumber
                            min={1}
                            formatter={value => `${value}px`}
                            parser={value => value.replace('px', '')}
                        />
                    )}
                </Form.Item>
                <Form.Item label="网格颜色" {...formItemLayout}>
                    <div>
                         <div className="colorSelector" style={{backgroundColor: color}}
                             onClick={this.showColorSelector}/>
                        <div style={{display: colorDisplay ? "block" : 'none'}} className='selectorOntology'>
                            <SketchPicker
                                color={color}
                                onChangeComplete={this.handleChangeComplete}
                            />
                        </div>
                    </div>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType="submit">生成网格</Button>
                </Form.Item>
            </Form>
        )
    };

    cameraTypeForm = () => {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };
        const formItemLayoutOfTow = {
            labelCol: {span: 10},
            wrapperCol: {span: 10},
        };
        const formItemLayoutOfThree = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 24,
                offset: 0,
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form hideRequiredMark onSubmit={this.handleSubmit} colon={false}>
                <Form.Item label="点码" {...formItemLayout}>
                    {getFieldDecorator('pointId', {
                        rules: [{required: true, message: ''}],
                        initialValue: '01LS11010501ETET01D1',
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="IP" {...formItemLayout}>
                    {getFieldDecorator('ip', {
                        rules: [{required: true, message: ''}],
                        initialValue: '10.0.10.62',
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="设备点位名称" {...formItemLayoutOfTow}>
                    {getFieldDecorator('deviceName', {
                        rules: [{required: true, message: ''}],
                        initialValue: '收银台01',
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="设备类型" {...formItemLayoutOfTow}>
                    {getFieldDecorator('deviceType', {
                        rules: [{required: true, message: ''}],
                        initialValue: '半球',
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="方向" {...formItemLayoutOfTow}>
                    {getFieldDecorator('direction', {
                        rules: [{required: true, message: ''}],
                        initialValue: '上',
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="方格坐标" {...formItemLayoutOfThree}>
                    {getFieldDecorator('gridPosition', {
                        rules: [{required: true, message: ''}],
                    })(
                        <div>
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}x`}
                                parser={value => value.replace('x', '')}
                            />
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}y`}
                                parser={value => value.replace('y', '')}
                            />
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}w`}
                                parser={value => value.replace('w', '')}
                            />
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}h`}
                                parser={value => value.replace('h', '')}
                            />
                        </div>

                    )}
                </Form.Item>
                <Form.Item label="posid" {...formItemLayoutOfThree}>
                    {getFieldDecorator('posId', {
                        rules: [{required: true, message: ''}],
                        initialValue: 'Z0001',
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} className={"confirmFormItem"}>
                    <Button type='primary' htmlType="submit" style={{width: 200}}>确认</Button>
                </Form.Item>
            </Form>
        )
    };

    dottedTypeForm = () => {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const tailFormItemLayout = {
            wrapperCol: {
                span: 24,
                offset: 0,
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form hideRequiredMark onSubmit={this.handleSubmit} colon={false}>
                <Form.Item label="开始坐标" {...formItemLayout}>
                    {getFieldDecorator('gridPosition', {
                        rules: [{required: true, message: ''}],
                    })(
                        <div>
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}x`}
                                parser={value => value.replace('x', '')}
                            />
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}y`}
                                parser={value => value.replace('y', '')}
                            />
                        </div>

                    )}
                </Form.Item>
                <Form.Item label="末尾坐标" {...formItemLayout}>
                    {getFieldDecorator('gridPosition', {
                        rules: [{required: true, message: ''}],
                    })(
                        <div>
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}x`}
                                parser={value => value.replace('x', '')}
                            />
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}y`}
                                parser={value => value.replace('y', '')}
                            />
                        </div>

                    )}
                </Form.Item>
                <Form.Item label="长度" {...formItemLayout}>
                    {getFieldDecorator('gridPosition', {
                        rules: [{required: true, message: ''}],
                    })(
                        <div>
                            <InputNumber
                                min={0}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}px`}
                                parser={value => value.replace('px', '')}
                            />
                            <InputNumber
                                min={-360}
                                style={{width: 78, marginRight: 3}}
                                formatter={value => `${value}°`}
                                parser={value => value.replace('°', '')}
                            />
                        </div>

                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} className={"confirmFormItem"}>
                    <Button type='primary' htmlType="submit" style={{width: 200}}>确认</Button>
                </Form.Item>
            </Form>
        )
    };

    selectFormContain = () => {
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_462699_amjxii9exsj.js',
        });
        return(
            <div className="selectFormContain">
                <div className="workspaceName">
                    <div className="name">sheet01</div>
                    <div className="operateContain">
                        <img src={unlock} alt=""/>
                        <img src={deleteIcon} alt=""/>
                    </div>
                </div>
                <div className="selectKeys">
                    <div className="active"><img src={gridIcon} alt="" />网格 <IconFont type="icon-eyes" className="iconEyes"/></div>
                    <div><img src={shapeIcon} alt=""/>虚拟合围<IconFont type="icon-eyes" className="iconEyes"/></div>
                    <div><img src={cameraIcon} alt=""/>设备<IconFont type="icon-eyes" className="iconEyes"/></div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className='rightEdit'>
                <div className='attributes'>属性</div>
                <div className='formContain'>
                    {this.gridForm()}
                    {/*{this.cameraTypeForm()}*/}
                    {/*{this.dottedTypeForm()}*/}
                </div>
                {this.selectFormContain()}
            </div>
        );
    }
}

const FormCreate = Form.create({})(connect(gridValue)(index));
export default FormCreate;

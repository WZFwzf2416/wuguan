import React, {Component} from 'react';
import './index.scss'
import {Icon} from 'antd'
import shapeIcon from './../../static/icon_shape.svg'
import cameraIcon from './../../static/icon_camera.svg'
import TabDetail from '../TabDetail'
import Sheet from "../Sheet";

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openStatus: 0, // 0为关闭状态，1为打开状态
            tabStatus: 0, // 0为合围，1为设备
        }
    }

    openShapeBlock = () => {
        const {openStatus} = this.state;
        this.setState({
            openStatus: !openStatus,
        })
    };

    changeTabStatus = (type) => {
        this.setState({
            openStatus: 1,
        });
        if (type === 'compass') {
            this.setState({
                tabStatus: 0,
            })
        } else if (type === 'device') {
            this.setState({
                tabStatus: 1,
            })
        }
    };

    render() {
        const {openStatus, tabStatus} = this.state;
        return (
            <div className="tab">
                <div className="subTab">
                    <div className={tabStatus ? 'compass deviceActiveCompass' : 'compass compassActiveCompass'}
                         onClick={this.changeTabStatus.bind(this, 'compass')}>
                        <img src={shapeIcon} alt=""/>
                        <div>合围</div>
                    </div>
                    <div className={tabStatus ? 'device deviceActiveDevice' : 'device'}
                         onClick={this.changeTabStatus.bind(this, 'device')}>
                        <img src={cameraIcon} alt=""/>
                        <div>设备</div>
                    </div>
                    <div className={tabStatus ? 'blank deviceActiveBlank' : 'blank'}/>
                </div>
                <div className={openStatus ? 'shapeBlock' : 'shapeBlock shapeBlockTransition'}>
                    <div className="leftArrow" onClick={this.openShapeBlock}>
                        <Icon type="left"/>
                    </div>
                    <TabDetail tabStatus={tabStatus} />
                    <Sheet openStatus={openStatus} />
                </div>
            </div>
        );
    }
}

export default index;
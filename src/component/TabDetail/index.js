import React, {Component} from 'react'
import './index.scss'
import picBlock from './../../static/pic_block.svg'
import picUpload from './../../static/icon_up.svg'
import hemisphereIcon from './../../static/banqiuwhite.svg'
import usbIcon from './../../static/usbwhite.svg'
import passengerIcon from './../../static/passengerwhite.svg'
import panoramicIcon from './../../static/quanjingwhite.svg'
import backIcon from './../../static/backwhite.svg'
import ImgType from './../../component/ImgType'



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragCompassIcon: [
                {
                    pic: picBlock,
                    name: 'block'
                },
                {
                    pic: '',
                    name: '区域'
                },
                {
                    pic: '',
                    name: 'dashed'
                },
            ],
            dragDeviceIcon: [
                {
                    pic: hemisphereIcon,
                    name: '半球'
                }, {
                    pic: usbIcon,
                    name: 'USB'
                }, {
                    pic: passengerIcon,
                    name: '客流计'
                }, {
                    pic: panoramicIcon,
                    name: '全景'
                }, {
                    pic: backIcon,
                    name: '背靠背'
                },
            ],
        }
    }

    componentDidMount() {
    }

    render() {
        const {dragCompassIcon, dragDeviceIcon} = this.state;
        let draIcon = this.props.tabStatus ? dragDeviceIcon : dragCompassIcon;
        return (
            <div className="compassContent">
                <div className="optionsContain">
                    {draIcon.map(item => (
                        item.name === '区域' ? (
                            <div key={item.name}>
                                <div className="region"/>
                                <div>区域</div>
                            </div>
                        ) : item.name === 'dashed' ? (
                            <div key={item.name}>
                                <div className="dashedContain">
                                    <div className="dashed"/>
                                </div>
                                <div>虚线</div>
                            </div>
                        ) : (
                            <div key={item.name}>
                                <ImgType src={item.pic} />
                                <div>{item.name}</div>
                            </div>
                        )
                    ))}
                    <div>
                        <img src={picUpload} alt=""/>
                        <div>图标上传</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default index
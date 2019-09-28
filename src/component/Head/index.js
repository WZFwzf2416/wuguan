import React, {Component} from 'react';
import { Button, Upload  } from 'antd'
import './index.scss'
import exportIcon from './../../static/icon_export.svg'
import gridIcon from './../../static/icon_grid.svg'
import mapIcon from './../../static/icon_map.svg'
import saveIcon from './../../static/icon_save.svg'
import undoIcon from './../../static/icon_undo.svg'

class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',

        }
    }

    componentDidMount() {
        let userName = sessionStorage.getItem('userName');
        this.setState({
            userName,
        });
    }

    render() {
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
        };

        return (
            <div className="head">
                <span className="logo">TERMINUS</span>
                <div className="btnContain">
                    <div>
                        <Upload {...props}>
                            <Button><img src={mapIcon} alt=""/></Button>
                        </Upload>
                        <div>地图</div>
                    </div>
                    <div>
                        <Button><img src={gridIcon} alt=""/></Button>
                        <div>网格</div>
                    </div>
                    <div>
                        <Button><img src={undoIcon} alt=""/></Button>
                        <div>撤销</div>
                    </div>
                    <div>
                        <Button><img src={saveIcon} alt=""/></Button>
                        <div>保存</div>
                    </div>
                    <div>
                        <Button><img src={exportIcon} alt=""/></Button>
                        <div>导出</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './index.scss'
import editImg from './../../static/map@2x.png'
import Head from './../../component/Head'
import Tab from './../../component/Tab'
import RightEdit from './../../component/RightEdit'
import ImgTypeOnTarget from './../../component/ImgTypeOnTarget'
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';

const storeValue = state => {
    return {
        gridValue: state.gridValue,
        dragTypeArr: state.dragTypeArr,
    }
};


const boxTarget = {
    // 当有对应的 drag source 放在当前组件区域时，会返回一个对象，可以在 monitor.getDropResult() 中获取到
    drop: (props, monitor) => {
        return monitor.getDifferenceFromInitialOffset()
    }
};
const collect = (connect, monitor) => ({
    // 这里返回一个对象，会将对象的属性都赋到组件的 props 中去。这些属性需要自己定义。
    // 包裹住 DOM 节点，使其可以接收对应的拖拽组件
    connectDropTarget: connect.dropTarget(),
    // drag source是否在 drop target 区域
    isOver: !!monitor.isOver(),
    // 是否可以被放置
    canDrop: !!monitor.canDrop(),
});

@DropTarget(
    // type 标识，这里是字符串 'addCamera'
    'add',
    // 接收拖拽的事件对象
    boxTarget,
    // 收集功能函数，包含 connect 和 monitor 参数
    // connect 里面的函数用来将 DOM 节点与 react-dnd 的 backend 建立联系
    collect,
)

class index extends Component {
    static propTypes = {
        canDrop: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        connectDropTarget: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.mapDom = React.createRef();
        this.svgDom = React.createRef();
        this.dropContainDom = React.createRef();
        this.state = {
            lineArr: [],
            actualGridSize: 0,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const mapWidth = this.mapDom.current.offsetWidth;
        const mapHeight = this.mapDom.current.offsetHeight;
        if (mapHeight){
            this.dropContainDom.current.style.height = `${mapHeight}px`;
            this.svgDom.current.style.height = `${mapHeight}px`;
        }
        const {gridValue} = nextProps;
        const verticalLineCount = gridValue.width / gridValue.gridSize + 1;
        const horizontalLineCount = gridValue.height / gridValue.gridSize + 1;
        const actualGridSize = gridValue.gridSize * mapWidth / gridValue.width;
        let lineArr = [];
        for (let i = 0; i < verticalLineCount; i += 1) {
            lineArr.push({
                x1: (i + 1) * actualGridSize - 1,
                y1: 0,
                x2: (i + 1) * actualGridSize - 1,
                y2: mapHeight,
                color: gridValue.color,
            })
        }
        for (let i = 0; i < horizontalLineCount; i += 1) {
            lineArr.push({
                x1: 0,
                y1: (i + 1) * actualGridSize - 1,
                x2: mapWidth,
                y2: (i + 1) * actualGridSize - 1,
                color: gridValue.color,
            })
        }
        this.setState({
            lineArr,
            actualGridSize,
        })
    }

    render() {
        const {lineArr, actualGridSize} = this.state;
        const {canDrop, isOver, connectDropTarget, dragTypeArr} = this.props;
        console.log(dragTypeArr);
        
        dragTypeArr.map((item) => {
            item.x = Math.round(item.x/actualGridSize) * actualGridSize;
            item.y = Math.round(item.y/actualGridSize) * actualGridSize;
            return item
        });
        return (
            <div className="main">
                <Head/>
                <div className="mapContain">
                    <Tab/>
                    <RightEdit/>
                    <div style={{position: 'relative'}}>
                        <img src={editImg} alt="" className="map" ref={this.mapDom}/>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="gridSvg" ref={this.svgDom}>
                        {lineArr.map((item, index) => (
                            <line key={index + 1} x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2}
                                  style={{stroke: item.color, strokeWidth: 1}}/>
                        ))}
                    </svg>
                    {connectDropTarget(
                        <div className="dropContain" ref={this.dropContainDom}>
                            {dragTypeArr.map((item, index) => (
                                <ImgTypeOnTarget propObj={{src: item.src, styleWidth: actualGridSize, x:item.x, y:item.y,index}} key={index+1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default connect(storeValue, null)(index);
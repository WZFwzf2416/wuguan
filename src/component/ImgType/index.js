import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import { connect } from 'react-redux'
import {addDragType} from './../../store/action'

const dragTypeArr = state => {
    return {
        dragTypeArr: state.dragTypeArr,
           gridValue:state.gridValue
    }
};

const boxSource = {
    beginDrag(props, monitor, component) {
        return {
            src: props.src
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        // 拖拽元素放下时，drop 结果
        const dropResult = monitor.getDropResult();
        // 如果 drop 结果存在，就弹出 alert 提示
        if (dropResult) {
            const {dispatch} = props;
            dispatch(addDragType({
                ...item,
                x: dropResult.x,
                y: dropResult.y,
            }));
        }
    },
     canDrag(props, monitor){
                if (props.gridValue.color) {
                    return true;
                }     
               return false
            }
};
const collect = (connect, monitor) => ({
    // 这里返回一个对象，会将对象的属性都赋到组件的 props 中去。这些属性需要自己定义。
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

@DragSource('add', boxSource, collect)
class index extends Component{
    static propTypes = {
        src: PropTypes.string.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
    };
    constructor(props){
        super(props)
    }

    render() {
        const {connectDragSource, isDragging, src} = this.props;
        const opacity = isDragging ? 0.4 : 1;
        return (
            <div>
                {connectDragSource && connectDragSource(
                    <img src={src} alt="" style={{opacity}}/>
                )}
            </div>
        )
    }
}
export default connect(dragTypeArr, null)(index);


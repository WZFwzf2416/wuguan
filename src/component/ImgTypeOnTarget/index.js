import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd'
import {connect} from 'react-redux'
import {changeDragTypePosition} from "../../store/action";

const dragTypeArr = state => {
    return {
        dragTypeArr: state.dragTypeArr,
    }
};

const boxSource = {
    beginDrag(props, monitor, component) {
        return {
            index: props.propObj.index,
            x: props.propObj.x,
            y: props.propObj.y,
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        // 拖拽元素放下时，drop 结果
        const dropResult = monitor.getDropResult();
        // 如果 drop 结果存在，就弹出 alert 提示
        if (dropResult) {
            const {dispatch} = props;
            dispatch(changeDragTypePosition({
                x: dropResult.x + item.x,
                y: dropResult.y + item.y,
                index: item.index,
            }))
        }
    },
};
const collect = (connect, monitor) => ({
    // 这里返回一个对象，会将对象的属性都赋到组件的 props 中去。这些属性需要自己定义。
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

@DragSource('add', boxSource, collect)

class index extends Component {
    static propTypes = {
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state={

        }
    }

    editImgType = () => {
        
    };

    render() {
        const {propObj, connectDragSource, isDragging,} = this.props;
        const opacity = isDragging ? 0.4 : 1;
        return connectDragSource && connectDragSource(
            <img
                src={propObj.src}
                alt=""
                style={{
                    width: `${propObj.styleWidth - 2}px`,
                    top: `${propObj.y}px`,
                    left: `${propObj.x}px`,
                    opacity,
                    cursor: 'pointer'
                }}
                title='点击编辑'
                onClick={this.editImgType}
            />
        )
    }
}

export default connect(dragTypeArr, null)(index);
const defaultState = {
    gridValue: {
        color: '',
        gridSize: null,
    },
    dragTypeArr: [],
};
export default (state = defaultState, action) => {
    if (action.type === 'CREATEGRID') {
        return {
            ...state,
            gridValue: action.gridValue
        }
    }
    if (action.type === 'ADDDRAGTYPE') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.dragTypeArr.push(action.srcItem);
        return newState
    }
    if (action.type === 'CHANGEDRAGTYPEPOSITION') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.dragTypeArr[action.position.index].x = action.position.x;
        newState.dragTypeArr[action.position.index].y = action.position.y;
        return newState;
    }
    return state;
}

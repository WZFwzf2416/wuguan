export const type ={
    CREATEGRID: 'CREATEGRID',
    ADDDRAGTYPE: 'ADDDRAGTYPE',
    CHANGEDRAGTYPEPOSITION: 'CHANGEDRAGTYPEPOSITION'
};
export function createGrid(gridValue) {
    return {
        type: type.CREATEGRID,
        gridValue,
    }
}
export function addDragType(srcItem) {
    return {
        type: type.ADDDRAGTYPE,
        srcItem,
    }
}
export function changeDragTypePosition(position) {
    return {
        type: type.CHANGEDRAGTYPEPOSITION,
        position,
    }
}

import { ComponentInfoType, ComponentStateType } from ".";

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
    const visibleComponentList = componentList.filter(c => !c.isHidden)
    const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
    if (index < 0) return ''

    let newSelectedId = ''
    const length = visibleComponentList.length
    if (length <= 1) {
        newSelectedId = ''
    } else {
        if (index + 1 === length) {
            newSelectedId = visibleComponentList[index - 1].fe_id
        } else {
            newSelectedId = visibleComponentList[index + 1].fe_id
        }
    }
    return newSelectedId
}

export function insertNewComponent(draft: ComponentStateType, newComponent: ComponentInfoType){
    const { selelctedId, componentList } = draft
    const index = componentList.findIndex(c => c.fe_id === selelctedId)
    if (index < 0) {
        draft.componentList.push(newComponent)
    } else {
        draft.componentList.splice(index + 1, 0, newComponent)
    }
    draft.selelctedId = newComponent.fe_id
}
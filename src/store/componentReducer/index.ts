import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId, insertNewComponent } from "./utils";
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from "@dnd-kit/sortable";

export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    isHidden?: boolean
    isLocked?: boolean
    props: ComponentPropsType
}

export type ComponentStateType = {
    selelctedId: string
    componentList: ComponentInfoType[]
    copiedCopmponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
    selelctedId: '',
    componentList: [],
    copiedCopmponent: null
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
            return action.payload
        },
        changeSelectedId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
            draft.selelctedId = action.payload
        }),
        addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            insertNewComponent(draft, newComponent)
        }),
        changeComponentProps: produce((draft: ComponentStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>) => {
            const { fe_id, newProps } = action.payload
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.props = {
                    ...curComp.props,
                    ...newProps
                }
            }
        }),
        removeSelectedComponent: produce((draft: ComponentStateType) => {
            const { componentList = [], selelctedId: removedId } = draft

            const newSelectedId = getNextSelectedId(removedId, componentList)
            draft.selelctedId = newSelectedId

            const index = componentList.findIndex(c => c.fe_id === removedId)
            componentList.splice(index, 1)
        }),
        changeComponentHidden: produce(
            (draft: ComponentStateType, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
                const { componentList = [] } = draft
                const { fe_id, isHidden } = action.payload

                let newSelectedId = ''
                if (isHidden) {
                    newSelectedId = getNextSelectedId(fe_id, componentList)
                } else {
                    newSelectedId = fe_id
                }
                draft.selelctedId = newSelectedId

                const curComp = componentList.find(c => c.fe_id === fe_id)
                if (curComp) {
                    curComp.isHidden = isHidden
                }
            }
        ),
        toggleComponentLocked: produce((draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
            const { fe_id } = action.payload
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.isLocked = !curComp.isLocked
            }
        }),
        copySelectedComponent: produce((draft: ComponentStateType) => {
            const { selelctedId, componentList = [] } = draft
            const curComp = componentList.find(c => c.fe_id === selelctedId)
            if (curComp == null) return
            draft.copiedCopmponent = cloneDeep(curComp)
        }),
        pasteCompiedComponet: produce((draft: ComponentStateType) => {
            const { copiedCopmponent } = draft
            if (copiedCopmponent == null) return
            copiedCopmponent.fe_id = nanoid()

            insertNewComponent(draft, copiedCopmponent)
        }),
        selectPrevCompont: produce((draft: ComponentStateType) => {
            const { selelctedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selelctedId)
            if (selectedIndex < 0) return
            if (selectedIndex <= 0) return
            draft.selelctedId = componentList[selectedIndex - 1].fe_id
        }),
        selectNextCompont: produce((draft: ComponentStateType) => {
            const { selelctedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selelctedId)
            if (selectedIndex < 0) return
            if (selectedIndex + 1 === componentList.length) return
            draft.selelctedId = componentList[selectedIndex + 1].fe_id
        }),
        changeComponentTitle: produce((draft: ComponentStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
            const { title, fe_id } = action.payload
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) curComp.title = title
        }),
        moveComponent: produce((draft: ComponentStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
            const { componentList: curComponentList } = draft
            const { oldIndex, newIndex } = action.payload

            draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
        })
    }
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps, removeSelectedComponent, changeComponentHidden, toggleComponentLocked, copySelectedComponent, pasteCompiedComponet, selectPrevCompont, selectNextCompont, changeComponentTitle, moveComponent } = componentsSlice.actions
export default componentsSlice.reducer
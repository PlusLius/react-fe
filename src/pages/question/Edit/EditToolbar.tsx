import { BlockOutlined, CopyOutlined, DeleteColumnOutlined, DeleteOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, changeSelectedId, copySelectedComponent, moveComponent, pasteCompiedComponet, removeSelectedComponent, toggleComponentLocked } from '../../../store/componentReducer'
import useGetComponentInfo from '../../../hooks/useGetCopmponentInfo'
import useBindCanvasKeyPress from '../../../hooks/useBindKeyPress'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

type Props = {}

const EditToolbar: FC = (props: Props) => {
    const dispatch = useDispatch()
    const { selelctedId, componentList, selectedComponent, copiedCopmponent } = useGetComponentInfo()
    const { isLocked } = selectedComponent || {}
    const length = componentList.length
    const selectedIndex = componentList.findIndex(c => c.fe_id === selelctedId)
    const isFirst = selectedIndex <= 0
    const isLast = selectedIndex + 1 >= length

    function handleDelete() {
        dispatch(removeSelectedComponent())
    }

    function handleHidden() {
        dispatch(changeComponentHidden({
            fe_id: selelctedId,
            isHidden: true
        }))
    }

    function handleLock() {
        dispatch(toggleComponentLocked({ fe_id: selelctedId }))
    }

    function copy() {
        dispatch(copySelectedComponent())
    }

    function parse() {
        dispatch(pasteCompiedComponet())
    }

    function moveUp() {
        if (isFirst) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    }

    function moveDown() {
        if (isLast) return
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }

    function undo() {
        dispatch(UndoActionCreators.undo())
    }

    function redo() {
        dispatch(UndoActionCreators.redo())
    }


    useBindCanvasKeyPress()

    return (
        <Space>
            <Tooltip title="删除">
                <Button shape='circle' icon={<DeleteOutlined />} onClick={handleDelete}></Button>
            </Tooltip>
            <Tooltip title="隐藏">
                <Button shape='circle' icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
            </Tooltip>
            <Tooltip title="锁定">
                <Button shape='circle' icon={<LockOutlined />} onClick={handleLock} type={isLocked ? 'primary' : 'default'}></Button>
            </Tooltip>
            <Tooltip title="复制">
                <Button shape='circle' icon={<CopyOutlined />} onClick={copy}></Button>
            </Tooltip>
            <Tooltip title="粘贴">
                <Button shape='circle' icon={<BlockOutlined />} onClick={parse} disabled={copiedCopmponent == null}></Button>
            </Tooltip>
            <Tooltip title="上移">
                <Button shape='circle' icon={<UpOutlined />} onClick={moveUp} disabled={isFirst}></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button shape='circle' icon={<DownOutlined />} onClick={moveDown} disabled={isLast}></Button>
            </Tooltip>
            <Tooltip title="撤销">
                <Button shape='circle' icon={<UndoOutlined />} onClick={undo} ></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button shape='circle' icon={<RedoOutlined />} onClick={redo} ></Button>
            </Tooltip>
        </Space>
    )
}

export default EditToolbar
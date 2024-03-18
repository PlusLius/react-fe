import React, { ChangeEvent, FC, useState } from 'react'
import styles from './Layers.module.scss'
import useGetComponentInfo from '../../../hooks/useGetCopmponentInfo'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, changeComponentTitle, changeSelectedId, moveComponent, toggleComponentLocked } from '../../../store/componentReducer'
import { Button, Input, Space, message } from 'antd'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

const Layers: FC = (props) => {
    const { componentList, selelctedId } = useGetComponentInfo()
    const dispatch = useDispatch()

    const [changingTitleId, setChangingTitleId] = useState('')

    // 点击选中组件
    function handleTitleClick(fe_id: string) {
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp && curComp.isHidden) {
            message.info('不能选中隐藏的组件')
            return
        }
        if (fe_id !== selelctedId) {
            // 当前组件未被选中，执行选中
            dispatch(changeSelectedId(fe_id))
            setChangingTitleId('')
            return
        }

        // 点击修改标题
        setChangingTitleId(fe_id)
    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        if (!selelctedId) return
        dispatch(changeComponentTitle({
            fe_id: selelctedId,
            title: newTitle
        }))
    }

    function changeHidden(fe_id: string, isHidden: boolean) {
        dispatch(changeComponentHidden({
            fe_id,
            isHidden
        }))
    }

    function changeLocked(fe_id: string) {
        dispatch(toggleComponentLocked({ fe_id }))
    }

    const componentListWithId = componentList.map(c => {
        return { ...c, id: c.fe_id }
    })

    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({
            oldIndex,
            newIndex
        }))
    }

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            {
                componentList.map(c => {
                    const { fe_id, title, isHidden, isLocked } = c

                    // 拼接 title className
                    const titleDefaultClassName = styles.title
                    const selectedClassName = styles.selected
                    const titleClassName = classNames({
                        [titleDefaultClassName]: true,
                        [selectedClassName]: fe_id === selelctedId,
                    })

                    return (
                        <SortableItem key={fe_id} id={fe_id}>
                            <div className={styles.wrapper}>
                                <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                                    {fe_id === changingTitleId && (
                                        <Input
                                            value={title}
                                            onChange={changeTitle}
                                            onPressEnter={() => setChangingTitleId('')}
                                            onBlur={() => setChangingTitleId('')}
                                        />)
                                    }
                                    {fe_id !== changingTitleId && title}
                                </div>
                                <div className={styles.handler}>
                                    <Space>
                                        <Button size='small' shape='circle' className={!isHidden ? styles.btn : ''} icon={<EyeInvisibleOutlined />} type={isHidden ? 'primary' : 'default'} onClick={() => changeHidden(fe_id, !isHidden)} />
                                        <Button size='small' shape='circle' className={!isLocked ? styles.btn : ''} icon={<LockOutlined />} type={isLocked ? 'primary' : 'default'} onClick={() => changeLocked(fe_id)} />
                                    </Space>
                                </div>
                            </div>
                        </SortableItem>
                    )
                })
            }
        </SortableContainer>
    )
}

export default Layers
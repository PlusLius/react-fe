import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'

import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetCopmponentInfo'
import { ComponentInfoType, changeSelectedId, moveComponent } from '../../../store/componentReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type PropsType = {
    loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo

    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return null

    const { Component } = componentConf
    return <Component {...props} />

}

const EditCanvas: FC<PropsType> = ({ loading }) => {
    const { componentList, selelctedId } = useGetComponentInfo()
    const dispatch = useDispatch()

    function handleClick(event: MouseEvent, id: string) {
        event.stopPropagation()
        dispatch(changeSelectedId(id))
    }

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin />
        </div>
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
            <div className={styles.canvas}>
                {componentList.filter(c => !c.isHidden).map(c => {
                    const { fe_id, isLocked } = c

                    const wrapperDefaultClassName = styles['component-wrapper']
                    const selectedClassName = styles.selected
                    const lockedClassName = styles.locked
                    const wrapperClassName = classNames({
                        [wrapperDefaultClassName]: true,
                        [selectedClassName]: fe_id === selelctedId,
                        [lockedClassName]: isLocked

                    })

                    return <SortableItem key={fe_id} id={fe_id}>
                        <div className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
                            <div className={styles.component}>
                                {genComponent(c)}
                            </div>
                        </div>
                    </SortableItem>
                })}
                {/* <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput />
                </div>
            </div> */}
            </div>
        </SortableContainer>
    )
}

export default EditCanvas
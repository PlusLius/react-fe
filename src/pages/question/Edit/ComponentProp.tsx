import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetCopmponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentReducer'


const NoProp: FC = () => {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
    const { selectedComponent } = useGetComponentInfo()
    const dispatch = useDispatch()
    
    if (selectedComponent == null) {
        return <NoProp />
    }

    const { type, props, isLocked, isHidden } = selectedComponent
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return <NoProp />

    const { PropComponent } = componentConf


    function changeProps(newProps: ComponentPropsType) {
        if (selectedComponent == null) return
        const { fe_id } = selectedComponent

        dispatch(changeComponentProps({fe_id, newProps}))
    }

    return (
        <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
    )
}

export default ComponentProp
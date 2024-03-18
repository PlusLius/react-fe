import { useRequest } from 'ahooks'
import Title from 'antd/es/typography/Title'
import React, { FC, useEffect, useState } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../components/QuestionComponents'


type PropsType = {
    selectedComponentId: string
    selectedComponentType: string
}


const ChartStat: FC<PropsType> = (props: PropsType) => {
    const { selectedComponentId, selectedComponentType } = props
    const { id = '' } = useParams()

    const [stat, setStat] = useState([])
    const { run } = useRequest(async (questionId, componentId) => await getComponentStatService(questionId, componentId), {
        manual: true,
        onSuccess(res) {
            setStat(res.data.data.stat)
        }
    })

    useEffect(() => {
        if (selectedComponentId) run(id, selectedComponentId)
    }, [id, selectedComponentId])

    function genStatElem() {
        if (!selectedComponentId) return <div>未选中组件</div>
        
        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
        
        if(StatComponent == null)return <div>该组件无统计图表</div>

        return <StatComponent stat={stat}/>
    }

    return (
        <>
            <Title level={3}>ChartStat</Title>
            <div>{genStatElem()}</div>
        </>
    )
}

export default ChartStat
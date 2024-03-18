import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetCopmponentInfo'

enum TAB_KEYS {
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting'
}

const RightPanel: FC = (props) => {
    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const { selelctedId } = useGetComponentInfo()

    useEffect(() => {
        if(selelctedId) setActiveKey(TAB_KEYS.PROP_KEY)
        else setActiveKey(TAB_KEYS.SETTING_KEY)
    }, [selelctedId])

    const tabsItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    <span>属性</span>
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    <span>页面设置</span>
                </span>
            ),
            children: <PageSetting />
        }
    ]
    return (
        <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
    )
}

export default RightPanel
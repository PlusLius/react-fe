import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { FC } from 'react'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

type Props = {}

const LeftPanel: FC = (props: Props) => {
    const tabItems = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <AppstoreAddOutlined />
                    <span>
                    组件库
                    </span>
                </span>
            ),
            children: <ComponentLib/>
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined />
                    <span>
                    图层
                    </span>
                </span>
            ),
            children: <Layers/>
        }
    ]

    return (
        <Tabs defaultActiveKey='componentLib' items={tabItems} />
    )
}

export default LeftPanel
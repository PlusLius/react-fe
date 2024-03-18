import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

const { Title } = Typography

const Logo: FC = () => {
    const { username } = useGetUserInfo()
    const [pathname, setPathname] = useState(HOME_PATHNAME)
    useEffect(() => {
        console.log(username);
        
        console.log('pathname:',pathname);
        
        if (username) {    
            console.log('username:',username);
            
            setPathname(MANAGE_INDEX_PATHNAME)
        }
    }, [username])

    return <div className={styles.container}>
        <Link to={pathname}>
            <Space>
                <Title>
                    <FormOutlined />
                </Title>
                <Title>
                    问卷
                </Title>
            </Space>
        </Link>
    </div>
}

export default Logo
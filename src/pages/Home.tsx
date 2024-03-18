import { Button, Typography } from 'antd'
import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'
// import '../_mock'
import axios from 'axios'

const { Title, Paragraph } = Typography

const Home: FC = () => {
    const nav = useNavigate()

    useEffect(() => {
        // fetch('/api/test').then(res => res.json()).then(data => {
        //     console.log('fetch data', data);
        // })
        axios.get('/api/test').then(res => {
            console.log('fetch data', res.data);
        })

    }, [])

    const clickHandler = () => {
        nav({
            pathname: '/login',
            search: 'b=21'
        })
    }
    return <div className={styles.container}>
        <div className={styles.info}>
            <Title>问卷调查 ｜ 在线投票</Title>
            <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，受到答卷 980 份</Paragraph>
            <div>
                <Button type='primary' onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
            </div>
        </div>
    </div>
}

export default Home
import { useTitle } from 'ahooks'
import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Empty, Pagination, Spin, Typography } from 'antd'
import QuestionCard from "../../components/QuestionCard";
import ListSearch from '../../components/ListSearch';
import useListLoadQuestionListData from '../../hooks/ListLoadQuestionListData';
import ListPage from '../../components/ListPage';

const { Title } = Typography

const Star: FC = () => {
    useTitle('问卷 - 我的问卷')
    // const [questionList, setQuestionList] = useState([
    //     { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 5, createdAt: '3月10日 13:23' },
    //     { _id: 'q2', title: '问卷2', isPublished: true, isStar: true, answerCount: 3, createdAt: '3月11日 13:23' },
    //     { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 6, createdAt: '3月12日 13:23' },
    // ])
    const { data = {}, loading } = useListLoadQuestionListData({
        isStar: true
    })
    const { list: questionList = [], total = 0 } = data


    return <>
        <div
            className={styles.header}
        >
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}>
                <ListSearch />
            </div>
        </div>
        <div className={styles.content}>
            {
                loading && <div style={{ textAlign: 'center' }}>
                    <Spin />
                </div>
            }
            {
               (!loading && questionList.length === 0) && <Empty description="暂无数据" />
            }
            {
               (!loading && questionList.length > 0 )&&
                questionList.map((item: any) => {
                    const { _id } = item
                    return <QuestionCard key={_id} {...item} />
                })
            }

        </div>
        <div className={styles.footer}>
           <ListPage total={total}/>
        </div>
    </>
}

export default Star
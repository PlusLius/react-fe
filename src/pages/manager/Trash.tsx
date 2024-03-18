import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import { Button, Empty, Modal, Space, Spin, Table, Tag, Typography, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useListLoadQuestionListData from '../../hooks/ListLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { deleteQuestionService, updateQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
    useTitle('问卷 - 我的问卷')
    // const [questionList, setQuestionList] = useState([
    //     { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 5, createdAt: '3月10日 13:23' },
    //     { _id: 'q2', title: '问卷2', isPublished: true, isStar: false, answerCount: 3, createdAt: '3月11日 13:23' },
    //     { _id: 'q3', title: '问卷3', isPublished: false, isStar: false, answerCount: 6, createdAt: '3月12日 13:23' },
    // ])
    const { data = {}, loading, refresh } = useListLoadQuestionListData()
    const { list: questionList = [], total = 0 } = data


    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const { run: recover } = useRequest(async () => {
        for await (const id of selectedIds) {
            await updateQuestionService(id, {
                isDeleted: false
            })
        }
    }, {
        manual: true,
        debounceWait: 500,
        onSuccess() {
            message.success('恢复成功')
            refresh()
            setSelectedIds([])
        }
    })

    const tableColumns = [
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '是否发布',
            dataIndex: 'isPublished',
            render(isPublished: boolean) {
                return isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>
            }
        },
        {
            title: '答卷',
            dataIndex: 'answerCount'
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt'
        }
    ]

    const del = () => {
        confirm({
            title: '确认彻底删除该问卷？',
            icon: <ExclamationCircleOutlined />,
            content: '删除以后不可以找回',
            onOk: deleteQuestion
        })
    }
    const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(selectedIds),
    {
        manual: true,
        onSuccess(res){
            message.success('删除成功')
            refresh()
            setSelectedIds([])
        }
    })
    const tableElm = <>
        <div>
            <Space>
                <Button type='primary' disabled={selectedIds.length === 0} onClick={recover}>恢复</Button>
                <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
            </Space>
        </div>
        <Table
            rowSelection={
                {
                    type: 'checkbox',
                    onChange(selectedRowKeys) {
                        setSelectedIds(selectedRowKeys as string[])
                    }
                }
            }
            dataSource={questionList} columns={tableColumns} pagination={false} rowKey={q => q._id}></Table>
    </>

    return <>
        <div
            className={styles.header}
        >
            <div className={styles.left}>
                <Title level={3}>回收站</Title>
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
                questionList.length > 0 &&
                tableElm
            }

        </div>
        <div className={styles.footer}>
            <ListPage total={total} />
        </div>
    </>
}

export default Trash
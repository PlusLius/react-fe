import React, { FC, useState } from "react";
import styles from './QuestionCard.module.scss'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { duplicateQuestionService, updateQuestionService } from "../services/question";

const { confirm } = Modal

type PropsType = {
    _id: string
    title: string
    isStar: boolean
    isPublished: boolean
    answerCount: number
    createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const { _id, title, createdAt, answerCount, isPublished, isStar } = props

    const [isStarState, setIsStarState] = useState(isStar)
    const { loading: changeStarLoading, run: changeStar } = useRequest(async () => {
        const data = await updateQuestionService(_id, { isStar: !isStarState })

    }, {
        manual: true,
        onSuccess(res) {
            setIsStarState(!isStarState)
            message.success('更新完成')
        }
    })

    const nav = useNavigate()
    // const duplicate = () => {
    //     message.success('执行复制')
    // }
    const { loading: duplicateLoading, run: duplicate } = useRequest(async () => {
        const data = duplicateQuestionService(_id)
        return data
    }, {
        manual: true,
        onSuccess(res: any) {
            message.success('执行复制')
            nav(`/question/edit/${res.id}`)
        }
    })

    const del = () => {
        confirm({
            title: '确定删除该问卷？',
            icon: <ExclamationCircleOutlined />,
            onOk: deleteQuestion
        })
    }
    const [isDeletedState, setIsDeletedState] = useState(false)
    const { loading: deleteLoading, run: deleteQuestion } = useRequest(
        async () => await updateQuestionService(_id, { isDeleted: true })
        , {
            manual: true,
            onSuccess(res){
                message.success('删除成功')
                setIsDeletedState(true)
            }
        })
    if(isDeletedState){
        return null
    }

    return <>
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                        <Space>
                            {isStarState && <StarOutlined style={{ color: 'red ' }} />}
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
                        <span>答卷：{answerCount}</span>
                        <span>{createdAt}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    <Space>
                        <Button icon={<EditOutlined />} type="text" size="small" onClick={() => nav(`/question/edit/${_id}`)}>
                            编辑问卷
                        </Button>
                        <Button icon={<LineChartOutlined />} type="text" size="small" onClick={() => nav(`/question/stat/${_id}`)}>
                            问卷统计
                        </Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button type="text" icon={<StarOutlined />} size="small" onClick={changeStar} disabled={changeStarLoading}>
                            {isStarState ? '取消标星' : '标星'}
                        </Button>
                        <Popconfirm title="确定复制该问卷？" okText="确定" cancelText="取消" onConfirm={duplicate} disabled={duplicateLoading}>
                            <Button type="text" icon={<CopyOutlined />} size="small" >
                                复制
                            </Button>
                        </Popconfirm>
                        <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del} disabled={deleteLoading}>
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    </>
}

export default QuestionCard
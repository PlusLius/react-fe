import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from './common.module.scss'
import QuestionCard from "../../components/QuestionCard";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useListLoadQuestionListData from "../../hooks/ListLoadQuestionListData";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography

const List: FC = () => {
    // const [searchParams] = useSearchParams()
    // console.log(searchParams.get('keyword'));
    useTitle('问卷 - 我的问卷')

    // const [questionList, setQuestionList] = useState([
    //     { _id: 'q1', title: '问卷1', isPublished: false, isStar: false, answerCount: 5, createdAt: '3月10日 13:23' },
    //     { _id: 'q2', title: '问卷2', isPublished: true, isStar: true, answerCount: 3, createdAt: '3月11日 13:23' },
    //     { _id: 'q3', title: '问卷3', isPublished: false, isStar: false, answerCount: 6, createdAt: '3月12日 13:23' },
    //     { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 2, createdAt: '3月9日 13:23' },
    // ])

    // const [questionList, setQuestionList] = useState([])
    // const [total, setTotal] = useState(0)
    // useEffect(() => {
    //     async function load() {
    //         const data = await getQuestionListService()
    //         console.log(data);

    //         const { list = [], total = 0 } = data
    //         setQuestionList(list)
    //         setTotal(total)
    //     }
    //     load()
    // }, [])

    // const { data = {}, loading } = useListLoadQuestionListData()
    // const { list: questionList = [], total = 0 } = data

    const [page, setPage] = useState(1)
    const [questionList, setQuestionList] = useState([])
    const [total, setTotal] = useState(0)
    const haveMoreData = total > questionList.length
    const [started, setStarted] = useState(false)

    const [searchParams] = useSearchParams()
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

    useEffect(() => {
        setStarted(false)
        setPage(1)
        setQuestionList([])
        setTotal(0)
    }, [keyword])

    const { run: load, loading } = useRequest(async () => {
        const data = await getQuestionListService({
            page,
            pageSize: LIST_PAGE_SIZE,
            keyword
        })
        return data
    }, {
        manual: true,
        onSuccess(res) {
            const { list = [], total = 0 } = res
            setQuestionList(questionList.concat(list))
            setTotal(total)
            setPage(page + 1)
        }
    })

    const containerRef = useRef<HTMLDivElement>(null)

    const { run: tryLoadMore } = useDebounceFn(() => {
        const elem = containerRef.current
        if (elem == null) return

        const domRect = elem.getBoundingClientRect()
        if (domRect == null) return
        const { bottom } = domRect
        if (bottom <= document.body.clientHeight) {
            load()
            setStarted(true)
        }
    }, {
        wait: 1000
    })

    useEffect(() => {
        tryLoadMore()
    }, [searchParams])

    useEffect(() => {
        if (haveMoreData) {
            window.addEventListener('scroll', tryLoadMore)
        }
        return () => {
            window.removeEventListener('scroll', tryLoadMore)
        }
    }, [searchParams, haveMoreData])

    const LoadMoreContentElem = useMemo(() => {
        if(!started || loading) return <Spin/>
        if(total === 0) return <Empty description="暂无数据"/>
        if(!haveMoreData) return <span>没有更多了...</span>
        return <span>开始加载下一页</span>
    }, [started, loading, haveMoreData])

    return <>
        <div
            className={styles.header}
        >
            <div className={styles.left}>
                <Title level={3}>我的问卷</Title>
            </div>
            <div className={styles.right}>
                <ListSearch />
            </div>
        </div>
        <div className={styles.content}>
            {/* <div style={{ height: '2000px' }}></div> */}
            {/* {
                loading && <div style={{ textAlign: 'center' }}>
                    <Spin />
                </div>
            } */}
            {
                (questionList.length > 0) &&
                questionList.map((item: any) => {
                    const { _id } = item
                    return <QuestionCard key={_id} {...item} />
                })
            }

        </div>
        <div className={styles.footer}>
            <div ref={containerRef}>
                {LoadMoreContentElem}
            </div>
        </div>
    </>
}

export default List

// import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuestionService } from "../services/question"
import { useRequest } from "ahooks"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { resetComponents } from "../store/componentReducer"
import { resetPageInfo } from "../store/pageInfoReducer"

function useLoadQuestionData() {
    const { id = '' } = useParams()
    const dispatch = useDispatch()

    const { data, loading, error, run } = useRequest(async (id: string) => {
        if (!id) throw new Error('没有问卷 id')
        const data = await getQuestionService(id)
        return data
    }, {
        manual: true
    })

    useEffect(() => {
        if (!data) return
        const { title = '', desc = '', js = '', css = '', isPublished = false , componentList = [] } = data

        let selelctedId = ''
        if (componentList.length > 0) {
            selelctedId = componentList[0].fe_id
        }

        dispatch(resetComponents({ componentList, selelctedId, copiedCopmponent: null }))

        dispatch(resetPageInfo({ title, desc, js, css, isPublished}))

    }, [data])

    useEffect(() => {
        run(id)
    }, [id])

    return {
        loading,
        error
    }
}

export default useLoadQuestionData
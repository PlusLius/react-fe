import axios from "axios";
import { ResDataType } from "./ajax";

export async function getQuestionStatListService(questionId: string, opt: { page: number; pageSize: number }) {
    const url = `/api/stat/${questionId}`
    const data = (await axios.get(url, { params: opt })) as ResDataType

    return data
}
export async function getComponentStatService(questionId: string, componentId: string) {
    const url = `/api/stat/${questionId}/${componentId}`
    const data = (await axios.get(url)) as ResDataType
    return data
}
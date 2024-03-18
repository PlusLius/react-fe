import { Input } from "antd";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input

const ListSearch: FC = () => {
    const [value, setValue] = useState('')
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        setValue(curVal)
    }, [searchParams])

    const handleSearch = (value: string) => {
        nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return <Search placeholder="输入关键字" allowClear value={value} onSearch={handleSearch} onChange={handleChange} style={{ width: '200px' }}></Search>
}

export default ListSearch
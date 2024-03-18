import { useEffect } from "react"
import useGetUserInfo from "./useGetUserInfo"
import { useLocation, useNavigate } from "react-router-dom"
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from "../router"

function useNavPage(watingUserData: boolean) {
    const { username } = useGetUserInfo()
    const { pathname } = useLocation()
    const nav = useNavigate()
    useEffect(() => {
        if (watingUserData) return
        if (username) {
            if (isLoginOrRegister(pathname)) {
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }
        if (isNoNeedUserInfo(pathname)) {
            return
        } else {
            nav(LOGIN_PATHNAME)
        }
    }, [watingUserData, username, pathname])
}

export default useNavPage
import React from "react";
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from "../pages/layouts/MainLayout";
import ManageLayout from "../pages/layouts/ManageLayout";
import QuestionLayout from "../pages/layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manager/List";
import Trash from "../pages/manager/Trash";
import Star from "../pages/manager/Star";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'manage',
                element: <ManageLayout />,
                children: [
                    {
                        path: 'list',
                        element: <List />
                    },
                    {
                        path: 'star',
                        element: <Star />
                    },
                    {
                        path: 'trash',
                        element: <Trash />
                    }
                ]
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            {
                path: 'edit/:id',
                element: <Edit />
            },
            {
                path: 'stat/:id',
                element: <Stat />
            }
        ]
    },
])

export default router

export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const HOME_PATHNAME = '/'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
export function isLoginOrRegister(pathname: string) {
    if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
        return true
    } else {
        return false
    }
}
export function isNoNeedUserInfo(pathname: string) {
    if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
        return true
    } else {
        return false
    }
}
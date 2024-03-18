const Mock = require('mockjs')
const Random = Mock.Random
const getQuestionList = require('./data/getQuestionList')
const getComponentList = require('./data/getComponentList')

module.exports = [
    {
        url: '/api/question/:id',
        method: 'get',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                    desc: '问卷描述',
                    js: '',
                    css: '',
                    isPublished: true,
                    isDeleted: false,
                    componentList:getComponentList()
                }
                // errno: 1002,
                // msg: '错误测试'
            }
        }
    },
    {
        url: '/api/question',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
            }
        }
    },
    {
        url: '/api/question',
        method: 'get',
        response(ctx) {
            const { url = '', query = {} } = ctx
            const isDeleted = url.indexOf('isDeleted=true') >= 0
            const isStar = url.indexOf('isStar=true') >= 0
            const pageSize = parseInt(query.pageSize) || 10

            return {
                errno: 0,
                data: {
                    list: getQuestionList({
                        isDeleted,
                        isStar,
                        len: pageSize
                    }),
                    total: 100
                }
            }
        }
    },
    {
        url:'/api/question/:id',
        method: 'patch',
        response(){
            return {
                errno: 0
            }
        }
    },
    {
        url:'/api/question/duplicate/:id',
        method: 'post',
        response(){
            return {
                errno: 0,
                data: {
                    id: Random.id()
                }
            }
        }
    },
    {
        url:'/api/question',
        method: 'delete',
        response(){
            return {
                errno: 0,
            }
        }
    },
]
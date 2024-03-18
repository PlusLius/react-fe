const Mock = require('mockjs')
const Random = Mock.Random
const getStatList = require('./data/getStatList')


module.exports = [
    {
        url:'/api/stat/:questionId',
        method: 'get',
        response(){
            return {
                errno: 0,
                data: {
                    total: 100,
                    list: getStatList()
                }
            }
        }
    },
    {
        url:'/api/stat/:questionId/:componentId',
        method: 'get',
        response(){
            return {
                errno: 0,
                data: {
                    stat: [
                        {
                            name:'选项1',
                            count: 20
                        },
                        {
                            name:'选项2',
                            count: 10
                        },
                        {
                            name:'选项3',
                            count: 25
                        },
                    ]
                }
            }
        }
    }
]
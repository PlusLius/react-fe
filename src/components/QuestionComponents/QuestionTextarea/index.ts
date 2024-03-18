import Component from './Component'
import { QuestionTextAreaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
    title: '多行输入',
    type: 'questionTextArea',
    Component,
    PropComponent,
    defaultProps: QuestionTextAreaDefaultProps
}
import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditorHeader from './EditorHeader'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
    const { loading } = useLoadQuestionData()
    const dispatch = useDispatch()

    const { title } = useGetPageInfo()
    useTitle(`问卷编辑 - ${title}`)

    function clearSelectedId() {
        dispatch(changeSelectedId(''))
    }

    return <>
        <div className={styles.container}>
            {/* <p>Edit page</p>
            <div>
                {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
            </div> */}
            {/* <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div> */}
            <EditorHeader />
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel />
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles['canvas-wrapper']}>
                            {/* <div style={{height: '900px'}}>画布测试滚动</div> */}
                            <EditCanvas loading={loading} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Edit
import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentStateType } from './componentReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { StateWithHistory, excludeAction } from 'redux-undo'

export type StateType = {
    user: UserStateType
    // components: ComponentStateType
    components: StateWithHistory<ComponentStateType>
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        // components: componentReducer,
        components: undoable(componentReducer, {
            limit: 20,
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevCompont',
                'components/selectNextCompont'
            ])
        }),
        pageInfo: pageInfoReducer
    }
})
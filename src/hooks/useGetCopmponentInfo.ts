import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentStateType } from '../store/componentReducer'

function useGetComponentInfo() {
    const componets = useSelector<StateType>(state => state.components.present) as ComponentStateType

    const { componentList = [], selelctedId = '', copiedCopmponent } = componets

    const selectedComponent = componentList.find(c => c.fe_id === selelctedId)
    return {
        componentList,
        selelctedId,
        selectedComponent,
        copiedCopmponent
    }
}

export default useGetComponentInfo
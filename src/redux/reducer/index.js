import {type} from './../action'
const initialState={
    menuName:'首页'
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
            return{
                ...state,
                menuName:action.menuName
            }
        default:
            return {...state}
    }
}
export default reducer
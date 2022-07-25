import { PresetColorTypes } from "antd/lib/_util/colors";

export default userReducer = (prevState = {}, action ={}) {
    let newState = {...prevState};
    switch(action.type){
        case 'add':
            newState.list.push(action.value)
            return newState;
        case 'delete' :
            newState.splice(action.value,1)
            return newState;
            default:
                return prevState;
    }
        
}
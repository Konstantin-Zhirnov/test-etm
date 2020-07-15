import { FETCH_GOODS, SET_ITEM_COUNT, IS_DATA } from '../actions/actionTypes'

const initialState = {
    goods: [{src: "", id: "", title: "", vendor: "", pack: "", price: "" }],
    itemCount: 0,
    isLoader: false,
    isData: false
}

export default function goodsReduser(state = initialState, action) {

    switch (action.type) {
        case FETCH_GOODS:
            return {
                ...state, goods: [...action.goods]
            }
        case SET_ITEM_COUNT:
            return {
                ...state, itemCount: Number(action.itemCount)
            }
        case IS_DATA:
            return {
                ...state, isData: true
            } 
        default:
            return state
    }
}

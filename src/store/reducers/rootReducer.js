import {combineReducers} from 'redux'
import goodsReduser from './goods'

export default combineReducers({
    goods: goodsReduser
})
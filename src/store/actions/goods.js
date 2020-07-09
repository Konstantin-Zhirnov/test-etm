import { FETCH_GOODS, SET_ITEM_COUNT, IS_DATA } from './actionTypes'

export function setGoods(goods) {
    return {
        type: FETCH_GOODS,
        goods: goods
    }
}

export function setItemCount(itemCount) {
    return {
        type: SET_ITEM_COUNT,
        itemCount: itemCount
    }
}

export function setIsData() {
    return {
        type: IS_DATA
    }
}

const mutations = {
  addCart(state, info) {
    console.log(info);
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.stockId === info.stockId)

    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count = info.count
    } else {
      info.checked = true
      state.cartList.push(info)
    }
  },
  checkedClick(state, payload){
    const currentItem = state.cartList.find(item => item.stockId === payload)
    currentItem.checked = !currentItem.checked
  },
  selectAll(state){
    if (this.getters.checkedAll){
      state.cartList.forEach(element => {
        element.checked = false
      });
    }else {
      state.cartList.forEach(element => {
        element.checked = true
      });
    }
  },
  deleteCart(state, index) {
    state.cartList.splice(index,1)
  },
  cartCountHandler(state, payload){
    state.cartList[payload.index].count += payload.num
  },
  cartListClear(state) {
    state.cartList = []
  }
}

export default mutations


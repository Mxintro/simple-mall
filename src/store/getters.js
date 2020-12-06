const getters = {
  cartList(state) {
    return state.cartList
  },
  cartCount(state) {
    return state.cartList.filter(item => item.checked).length
  },
  getTotalCost(state) {
    let total = 0
    state.cartList.forEach(el => {
      if(el.checked === true && el.count > 0){
        total += el.nowprice * el.count
      }
    });
    return total
  },
  checkedAll(state){ 
    return state.cartList.find(item => item.checked === false) === undefined
  },
  getOrderCost: (state) => (index) => {
    console.log(index);
    const item = state.cartList[index]
    return Math.round(item.count*item.nowprice*100)/100
  }
}

export default getters

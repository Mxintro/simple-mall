const getters = {
  cartList(state) {
    return state.cartList
  },
  cartCount(state, getters) {
    return getters.cartList.length
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
  // getChecked: state => id => {
  //   return state.cartList.find(item => item.iid===id).checked
  // },
  checkedAll(state){ 
    return state.cartList.find(item => item.checked === false) === undefined
  }
}

export default getters

export function formatDate(date,fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4-RegExp.$1.length))
  }
  let d = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in d) {
    if (new RegExp(`(${k})`).test(fmt)){
      let str = d[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substring(str.length))
    }
  }
  return fmt
}

export function throttle(fn, wait) {
  let lock = false
	return function() {
		if(lock) {
			return
		}
		lock = true
		setTimeout(() => {
      fn.call(this, lock)
      lock = false
		}, wait)
	}	
}

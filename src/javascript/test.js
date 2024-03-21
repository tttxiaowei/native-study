let temp = '1121238'
const reg = temp.includes('.') ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g
temp = temp.replace(reg, ($0, $1) => {
    return $1 + ','
})
console.log(temp)
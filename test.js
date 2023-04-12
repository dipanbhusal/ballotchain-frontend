let data = [1, 2, 3]
let result_n = {}
let result_p = {}
let result_k = {}
data.forEach((each) => {
  if (result_n.hasOwnProperty(each.label)) {
    result_n[each.label].concat(each.N)
  } else {
    result_n[each.label] = [each.N]
  }
  if (result_p.hasOwnProperty(each.label)) {
    result_p[each.label].concat(each.P)
  } else {
    result_n[each.label] = [each.P]
  }
  if (result_k.hasOwnProperty(each.label)) {
    result_k[each.label].concat(each.K)
  } else {
    result_n[each.label] = [each.K]
  }
})

dat.forEach((each) => {
  if (res.hasOwnProperty(each.label)) {
    res[each.label] = res[each.label].concat(each.N)
    console.log(res)
  } else {
    res[each.label] = [each.N]
  }
  if (result_p.hasOwnProperty(each.label)) {
    result_p[each.label].concat(each.P)
  } else {
    result_n[each.label] = [each.P]
  }
  if (result_k.hasOwnProperty(each.label)) {
    result_k[each.label].concat(each.K)
  } else {
    result_n[each.label] = [each.K]
  }
})

array.forEach((element) => {})

export const saveRecent = (name: string) => {
  const oldArr = localStorage.getItem('recentArr')
  if (oldArr) {
    let originArr = JSON.parse(oldArr)
    originArr = originArr.filter((item: string) => item !== name)
    originArr.unshift(name)
    if (originArr.length > 5) {
      originArr.pop()
    }
    localStorage.setItem('recentArr', JSON.stringify(originArr))
  } else {
    localStorage.setItem('recentArr', JSON.stringify([name]))
  }
}

export const getRecent = () => {
  const result = localStorage.getItem('recentArr')
  if (result) {
    return JSON.parse(result)
  } else {
    return []
  }
}
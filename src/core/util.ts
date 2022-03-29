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

export const getKdaColor = (kda: number) => {
  if (kda >= 3 && kda < 4) {
    return 'normal'
  } else if (kda >= 4 && kda < 5) {
    return 'good'
  } else if (kda >= 5) {
    return 'excellent'
  } else {
    return ''
  }
}

export const getWinRate = (win: number, lose: number) => {
  if (win <= 0) {
    return 0
  } else {
    return win / (win + lose)
  }
}

export const getKda = (kill: number, death: number, assist: number) => {
  if (death <= 0) {
    return kill + assist
  } else {
    return (kill + assist) / death
  }
}
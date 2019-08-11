// 第 110 题：编程题，请写一个函数，完成以下功能
// 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'

function a() {
  let str = '1,2,3,5,7,8,10'
  const arr = str.split(',').map(item => Number(item))
  const result = []
  let temp = arr[0]
  arr.forEach((value, index) => {
      if (value + 1 !== arr[index + 1]) {
          if (temp !== value) {
              result.push(`${temp}~${value}`)
          } else {
              result.push(`${value}`)
          }
          temp = arr[index + 1]
      }
  })
}
a()
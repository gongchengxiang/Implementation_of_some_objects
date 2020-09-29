// 方法1
function fbnq1(n){
  if(n<2) return n
  return fbnq1(n-1) + fbnq1(n-2)
}
// 方法二
function fbnq2(n){
  const _fbnq = (n,a,b)=>{
    if(n == 1) return a
    if(n == 2) return b
    return _fbnq(n-1,b,a+b)
  }
  return _fbnq(n,1,1)
}
// 方法三
function fbnq3(n){
  let a = 0, b = 1
  let i = 2
  while(i<n){
    [a, b] = [b, a + b]
    i++
  }
  return a + b
}
function fbnq4(n){
  let a = 0, b = 1;
  for(let i = 2;i<n;i++) {
    [a, b] = [b, a + b]
  }
  return a + b
}
const res = fbnq3(1100)
console.log(res)


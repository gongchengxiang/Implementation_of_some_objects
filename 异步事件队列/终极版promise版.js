const ajax = function (name){
  return new Promise((resolve,reject)=>{
    console.log(name+'开始执行')
    setTimeout(()=>{
     
      if(Math.random()>=0.5){
        console.log(name+'执行结束:success')
        resolve()
      }else{
        console.log(name+'执行结束:error')
        reject()
      }
    }, 1000)
  })
}

const fn1 = (params) => {
  console.log('f1接收到参数:'+params+' '+Date.now())
  return ajax('f1').then(()=>{
    console.log('fn1返回了')
    return 'fn1'
  })
}
const fn2 = (params) =>{
  console.log('f2接收到参数:'+ params +' '+Date.now())
  return ajax('f2').then(()=>{
    console.log('fn2返回了')
    return 'fn2'
  })
} 
const fn3 = (params) =>{
  console.log('f3接收到参数:'+ params +' '+Date.now())
  return ajax('f3').then(()=>{
    console.log('fn3返回了')
    return 'fn3'
  })
}

function fnList(...fnlist){
  let sequence = Promise.resolve('start');
  fnlist.forEach(fn=>{
    sequence = sequence.then(fn).catch(err=>{
      console.log(err)
      throw new Error(err)
    })
  })
}

fnList(fn1,fn2,fn3);

// TODO:发现在node中执行
// 打印出来的log有时候感觉时间不太对，逻辑是正确的
// 是不是vscode命令行输出是异步的？？？待考虑

class MyPromise {
  constructor(executor){ // executor: (执行人，代理人，遗嘱执行者😆，等等的解释)
    if(!executor) throw new Error('缺少参数：executor')
    if(typeof executor != 'function') throw new Error('参数错误：executor')

    this.status = 'padding' // 初始状态
    this.fulfilledValue = undefined // fulfilled状态返回值
    this.rejectedValue = undefined // rejected状态返回值
    this.onResolveCallBackFn = undefined // resolve回调
    this.onRejectCallackFn = undefined  // reject回调

    const resolve = (fulfilledValue)=>{
      if(this.status === 'padding'){
        this.status = 'fulfilled'
        this.fulfilledValue = fulfilledValue
        this.onResolveCallBackFn(this.fulfilledValue)
      }
    }

    const reject = (rejectedValue)=>{
      if(this.status === 'padding'){
        this.status = 'rejected'
        this.rejectedValue = rejectedValue
        this.onResolveCallBackFn(this.rejectedValue)
      }
    }
    
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onResolveCallBackFn){
    if(this.status === 'padding' && onResolveCallBackFn){
      this.onResolveCallBackFn = onResolveCallBackFn 
    }
    if(this.status === 'fulfilled'){
      onResolveCallBackFn(this.fulfilledValue)
    }
    return this
  }
  catch(onRejectCallackFn){
    if(this.status === 'padding' && onRejectCallackFn){
      this.onRejectCallackFn = onRejectCallackFn 
    }
    if(this.status === 'rejected' && onRejectCallackFn){
      onRejectCallackFn(this.rejectedValue)
    }
    return this
  }
}
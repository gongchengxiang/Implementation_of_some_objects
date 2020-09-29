class MiniPromise {
  constructor(executor){
    if(!executor || typeof executor != 'function') throw new Error('executor:error')
    this.state = 'pending'
    this.fulfillValue = undefined
    this.rejectedValue = undefined
    this.resolvedCallBack = undefined
    this.rejectedCallBack = undefined
    const resolve = (fulfillValue) =>{
      if(this.state == 'pending'){
        this.state = 'fulfilled'
        this.fulfillValue = fulfillValue
        if(this.resolvedCallBack) this.resolvedCallBack(this.fulfillValue)
      }
    }
    const reject = (rejectedValue) =>{
      if(this.state == 'pending'){
        this.state = 'rejected'
        this.rejectedValue = rejectedValue
        if(this.rejectedCallBack) this.rejectedCallBack(this.rejectedValue)
      }
    }
    try{
      executor(resolve,reject)
    }catch(err){
      reject(err)
    }
  }
  then(resolvedCallBack){
    if(resolvedCallBack && typeof resolvedCallBack == 'function'){
      setTimeout(()=>{
        if(this.state == 'pending'){
          this.resolvedCallBack = resolvedCallBack
        }else if(this.state == 'fulfilled'){
          this.resolvedCallBack = resolvedCallBack
          this.resolvedCallBack(this.fulfillValue)
        }
      },0)
    }
    return this
  }
  catch(rejectedCallBack){
    if(rejectedCallBack && typeof rejectedCallBack == 'function'){
      setTimeout(()=>{
        if(this.state == 'pending'){
          this.rejectedCallBack = rejectedCallBack
        }else if(this.state == 'rejected'){
          this.rejectedCallBack = rejectedCallBack
          this.rejectedCallBack(this.rejectedValue)
        }
      },0)
    }
    return this
  }
}

new MiniPromise((resolve,reject)=>{
  if(Math.random()>0.5){
    resolve('>=0.5')
  }else{
    reject('<0.5')
  } 
}).then(res=>{
  console.log(`resolved:${res}`)
}).catch(err=>{
  console.log(`rejected:${err}`)
})
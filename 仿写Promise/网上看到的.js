const pending = "pending";//Promise会一直保持挂起状态，知道被执行或拒绝。
const fulfilled = "fulfilled";
const rejected = "rejected";
class MyPromise{
  constructor(exector){
    let self = this;//缓存当前promise对象
    self.status = pending;//初始状态,对promise对象调用state(状态)方法，可以查看其状态是“pending"、"resolved"、还是”rejected“
    self.value = undefined;// fulfilled状态时 返回的信息
    self.reason = undefined;// rejected状态时 拒绝的原因
    self.onResolveCallBacks = [];// 存储resolve(成功)状态对应的onFulfilled函数
    self.onRejectCallBacks = [];// 存储rejected(失败)状态对应的onRejected函数
    let resolve = (value) => {//成功
      if(self.status === pending){//如果成功则，状态由pending=>fulfilled
        self.status = fulfilled;
        self.value = value;
        self.onResolveCallBacks.forEach(cb=>cb(self.value));//执行发布
      }
    }
    let reject = (reason) => {//失败
      if(self.status === pending){//如果失败，则状态由pending=>rejected
        self.status = rejected;
        self.reason = reason;
        self.onRejectCallBacks.forEach(cb=>cb(self.reason));//执行发布
      }
    }
    try{
      exector(resolve,reject)                 
    }catch(e){
      reject(e)
    }
  }
  then(onFulfilled,onRejected){
    let self=this;
    if(self.status === fulfilled){
      onFulfilled(self.value);//成功值
    }
    if(self.status === rejected){
      onFulfilled(self.reason);//拒绝原因
    }
    if(self.status === pending){
      self.onResolveCallBacks.push(onFulfilled);//订阅发布
      self.onRejectCallBacks.push(onRejected);//订阅发布
    }
  }
  //promise的决议结果只有两种可能：完成和拒绝，附带一个可选的单个值。如果Promise完成，那么最终的值称为完成值；如果拒绝，那么最终的值称为原因。Promise只能被决议（完成或拒绝）一次。之后再次试图完成或拒绝的动作都会被忽略。
}
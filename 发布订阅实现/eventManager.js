class EventManager {
  constructor (){
    this.handles = {}
  }
  on(eventName, handle){
    if(!this.handles[eventName]) this.handles[eventName] = []
    if(handle && typeof handle === 'function') this.handles[eventName].push(handle)
  }
  off(eventName, handle){
    if(this.handles[eventName]){
      const deleteIndex = []
      this.handles[eventName].forEach((handleItem, index) =>{
        if(handle === handleItem) deleteIndex.push(index)
      })
      this.handles[eventName] = this.handles[eventName].filter((e, i) => !deleteIndex.includes(i))
    }
  }
  emit(eventName, ...params){
    if(this.handles[eventName]){
      this.handles[eventName].forEach(handleItem =>{
        handleItem(...params)
      })
    }
  }
}
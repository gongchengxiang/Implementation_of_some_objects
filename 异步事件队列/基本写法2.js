function Iterator () {
  this.fnList = [];
}
Iterator.prototype.use = function (fn) {
  this.fnList.push(fn);
  return this;
};
Iterator.prototype.run = function () {
  function createNext (fn, next) {
    return function () {
      fn(next);
    };
  }
  const len = this.fnList.length;
  let next = function () {};
  for (let i = len - 1; i >= 0; i--) {
    const currentFn = this.fnList[i];
    next = createNext(currentFn, next); // 从后往前遍历,前面的闭包保存后面的 next
  }
  next();
};
const iterator = new Iterator();
iterator
  .use(function (next) {
  // 这里可以做一些异步操作,只需要成功后调用 next
    console.log('a');
    next();
  })
  .use(function (next) {
    console.log('b');
    next();
  })
  .run();

function createNext (fn, next) {
  return function () {
    fn(next);
  };
}
const fnList = [
  function a (next) {
    console.log(111);
    next();
  },
  function b (next) {
    console.log(222);
    next();
  },
  function c (next) {
    console.log(333);
    next();
  },
  function d (next) {
    console.log(444);
    next();
  }
];
let next = function () { };
for (let i = fnList.length - 1; i >= 0; i--) {
  next = createNext(fnList[i], next);
}
next();

const syncFnList = async function (fnList = [],initParams = null) {
  const { length } = fnList;
  let params = initParams;
  for (let i = 0; i < length; i++) {
    params = await new Promise((resolve) => {
      fnList[i](resolve, params);
    });
  }
  return Promise.resolve(params);
};
// const fnList = [
//   function a (resolve, params) {
//     // console.log('收到:', params);
//     setTimeout(() => {
//       // console.log('返回:a');
//       resolve('a');
//     }, 1000);
//   },
//   function b (resolve, params) {
//     // console.log('收到:', params);
//     setTimeout(() => {
//       // console.log('返回:b');
//       resolve('b');
//     }, 1000);
//   },
//   function c (resolve, params) {
//     // console.log('收到:', params);
//     setTimeout(() => {
//       // console.log('返回:c');
//       resolve('c');
//     }, 1000);
//   }
// ];
syncFnList(fnList).then(res=>{
  // console.log('fdsfds);
})

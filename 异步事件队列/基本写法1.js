function nextRegister (fnList = []) {
  let index = 0;
  const next = (params) => {
    index++;
    if (index < fnList.length) {
      fnList[index](next, params);
    } else {
      console.log(`结束:${params}`);
    }
  };
  fnList[index](next, 'start');
}
// const fnList = [
//   function a (next, params) {
//     console.log(`收到参数:${params}`);
//     setTimeout(() => {
//       next(`${params}->${'a'}`);
//     }, 100);
//   },
//   function b (next, params) {
//     console.log(`收到参数:${params}`);
//     setTimeout(() => {
//       next(`${params}->${'b'}`);
//     }, 100);
//   },
//   function c (next, params) {
//     console.log(`收到参数:${params}`);
//     setTimeout(() => {
//       next(`${params}->${'c'}`);
//     }, 100);
//   }
// ];
// nextRegister(fnList);

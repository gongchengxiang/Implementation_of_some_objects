// TODO: 没有理解，发现这里面的async和await一点用都没有
class Iterator {
  constructor () {
    this.middlewares = [];
  }
  use (fn) {
    this.middlewares.push(fn); // 存入任务
    return this;
  }
  async run (ctx) {
    function createNext (middleware, oldNext) {
      return async () => {
        await middleware(ctx, oldNext);
      };
    }
    const len = this.middlewares.length;
    let next = async () => {
      return Promise.resolve();
    };
    for (let i = len - 1; i >= 0; i--) {
      const currentMiddleware = this.middlewares[i];
      next = createNext(currentMiddleware, next);
    }
    await next();
  }
}

const app = new Iterator();
app.use(async (ctx, next) => {
  console.log('start:a');
  await next();
  console.log('end:a');
});

app.use(async (ctx, next) => {
  console.log('start:b');
  await next();
  console.log('end:b');
});
app.run();

- react-router-dom

  路径匹配需要结合 webpack: apihistorycallback 和 'history' package 的初始化方法使用，原因未知
  后续：webpack 资源获取的路径问题，暂时将 output.publicPath 更改为 "/" 就可以正常使用嵌套路由，原因未知
  首页和 404 不能同时生效，猜测是路径匹配规则的问题，待解决

- typescript

  interface 和 type 的定义目前表达能力很差，需要结合 React 提供的组件 props 进一步优化

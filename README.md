# README.md

vue-loader 14 内置 css-loader, 15 一律不管，全部回流到 webpack 处理.
TypeScript 7.0.2 和 ts-loader 9.6.2 不兼容。需要降到5.x

ts-loader 实际存在 @vue/cli-plugin-typescript 内部依赖并封装了 ts-loader。它不是不用，是 间接引用 ——你 package.json 看不到，装完依赖后在 node_modules/ts-loader 里躺着。CLI 插件把 ts-loader 的配置写死在它的源码里了。

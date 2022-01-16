# Template

给脚手架使用的模板库代码，语法规范严格遵循 `template-vue2-manage/README.md` 里面的「风格指南」。模板库的开发依托于脚手架的开发，想要看效果需要启动脚手架开发环境才能看到。


## 快速开始

```bash
# cd 到 template-vue2-manage
cd template-vue2-manage

# 启动脚手架的开发环境
npm run dev
```

### 开发说明

1、所有模板库里面需要的 mock 数据都定义在 `mock/modules/mock.js` 里面的，数据的增删改查都只改这里面的。

2、在 `src/views/template` 里面新增页面之后，在 `src/router/template.js` 里面新增路由


### 发布流程

页面开发完成后，在 `src/views/template/build/template.config.js` 里面的 `fileNames` 数组里面添加一个配置项，字段注解如下：

```js
const fileName = {
  // 对应 src/ 下的页面名称，唯一不可重复
  fileName: 'modal-empty',
  // 该模板通过什么命令创建，唯一不可重复
  prefix: 'ak-modal-empty',
  // 模板的标题，唯一不可重复
  title: '空弹框',
  // 模板的描述概要，尽量简明的说清楚当前模板提供的功能
  description: '里面的内容完全自定义，只是提供了一个弹框的结构'
}
```

然后在 `src/views/template` 执行 `npm run build` 打包插件需要的 json 配置，打包成功后，按 F5 进入调试模式进行测试。

当功能测试完成后，cd 到 `snippets`，修改好本次要发布的版本号以及更新记录，执行 `npm run build` 打包出插件，然后执行 `npm run publish` 命令即可进行发布。

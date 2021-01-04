## JS 常用组件

### 目录结构

```
JSComponents
  ├ tab                     选项卡组件文件夹
  │  ├ themes               主题文件夹
  │  │  └ default.css       默认主题
  │  ├ demo.html            选项卡 demo
  │  └ tab.js               选项卡组件
```

### 使用说明

#### Tab

在 HTML 部分

```html
<div id="app">

</div>
```

```javascript
// 1. 导入 Tab，注意路径的修改
import Tab from './tab/tab.js'

// 2. 实例化
new Tab({
    el: '#app'
})
```

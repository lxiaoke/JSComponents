# JS 常用组件

[TOC]

## 目录结构

```
JSComponents
  ├ components                      组件目录
  │  ├ tab                          tab 组件文件夹
  │  │  ├ themes                    tab 组件主题文件夹
  │  │  │  └ default.css            默认的 tab 组件主题
  │  │  └ tab.js                    tab 组件
  │  └ calendar                     calendar 组件文件夹
  │     ├ themes                    calendar 组件主题文件夹
  │     │  └ default.css            默认的 calendar 组件主题
  │     └ calendar.js               calendar 组件
  ├ examples                        示例文件夹
  │  └ tab.html                     tab 示例
  └ README.md                       说明文件
```

## 使用说明

### Tab

#### 示例代码

HTML 部分

> 注意事项
>
> 1. `.tab`, `.tab-head`, `.tab-body` 为固定 class，不可更改
> 2. 选中项 class 为 `on`
> 3. `data-id` 为 Tab 切换的重要依据，必不可少

```html
<div id="app">
    <div class="tab">
        <ul class="tab-head">
            <!-- data-id 是 Tab 切换的重要属性，不可缺少 -->
            <li class="tab-head-item on" data-id="1">加密</li>
            <li class="tab-head-item" data-id="2">为什么安全</li>
            <li class="tab-head-item" data-id="3">密码学</li>
            <li class="tab-head-item" data-id="4">古代</li>
            <li class="tab-head-item" data-id="5">雅典</li>
        </ul>
        <div class="tab-body">
            <!-- data-for 与 head 中的 data-id 对应 -->
            <div class="tab-body-item on" data-for="1">
                加密，是以某种特殊的算法改变原有的信息数据，使得未授权的用户即使获得了已加密的信息，但因不知解密的方法，仍然无法了解信息的内容。 在航空学中，指利用航空摄影像片上已知的少数控制点，通过对像片测量和计算的方法在像对或整条航摄带上增加控制点的作业。
            </div>
            <div class="tab-body-item" data-for="2">
                加密之所以安全，绝非因不知道加密解密算法方法，而是加密的密钥是绝对的隐藏，流行的RSA和AES加密算法都是完全公开的，一方取得已加密的数据，就算知道加密算法也好，若没有加密的密钥，也不能打开被加密保护的信息。单单隐蔽加密算法以保护信息，在学界和业界已有相当讨论，一般认为是不够安全的。公开的加密算法是给黑客和加密家长年累月攻击测试，对比隐蔽的加密算法要安全得多。
            </div>
            <div class="tab-body-item" data-for="3">
                在密码学中，加密是将明文信息隐匿起来，使之在缺少特殊信息时不可读。虽然加密作为通信保密的手段已经存在了几个世纪，但是，只有那些对安全要求特别高的组织和个人才会使用它。在20世纪70年代中期，强加密（Strong Encryption） 的使用开始从政府保密机构延伸至公共领域， 并且目 前已经成为保护许多广泛使用系统的方法，比如因特网电子商务、手机网络和银行自动取款机等。
            </div>
            <div class="tab-body-item" data-for="4">
                在古代，加密是由许多办法完成的。在中国较“流行”使用淀粉水在纸上写字，再浸泡在碘水中使字浮现出来。而外国就不同了，最经典的莫过于伯罗奔尼撒战争。公元前405年，雅典和斯巴达之间的伯罗奔尼撒战争已进入尾声。斯巴达军队逐渐占据了优势地位，准备对雅典发动最后一击。这时，原来站在斯巴达一边的波斯帝国突然改变态度，停止了对斯巴达的援助，意图是使雅典和斯巴达在持续的战争中两败俱伤，以便从中渔利。在这种情况下，斯巴达急需摸清波斯帝国的具体行动计划，以便采取新的战略方针。正在这时，斯巴达军队捕获了一名从波斯帝国回雅典送信的雅典信使。斯巴达士兵仔细搜查这名信使，可搜查了好大一阵，除了从他身上搜出一条布满杂乱无章的希腊字母的普通腰带外，别无他获。情报究竟藏在什么地方呢？斯巴达军队统帅莱桑德把注意力集中到了那条腰带上，情报一定就在那些杂乱的字母之中。他反复琢磨研究这些天书似的文字，把腰带上的字母用各种方法重新排列组合，怎么也解不出来。最后，莱桑德失去了信心，他一边摆弄着那条腰带，一边思考着弄到情报的其他途径。当他无意中把腰带呈螺旋形缠绕在手中的剑鞘上时，奇迹出现了。原来腰带上那些杂乱无章的字母，竟组成了一段文字。这便是雅典间谍送回的一份情报，它告诉雅典，波斯军队准备在斯巴达军队发起最后攻击时，突然对斯巴达军队进行袭击。斯巴达军队根据这份情报马上改变了作战计划，先以迅雷不及掩耳之势攻击毫无防备的波斯军队，并一举将它击溃，解除了后顾之忧。随后，斯巴达军队回师征伐雅典，终于取得了战争的最后胜利。
            </div>
            <div class="tab-body-item" data-for="5">
                雅典间谍送回的腰带情报，就是世界上最早的密码情报，具体运用方法是，通信双方首先约定密码解读规则，然后通信—方将腰带（或羊皮等其他东西）缠绕在约定长度和粗细的木棍上书写。收信—方接到后，如不把腰带缠绕在同样长度和粗细的木棍上，就只能看到一些毫无规则的字母。后来，这种密码通信方式在希腊广为流传。现代的密码电报，据说就是受了它的启发而发明的。
            </div>
        </div>
    </div>
</div>
```

JavaScript 部分

```javascript
// 1. 导入 Tab，注意路径的修改
import Tab from './tab/tab.js'

// 2. 实例化
new Tab({
    el: '#app'
})
```

#### 参数说明

| 参数      | 描述                        | 默认值        |
| --------- | --------------------------- | ------------- |
| el        | 必需，外层选择器            | -             |
| themeDir  | 主题目录                    | themes/       |
| theme     | 主题，主题目录下的 css 文件 | default       |
| headClass | 头 class                    | tab-head-item |
| bodyClass | 主体 class                  | tab-body-item |

----

### Calendar

#### 示例代码

HTML 部分

```html
<style>
    #app {
        width: 300px;
        background-color: #ffffff;
        box-shadow: 0 0 5px 0 #999999;
    }
</style>
<div id="app"></div>
```

JavaScript 部分

```javascript
import Calendar from '../components/calendar/calendar.js'
let calendar = new Calendar({
    el: '#app'
})
```

#### 参数说明

| 参数     | 描述             | 默认值               |
| -------- | ---------------- | -------------------- |
| el       | 必须，外层选择器 | -                    |
| themeDir | 主题文件夹       | 组件的 themes 文件夹 |
| theme    | 主题文件         | default              |


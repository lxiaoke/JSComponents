import Component from '../component.js'

export default class Tab extends Component {
    constructor (options) {
        super()
        this.$options = Object.assign({
            themeDir: this.getCurrentPath() + '/themes/',           // 主题文件所放的文件夹
            theme: 'default',                                       // 主题文件，实际上是 css 文件，即 default.css
            headClass: 'tab-head-item',
            bodyClass: 'tab-body-item'
        }, options)

        if (!this.$options.el) {
            throw 'el 为必需参数'
        }

        // 初始化
        this.init()
        // 执行
        this.run()
    }

    /**
     * 执行操作
     */
    run() {
        const elem = document.querySelector(this.$options.el)

        // 给所有的 .tab-head-item 添加点击事件
        elem.querySelectorAll(`.${this.$options.headClass}`).forEach(el => {
            el.addEventListener('click', e => {
                const headEl = e.target

                if (headEl.classList.contains('on')) {
                    return;
                }

                // 切换 head 内容
                headEl.parentElement.querySelectorAll(`.${this.$options.headClass}.on`).forEach(el => {
                    el.classList.remove('on')
                })
                headEl.classList.add('on')

                // 切换 body 内容
                const id = headEl.dataset.id || ''
                const item = elem.querySelector(`.${this.$options.bodyClass}[data-for="${id}"]`)
                elem.querySelectorAll(`.${this.$options.bodyClass}.on`).forEach(el => {
                    el.classList.remove('on')
                })
                if (item) {
                    item.classList.add('on')
                }

            })
        })
    }

    /**
     * 初始化操作
     */
    init() {
        const linkEl = document.createElement('link')
        linkEl.rel = 'stylesheet'
        linkEl.href = this.$options.themeDir + this.$options.theme + '.css'
        document.querySelector('head').appendChild(linkEl)
    }
}
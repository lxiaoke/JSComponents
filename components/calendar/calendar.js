const prevYearIcon = '<svg t="1609911547992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6837" width="1em" height="1em"><path d="M724.053333 233.386667l45.226667 45.248-233.365333 233.258666 233.386666 233.493334-45.269333 45.226666-278.613333-278.741333 278.613333-278.485333z m-234.666666 0l45.226666 45.248-233.365333 233.258666 233.386667 233.493334-45.269334 45.226666L210.773333 511.893333l278.613334-278.485333z" p-id="6838"></path></svg>',
    prevMonthIcon = '<svg t="1609911477444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6447" width="1em" height="1em"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6448"></path></svg>',
    nextYearIcon = '<svg t="1609911528599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6707" width="1em" height="1em"><path d="M533.333333 233.386667l278.613334 278.485333L533.333333 790.613333l-45.248-45.226666 233.386667-233.514667-233.386667-233.258667L533.333333 233.386667z m-234.666666 0l278.613333 278.485333L298.666667 790.613333l-45.248-45.226666 233.386666-233.514667-233.386666-233.258667L298.666667 233.386667z" p-id="6708"></path></svg>',
    nextMonthIcon = '<svg t="1609911509026" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6577" width="1em" height="1em"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6578"></path></svg>'

import Component from '../component.js'

export default class Calendar extends Component {
    constructor(options) {
        super()

        this.$options = Object.assign({
            prevYearIcon,
            prevMonthIcon,
            nextYearIcon,
            nextMonthIcon,
            theme: 'default',
            themeDir: this.getCurrentPath() + '/themes/'
        }, options)

        if (!this.$options.el) {
            throw 'el 为必须参数'
        }

        this.$elem = document.querySelector(this.$options.el)

        if (!this.$elem) {
            this.__proto__ = null
            return
        }

        this.importTheme()

        this.reset()
    }

    /**
     * 导入主题，默认是使用当前文件夹下的 theme
     */
    importTheme() {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = this.$options.themeDir + this.$options.theme + '.css'
        document.querySelector('head').appendChild(link)
    }

    /**
     * 重置日期
     */
    reset() {
        this.$date = new Date()
        this.render()
    }

    /**
     * 渲染
     */
    render() {
        const calendarContent = this.getCalendarContent()

        let str = `<div class="calendar"><div class="calendar-head">` +
            `<span class="prev-year">${ this.$options.prevYearIcon }</span><span class="prev-month">${ this.$options.prevMonthIcon }</span>` +
            `<span class="calendar-year">${ this.$date.getFullYear() }</span><span>年</span>` +
            `<span class="calendar-month">${ this.getShowMonth() }</span><span>月</span>` +
            `<span class="next-month">${ this.$options.nextMonthIcon }</span><span class="next-year">${ this.$options.nextYearIcon }</span></div>` +
            `<div class="calendar-body"><table><thead><tr>` +
            `<th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>` +
            `<tr></thead><tbody class="calendar-content">${ calendarContent }</tbody></table></div></div>`

        this.$elem.innerHTML = str

        this.listenClick()
    }

    /**
     * 获取显示的月份（两位）
     */
    getShowMonth() {
        let month = this.$date.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        return month
    }

    /**
     * 监听点击
     */
    listenClick() {
        this.$elem.querySelectorAll('.prev-year, .next-year, .prev-month, .next-month').forEach(el => {
            el.addEventListener('click', () => {
                const funcName = 'set' + this.$helper.transDashToCamel(el.className)
                this[ funcName ] && this[ funcName ].apply(this)
                this.render()
            })
        })

        this.$elem.querySelectorAll('.calendar-body > table td').forEach(el => {
            el.addEventListener('click', () => {
                if (el.classList.contains('active')) {
                    return
                }
                if (el.classList.contains('is-prev-month')) {
                    this.setPrevMonth()
                }

                if (el.classList.contains('is-next-month')) {
                    this.setNextMonth()
                }
                this.$date.setDate(el.innerHTML)
                this.render()
            })
        })
    }

    /**
     * 设置前一个月
     */
    setPrevMonth() {
        let year = this.$date.getFullYear()

        if (this.$date.getMonth() === 0) {
            this.$date.setFullYear(--year)
        }

        this.setMonth(this.$date.getMonth() - 1, year)
    }

    /**
     * 设置下个月
     */
    setNextMonth() {
        let year = this.$date.getFullYear()

        if (this.$date.getMonth() === 11) {
            this.$date.setFullYear(++year)
        }

        this.setMonth(this.$date.getMonth() + 1, year)
    }

    /**
     * 根据传入的下个月和年份信息设置月份
     * @param {Integer} nextMonth 下个月
     * @param {Integer} year 年份
     */
    setMonth(nextMonth, year) {
        if (nextMonth < 0) {
            nextMonth = 11
        }
        nextMonth %= 12

        this.setDate(year, nextMonth)
        this.$date.setMonth(nextMonth)
    }

    /**
     * 设置前一年
     */
    setPrevYear() {
        this.setDate(this.$date.getFullYear() - 1, this.$date.getMonth())
        this.$date.setFullYear(this.$date.getFullYear() - 1)
    }

    /**
     * 设置下一年
     */
    setNextYear() {
        this.setDate(this.$date.getFullYear() + 1, this.$date.getMonth())
        this.$date.setFullYear(this.$date.getFullYear() + 1)
    }

    /**
     * 根据传入的年份和月份设置日期
     * @param {Integer} year 年份
     * @param {Integer} month 月份
     */
    setDate(year, month) {
        this.$date.setDate(Math.min(this.$date.getDate(), (new Date(year, month + 1, 0)).getDate()))
    }

    /**
     * 获取日历内容
     */
    getCalendarContent() {
        let str = '',
            i = 0,
            needAppend = true,
            classContent = ''

        const fullYear = this.$date.getFullYear(),                  // 年
            month = this.$date.getMonth(),                          // 月（0开始）
            firstDay = (new Date(fullYear, month, 1)).getDay(),     // 当月第一天是周几
            count = (new Date(fullYear, month + 1, 0)).getDate()    // 当月总天数

        while (needAppend) {
            if (i % 7 === 0) {
                str += '<tr>'
            }

            let date = i + 1 - firstDay,
                showDate = date

            classContent = ''

            // 上个月的数据
            if (i < firstDay) {
                showDate = (new Date(fullYear, month, date)).getDate()
                classContent = 'not-this-month is-prev-month'
            }

            // 下个月的数据
            if (date > count) {
                showDate -= count
                classContent = 'not-this-month is-next-month'
            }

            // 设置当前点击的 class
            if (showDate === this.$date.getDate() && classContent === '') {
                classContent = 'active'
            }

            // 设置今日 class
            let todayDate = new Date()
            if (fullYear === todayDate.getFullYear() && month === todayDate.getMonth() && showDate === todayDate.getDate() && classContent === '') {
                classContent += ' is-today'
            }

            str += `<td class="${ classContent }">${ showDate }</td>`

            if (i % 7 === 6) {
                str += '</tr>'
                if (date > count) {
                    needAppend = false
                }
            }
            i++
        }

        return str
    }
}

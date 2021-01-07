import helper from './helper.js'

export default class Component {
    constructor() {
        this.$helper = helper
    }

    /**
     * 获取当前路径，如 Calendar 就是 ./calendar/
     */
    getCurrentPath() {
        'use struct'
        let stack

        try {
            a
        } catch (e) {
            stack = e.stack || e.sourceURL || e.stacktrace
            const dirName = helper.transCamelToDash(this.constructor.name)

            let rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
                absPath = rExtractUri.exec(stack)

            if (absPath[ 0 ]) {
                return absPath[ 0 ].substr(0, absPath[ 0 ].lastIndexOf('/')) + `/${ dirName }`
            }
        }

        return ''
    }
}


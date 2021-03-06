export default {
    /**
     * 转换驼峰 -> -
     * 如： aaBbbCc -> aa-bbb-cc
     */
    transCamelToDash(str) {
        let arr = str.split('')
        str = arr.map((item, key) => {
            if (key > 0 && item.toUpperCase() === item) {
                return '-' + item.toLowerCase()
            }
            return item
        })
        return str.join('').toLowerCase()
    },

    /**
     * 转换 - -> 驼峰
     * 如： aa-bbb-cc -> AaBbbCc
     */
    transDashToCamel(str) {
        let arr = str.split('-')
        str = arr.map(item => {
            return item[0].toUpperCase() + item.substr(1)
        })
        return str.join('')
    }
}
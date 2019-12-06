
export const tableCalculator = {

    sum: (data, columIndex) => {
         if(data==null) return;
        let sum1 = 0;
        data.forEach(element => {
            sum1 = sum1 + parseFloat(element[columIndex]);
        });

        return sum1.toFixed(2);

    },

    convertToZhCapital: (num) => {
        if (num === "") return;

        let str = num.trim();
        let strs = str.split(".");
        let part1 = strs[0]; //整数部分
        let part2 = strs[1] || null; //小数部分

        const 中文整数位数 = [
            "圆", "拾", "佰", "仟", "萬", "拾", "佰", "仟", "亿", "拾", "佰", "仟", "萬"
        ];
        const 中文小数位数 = [
            "角", "分", "厘", "毫"
        ]

        const ZNmap = {
            "1": "壹",
            "2": "贰",
            "3": "叁",
            "4": "肆",
            "5": "伍",
            "6": "陆",
            "7": "柒",
            "8": "捌",
            "9": "玖",
            "0": "零"
        }

        let result = []
        let i = 0;
        part1.split("").reverse().forEach(n => { //翻转方便插入
            //按顺序分别插入中文数字和位数
            result.push(中文整数位数[i++]);
            result.push(ZNmap[n])
        })

        result.reverse();
        let resultStr = result.join("");
        resultStr = resultStr.replace(/零圆/g, '圆') //零圆=>零
            .replace(/(零亿)+/g, '亿')//零亿=>亿
            .replace(/(零萬)+/g, '萬')//零萬=>萬
            .replace(/(零\W)+/g, '零')//如果有形如'零仟零佰零拾',则值保留一个'零'
            .replace(/(零亿)+/g, '亿') //上一步产生的零,如果跟着亿,则再去掉
            .replace(/(零萬)+/g, '萬')//上一步产生的零,如果跟着萬,则再去掉
            .replace(/(亿萬)+/g, '亿')//亿萬只保留亿
            .replace(/零圆/g, '圆'); //再把新产生的零去掉,如果有的话

        i = 0;
        if (part2 != null) { //如果有小数
            part2.split("").forEach(val => {
                if (i < 中文小数位数.length) {
                    resultStr += ZNmap[val] + 中文小数位数[i++]
                }

            })
        } else {
            resultStr += '整'
        }


        return resultStr
    }
}
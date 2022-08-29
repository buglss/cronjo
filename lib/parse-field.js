module.exports = function(field, value) {
    const { maxValue, minValue } = require("./options")
    let stack = []
    if(value === "*") {
        stack = Array.from({ length: maxValue[field] - minValue[field] + 1 }, (_, i) => i + minValue[field])
    } else if(value.includes("/")) {
        let secOpts = value.split("/")
        let min = secOpts[0]
        let max = maxValue[field]
        if(secOpts[0].includes("-")) [min, max] = secOpts[0].split("-")
        else if(secOpts[0] === "*") min = minValue[field]
        for(let i = +min; i <= +max; i += secOpts[1]) stack.push(i)
    } else if(value.includes("-")) {
        if(value.includes(",")) {
            let secOpts = value.split(",")
            let values = secOpts.filter(secOpt => !secOpt.includes("-")).map(secOpt => +secOpt)
            secOpts.filter(secOpt => secOpt.includes("-")).forEach(secOpt => {
                let [min, max] = secOpt.split("-")
                for(let i = +min; i <= +max; i++) values.push(i)
            })
            stack = values
        } else {
            let secOpts = value.split("-").map(secOpt => +secOpt)
            let min = secOpts[0]
            let max = secOpts.slice(-1)[0]
            for(let i = min; i <= max; i++) stack.push(i)
        }
    } else if(value.includes(",")) {
        stack = value.split(",").map(secOpt => +secOpt)
    } else stack = [+value]

    return [...new Set(stack)].sort((a, b) => a - b)
};
module.exports = function(expression) {
    if(!expression) throw new Error(`[${expression}]: Invalid expression parameter. Expression required.`)

    const { isValidCronExpression } = require("cronti")("HELPERS")
    const { predefined, fields } = require("./options")

    if(predefined[expression.replace("@", "")]) expression = predefined[expression]
    else if(!isValidCronExpression(expression))
        throw new Error(`[${expression}]: Invalid crontime expression.`)

    const parseField = require("./parse-field")
    const sections = expression.split(" ")
    let field = {};

    sections.forEach((sec, i) => {
        let fieldName = fields[i]
        field[fieldName] = parseField(fieldName, sec)
    })

    return field
}
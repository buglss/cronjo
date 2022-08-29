module.exports = function(expression) {
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


/*

fields
minutes: (30) [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58]
hours: (24) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
dayOfMonths: (31) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
months: (12) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
dayOfWeeks: (8) [0, 1, 2, 3, 4, 5, 6, 7]

*/
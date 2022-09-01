/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/**
 * Returns the timer pins of the invocation for crontime expression.
 * The timer pins is "minutes", "hours", "daysOfMonth", "months", "daysOfWeek".
 * 
 * @param {String} expression Valid crontime expression
 * 
 * @returns {Object} The timer pins of the invocation for crontime expression.
 * 
 * @summary Returns the timer pins of the invocation for crontime expression.
 * 
 * @license Apache-2.0
 */
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
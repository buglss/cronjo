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

/** Require Base */
const fire = require("./fire-date")
/** * */

/**
 * Returns the next dates of the invocation.
 * 
 * @param {String} expression Valid crontime expression
 * @param {Object} options Options
 * @param {Number} [options.firstDayOfWeek = 0] It is the first day of the week. For example, Monday(1) in Turkey, Sunday(0) in America
 * @param {Number} [options.fireDate = new Date()] Spesific date for generate the date of invocation
 * @param {Number} [options.deep = 5] Indicates how many dates forward for the invocation.
 * 
 * @returns {Date} The next dates of the invocation.
 * 
 * @summary Returns the next dates of the invocation.
 * 
 * @license Apache-2.0
 */
module.exports = function(expression, { deep = 5, firstDayOfWeek = 0, fireDate = new Date() } = {}) {
    if(typeof deep !== "number" || deep < 0) throw new Error(`[${deep}]: Invalid deep value. Deep must positive numbers.`)

    let dates = [new Date(fire(expression, { firstDayOfWeek, fireDate }))]
    for(let i = 1; i < deep; i++) {
        let firedDate = new Date(fire(expression, { firstDayOfWeek, fireDate: dates.slice(-1)[0] }))
        firedDate.setMinutes(firedDate.getMinutes() + 1)
        dates.push(new Date(fire(expression, { firstDayOfWeek, fireDate: firedDate })))
    }

    return dates
}
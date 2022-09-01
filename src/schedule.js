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
const lt = require('long-timeout')
const next = require("../lib/next-date")
/** * */

/**
 * Schedule of job by crontime expression.
 * Returns the timer object of lont-timeout package.
 * 
 * @param {String} expression Valid crontime expression
 * @param {Function} handler The running function in the invocation.
 * @param {Number} [firstDayOfWeek = 0] It is the first day of the week. For example, Monday(1) in Turkey, Sunday(0) in America
 * @param {Number} id The unique numeric value of cronjob.
 * 
 * @returns {Object} The timer object of lont-timeout package.
 * 
 * @summary Schedule of job by crontime expression.
 * 
 * @license Apache-2.0
 */
const self = module.exports = function(expression, handler, firstDayOfWeek = 0, id) {
    if(!handler || typeof handler !== "function") throw new Error("Invalid handler parameter. Handler must function.")
    const now = new Date()
    const nextDates = next(expression, { deep: 2, firstDayOfWeek })
    return lt.setTimeout(function() {
        self(expression, handler)
        handler(id)
    }, (nextDates[0] < now ? nextDates[1] : nextDates[0]) - new Date())
}
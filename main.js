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
const cronti = require("cronti")
const schedule = require("./src/schedule")
const cancel = require("./src/cancel")
const fire = require("./lib/fire-date")
const next = require("./lib/next-date")
/** * */

/** Locale Variables */
let localeStorage = {}
/** * */

/**
 * Returns the object of the invocation.
 * 
 * @param {Object} options Options
 * @param {String|Number} [options.method = onCrontime] Method index or name. onWeek(0), onIntervalTime(1), onTime(2), onCrontime(3), onDate(4), HELPERS(-1)
 * @param {Function} [options.job] Handler of the invocation
 * @param {String} [options.name] Name of the invocation
 * @param {Number} [options.firstDayOfWeek = 0] It is the first day of the week. For example, Monday(1) in Turkey, Sunday(0) in America
 * @param {Array} args Arguments to methods
 * 
 * @returns {Object} Object of the invocation.
 * 
 * @summary Returns the object of the invocation.
 * 
 * @license Apache-2.0
 */
module.exports = function({ method = "onCrontime", job, name, firstDayOfWeek = 0 } = {}, ...args) {
    if(!arguments.length) return localeStorage
    if(arguments[0] === "HELPERS" || method === "HELPERS" || method === -1) {
        let helpers = {}
        require("fs").readdirSync(__dirname + "/lib/").forEach(file => {
            file = file.split(".").slice(0, -1).join(".")
            helpers[file.replace(/-\w/g, x => x[1].toUpperCase())] = require("./lib/" + file)
        })
        return helpers
    }
    if(typeof arguments[0] === "function") job = arguments[0]
    const expression = cronti(method, ...args)
    const id = Date.now()
    // const timer = 
    localeStorage[id] = {
        id,
        expression,
        job,
        firstDayOfWeek,
        name: name || `${id} Job`,
        cancel() {
            try {
                cancel(localeStorage[id].timer)
                delete localeStorage[id]
                return true
            } catch(error) {
                return false
            }
        },
        fireDate({ firstDayOfWeek = 0 } = {}) { return fire(expression, { firstDayOfWeek }) },
        nextDates({ deep = 5, firstDayOfWeek = 0 } = {}) { return next(expression, { deep, firstDayOfWeek }) }
    }
    schedule({ schedule: localeStorage[id], expression, handler: job, firstDayOfWeek, id })
    return localeStorage[id]
}
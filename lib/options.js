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
 * Default options.
 * 
 * @returns {Object} Default options.
 * 
 * @summary Default options.
 * 
 * @license Apache-2.0
 */
module.exports = {
    predefined: {
        "daily": "0 0 * * *",
        "hourly": "0 * * * *",
        "monthly": "0 0 1 * *",
        "weekly": "0 0 * * 0",
        "yearly": "0 0 1 1 *"
    },
    fields: [
        "minutes",
        "hours",
        "daysOfMonth",
        "months",
        "daysOfWeek"
    ],
    fieldLength: 5,
    maxValue: {
        minutes: 59,
        hours: 23,
        daysOfMonth: 31,
        months: 12,
        daysOfWeek: 6
    },
    minValue: {
        minutes: 0,
        hours: 0,
        daysOfMonth: 1,
        months: 1,
        daysOfWeek: 0
    }
}
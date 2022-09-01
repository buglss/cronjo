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

/*
 * @license Apache-2.0
 */

const assert = require("assert")
const nextDate = require("../lib/next-date")

describe("nextDate", function() {
    it(`nextDate("25 2-5 29,31 9 *", { deep: 2, firstDayOfWeek: 1, fireDate: new Date("2022-08-20 22:55") }) --> Returns the next dates of the invocation for Turkey first day of week and for 20.08.2022 22:55. Next deep is 2.`, function() {
        assert.deepEqual(nextDate("25 2-5 29,31 9 *", { deep: 2, firstDayOfWeek: 1, fireDate: new Date("2022-08-20 22:55") }), [
            new Date("2022-09-29 02:25:00"),
            new Date("2022-09-29 03:25:00")
        ])
    })
})
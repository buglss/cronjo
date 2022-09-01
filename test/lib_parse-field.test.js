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
const parseField = require("../lib/parse-field")

describe("parseField", function() {
    it(`parseField("minutes", "25") --> The value list of crontime expression minutes pin.`, function() {
        assert.deepEqual(parseField("minutes", "25"), [25])
    })
    it(`parseField("hours", "2-5") --> The value list of crontime expression hours pin.`, function() {
        assert.deepEqual(parseField("hours", "2-5"), [2, 3, 4, 5])
    })
    it(`parseField("daysOfMonth", "29,31") --> The value list of crontime expression daysOfMonth pin.`, function() {
        assert.deepEqual(parseField("daysOfMonth", "29,31"), [29, 31])
    })
    it(`parseField("months", "9") --> The value list of crontime expression months pin.`, function() {
        assert.deepEqual(parseField("months", "9"), [9])
    })
    it(`parseField("daysOfWeek", "*") --> The value list of crontime expression daysOfWeek pin.`, function() {
        assert.deepEqual(parseField("daysOfWeek", "*"), [0, 1, 2, 3, 4, 5, 6])
    })
})
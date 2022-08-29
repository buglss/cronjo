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
 * REQUIRE BLOCK START
 */
const { scheduleJob } = require("node-schedule")
const cronti = require("cronti")
/**
 * REQUIRE BLOCK END
 */

/**
 * It translates daily expressible recipes on the calendar into crontime expression.
 * Produces a valid crontime expression.
 * In summary:
 *  creates a crontime that will run at regular intervals between two dates;
 *  enter valid crontime expression get crontime expression;
 *  generate crontime of the specific date;
 *  generate crontime of the specific date;
 *  create crontime with various combinations of month, week, weekdays, hours, minutes and tick and generates the cron time for the week the date is in.
 * @param {Function} handler Scheduled task. The function to be called when the time comes.
 * @param {Number|String} method Metod index or name. onWeek, onIntervalTime, onTime, onCrontime, onDate
 * @param {Array} args Arguments to metods
 * 
 * @returns {String} Crontime
 * 
 * @summary Produces a valid crontime expression.
 * 
 * @license Apache-2.0
 */
module.exports = function(handler, method, ...args) {
    if(typeof handler !== "function") return false

    const expression = cronti(method, ...args)

    if(!expression) return false

    return scheduleJob(expression, handler);
}

/*

job
callback: false
cancel: ƒ (reschedule) {\n    reschedule = (typeof reschedule == 'boolean') ? reschedule : false;\n\n    let inv, newInv;\n    const newInvs = [];\n    for (let j = 0; j < this.pendingInvocations.length; j++) {\n      inv = this.pendingInvocations[j];\n\n      cancelInvocation(inv);\n\n      if (reschedule && (inv.recurrenceRule.recurs || inv.recurrenceRule.next)) {\n        newInv = scheduleNextRecurrence(inv.recurrenceRule, this, inv.fireDate, inv.endDate);\n        if (newInv !== null) {\n          newInvs.push(newInv);\n        }\n      }\n    }\n\n    this.pendingInvocations = [];\n\n    for (let k = 0; k < newInvs.length; k++) {\n      this.trackInvocation(newInvs[k]);\n    }\n\n    // remove from scheduledJobs if reschedule === false\n    if (!reschedule) {\n      this.deleteFromSchedule()\n    }\n\n    return true;\n  }
cancelNext: ƒ (reschedule) {\n    reschedule = (typeof reschedule == 'boolean') ? reschedule : true;\n\n    if (!this.pendingInvocations.length) {\n      return false;\n    }\n\n    let newInv;\n    const nextInv = this.pendingInvocations.shift();\n\n    cancelInvocation(nextInv);\n\n    if (reschedule && (nextInv.recurrenceRule.recurs || nextInv.recurrenceRule.next)) {\n      newInv = scheduleNextRecurrence(nextInv.recurrenceRule, this, nextInv.fireDate, nextInv.endDate);\n      if (newInv !== null) {\n        this.trackInvocation(newInv);\n      }\n    }\n\n    return true;\n  }
deleteFromSchedule: ƒ () {\n    deleteScheduledJob(this.name)\n  }
job: ƒ (){\r\n  console.log('The answer to life, the universe, and everything!');\r\n}
name: '<Anonymous Job 1 2022-08-28T17:27:26.646Z>'
nextInvocation: ƒ () {\n    if (!this.pendingInvocations.length) {\n      return null;\n    }\n    return this.pendingInvocations[0].fireDate;\n  }
pendingInvocations: (1) [Invocation]
reschedule: ƒ (spec) {\n    let inv;\n    const invocationsToCancel = this.pendingInvocations.slice();\n\n    for (let j = 0; j < invocationsToCancel.length; j++) {\n      inv = invocationsToCancel[j];\n\n      cancelInvocation(inv);\n    }\n\n    this.pendingInvocations = [];\n\n    if (this.schedule(spec)) {\n      this.setTriggeredJobs(0);\n      return true;\n    } else {\n      this.pendingInvocations = invocationsToCancel;\n      return false;\n    }\n  }
running: 0
setTriggeredJobs: ƒ (triggeredJob) {\n    triggeredJobs = triggeredJob;\n  }
stopTrackingInvocation: ƒ (invocation) {\n    const invIdx = this.pendingInvocations.indexOf(invocation);\n    if (invIdx > -1) {\n      this.pendingInvocations.splice(invIdx, 1);\n      return true;\n    }\n\n    return false;\n  }
trackInvocation: ƒ (invocation) {\n    // add to our invocation list\n    sorted.add(this.pendingInvocations, invocation, sorter);\n    return true;\n  }
triggeredJobs: ƒ () {\n    return triggeredJobs;\n  }

*/
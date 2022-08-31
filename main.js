const cronti = require("cronti")
const schedule = require("./src/schedule")
const cancel = require("./src/cancel")
const fire = require("./lib/fire-date")
const next = require("./lib/next-date")

let localeStorage = {}

module.exports = function({ job, name, firstDayOfWeek = 0 } = {}, method, ...args) {
    if(!arguments.length) return localeStorage
    const expression = cronti(method, ...args)
    const id = Date.now()
    const timer = schedule(expression, job, firstDayOfWeek, id)
    localeStorage[id] = {
        id,
        expression,
        job,
        firstDayOfWeek,
        name: name || `${id} Job`,
        cancel() { return cancel(timer) },
        fireDate({ firstDayOfWeek = 0 } = {}) { return fire(expression, { firstDayOfWeek }) },
        nextDates({ deep = 5, firstDayOfWeek = 0 } = {}) { return next(expression, { deep, firstDayOfWeek }) }
    }
    return localeStorage[id]
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
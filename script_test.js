const assert = require('assert')
const Script = require('./script')

describe('object', () => {
 it('checks object creation', () => {
   // Setup
      const expected = {taskName:'Task 1', taskDesc:'Task 1 description', assignedTo:'Alex',duedate:'02/20/2021'}
      const taskName = 'Task 1'
      const taskDesc = 'Task 1 description'
      const assignedTo = 'Alex'
      const duedate = '02/20/2021'

   // Exercise 
    const result = Script.taskFactory(taskName, taskDesc, assignedTo, duedate)
   // Varify
   assert.deepEqual(result.taskName, expected.taskName)

 });
});

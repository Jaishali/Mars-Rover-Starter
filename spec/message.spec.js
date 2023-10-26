const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if name NOT passed into constructor",function ()  {

        assert.throws(() => new Message(), { message: 'Name required' });
    });

    it("should set name via constructor", function()  {
        const message = new Message("Alex");

        assert.strictEqual(message.name, "Alex");
    });

    it("should contain commands passed into constructor as 2nd argument", function() {
        const commands = [new Command('MODE_CHANGE', 'LOW_POWER')
                        , new Command('STATUS_CHECK')];
        const message = new Message("Alex", commands);

        assert.strictEqual(message.commands, commands);
    });

});

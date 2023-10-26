const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position)
   {
      this.position = position;
      if(!position)
       {
         throw Error("Rover position required.");
       }
       this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(theMessage) {
      let message = theMessage.name;
      let results = [];
  
      for(let i = 0; i < theMessage.commands.length; i++) {
        if(theMessage.commands[i].commandType === "MOVE") {
          if(this.mode === "LOW_POWER") {
            results.push({completed: false});
          }else{
            results.push({completed: true});
            this.position = theMessage.commands[i].value;
          }
        }else if(theMessage.commands[i].commandType === "STATUS_CHECK") {
          results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
        }else if(theMessage.commands[i].commandType === "MODE_CHANGE") {
          results.push({completed: true});
          this.mode = theMessage.commands[i].value;
        }else{
          throw Error("Command Type undefinded.");
        }
      }
  
      return {message, results};
    }
  }
  let commands = [
    new Command('MOVE', 4321),
    new Command('STATUS_CHECK'),
    new Command('MODE_CHANGE', 'LOW_POWER'),
    new Command('MOVE', 3579),
    new Command('STATUS_CHECK')
  ];
  let message = new Message('Test message with three commands',commands);
  let  rover = new Rover(100);
  let response = rover.receiveMessage(message);
  console.log(response);



  
  
          
      
             


module.exports = Rover;
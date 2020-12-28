/*Amoung us costs $5 :( 
Programmer: Matt/AuthoredEntropy*/
  let util = require('../Utility/util')
  //Global imports
  const MSGs = require("../FileSys/Msg.json");
  const readline = require('readline');
module.exports.baseFileSys = class {
  TFQuestion;
  PROMPT;
}
/**
 * @description the class responsible for handling input output
 */
module.exports.IO = class IO_Controller{
  //imports
  FileSys;
  CommandController = require("./CommandController");
  // TFCMDs = new this.CommandController.TF();
  CMDs;
  PROMPT;
  util = new util();
  colors = require('colors') // npm install colors
  rl;
  LoadFileSys(FileSystem){
    this.FileSys = FileSystem;
    this.PROMPT =  FileSystem.BaseFileSys.PROMPT;
    this.CMDs = FileSystem.CMDs;
    this.util.loadFileSys(FileSystem)
  }
  

/**
 * @description initalise all variables needed, then run the BasicGameStartCommand
 */
constructor(){
  //this.FileSys 
  this.rl = readline.createInterface(process.stdin, process.stdout, this.completer)
  this.rl.on('line', (cmd => {
    this.exec(cmd.trim())
  })).on('close', async () =>{
    // only gets triggered by ^C or ^D
    let num = await this.FileSys.removePlayerFromServer(this.FileSys.player_1.PlayerID)
    console.log(MSGs.QuitMSG.green + "num: " + num);
    process.exit(0);
  });

  process.stdin.on('keypress', (str, key) => {
    if(this.FileSys.emergency){
      this.FileSys.map.type(key.name);
      return;
    }
    if(this.FileSys.fuelTaskActive){
      if(key.name == "f"){
        this.FileSys.fuelFrame++;
      }
      return
    }
    if(this.FileSys.swipeCardActive){
      if(key.name == "left"){
        if(this.FileSys.cardFrame > 0)
        this.FileSys.cardFrame--;
      }else if(key.name == "right"){
        if(this.FileSys.cardFrame < 5)
        this.FileSys.cardFrame++;
      }
      return
    }
    if(key.name == "left" || key.name == "right" || key.name == "up" || key.name == "down" || key.name == "ctrl"|| key.name == "k" || key.name == "r" || key.name =="e"|| key.name =="q")
      if(!this.FileSys.emergency){
        this.exec("."+key.name);
    }
    
    
})
}

  completer(line) {
    let Config = require("../FileSys/Config.json")
  var completions = Config.Completions.split(' ')
  var hits = completions.filter(function(c) {
    if (c.indexOf(line) == 0) {
      return c;
    }
  });
  return [hits && hits.length ? hits : completions, line];
}



prompt() {
    var arrow    = this.FileSys.BaseFileSys.PROMPT
      , length = arrow.length
      ;
    this.rl.setPrompt(arrow.gray, length);
    this.rl.prompt();
  }
  /**
 * @description handles all input controls and commands
 */
async exec(command) {
    //game goes here

    //we can write it eventually... :( ඞ 
    if (command == "y") {
      await this.CMDs.YesNo(true);
    } else if (command == "n"){
      await this.CMDs.YesNo(false);
    }
     else{
    await this.CMDs.BaseCommandProcessor(command)
    }
    this.prompt();
  }

}



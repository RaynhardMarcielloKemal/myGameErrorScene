import { sceneEvents } from "../events/EventsCenter";

export default class UIPhone{
    constructor(scene,text,textStyle,x,y){
        this.scene = scene;
        this.text = text;
        this.allMessages = [];
        this.allMessages[0]="> no log"
        this.UIText;
        this.UIText = this.scene.add.text(x,y,"| "+this.text,textStyle).setOrigin(0).setInteractive();
        this.UIText.setColor("LimeGreen");
        this.UIText.on('pointerover',function(pointer){this.OpenPhone(true);},this);
        this.UIText.on('pointerout',function(pointer){this.OpenPhone(false);},this);

        document.querySelector("#indexNotes-h1").setAttribute("style","opacity:0;");
        document.querySelector("#indexNotes-p").setAttribute("style","opacity:0;");

        sceneEvents.on('send-new-message', this.NewMessage ,this);

    }

    OpenPhone(boolValue){
        if(boolValue){
            console.log("Open Phone");
            document.querySelector("#indexNotes-h1").textContent = "Message Log";
            document.querySelector("#indexNotes-p").textContent = this.allMessages.join(";");
            document.querySelector("#indexNotes-h1").setAttribute("style","opacity:1;");
            document.querySelector("#indexNotes-p").setAttribute("style","opacity:1;");
            
            this.UIText.setColor("Green");
        }else{
            console.log("Close Phone");
            document.querySelector("#indexNotes-h1").setAttribute("style","opacity:0;");
            document.querySelector("#indexNotes-p").setAttribute("style","opacity:0;");
            document.querySelector("#indexNotes-h1").textContent = "";
            document.querySelector("#indexNotes-p").textContent = "";
            this.UIText.setColor("LimeGreen");
        }

    }
    NewMessage(message,sender){
        this.allMessages.push("\n>"+sender+": "+message);
        if(this.allMessages.length>13){
            this.allMessages.shift();
        }
        this.UIText.setColor("Chartreuse"); //Chartreuse //GreenYellow
    }
}
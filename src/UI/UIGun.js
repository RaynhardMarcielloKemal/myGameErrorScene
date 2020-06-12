import { sceneEvents } from "../events/EventsCenter";

export default class UIGun{
    constructor(scene,text,x,y,textStyle){
        this.scene = scene;
        this.text = "| "+text;
        this.bullets= 1;
        this.triggeredVar=false;
        this.UIText = this.scene.add.text(x,y,this.text+": ⚈",textStyle).setOrigin(0).setInteractive();
        this.UIText.setColor("Green");
        this.Reload();
        this.Reload();

        sceneEvents.on('trigger-gun',this.Triggered,this);
        sceneEvents.on('fire-gun',this.FireGun,this);

    }


    Triggered(isTriggered){
        if(isTriggered==true&& this.bullets>0){
            this.UIText.setColor("Red");
            this.triggeredVar = true;
            this.DisplayAlert(true);
            this.scene.input.setDefaultCursor('url(assets/cur/dotScar.cur), pointer');

        }else{
            this.UIText.setColor("Green");
            this.triggeredVar = false;
            this.DisplayAlert(false);
            this.scene.input.setDefaultCursor('url(assets/cur/dotDark.cur), pointer');

            }
        sceneEvents.emit('display-notes-as-target',this.triggeredVar);
    }

    DisplayAlert(isDisplayed){
        if(isDisplayed){
            document.querySelector("#indexNotes-h1").textContent = "//ALERT";
            document.querySelector("#indexNotes-p").textContent = "//Gun is triggered;\n//Aim at target and shoot\n\n//Destructible or hostile object\n may be nearby\n//Bullets:"+this.bullets;
            document.querySelector("#indexNotes-h1").setAttribute("style","opacity:1; color: red; font-style: italic; ");
            document.querySelector("#indexNotes-p").setAttribute("style","opacity:1; color: crimson;font-style: italic;");
            } else{
                document.querySelector("#indexNotes-h1").textContent = "";
                document.querySelector("#indexNotes-p").textContent = "";
        
                document.querySelector("#indexNotes-h1").setAttribute("style","opacity:0; color:'gainsboro';font-style: normal; ");
                document.querySelector("#indexNotes-p").setAttribute("style","opacity:0;color:'gainsboro';font-style: normal; ");
                }
    }

    Reload(){
        this.bullets++;
        if(this.bullets==1){
            this.UIText.setText(this.text+": ⚈");
        } else if(this.bullets==2){
            this.UIText.setText(this.text+": ⚈⚈");
        } else if(this.bullets==3){
            this.UIText.setText(this.text+": ⚈⚈⚈");
        }
    }
    FireGun(objectTarget){
        if(this.triggeredVar){
            this.bullets--;
            objectTarget.destroy();
            if(this.bullets==0){
                this.UIText.setText(this.text+":");
                this.Triggered(false);
            } else if(this.bullets==1){
                this.UIText.setText(this.text+": ⚈");
            } else if(this.bullets==2){
                this.UIText.setText(this.text+": ⚈⚈");
            }
        }
    }
}
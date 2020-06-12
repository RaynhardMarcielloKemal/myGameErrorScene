export default class UITorch{
    constructor(scene,keyImgInner, keyImgOuter, textTorch="Torch", textStyle,x,y, initBattery){
        this.scene = scene;
        this.torchBattery = initBattery;
        this.torchOnSec;
        this.torchOffSec;
        this._textTorch = textTorch;
        this.UIDarknessInner= this.scene.add.image(0,0,keyImgInner).setOrigin(0);
        this.UIDarknessOuter= this.scene.add.image(0,0,keyImgOuter).setOrigin(0);

        this.UITextTorch = this.scene.add.text(x,y,"| "+textTorch+": ■■■",textStyle).setOrigin(0).setInteractive(); //■ □
        this.UITextTorch.setText("| "+this._textTorch+": ■■■");
        if(this.torchBattery<76.66){
            this.UITextTorch.setText("| "+this._textTorch+": ■■□");
            if(this.torchBattery<43.33){
                this.UITextTorch.setText("| "+this._textTorch+": ■□□");
                if(this.torchBattery<10){
                    this.UITextTorch.setText("| "+this._textTorch+": □□□");
                    this.UITextTorch.setColor("#238f23");
                }
            }
        }

        this.UITextTorch.on('pointerover',function(pointer){this.ActivateTorch(true);},this);
        this.UITextTorch.on('pointerout',function(pointer){this.ActivateTorch(false);},this);

        //Dev
        this.UIDarknessInner.setAlpha(0);
        this.UIDarknessOuter.setAlpha(0);
    }

    ActivateTorch(boolValue){
        if(this.torchBattery>0){
            if(boolValue==true){
                this.UIDarknessInner.alpha = (100-this.torchBattery)/200; //Battery reach 0, alpha=0.5
                console.log("Alpha: "+this.UIDarknessInner.alpha);
                this.UITextTorch.setColor("Red");
                // this.UITextTorch.setText("| "+this._textTorch+": ■■■ ☀"); //☀☽

                this.torchOnSec = this.scene.time.now;

            }else if (boolValue==false){
                this.torchOffSec = this.scene.time.now;
                this.UIDarknessInner.setAlpha(1);

                // //dev
                // console.log(this.torchBattery);
                this.UIDarknessInner.setAlpha(0);
                this.UIDarknessOuter.setAlpha(0);

                this.torchBattery -= (this.torchOffSec-this.torchOnSec)/2000;
                this.UITextTorch.setColor("LimeGreen");
                this.UITextTorch.setText("| "+this._textTorch+": ■■■");
                if(this.torchBattery<76.66){
                    this.UITextTorch.setText("| "+this._textTorch+": ■■□");
                    if(this.torchBattery<43.33){
                        this.UITextTorch.setText("| "+this._textTorch+": ■□□");
                        if(this.torchBattery<10){
                            this.UITextTorch.setText("| "+this._textTorch+": □□□");
                            this.UITextTorch.setColor("#238f23");
                        }
                    }
                }
            }
      }
    }
}


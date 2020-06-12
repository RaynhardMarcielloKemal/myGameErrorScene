import { CST } from "../CST";
import { SWareHouse } from "./SWareHouse";

let tsNarration = {
    fontSize: '25px',
    fontFamily: 'Centaur',
    color: '#ffffff',
    align: 'center',
};

let timeline;
let keyK;
let screenCenterX;
let screenCenterY;
let timedEvent;
let textNarrationTop;
let textNarrationBottom;
let smokeImg;
let twTemp;


export class SOpening extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.SOpening
        })
    }


    init(){
        console.log("SOPENING");
        screenCenterX = this.game.renderer.width/2;
        screenCenterY = this.game.renderer.height/2;
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }

    preload(){
        this.load.image('smoke','assets/img/vfx/smoke.png');  
    }

    create(){
        this.add.rectangle(0,0,1600,1200,0x0a0a0a,1);

        textNarrationTop=this.add.text(screenCenterX,screenCenterY, "A simple animation", tsNarration).setOrigin(0.5);
        textNarrationBottom=this.add.text(screenCenterX,screenCenterY+40, "----", tsNarration).setOrigin(0.5).setAlpha(0);
        smokeImg=this.add.image(screenCenterX,0,'smoke').setOrigin(0.5,1);


        timeline = this.tweens.timeline({
            tweens:[
                //1st tween
                {
                targets:textNarrationBottom,
                ease:'Linear',
                duration: 7000,
                delay: 2000,
                repeat:0,
                alpha: {
                    from:0, to:1
                }, 
                },
                //2nd tween
                {
                    targets:[textNarrationTop,textNarrationBottom],
                    duration: 7000,
                    alpha:{
                        from:1, to:0
                    },
                    onComplete: function(){ChangeText(textNarrationBottom)},
                },
                //3rd tween
                {
                    targets:textNarrationBottom,
                    duration: 7000,
                    alpha:{
                        from:0, to:1
                    }
                },
                //4th tween
                {
                    targets:textNarrationBottom,
                    duration: 3000,
                    loop:10,
                    yoyo:true,
                    alpha:{
                        from:0.5, to:1
                    }

                }
            ]
        });

        this.tweens.add({
            ease:"Quad.easeOut",
            targets:smokeImg,
            duration:25000,
            y:screenCenterY*3,
            yoyo:false,
        });
    }

    update(){
        if(keyK.isDown)
        {
            this.scene.launch(CST.SCENES.SWareHouse);
        }
    }

}

function ChangeText(text){
    text.text = "Press  [K]";
}

function TestMethod(){
    console.log("Pressed");
}
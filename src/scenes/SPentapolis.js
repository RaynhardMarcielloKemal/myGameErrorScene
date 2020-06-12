import { CST } from "../CST";
import UIPlay from "../UI/UIPlay";
import { sceneEvents } from "../events/EventsCenter";
import Player from "../player/Player";
import MarkerTile from "../modules/MarkerTile";
import UINotes from "../UI/UINotes";
import Tandok from "../NPC/Tandok";
import ObjectTween from "../modules/ObjectTween";

let playerClass;
let player;
let cameraMoveInput;
let cameraMain;
let textUIBelow;
let textUIBox;
let objDoorArray =[];
let objDoorOpenedArray=[];
let objFoodCanArray=[];
let objCardKeyArray=[];

let BGParallaxBack;
let BGParallaxMid;
let BGParallaxFront;
let BGParallaxGradient;
let _objectTween;

let marker;
let LPlatform;
let _UINotes;
let _triggerCount = 100;

export class SPentapolis extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.SPentapolis
        })
    }

    init(){
        console.log("SPENTA");
    }

    preload(){
        this.load.image('tiles','assets/img/tilemap/atlas_sodom.png');
        this.load.tilemapTiledJSON('tilemap','assets/img/tilemap/sodom.json');

        // this.load.image('BGSodom','assets/img/bg/Pentapolis/BurningSodom.png');
        this.load.image('BGPentapolis-back','assets/img/bg/PentaPolis/pentapolis-back.png');
        this.load.image('BGPentapolis-mid','assets/img/bg/PentaPolis/pentapolis-mid.png');
        this.load.image('BGPentapolis-front','assets/img/bg/PentaPolis/pentapolis-front.png');
        this.load.image('BGPentapolis-gradient','assets/img/bg/PentaPolis/pentapolis-gradient.png');

        this.load.image("objSmoke","assets/img/objectDecor/sodom-smoke.png");


        //Characters
        this.load.spritesheet('Eva','assets/img/characters/Eva10px.png', {frameWidth:10, frameHeight:24});
        this.load.spritesheet('Tandok','assets/img/characters/Tandok.png', {frameWidth:18, frameHeight:36});

    }

    create(){

        let UIConfig={
            iHealthPlayer:80,
            iHealthCynthia:100,
            iHealthLot:100,
            iTorchBattery:0,
        };
        this.scene.run(CST.SCENES.UIPlay2,UIConfig);
        console.log(CST.SCENES.UIPlay2);

        this.input.setDefaultCursor('url(assets/cur/dotDark.cur), pointer');
        
        const startPointX = 0; //-210; can be altered accordingly, better not to
        const startPointY = 0; //-510; 
        const startPointXPlayer =1300;
        const startPointYPlayer=830;
        cameraMain = this.cameras.main;
        cameraMain.zoom = 3;
        cameraMoveInput = this.input.keyboard.createCursorKeys();

        BGParallaxBack= this.add.tileSprite(0,0,800,600,"BGPentapolis-back").setOrigin(0.05,0.065).setScrollFactor(0).setTileScale(0.4);
        BGParallaxMid= this.add.tileSprite(0,0,800,600,"BGPentapolis-mid").setOrigin(-0.03,0.05).setScrollFactor(0).setTileScale(0.4);
        BGParallaxFront= this.add.tileSprite(0,0,800,600,"BGPentapolis-front").setOrigin(-0.05,0.05).setScrollFactor(0).setTileScale(0.4);
        BGParallaxGradient= this.add.tileSprite(0,0,800,600,"BGPentapolis-gradient").setOrigin(0,0.07).setScrollFactor(0).setTileScale(0.4);

        const tilemap = this.make.tilemap({key:'tilemap'});
        const tileset = tilemap.addTilesetImage("atlas_sodom", 'tiles'); //Tiled tileset, loaded image key
        const LWall = tilemap.createStaticLayer("wall", tileset,startPointX,startPointY);
        const LDecorations = tilemap.createStaticLayer("decorations", tileset,startPointX,startPointY);
        const LLights = tilemap.createStaticLayer("lights", tileset,startPointX,startPointY).setDepth(2);
        LPlatform = tilemap.createDynamicLayer("platform", tileset,startPointX,startPointY);

        tilemap.setCollisionByExclusion(-1,true);
        this.matter.world.convertTilemapLayer(LPlatform);
        LPlatform.setCollisionByProperty({collides:true});
        let tile = LPlatform.putTileAtWorldXY(101,0,0);

        _objectTween = new ObjectTween(this,"objSmoke", 1000,1200,1000,-0,-1,false,15000,undefined,"randomX",200);
        let _PlayerConfig ={
            scene: this,
            x:startPointXPlayer,
            y:startPointYPlayer,
            platform:LPlatform,
        };
        // playerClass = new Player(this,startPointXPlayer,startPointYPlayer,LPlatform);
        playerClass = new Player(_PlayerConfig);

        // playerClass = new Tandok(this,startPointXPlayer,startPointYPlayer,LPlatform);
        player = playerClass.sprite;


    }

    update(){
        // CameraMovement(3);
        // marker.PaintTilemapLayer(LPlatform,101);

        cameraMain.startFollow(player,false,1,0.05,0,40);
        playerClass.update();

        //For some reason, a 10 or so seconds are needed to successfully emit trigger-gun
        if(_triggerCount>90){
            TriggerGun(true);
        } 
        if(_triggerCount>-400){
            _triggerCount--;

        }else if(_triggerCount>-420){
            TriggerGun(false);
            _triggerCount--;

            // console.log(_triggerCount);
        }
        BGParallaxMovement();
        _objectTween.ComplexTweenY(1,0,500);
        // _objectTween.ConsoleLogStatus();
    }
}
function CameraMovement(speed){
    if(cameraMoveInput.up.isDown){
        cameraMain.scrollY-=speed;
    }
    if(cameraMoveInput.down.isDown){
        cameraMain.scrollY+=speed;
    }
    if(cameraMoveInput.left.isDown){
        cameraMain.scrollX-=speed;
    }
    if(cameraMoveInput.right.isDown){
        cameraMain.scrollX+=speed;
    }

    //camera position relative to player x =0
    console.log("Camera: x= "+(cameraMain.scrollX+400)+"; y= "+(cameraMain.scrollY-36)); 
}

function TriggerGun(boolVar){
    sceneEvents.emit('trigger-gun',boolVar);
}

let alphaBoolRise = true;
let alphaValue = 0.83;

function BGParallaxMovement(){

    BGParallaxBack.tilePositionX = cameraMain.scrollX*.05;
    BGParallaxBack.tilePositionY = cameraMain.scrollY*.01;

    BGParallaxMid.tilePositionX = cameraMain.scrollX*.19;
    BGParallaxMid.tilePositionY = cameraMain.scrollY*.07;

    BGParallaxFront.tilePositionX = cameraMain.scrollX*.35;
    BGParallaxFront.tilePositionY = cameraMain.scrollY*.15;

    BGParallaxGradient.setAlpha(alphaValue);
    if(alphaBoolRise==true){
        alphaValue+=0.005;
        if (alphaValue>=1){
            alphaBoolRise=false;
        }
    } else {
        alphaValue-=0.004;
        if(alphaValue<=0.8){
            alphaBoolRise=true;
        }
    }
    // BGParallaxGradient.tilePositionX = cameraMain.scrollX*.0;
    // BGParallaxGradient.tilePositionY = cameraMain.scrollY*.0;
    

}

/** @type {import("../typings/phaser")} */

import { SOpening } from "./scenes/SOpening";
import { STestGround } from "./scenes/STestGround";
import { SWareHouse } from "./scenes/SWareHouse";
import { SPentapolis } from "./scenes/SPentapolis";
import UIPlay from "./UI/UIPlay";
import UIPlay2 from "./UI/UIPlay2";
import { STestGround2 } from "./scenes/STestGround2";
import { SWareHouse2 } from "./scenes/SWareHouse2";

var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    pixelArt: true,
    scale:{ 
        parent:'myGame',
    },
    physics:{
        default: 'matter',
        matter:{
            gravity:{y:0.4},
            debug:false
        }
    },
    scene:[
        SPentapolis, //the only scene that still works fine
        SWareHouse2,
        STestGround2,
        SWareHouse,
        UIPlay2,

        //below are scenes with error(maybe?):
        //by changing the order of this list of scene or put one of these scenes on top, the error may emerge
        UIPlay, //this scene displays the UI
        STestGround, //this scene displays red rectangle and console.log some words
        SOpening, //this scene displays a siimple opening animation. 
    ]
};

let game = new Phaser.Game(config);

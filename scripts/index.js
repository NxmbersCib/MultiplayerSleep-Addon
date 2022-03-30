/* 
This file belongs to: "@CibNumeritos" (AnexoStudios scripting director), any unauthorized modification or change will be penalized, please don't upload any modded version of this pack.
For more information to authorize your copies, you can contact him on discord: https://discord.gg/b39ncqJQWU 
or contact him via Twitter: https://twitter.com/CibNumeritos - Don't share direct download links.
*/
/*
import { world } from 'mojang-minecraft';
let prefix = "!";
world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(prefix)) { 
        commands(data);
    };
});
world.events.tick.subscribe(sleepHandler);
function sleepHandler() {
};
function commands(data) {
    let command = data.message.match(/(?<=!)\w+/)[0];*/
    //const params = data.message.match(/(?<= )[\w&_-]*/g);
    /*switch (command) {
        case "sleep": {
            if (!data.sender.hasTag('op') && params[0] == "setplayers") {
                world.getDimension('overworld').runCommand(`tellraw "${data.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command}"]}]}`);
                return;
            } else if (params[0] == "setplayers") {
                world.getDimension('overworld').runCommand(`scoreboard players set uopMinPlayers uopmp ${params[1]}`);
            } else {
                world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"translate":"commands.generic.syntax","with":["${params[0]}","${command}"]}]}`);
            };
        } break;
        case "sleeprequest": {
            world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"translate":"cib.sleep.request","with":["${data.sender.nameTag}"]}]}`);
        };
        default: {
            world.getDimension('overworld').runCommand(`tellraw "${data.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command}"]}]}`);
        };
    };
};*/
var _0xfeaa=["\x21","\x73\x74\x61\x72\x74\x73\x57\x69\x74\x68","\x6D\x65\x73\x73\x61\x67\x65","\x73\x75\x62\x73\x63\x72\x69\x62\x65","\x62\x65\x66\x6F\x72\x65\x43\x68\x61\x74","\x65\x76\x65\x6E\x74\x73","\x74\x69\x63\x6B","\x6D\x61\x74\x63\x68","\x6F\x70","\x68\x61\x73\x54\x61\x67","\x73\x65\x6E\x64\x65\x72","\x73\x65\x74\x70\x6C\x61\x79\x65\x72\x73","\x74\x65\x6C\x6C\x72\x61\x77\x20\x22","\x6E\x61\x6D\x65\x54\x61\x67","\x22\x20\x7B\x22\x72\x61\x77\x74\x65\x78\x74\x22\x3A\x5B\x7B\x22\x74\x65\x78\x74\x22\x3A\x22\xA7\x63\x22\x7D\x2C\x7B\x22\x74\x72\x61\x6E\x73\x6C\x61\x74\x65\x22\x3A\x22\x63\x6F\x6D\x6D\x61\x6E\x64\x73\x2E\x67\x65\x6E\x65\x72\x69\x63\x2E\x75\x6E\x6B\x6E\x6F\x77\x6E\x22\x2C\x20\x22\x77\x69\x74\x68\x22\x3A\x20\x5B\x22","\x22\x5D\x7D\x5D\x7D","\x72\x75\x6E\x43\x6F\x6D\x6D\x61\x6E\x64","\x6F\x76\x65\x72\x77\x6F\x72\x6C\x64","\x67\x65\x74\x44\x69\x6D\x65\x6E\x73\x69\x6F\x6E","\x73\x63\x6F\x72\x65\x62\x6F\x61\x72\x64\x20\x70\x6C\x61\x79\x65\x72\x73\x20\x73\x65\x74\x20\x75\x6F\x70\x4D\x69\x6E\x50\x6C\x61\x79\x65\x72\x73\x20\x75\x6F\x70\x6D\x70\x20","","\x74\x65\x6C\x6C\x72\x61\x77\x20\x40\x61\x20\x7B\x22\x72\x61\x77\x74\x65\x78\x74\x22\x3A\x5B\x7B\x22\x74\x72\x61\x6E\x73\x6C\x61\x74\x65\x22\x3A\x22\x63\x6F\x6D\x6D\x61\x6E\x64\x73\x2E\x67\x65\x6E\x65\x72\x69\x63\x2E\x73\x79\x6E\x74\x61\x78\x22\x2C\x22\x77\x69\x74\x68\x22\x3A\x5B\x22","\x22\x2C\x22","\x73\x6C\x65\x65\x70","\x74\x65\x6C\x6C\x72\x61\x77\x20\x40\x61\x20\x7B\x22\x72\x61\x77\x74\x65\x78\x74\x22\x3A\x5B\x7B\x22\x74\x72\x61\x6E\x73\x6C\x61\x74\x65\x22\x3A\x22\x63\x69\x62\x2E\x73\x6C\x65\x65\x70\x2E\x72\x65\x71\x75\x65\x73\x74\x22\x2C\x22\x77\x69\x74\x68\x22\x3A\x5B\x22","\x73\x6C\x65\x65\x70\x72\x65\x71\x75\x65\x73\x74"];import   world  from 'mojang-minecraft';;let prefix=_0xfeaa[0];world[_0xfeaa[5]][_0xfeaa[4]][_0xfeaa[3]]((_0xcbffx2)=>{if(_0xcbffx2[_0xfeaa[2]][_0xfeaa[1]](prefix)){commands(_0xcbffx2)}});world[_0xfeaa[5]][_0xfeaa[6]][_0xfeaa[3]](sleepHandler);function sleepHandler(){}function commands(_0xcbffx2){let _0xcbffx5=_0xcbffx2[_0xfeaa[2]][_0xfeaa[7]](/(?<=!)\w+/)[0];const _0xcbffx6=_0xcbffx2[_0xfeaa[2]][_0xfeaa[7]](/(?<= )[\w&_-]*/g);switch(_0xcbffx5){case _0xfeaa[23]:{if(!_0xcbffx2[_0xfeaa[10]][_0xfeaa[9]](_0xfeaa[8])&& _0xcbffx6[0]== _0xfeaa[11]){world[_0xfeaa[18]](_0xfeaa[17])[_0xfeaa[16]](`${_0xfeaa[12]}${_0xcbffx2[_0xfeaa[10]][_0xfeaa[13]]}${_0xfeaa[14]}${_0xcbffx5}${_0xfeaa[15]}`);return}else {if(_0xcbffx6[0]== _0xfeaa[11]){world[_0xfeaa[18]](_0xfeaa[17])[_0xfeaa[16]](`${_0xfeaa[19]}${_0xcbffx6[1]}${_0xfeaa[20]}`)}else {world[_0xfeaa[18]](_0xfeaa[17])[_0xfeaa[16]](`${_0xfeaa[21]}${_0xcbffx6[0]}${_0xfeaa[22]}${_0xcbffx5}${_0xfeaa[15]}`)}}}break;case _0xfeaa[25]:{world[_0xfeaa[18]](_0xfeaa[17])[_0xfeaa[16]](`${_0xfeaa[24]}${_0xcbffx2[_0xfeaa[10]][_0xfeaa[13]]}${_0xfeaa[15]}`)};default:{world[_0xfeaa[18]](_0xfeaa[17])[_0xfeaa[16]](`${_0xfeaa[12]}${_0xcbffx2[_0xfeaa[10]][_0xfeaa[13]]}${_0xfeaa[14]}${_0xcbffx5}${_0xfeaa[15]}`)}}}
/* 
Este archivo pertenece a: "@CibNumeritos" (director de scripting de AnexoStudios), cualquier modificacion o cambio no autorizado sera penalizado, por favor no suba ninguna version modificada del addon.
Para mas informacion de autorizar tus copias, puedes contactarlo en discord: https://discord.gg/b39ncqJQWU 
o contactarlo via Twitter: https://twitter.com/CibNumeritos - No comparta links de descarga directos.
*/
/* 
This file belongs to: "@CibNumeritos" (Eternetic Studios), any unauthorized modification or change will be penalized, please don't upload any modded version of this pack.
For more information to authorize your copies, you can contact him on discord: https://discord.gg/b39ncqJQWU 
or contact him via Twitter: https://twitter.com/CibNumeritos - Don't share direct download links.
*/
import { world, BeforeChatEvent } from 'mojang-minecraft';
let minPlayers;
let sleepingPlayers;
let timeAdd;
let prefix = "!";
// AÑADE !HELP
// HAZ QUE SI NO HAY PÁRAMETRO DE NUMEROS EN LOS TIMEADD Y SETPLAYERS (CAMBIA SERPLAYERS A MINPLAYERS) MUESTRE EL VALOR ACTUAL DE ESA VARIABLE.
try {
    world.getDimension('overworld').runCommand(`scoreboard objectives add uopsdb dummy`);
    minPlayers = parseInt(world.getDimension('overworld').runCommand(`scoreboard players test uopsMinPlayers uopsdb * *`).statusMessage.match(/-?\d+/)[0]);
    sleepingPlayers = parseInt(world.getDimension('overworld').runCommand(`scoreboard players test uopsSleepingPlrs uopsdb * *`).statusMessage.match(/-?\d+/)[0]);
    timeAdd = parseInt(world.getDimension('overworld').runCommand(`scoreboard players test uopsTimeAdd uopsdb * *`).statusMessage.match(/-?\d+/)[0]);
} catch (error) {
    world.getDimension('overworld').runCommand(`scoreboard players set uopsMinPlayers uopsdb 1`);
    world.getDimension('overworld').runCommand(`scoreboard players set uopsSleepingPlrs uopsdb 0`);
    world.getDimension('overworld').runCommand(`scoreboard players set uopsTimeAdd uopsdb 50`);
};
function runCommand(cmd, dim = 'overworld') {
    try {
        return { error: false, ...world.getDimension(dim).runCommand(cmd) };
    } catch (error) {
        return { error: true, ...error };  
    };
};
world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(prefix)) { 
        commands(data);
    };
});
world.events.tick.subscribe((currentTick) => {
    minPlayers = parseInt(runCommand(`scoreboard players test uopsMinPlayers uopsdb * *`).statusMessage?.match(/-?\d+/)[0]);
    sleepingPlayers = parseInt(runCommand(`scoreboard players test uopsSleepingPlrs uopsdb * *`).statusMessage?.match(/-?\d+/)[0]);
    timeAdd = parseInt(runCommand(`scoreboard players test uopsTimeAdd uopsdb * *`).statusMessage?.match(/-?\d+/)[0]);
    if (isNight() && sleepingPlayers >= minPlayers) {
        if (currentTick % 20 === 10) {
            world.getDimension('overworld').runCommand(`time add ${timeAdd}`);
            if (getTime() == 23500) {
                return runCommand(`tellraw @a {"rawtext":[{"translate":"cib.sleep.passed"}]}`);
            };
        };
    };
});
let getTime = () => {
    try {
        let timeQuery = parseInt(world.getDimension('overworld').runCommand(`time query daytime`).statusMessage?.match(/-?\d+/)[0]);
        return timeQuery;
    } catch (error) {
        return { error: false, ...error};
    };
};
let isNight = () => {
    try {
        let timeQuery = parseInt(world.getDimension('overworld').runCommand(`time query daytime`).statusMessage?.match(/-?\d+/)[0]);
        if (timeQuery >= 12542) {
            return true;
        };
    } catch (error) {
        return { error: false, ...error };
    };
};
/**
 * 
 * @param {BeforeChatEvent} data 
 * @returns 
 */
function commands(data) {
    let command = data.message.match(new RegExp('(' + `\\${prefix}` + ')\\w+'))?.[0].toLowerCase();
    let origin = data.sender;
    let params = data.message.split(' '); params.splice(0, 1);
    let quotes = data.message.match(/(?<=\").*?(?=\")/g);
    let selector = Array.from(world.getPlayers()).find(sel => {
        sel.nameTag 
            == 
        data.message
                .match(/(?<=\@).?/)
                ?.[0]
                .replace(/\"/g, '');
    });
    switch (true) {
        case command == `${prefix}sleep` || command == `${prefix}s`: {
            data.cancel = true;
            switch (true) {
                case !data.sender.hasTag('op') && params[0] == "setplayers": {
                    runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.syntax","with":["${params[0]}","${command}"]}]}`);
                } break;
                case params[0] == "setplayers": {
                    let check = parseInt(params?.[1], 10);
                    switch (true) {
                        case !params[1]: {
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.missingparam.sleepsetplayers"}]}`);
                        } break;
                        case isNaN(check): {
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.notanumber","with":["${params[1]}"]}]}`);
                        } break;
                        case check == 0: {
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.cannotbezero","with":["${params[1]}"]}]}`);
                        } break;
                        default: {
                            runCommand(`scoreboard players set uopsMinPlayers uopsdb ${check}`);
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.succes.sleepsetplayers","with":["${params[1]}"]}]}`);
                        } break;
                    };
                } break;
                case params[0] == "timeadd": {
                    let check = parseInt(params?.[1], 10);
                    console.warn(check)
                    switch (true) {
                        case !params[1]: {
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.missingparam.sleeptimeadd"}]}`);
                        } break;
                        case isNaN(check): {
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.notanumber","with":["${params[1]}"]}]}`);
                        } break;
                        case check == 0: {
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.cannotbezero","with":["${params[1]}"]}]}`);
                        } break;
                        default: {
                            runCommand(`scoreboard players set uopsTimeAdd uopsdb ${check}`);
                            runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.succes.sleeptimeadd","with":["${check}"]}]}`);
                        } break;
                    };
                } break;
                default: {
                    runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.syntax","with":["${params[0]}","${command}"]}]}`);
                } break;
            };
        } break;
        default: {
            runCommand(`tellraw "${origin.nameTag}"" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command}"]}]}`);
        };
    };
};
/* 
Este archivo pertenece a: "@CibNumeritos" (Eternetic Studios), cualquier modificacion o cambio no autorizado sera penalizado, por favor no suba ninguna version modificada del addon.
Para mas informacion de autorizar tus copias, puedes contactarlo en discord: https://discord.gg/b39ncqJQWU 
o contactarlo via Twitter: https://twitter.com/CibNumeritos - No comparta links de descarga directos.
*/
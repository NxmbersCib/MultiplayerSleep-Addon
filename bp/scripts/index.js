/* 
This file belongs to: "@CibNumeritos" (Eternetic Studios), any unauthorized modification or change will be penalized, please don't upload any modded version of this pack.
For more information to authorize your copies, you can contact him on discord: https://discord.gg/b39ncqJQWU 
or contact him via Twitter: https://twitter.com/CibNumeritos - Don't share direct download links.
*/
import { world, BeforeChatEvent } from 'mojang-minecraft';
world.getDimension('overworld').runCommand(`scoreboard objectives add uopsdb dummy`);
try {
    world.getDimension('overworld').runCommand(`scoreboard players set uopsMinPlayers uopsdb 1`);
    world.getDimension('overworld').runCommand(`scoreboard players set uopsSleepingPlrs uopsdb 0`);
    world.getDimension('overworld').runCommand(`scoreboard players set uopsTimeAdd uopsdb 50`);
} catch (error) {
    console.warn(error);
};
let minPlayers;
let sleepingPlayers;
let timeAdd;
let prefix = "!";
world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(prefix)) { 
        commands(data);
        data.cancel = true;
    };
});
world.events.tick.subscribe((currentTick) => {
    minPlayers = parseInt(world.getDimension('overworld').runCommand(`scoreboard players test uopsMinPlayers uopsdb * *`));
    sleepingPlayers = parseInt(world.getDimension('overworld').runCommand(`scoreboard players test uopsSleepingPlrs uopsdb * *`));
    timeAdd = parseInt(world.getDimension('overworld').runCommand(`scoreboard players test uopsTimeAdd uopsdb * *`));
    if (isNight() && sleepingPlayers >= minPlayers) {
        if (currentTick % 20 === 10) {
            world.getDimension('overworld').runCommand(`time add ${timeAdd}`);
        };
    };
});
let getTime = () => {
    try {
        let timeQuery = parseInt(world.getDimension('overworld').runCommand(`time query daytime`));
        return timeQuery;
    } catch (error) {
        return { error: false, ...error};
    };
};
let isNight = () => {
    try {
        let timeQuery = parseInt(world.getDimension('overworld').runCommand(`time query daytime`));
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
            switch (true) {
                case !data.sender.hasTag('op') && params[0] == "setplayers": {
                    origin.runCommand(`tellraw @s {"rawtext":[{"translate":"commands.generic.syntax","with":["${params[0]}","${command}"]}]}`);
                } break;
                case params[0] == "setplayers": {
                    if (!params[0]) {
                        return origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.customcommand.missingparam.sleepsetplayers","with":[""]}]}`);
                    };
                    origin.runCommand(`scoreboard players set uopsMinPlayers uopsdb ${params[1]}`);
                    origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.customcommand.succes.sleepsetplayers","with":["${params[0]}"]}]}`);
                } break;
                case params[0] == "timeadd": {
                    let check = parseInt(params?.[0]);
                    switch (true) {
                        case !params[0]: {
                            origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.customcommand.missingparam.sleeptimeadd","with":[""]}]}`);
                        } break;
                        case check == NaN: {
                            origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.customcommand.notanumber.sleeptimeadd","with":["${params[0]}"]}]}`);
                        } break;
                        default: {
                            origin.runCommand(`scoreboard players set uopsTimeAdd uopsdb ${check}`);
                            origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.customcommand.succes.sleeptimeadd","with":["${check}"]}]}`);
                        } break;
                    };
                } break;
                default: {
                    origin.runCommand(`tellraw @s {"rawtext":[{"translate":"commands.generic.syntax","with":["${params[0]}","${command}"]}]}`);
                } break;
            };
        } break;
        case command == `${prefix}sleeprequest` || command == `${prefix}sr`: {
            origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.sleep.request","with":["${data.sender.nameTag}"]}]}`);
        } break;
        default: {
            origin.runCommand(`tellraw @s" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command}"]}]}`);
        };
    };
};
/* 
Este archivo pertenece a: "@CibNumeritos" (Eternetic Studios), cualquier modificacion o cambio no autorizado sera penalizado, por favor no suba ninguna version modificada del addon.
Para mas informacion de autorizar tus copias, puedes contactarlo en discord: https://discord.gg/b39ncqJQWU 
o contactarlo via Twitter: https://twitter.com/CibNumeritos - No comparta links de descarga directos.
*/

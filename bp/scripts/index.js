/* 
This file belongs to: "@CibNumeritos" (Eternetic Studios), any unauthorized modification or change will be penalized, please don't upload any modded version of this pack.
For more information to authorize your copies, you can contact him on discord: https://discord.gg/b39ncqJQWU 
or contact him via Twitter: https://twitter.com/CibNumeritos - Don't share direct download links.
*/
import { world, BeforeChatEvent } from 'mojang-minecraft';
let prefix = "!";
world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(prefix)) { 
        commands(data);
        data.cancel = true;
    };
});
world.events.tick.subscribe(tick => {});
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
    switch (command) {
        case `${prefix}sleep`: {
            switch (true) {
                case !data.sender.hasTag('op') && params[0] == "setplayers": {
                    origin.runCommand(`tellraw "${data.sender.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command}"]}]}`);
                } break;
                case params[0] == "setplayers": {
                    origin.runCommand(`scoreboard players set uopMinPlayers uopmp ${params[1]}`);
                    origin.runCommand(`tellraw @s {"rawtext":[{"translate":"cib.customcommand.succes.sleepsetplayers","with":["${params[0]}"]}]}`);
                } break;
                default: {
                    origin.runCommand(`tellraw @s {"rawtext":[{"translate":"commands.generic.syntax","with":["${params[0]}","${command}"]}]}`);
                } break;
            };
        } break;
        case `${prefix}sleeprequest`: {
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

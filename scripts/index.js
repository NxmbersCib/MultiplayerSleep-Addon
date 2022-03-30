/* 
This file belongs to: "@CibNumeritos" (Eternetic Studios), any unauthorized modification or change will be penalized, please don't upload any modded version of this pack.
For more information to authorize your copies, you can contact him on discord: https://discord.gg/b39ncqJQWU 
or contact him via Twitter: https://twitter.com/CibNumeritos - Don't share direct download links.
*/
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
    let command = data.message.match(/(?<=!)\w+/)[0];
    const params = data.message.match(/(?<= )[\w&_-]*/g);
    switch (command) {
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
};
/* 
Este archivo pertenece a: "@CibNumeritos" (Eternetic Studios), cualquier modificacion o cambio no autorizado sera penalizado, por favor no suba ninguna version modificada del addon.
Para mas informacion de autorizar tus copias, puedes contactarlo en discord: https://discord.gg/b39ncqJQWU 
o contactarlo via Twitter: https://twitter.com/CibNumeritos - No comparta links de descarga directos.
*/

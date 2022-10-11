// /* 
// This file belongs to: "@CibNumeritos", any unauthorized modification or change will be penalized, please don't upload any modded version of this pack.
// You can create forks on the github page of the addon: https://github.com/CibNumeritos/MultiplayerSleep-Addon
// For more information to authorize your copies, you can contact him on discord: CibNumeritos#1094/https://discord.gg/nehXXEQ8ub don't share direct download links.
// */
// import { world, BeforeChatEvent, BlockLocation } from 'mojang-minecraft';
// let toggle = false;
// let minPlayers;
// var sleepingPlayers;
// var timeAdd;
// let prefix = "!";
// let undefinitionHandler = () => {
//     try {
//         world.getDimension('overworld').runCommand(`scoreboard objectives add uopsdb dummy`);
//         world.getDimension('overworld').runCommand(`scoreboard players test uopsMinPlayers uopsdb * *`).statusMessage.match(/-?\d+/)[0];
//         world.getDimension('overworld').runCommand(`scoreboard players test uopsTimeAdd uopsdb * *`).statusMessage.match(/-?\d+/)[0];
//     } catch (error) {
//         if (isNaN(minPlayers)) world.getDimension('overworld').runCommand(`scoreboard players set uopsMinPlayers uopsdb 1`).statusMessage.match(/-?\d+/)[0];
//         if (isNaN(timeAdd)) world.getDimension('overworld').runCommand(`scoreboard players set uopsTimeAdd uopsdb 50`).statusMessage.match(/-?\d+/)[0];
//     };
// };
// let runCommand = (cmd, dim = 'overworld') => {
//     try {
//         return { error: false, ...world.getDimension(dim).runCommand(cmd) };
//     } catch (error) {
//         return { error: true, ...error };  
//     };
// };
// let getTime = () => {
//     try {
//         let timeQuery = parseInt(world.getDimension('overworld').runCommand(`time query daytime`).statusMessage?.match(/-?\d+/)[0]);
//         return timeQuery;
//     } catch (error) {
//         return { error: false, ...error};
//     };
// };
// let isNight = () => {
//     try {
//         let timeQuery = parseInt(world.getDimension('overworld').runCommand(`time query daytime`).statusMessage?.match(/-?\d+/)[0]);
//         if (timeQuery >= 12542 && timeQuery < 23460) {
//             return true;
//         };
//     } catch (error) {
//         return { error: false, ...error };
//     };
// };
// let sleepingPlayersUpdate = () => {
//     for (const p of world.getPlayers()) {
//         switch (true) {
//             case !runCommand(`execute "${p.nameTag}" ~ ~ ~ testforblock ~ ~-1 ~ bed 12`).error: {
//                 p.addTag('{IsSleeping}');
//             } break;
//             case !runCommand(`execute "${p.nameTag}" ~ ~ ~ testforblock ~ ~-1 ~ bed 13`).error: {
//                 p.addTag('{IsSleeping}');
//             } break;
//             case !runCommand(`execute "${p.nameTag}" ~ ~ ~ testforblock ~ ~-1 ~ bed 14`).error: {
//                 p.addTag('{IsSleeping}');
//             } break;
//             case !runCommand(`execute "${p.nameTag}" ~ ~ ~ testforblock ~ ~-1 ~ bed 15`).error: {
//                 p.addTag('{IsSleeping}');
//             } break;
//             default: {
//                 p.removeTag('{IsSleeping}');
//             } break;
//         };
//     };
//     try {
//         sleepingPlayers = world.getDimension('overworld').runCommand(`testfor @a[tag="{IsSleeping}"]`).victim?.length;
//     } catch (error) {
//         sleepingPlayers = 0;
//     };
// };
// world.events.beforeChat.subscribe(data => {
//     if (data.message.startsWith(prefix)) { 
//         commands(data);
//         data.cancel = true;
//     };
// });
// world.events.tick.subscribe((currentTick) => {
//     undefinitionHandler();
//     sleepingPlayersUpdate();
//     minPlayers = parseInt(runCommand(`scoreboard players test uopsMinPlayers uopsdb * *`).statusMessage?.match(/-?\d+/)[0]);
//     timeAdd = parseInt(runCommand(`scoreboard players test uopsTimeAdd uopsdb * *`).statusMessage?.match(/-?\d+/)[0]);
//     if (sleepingPlayers >= 1 && minPlayers > 1 || sleepingPlayers >= 1 && minPlayers == 1) {
//         runCommand(`titleraw @a actionbar {"rawtext":[{"text":"§7${sleepingPlayers}/${minPlayers} "},{"translate":"cib.sleep.sleepingplayersstatus"}]}`);
//     } else if (sleepingPlayers == 1 && minPlayers == 1) {
//         runCommand(`execute @a[tag="{IsSleeping}"] ~ ~ ~ titleraw @a actionbar {"rawtext":[{"text":"§7"},{"selector":"@s"},{"translate":"cib.sleep.sleepingoneplayerstatus"}]}`);
//     }; 
//     if (isNight() && sleepingPlayers >= minPlayers) {
//         runCommand(`time add ${timeAdd}`)
//     };
//     if (getTime() > 23460 && !toggle || getTime() < 12542 && getTime() > 0 && !toggle) {
//         runCommand(`tellraw @a {"rawtext":[{"translate":"cib.sleep.passed"}]}`);
//         toggle = true;
//     };
//     isNight() ? toggle = false : toggle;
// });
// function commands(data) {
//     let command = data.message.match(new RegExp('(' + `\\${prefix}` + ')\\w+'))?.[0].toLowerCase();
//     let origin = data.sender;
//     let params = data.message.split(' '); 
//     params.splice(0, 1);
//     let quotes = data.message.match(/(?<=\").*?(?=\")/g);
//     let selector = Array.from(world.getPlayers()).find(sel => {
//         sel.nameTag 
//             == 
//         data.message
//                 .match(/(?<=\@).?/)
//                 ?.[0]
//                 .replace(/\"/g, '');
//     });
//     switch (true) {
//         case command == `${prefix}help` || command == `${prefix}h`: {
//             switch (true) {
//                 case params?.[0] == 'sleep': {
//                     let s1 = `\n`;
//                     runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.success.help.sleep","with":["${s1}"]}]}`);
//                 } break;
//                 case params?.[0] == 'help': {
//                     let s1 = `\n`;
//                     runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.success.help.help","with":["${s1}"]}]}`);
//                 } break;
//                 default: {
//                     let s1 = `\n`, s2 = `${prefix}help / ${prefix}h`, s3 = `${prefix}sleep / ${prefix}s`;
//                     runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.success.help","with":["${s1}", "${s2}", "${s3}"]}]}`);
//                 } break;
//             };
//         } break;
//         case !origin.hasTag('op') && command == `${prefix}sleep` || !origin.hasTag('op') && command == `${prefix}s`: {
//             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command.substring(prefix.length)}"]}]}`);
//         } break;
//         case origin.hasTag('op') && command == `${prefix}sleep` || origin.hasTag('op') && command == `${prefix}s`: {
//             switch (true) {
//                 case !origin.hasTag('op') && params[0] == "setplayers": {
//                     runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.syntax","with":["${command.substring(prefix.length)} ","${params[0]}"]}]}`);
//                 } break;
//                 case params[0] == "minplayers" || params[0] == "mp": {
//                     let check = parseInt(params?.[1], 10);
//                     switch (true) {
//                         case !params[1]: {
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.missingparam.sleepminplayers","with":["${minPlayers}"]}]}`);
//                         } break;
//                         case isNaN(check): {
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.notanumber","with":["${params[1]}"]}]}`);
//                         } break;
//                         case check <= 0: {
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.cannotbezero_or_less","with":["${params[1]}"]}]}`);
//                         } break;
//                         default: {
//                             runCommand(`scoreboard players set uopsMinPlayers uopsdb ${check}`);
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.success.sleepminplayers","with":["${params[1]}"]}]}`);
//                         } break;
//                     };
//                 } break;
//                 case params[0] == "timeadd" || params[0] == "ta": {
//                     let check = parseInt(params?.[1], 10);
//                     switch (true) {
//                         case !params[1]: {
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.missingparam.sleeptimeadd","with":["${timeAdd}"]}]}`);
//                         } break;
//                         case isNaN(check): {
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.notanumber","with":["${params[1]}"]}]}`);
//                         } break;
//                         case check <= 0: {
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.cannotbezero_or_less","with":["${params[1]}"]}]}`);
//                         } break;
//                         default: {
//                             runCommand(`scoreboard players set uopsTimeAdd uopsdb ${check}`);
//                             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"translate":"cib.customcommand.success.sleeptimeadd","with":["${check}"]}]}`);
//                         } break;
//                     };
//                 } break;
//                 default: {
//                     runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.syntax","with":["${command.substring(prefix.length)} ","${params?.[0] ?? ""}"]}]}`);
//                 } break;
//             };
//         } break;
//         default: {
//             runCommand(`tellraw "${origin.nameTag}" {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["${command.substring(prefix.length)}"]}]}`);
//         } break;
//     };
// };
// /* 
// Este archivo pertenece a: "@CibNumeritos", cualquier modificacion o cambio no autorizado sera penalizado, por favor no suba ninguna version modificada del addon.
// Puede crear forks en la pagina de github del addon: https://github.com/CibNumeritos/Ultimate-OnePlayerSleep,
// Para mas informacion de autorizar tus copias, puedes contactarlo en discord: CibNumeritos#4239
// o contactarlo via Twitter: https://twitter.com/CibNumeritos - No comparta links de descarga directos.
// */

import { BlockLocation, DynamicPropertiesDefinition, Player, Vector, world } from "mojang-minecraft";

const prefix = "!";

//TODO: Test runCommand function
function runCommand(command, dimension = 'overworld') {

    world.getDimension(dimension).runCommandAsync(command).then((result) => {

        return { error: false, ...result };

    }).catch((error) => {

        return { error: true, ...error };

    });

};

/**
 * 
 * @param {Player} player 
 * @param {string} command 
 */
function unknownCommand(player, command) {

    return player.tell(
        {
            rawtext: [
                {
                    text: "§c"
                },
                {
                    translate: "commands.generic.unknown",
                    with: [command]
                },
            ],
        }
    )

};

/**
 * 
 * @param {Player} player 
 * @param {string} command 
 */
function wrongParameter(player, param1, param2) {

    return player.tell(
        {
            rawtext: [
                {
                    text: "§c"
                },
                {
                    translate: "commands.generic.syntax",
                    with: [
                        `${param1} `,
                        param2
                    ]
                },
            ],
        }
    )

};

world.events.worldInitialize.subscribe((arg) => {

    try {

        let def = new DynamicPropertiesDefinition();

        def.defineNumber('MultiplayerSleep:players');
        def.defineNumber('MultiplayerSleep:speed');
        def.defineNumber('MultiplayerSleep:sleeping_players');

        arg.propertyRegistry.registerWorldDynamicProperties(def);

    } catch (error) {

        console.warn(`§c[MultiplayerSleep] error:\n${error}`);

    };

});

world.events.tick.subscribe(() => {

    for (const p of world.getPlayers()) {

        // console.warn(`${Math.trunc(p.location.x)} ${Math.trunc(Math.ceil(p.location.y))} ${Math.trunc(p.location.z)}`)

    };

})

world.events.beforeChat.subscribe((chatEvent) => {

    if (!chatEvent.message.startsWith(prefix)) {

        return;

    };

    chatEvent.cancel = true;

    const player = chatEvent.sender;

    const [command] = chatEvent.message.slice(prefix.length).trim().split(/\s+/g);

    const parameters = chatEvent.message.substring(command.length + prefix.length).trim().match(/"[^"]+"|[^\s]+/g).map((e) => e.replace(/\"/g, "").toString());;

    //TODO: Add default case (unknown command message). Add unknownCommand() function.
    switch (true) {

        case command == 'debug': {

            return player.tell(JSON.stringify(player.runCommand(parameters?.[0])))

        } break;

        case command == 'help' || 'h': {

            try {

                player.tell(`Avaiable commands:\n\n-help: Shows this list.\n\n-(Admin only) sleep: Manage addon settings.\n  Parameters:\n  -players: Set or get the minimum of players required to skip the night.\n  -speed: Speed in wich the night is skipped (ticks to add per second)`);

            } catch (error) {

                return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cAn internal error occured during command execution. (please report this on github: §bhttps://github.com/CibNumeritos/MultiplayerSleep-Addon§c)\n${error}"}]}`);

            };

        } break;

        case command == 'sleep' || 's': {

            try {

                if (!player.hasTag(`MPS:Admin`)) {

                    return unknownCommand(player, command);

                };

                if (!parameters?.[0]) {

                    return wrongParameter(player, command, parameters?.[0] ? parameters?.[0] : '');

                };

                if (parameters?.[0] == 'p' || 'players') {


                } else if (parameters?.[0] == 'speed' || 's') {


                } else {

                    wrongParameter(player, command, parameters?.[0] ? parameters?.[0] : '');

                };

            } catch (error) {

                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cAn internal error occured during command execution. (please report this on github: §bhttps://github.com/CibNumeritos/MultiplayerSleep-Addon§c)\n${error}"}]}`);

            };

        } break;

        default: {

            unknownCommand(player, command);

        } break;

    };

});
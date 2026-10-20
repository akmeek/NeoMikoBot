import { Client, Events, GatewayIntentBits, UserSelectMenuInteraction } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Connecté en tant que ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "test"){
        await interaction.reply("feur");
    }

    if (interaction.commandName === "roll") {
        const faces = interaction.options.getInteger("max") ?? 100;
        const nbDes = interaction.options.getInteger("turns") ?? 1;
        const result: number[] = [];
        for (let i = 0; i < nbDes; i++) {
            result.push(Math.floor(Math.random() * faces) + 1);
        }

        if (nbDes === 1){
            await interaction.reply(`Rolling ${faces}...\n${interaction.user.displayName} rolls **${result[0]}** point(s)`);
        }else{
            const tot = result.reduce((acc, courant) => acc + courant, 0);
            await interaction.reply(`Rolling ${faces} x${nbDes}...\n${interaction.user.displayName} rolls ${result.join(" + ")} = ${tot}`);
        }
    }
});

await client.login(process.env.DISCORD_TOKEN);
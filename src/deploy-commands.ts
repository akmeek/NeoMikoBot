import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
  new SlashCommandBuilder().setName("test").setDescription("quoi ?"),
  new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls")
    .addIntegerOption((option) =>
        option
            .setName("max")
            .setDescription("Number of faces (100 by default)")
            .setMinValue(2)
            .setMaxValue(10000),
        )
    .addIntegerOption((option) =>
        option
            .setName("turns")
            .setDescription("Number of turns")
            .setMinValue(1)
            .setMaxValue(20),    
    ),
].map((c) => c.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
  { body: commands },

  
);


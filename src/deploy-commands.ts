import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
  new SlashCommandBuilder().setName("test").setDescription("Répond feur"),
].map((c) => c.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
  { body: commands },
);
console.log("Commandes enregistrées");

const data = await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
  { body: commands },
);
console.log(data);
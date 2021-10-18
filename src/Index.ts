import { Message } from 'discord.js';
import Client, { intents } from './Class';
import config from './Config';

const client = new Client({
    intents: intents,
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

// client.on("messageDeleteBulk")

client.login(config.token);
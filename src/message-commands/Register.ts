import { Message } from 'discord.js'

import { Client } from '../structures/Client'

module.exports = {
    name: 'register',
    description: 'Registers the slash slash-commands for the bot',
    aliases: ['deploy'],
    async execute(client: Client, message: Message, args: string[]) {
        if (message.author === client.info.owner) {
            await client.registerCommands()
            await message.channel.send({
                content: 'Successfully Registered Slash Commands',
            })
        }
    },
}

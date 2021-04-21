import Discord, { Channel, GuildMember } from 'discord.js'

import { Bussen } from './Bussen'

class BotClient extends Discord.Client {
    currentGame: Bussen
    currentChannel: Channel

    constructor(...args) {
        super(...args)
        this.currentGame = null
        this.currentChannel = null
    }

    hasChannel() {
        return this.currentChannel
    }
    isFromChannel(message) {
        return message.channel === this.currentChannel
    }

    validMessage(message) {
        return this.hasChannel() && this.isFromChannel(message)
    }

    gameExists() {
        return this.currentGame
    }

    readyToJoin(message) {
        return (
            this.validMessage(message) &&
            this.gameExists() &&
            !this.currentGame.hasStarted &&
            !this.currentGame.players.some(player =>
                player.equals(message.author),
            )
        )
    }

    readyToPlay(message) {
        return (
            this.validMessage(message) &&
            this.gameExists() &&
            this.currentGame.isLeader(message.author) &&
            !this.currentGame.hasStarted
        )
    }

    readyToQuit(message) {
        return (
            this.validMessage(message) &&
            this.gameExists() &&
            this.currentGame.players.includes(message.author)
        )
    }

    readyToKick(message, player) {
        return (
            player &&
            player instanceof GuildMember &&
            this.validMessage(message) &&
            this.gameExists() &&
            this.currentGame.isLeader(message.author) &&
            this.currentGame.isPlayer(player)
        )
    }

    readyToEnd(message) {
        return (
            this.validMessage(message) &&
            this.gameExists() &&
            this.currentGame?.isLeader(message.author)
        )
    }
}

module.exports = BotClient


function getPrompt(channel, filter) {
    const collector = channel.createMessageCollector(filter, { max : 1 })

    return {message : new Promise((resolve, reject) => {
        collector.on('end', collected => {
            if (collected.size === 0) {
                reject(new Error(`Collector stopped`))
                return
            }
            resolve(collected.first())
        })
    }), collector}
}

function filter(user, answer) {
    return m => {
        return answer.test(m.content) && m.author.equals(user)
    }
}

function getUserFromId() {

}

module.exports = {getPrompt, filter}
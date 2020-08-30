const { Command } = require('discord.js-commando');

module.exports = class sayHiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say-hi',
			group: 'first',
			memberName: 'say-hi',
			description: 'Say hello to someone!',
			args: [
				{
					key: 'person',
					prompt: 'Who do you say hi to?',
					type: 'string',
				},
			],
		});
	}

  run(msg , {person} ) {
  	const test = msg.guild.members.get("name" , person)
  	// const userId = msg.server.members.get("name", person).id;
    return msg.say(`Hello, @${test}`);
  }
};
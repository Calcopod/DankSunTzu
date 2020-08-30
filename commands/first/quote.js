const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const sunTzu = require('sun-tzu-quotes')

module.exports = class QuoteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'quote',
			group: 'first',
			memberName: 'quote',
			description: 'SunTzu for life!',
		});
	}

  run(msg) {
  	const quote = sunTzu()
		const embedNew= new MessageEmbed()
		.setTitle("Dank Sun Tzu")
		.setDescription("Sun tzu quotes for the bold.")
		.setAuthor("Calcopod", "https://yt3.ggpht.com/a/AGF-l7-t-1-KcFjBZIjhbMDoZXvbpNCgv9DI9r77hA=s900-c-k-c0xffffffff-no-rj-mo")
		.setThumbnail("https://m.media-amazon.com/images/I/51ZuKWeMvsL.jpg")
		.addFields(
			{name:`${quote}`, value:"-Sun Tzu, The Art of War", inline:false},
		)
		.setTimestamp()
		.setFooter("Brought to you by Dank SunTzu Quotes")
    return msg.say(embedNew);
  }
};
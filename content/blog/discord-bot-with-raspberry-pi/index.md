---
title: Discord bot with Raspberry Pi
date: 2020-11-18T04:10:46.912Z
description: Cheap alternative to getting a VPS? Let try it out!
---
Bots are cool. It's even cooler when you own one so I am making one. However, I am not willing to cash out monthly to host my bot on a Virtual Private Server (VPS). A Raspberry Pi (RPi) is a cheaper alternative to host the bot. As long you have a stable internet connection, constant power to raspberry and hopefully optimised code, the RPi will be able to do the job. I have not checked which RPi versoin is suitable for this application. I am using a Raspberry Pi 3b+ and it is working fine. I will add a list to show which RPi are suitable in the future.

> #### Disclaimer
>
> I will go through the steps to get the bot up and running briefly. This is not a guide so the code will not account for edge cases. It more of a proof of concept. References to the docs will linked so read them if you want to understand in detail.

### Goal:

Building a discord bot which will greet you when you enter a voice channel.

### Prerequisites:

* Javascript ES6
* RPi
* Discord account

### Build process:

1. Setup Discord server
2. Create a Discord application for the bot
3. Grant permission for the bot
4. Coding your bot



#### Setup Discord

You will need a discord account and create a server. Refer to this guide. <https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server->

#### Create a Discord application for the bot

Head to this link: <https://discordapp.com/developers/applications> and click on the "New Application" button.

Enter a name for your bot and click "Create".

Select Bot on the left side navigation and click "Add bot".

Click on the token "Copy" button as we will need later.

Select OAuth2 and choose "bot" as the scope and choose "administrator" for the bot permissions.

A url will be generated at the bottom. Navigate to this url to invite the bot to your server.

#### Coding your bot

##### Process

1. Installing node/npm and other dependencies into RPi
2. Setting up your project structure
3. Bringing your bot to life
4. Profit?

##### Installing

Head over to this repo to download the binary distribution for node: <https://github.com/nodesource/distributions>. Look for the current LTS version.

Open up terminal, run this commands:

We will install

* discordjs
* ytdl-core
* ffmpeg

```

// optional - nodemon will restart your app when you save changes to the file
sudo npm install -g nodemon

mkdir <your-project-directory>
cd <your-project-directory>

npm init

npm install discordjs ytdl-core ffmpeg

```

##### Setting up the project structure

```

touch index.js config.json

// optional - at this point, I would also link this to my github 
git init
touch .gitignore
git add .
git commit -m 'any meaningful message here'

```

I used nano to edit my code on the RPi. You can use any code editor you want. You can code it on your main machine and push to github and git pull into the RPi.

```
// index.js

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  // the bot will listen to all messages in all channels
  // the message sent from the discord server can be
  // accessed with message.content
  if (message.content === '!ping') {
    // to reply to messages, use the message.channel.send
    // method to reply to the channel where the message 
    // originated from
    message.channel.send('Pong');
  }
});

client.login(config.token);

```

```
// config.json

{
  token: "<your-token-copied-from-discord-bot-application>"
}
```

Now we can implement the greeting with this lines of code.

```

client.on('voiceStateUpdate', async (oldState, newState) => {
	// if user is a bot do nothing
	if (oldState.member.user.bot) return;

	//  join the same voice channel
	if (oldState.member.voice.channel) {
        // keep track of the connection instance
		const connection = await oldState.member.voice.channel.join();

        // ytdl is a youtube downloader
        // for other audio source refer to the docs linked below
		const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=cBnia4XgjzY', { filter: 'audioonly' }), { volume: 1 });
		dispatcher.on('finish', () => {
			connection.disconnect();
		});

        // important to catch errors
		dispatcher.on('error', err => {
			console.error(err);
		});
	}
});

```

##### Bringing the bot to life

```
// terminal

nodemon index.js

```

Now head over to your discord server and you can see that the bot is online. You can type "!ping" the text channel and the bot will reply "Pong".

When you join a voice channel, the bot will join the call and play the youtube video as audio.

##### Profit ???

Now, you have a working bot. It has a lot things missing such as optimisations, error handling and channel filtering. So go crazy and add all the features you want!

### For references and further reading:

* ### <https://discordjs.guide/#before-you-begin>
* ### <http://www.keithmsmith.com/how-to-run-your-nodejs-discord-bot-on-a-raspberry-pi/>
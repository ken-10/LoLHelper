# LoLHelper
## Set up
**Clone or download the repository first!**
1) Download and install [node js](https://nodejs.org/en/download/) in your computer if you haven't already
2) Go into your terminal and go into the LoLHelper directory/folder
3) Open the directory/folder in your preferred IDE (I use Visual Studio Code)
4) Open the terminal in the IDE if it has one, if not go to your computer's terminal/cmd
5) Go to the LoLHelper directory
6) Type: **npm init**
  - It will ask you a bunch of question, just hit enter for everything
7) Then, type: **npm install discord.js**
8) Type: **npm i axios** (to install axios for getting APIs)
9) Go to https://discord.com/developers/applications
  - Click on New Application to create a new application
  - Next, go to Bot and click on Add Bot
  - Copy your token and paste it into the token const in line 4 (in replacement of PASTE YOUR TOKEN HERE. Be sure to not delete the "" marks)
  - Watch this video to learn how to invite your bot to your discord server: https://youtu.be/xbEUioI1q-k?t=440 (made by It's Cam)
10) Now that our bot is in our server, we just need our API key from Riot
  - Go to: https://developer.riotgames.com/
  - Sign in, or sign up if you do not have an account
  - You will be redirected to your dashboard and you will be given the option to copy your key
  - Copy the api key and paste it into the API_Key const in line 7 (in replacement of PASTE YOUR API KEY HERE. Be sure to not delete the "" marks)
11) Type: **node .** OR **node index.js** to run the bot
  - The bot has successfully started if it prints "I have awoken" in the terminal
## How to use
Now that you've got the bot set up, you can use it on your server.
The bot should be online.
Currently the only commands are (as of June 18, 2020. More features will be added in the future):
1) **!ego** 
  - this command gives an reaction
2) **!clear (a number you input)**
  - this command clears the amount of messages you want
3) **!joke**
  - this command tells you a random joke
4) **!allcaps (your message)**
  - turns you message into all caps
5) **!summoner (summoner name)**
  - retrieves summoner name, level, and competitve ranks, along with wins, losses, and league points for each queue type

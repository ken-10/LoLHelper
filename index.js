const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();
const token = "Paste your token here";
const prefix = '!';
//API Key
const APIkey = "?api_key=PASTE YOUR API KEY HERE";

client.on("ready", () => {
    console.log("I have awoken.");
});


client.on("message", async message => {
    //If message in the channel doesn't start with "!", then don't do anything
    if (!message.content.startsWith(prefix)) {
        return
    }

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    //Make all args lowercase
    const command = args.shift().toLowerCase();
    console.log(args);

    //A simple reaction command
    if (command === 'ego') {
        message.react('😉');
    }

    //Command to clear inputted amount of messages
    if (command === 'clear') {
        //deletes 1 message, but we use 2 because it deleted !clear command 
        //and the one message they want to delete
        let num = 2;

        //if they provide an argument, ex. !clear 5 (5 being args), then
        //we set nums to the args entered
        if (args[0]) {
            //need to parse to int because it comes in as a string
            //+ 1 because we need to delete the command entered as well
            num = parseInt(args[0]) + 1;
        }

        message.channel.bulkDelete(num);
        message.channel.send(`I deleted ${num - 1} messages for you`);
    }

    //Command to convert user input to capslock
    if (command === 'allcaps') {
        const combinedArgs = args.join(" ");
        message.channel.send(
            `${
            message.author.username
            } is angry and has something to say: \n\n ${combinedArgs.toUpperCase()}`
        );
    }

    //Command that tells a random joke
    if (command === 'joke') {
        //Function that retrieves random joke from api
        let getJoke = async () => {
            let response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            let joke = response.data;
            return joke;
        }
        //Retrieve the return value from getJoke() function
        let jokeValue = await getJoke();
        console.log(jokeValue);
        //Bot replies with the joke (we print ".setup" because it is the joke in the joke api object)
        message.reply(
            `Here's your joke: \n ${jokeValue.setup} \n\n ${jokeValue.punchline}`
        );
    }

    //Command that displays summonder data
    if (command === 'summoner') {
        //Initialize a vairable for summoner name (the argument passed in)
        let inputName = args[0].toLowerCase();
        //If user fails to give an input, say they need to provide one
        if (args[0] == null) {
            message.reply("You didn't give me a summoner name! Bye...");
        } else {
            //If the summoner name has a space, join them
            if (args.length > 0) {
                const combinedArgs = args.join(" ");
                inputName = combinedArgs;
            }
            let API_URL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + inputName + APIkey;
            //Function to obtain basic summoner data (ids, level, name)
            let getSummonerIDs = async () => {
                let response = await axios.get(API_URL);
                let summonerData = response.data;
                return summonerData;
            }
            //Save name, level, encrypted summoner id, and account id
            let basicData = await getSummonerIDs();
            let summonerName = basicData.name;
            let level = basicData.summonerLevel;
            let encryptedSumID = basicData.id;
            let accountID = basicData.accountId;
            console.log(basicData);

            //Function to obtain summoner rank for solo queue and flex
            let getRank = async () => {
                let response = await axios.get('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encryptedSumID + APIkey);
                let rankData = response.data;
                return rankData;
            }
            let rankData = await getRank();
            //If summoner has no rank, display unrank
            if (rankData.length == 0 || rankData === undefined) {
                let noRank = "Unranked";
                message.channel.send(`Summoner Name: ${summonerName}\nLevel: ${level}\nSOLO & FLEX\nTier: ${noRank}`);
            }
            console.log(rankData);
            //If there are rank(s), then print
            if (rankData.length > 0) {
                message.channel.send(`Summoner Name: ${summonerName}\nLevel: ${level}`);
                for (let i = 0; i < rankData.length; i++) {
                    message.channel.send(`${rankData[i].queueType}\nTier: ${rankData[i].tier} ${rankData[i].rank}\nLP: ${rankData[i].leaguePoints}\nWins: ${rankData[i].wins}\nLosses: ${rankData[i].losses}`);
                }
            }
            //If summoner only has a rank in on of the two, print unranked for the other
            if (rankData.length == 1) {
                for (let i = 0; i < rankData.length; i++) {
                    if (rankData[i].queueType == "RANKED_SOLO_5x5") {
                        message.channel.send(`RANKED_FLEXED_SR\nTier: Unranked`);
                    } else {
                        message.channel.send(`RANKED_SOLO_5X5\nTier: Unranked`);

                    }
                }
            }
            //Function to obtain summoner rank for TFT
            let getTftRank = async () => {
                let response = await axios.get('https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/' + encryptedSumID + APIkey);
                let tftRankData = response.data;
                return tftRankData;
            }
            let tftRankData = await getTftRank();
            console.log(tftRankData);
            //If summoner has no rank in TFT, display unranked
            if (tftRankData.length == 0 || tftRankData === undefined) {
                let noRank = "Unranked";
                message.channel.send(`TFT\nTier: ${noRank}`);
                //Else there is a TFT rank
            } else {
                for (let i = 0; i < tftRankData.length; i++) {
                    message.channel.send(
                        `${tftRankData[i].queueType}\nTier: ${tftRankData[i].tier} ${tftRankData[i].rank}\nLP: ${tftRankData[i].leaguePoints}\nWins: ${tftRankData[i].wins}\nLosses: ${tftRankData[i].losses}`
                    );
                }
            }

        }

    }
});

client.login(token);
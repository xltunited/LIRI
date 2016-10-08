var keys = require('./keys.js');

var Twitter = require('twitter');

var consumer_key = keys.twitterKeys.consumer_key;

var consumer_secret = keys.twitterKeys.consumer_secret;

var access_token_key = keys.twitterKeys.access_token_key;

var access_token_secret = keys.twitterKeys.access_token_secret;

if(process.argv[2] == 'my-tweets'){

	var client = new Twitter({

		consumer_key: consumer_key,

		consumer_secret: consumer_secret,

		access_token_key: access_token_key,

		access_token_secret: access_token_secret

	});

	var params = {screen_name: 'EddyXltunited'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error) {

			for(var i = 0; i < 20; i++){

				if(tweets[i] == null || tweets[i] == undefined){

					break;

				}

				console.log((i+1)+ '. Tweet: "' + tweets[i].text+ '"');

				console.log("Date created : " + tweets[i].user.created_at);

			}

		}

	});

}
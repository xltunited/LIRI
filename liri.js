var keys = require('./keys.js');

var Twitter = require('twitter');

var request = require('request');

var consumer_key = keys.twitterKeys.consumer_key;

var consumer_secret = keys.twitterKeys.consumer_secret;

var access_token_key = keys.twitterKeys.access_token_key;

var access_token_secret = keys.twitterKeys.access_token_secret;

var processValue = process.argv[3];

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

if(process.argv[2] == 'movie-this'){

	if(processValue == undefined || processValue == null){

		processValue = 'Mr.Nobody';

	} 
	else {

		for(var i = 3; i < process.argv.length; i++){

			if(i == 3){

				processValue = process.argv[i].replace(' ', '+');

				console.log(processValue);

			} else{

				processValue = processValue + "+" + process.argv[i];

			}

		}


	}

	request('http://www.omdbapi.com/?t=' + processValue + '&y=&plot=short&r=json', function (error, response, body) {

		if (!error && response.statusCode == 200) {
 
			console.log('Title: '+JSON.parse(body)["Title"]);

			console.log("Year: " + JSON.parse(body)["Year"]);

			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);

			console.log("Country: " + JSON.parse(body)["Country"]);

			console.log("Language: " + JSON.parse(body)["Language"]);

			console.log("Plot: " + JSON.parse(body)["Plot"]);

			console.log("Actors: " + JSON.parse(body)["Actors"]);

			console.log("Metascore: " + JSON.parse(body)["Metascore"]);

			console.log("Genre: " + JSON.parse(body)["Genre"]);

		}

	});

}
var keys = require('./keys.js');

var Twitter = require('twitter');

var request = require('request');

var spotify = require('spotify');

var fs = require('fs');

var consumer_key = keys.twitterKeys.consumer_key;

var consumer_secret = keys.twitterKeys.consumer_secret;

var access_token_key = keys.twitterKeys.access_token_key;

var access_token_secret = keys.twitterKeys.access_token_secret;

var processValue = process.argv[3];

var artists = "";

var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var CurrentDateTime = date+' '+time;

function getTweets(){

	fs.appendFile('log.txt', "Date: " + CurrentDateTime + ', Command: ' + process.argv[2] + '\n\n');

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

				console.log((i+1) + '. Tweet: "' + tweets[i].text+ '"');

				console.log("Date created : " + tweets[i].created_at);

				fs.appendFile('log.txt', (i+1) + '. Tweet: "' + tweets[i].text+ '"' + '\n\n' + "Tweet Created : " + tweets[i].created_at + '\n\n');

			}

		}

	});

}

function getMovie(movieName){

	if(movieName == undefined || movieName == null){

		movieName = 'Mr.Nobody';

	} 
	else {

		for(var i = 3; i < process.argv.length; i++){

			if(i == 3){

				movieName = process.argv[i].replace(' ', '+');

			} else{

				movieName = movieName + "+" + process.argv[i];

			}

		}

	}

	fs.appendFile('log.txt', "Date: " + CurrentDateTime + ', Command: ' + process.argv[2] + ', Value: ' + movieName + '\n\n');

	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {

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

			fs.appendFile('log.txt', 'Title: '+JSON.parse(body)["Title"] + '\n\n' + "Year: " + JSON.parse(body)["Year"] + '\n\n' + "IMDB Rating: " + JSON.parse(body)["imdbRating"] + '\n\n' + "Country: " + JSON.parse(body)["Country"] + '\n\n' 

			+ "Language: " + JSON.parse(body)["Language"] + '\n\n' + "Plot: " + JSON.parse(body)["Plot"] + '\n\n' + "Actors: " + JSON.parse(body)["Actors"] + '\n\n' + "Metascore: " + JSON.parse(body)["Metascore"] + '\n\n' + "Genre: " + JSON.parse(body)["Genre"]);

		}

	});

}

function getSong(song){

	if(song == undefined || song == null){

		song = "The Sign";

	} 
	else {

		for(var i = 3; i < process.argv.length; i++){

			if(i == 3){

				song = process.argv[i].replace(' ', '+');

			} else{

				song = song + "+" + process.argv[i];

			}

		}

	}

	fs.appendFile('log.txt', "Date: " + CurrentDateTime + ', Command:' + process.argv[2] + ', Value: ' + song + '\n\n');

	spotify.search({ type: 'track', query: song }, function(err, data) {

	    if (err) {

	        console.log('Error occurred: ' + err);

	        return;

	    }

	    for(var i = 0; i < data.tracks.items.length; i++){

	    	console.log((i+1) + ". Track Name: " + data.tracks.items[i].name);

	    	artists = "";

	    	for(var j = 0; j < data.tracks.items[i].artists.length; j++){

	    		artists = artists + '-' + data.tracks.items[i].artists[j].name + " ";

	    	}

	    	console.log("    Artists : " + artists);

	    	console.log("    Preview : " + data.tracks.items[i].preview_url);

	    	console.log("    Album : " + data.tracks.items[i].album.name);

	    	console.log('----------------------------------------------------------------------------------------------------------------------------------------------------------');

	    	fs.appendFile('log.txt', (i+1) + ". Track Name: " + data.tracks.items[i].name + '\n\n' + "Artists : " + artists + '\n\n' + "Preview : " + data.tracks.items[i].preview_url + '\n\n' + "Album : " + data.tracks.items[i].album.name + '\n\n' + 

	    	'----------------------------------------------------------------------------------------------------------------------------------------------------------' +  '\n\n');

	    }

	});

}

if(process.argv[2] == 'my-tweets'){

	getTweets();

}

if(process.argv[2] == 'movie-this'){

	getMovie(processValue);

}

if (process.argv[2] == 'spotify-this-song') {

	getSong(processValue);

}

if (process.argv[2] == 'do-what-it-says') {

	fs.readFile('random.txt', "utf8", function(err, data){

		data = data.split(',');

		fs.appendFile('log.txt', "Date: " + CurrentDateTime + ', Main Command: do-what-it-says, Secondary Command: ' + data[0] + '\n\n');

		if(data[0] == 'spotify-this-song'){

			getSong(data[1]);

		}

		if(data[0] == 'movie-this'){

			getMovie(data[1]);

		}

		if(data[0] == 'my-tweets'){

			getTweets();

		}
        
	})

}
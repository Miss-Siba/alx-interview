#!/usr/bin/env node

const request = require('request');

// Get the Movie ID from command line arguments
const movieID = process.argv[2];

if (!movieID) {
    console.error('Please provide a Movie ID as an argument.');
    process.exit(1);
}

// Define the URL to retrieve the movie details
const movieURL = `https://swapi.dev/api/films/${movieID}/`;

// Function to fetch data from a URL
function fetchData(url, callback) {
    request(url, { json: true }, (err, res, body) => {
        if (err) {
            console.error('Error fetching data:', err);
            process.exit(1);
        }
        callback(body);
    });
}

// Fetch movie details
fetchData(movieURL, movieData => {
    // Retrieve the list of character URLs from the movie data
    const characterURLs = movieData.characters;

    // Function to fetch character data
    function fetchCharacter(url, callback) {
        request(url, { json: true }, (err, res, body) => {
            if (err) {
                console.error('Error fetching character data:', err);
                process.exit(1);
            }
            callback(body.name);
        });
    }

    // Fetch and print each character's data
    let remaining = characterURLs.length;

    characterURLs.forEach(url => {
        fetchCharacter(url, characterName => {
            console.log(characterName);
            remaining--;

            // Exit the process if all characters have been processed
            if (remaining === 0) {
                process.exit(0);
            }
        });
    });
});


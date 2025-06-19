function findGameByName(games, name) {
    return games.find(game => game.gameName === name)
}

function calculateTries(game) {
	return game.history?.length
}


export function createStats(gamesList) {
	const gameNames = {
  	"Animal Puzzle": "slidingPuzzle",
  	"Guess the Animal Sound": "guessSound",
  	"Animal Memory Game": "flashCard",
  	"Animal Quiz": "animalQuiz",
	};

	let allStats = {};

	for (const [label, gameKey] of Object.entries(gameNames)) {
  	const gameData = findGameByName(gamesList, gameKey);
  
  	allStats[label] = {
    	stats: [
      	{ label: "Total tries", value: gameData ? calculateTries(gameData) : "-"},
      	{ label: "Best Score", value: gameData ? gameData?.highestScore : "-" },
    	],
    	achievements: [],
    	avatars: [],
  	};
	}
	return allStats
}
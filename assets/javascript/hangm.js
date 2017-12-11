// Global variables
var winsCounter = 0;
var remainingCounter = 10;
var currentWord = "";
var lettersGuessedArr = [];
var answersArr = [];
var philoArr = ["objectivism", "existentialist", "utiitarian", "surrealism", "capitalist", "realism", "humanist", "determinist", "nhilism", "absurdism", "optimism", "anarchist", "idealism", "stoicism", "republic", "democracy", "fascism", "industriaist", "communism"];

var philoObj = {
  objectivism: {img:"objectivism.jpg", quote:" \'Have you ever felt the longing for someone you could admire? For something, not to look down at, but up to?\' -Ayn Rand"},
  existentialist: {img:"existentialist.jpg", quote:" \'There is something infantile in the presumption that somebody else has a responsibility to give your life meaning and point… The truly adult view, by contrast, is that our life is as meaningful, as full and as wonderful as we choose to make it.\' -Richard Dawkins"},
  utiitarian: {img:"utilitarian.jpg", quote:" \'The end may justify the means as long as there is something that justifies the end.\' -Leon Trotsky"},
  surrealism: {img:"surrealism.jpg", quote:"\'Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision.\' -Salvador Dalí"},
  capitalist: {img:"capitalism.jpg", quote:"\'Capitalism is the astounding belief that the most wickedest of men will do the most wickedest of things for the greatest good of everyone\' -John Maynard Keynes"},
  realism: {img:"realist.jpg", quote:"\'The secret of happiness is to face the fact that the world is horrible, horrible, horrible.\' -Bertrand Russell"},
  humanist: {img:"humanism.jpg", quote:"\'Being a Humanist means trying to behave decently without expectation of rewards or punishment after you are dead.\' -Kurt Vonnegut"},
  determinist: {img:"determinism.gif", quote:"\'Man can do what he wills but he cannot will what he wills\'― Arthur Schopenhauer"},
  nhilism: {img:"nihlism.png", quote:"\'“If you could be either God’s worst enemy or nothing, which would you choose?” \' -Chuck Palahniuk"},
  absurdism: {img:"absurdism.png", quote:"\'Man stands face to face with the irrational. He feels within him his longing for happiness and for reason. The absurd is born of this confrontation between the human need and the unreasonable silence of the world.\' -Albert Camus"},
  optimism: {img:"optimism.jpg", quote:"\'Don't cry because it's over, smile because it happened.\' -Dr.Seuss"},
  anarchist: {img:"anarchist.jpg", quote:"\'That is what I have always understood to be the essence of anarchism: the conviction that the burden of proof has to be placed on authority, and that it should be dismantled if that burden cannot be met.\' -Noam Chomsky"},
  idealism: {img:"idealism.jpg", quote:"\'I\'m an idealist. I don\'t know where I am going. But I\'m on my way \' -Carl Sandburg"},
  stoicism: {img:"stoicism.jpg", quote:"\'No man was ever wise by chance. \' -Lucius Seneca"},
  republic: {img:"republican.jpg", quote:"\'God grant that men of principle shall be our principal men.\' -Thomas Jefferson"},
  democracy: {img:"democracy.jpg", quote:"\'People shouldn't be afraid of their government. Governments should be afraid of their people\' -Alan Moore"},
  fascism: {img:"fascism.jpg", quote:"\'Fascism should more appropriately be called Corporatism because it is a merger of state and corporate power\' -Benito Mussolini"},
  industrialist: {img:"inustrialist.jpg", quote:"\'There is one rule for the industrialist and that is: Make the best quality of goods possible at the lowest cost possible, paying the highest wages possible.\' -Henry Ford"},
  communism: {img:"communism.jpg", quote:"\'When I give food to the poor, they call me a saint. When I ask why the poor have no food, they call me a communist.\' -Hélder Câmara"},
};

var displayWord = document.getElementById("display-word");
var displayGuessed = document.getElementById("dispay-guessed");
var displayRemaining = document.getElementById("dispay-remaining");
var displayWins = document.getElementById("display-wins");
var displayImg = document.getElementById("display-img");
var displayQuote = document.getElementById("display-quote");
var gameButton = document.getElementById("game-button");
var imgElement = document.createElement("img");
var createQuote = document.createElement("quote");

var hangmanObj = {

};

// Load game on broswer start
window.addEventListener("load", function() {
  currentWord = chooseWord(philoArr);
  displayRemaining.innerHTML = remainingCounter;
});


window.addEventListener("keyup", function(event) {

  // look for key press
  var userGuess = event.key.toUpperCase();

  // Verify that key pressed exists in the array
  var isGuessed = lettersGuessedArr.indexOf(userGuess);
  var isCompleted = answersArr.indexOf("_");

  if (isGuessed === -1 && isCompleted !== -1 && remainingCounter > 0) {
    // Store uppercase letter in lettersGuessed array
    lettersGuessedArr.push(userGuess);

    // decreaese remainingCounter by 1
    if (remainingCounter > 0) {
      remainingCounter--;
    }

  } else {
    // Do nothing
    return;
  }

  displayGuessed.innerHTML = lettersGuessedArr;
  displayRemaining.innerHTML = remainingCounter;

  checkWord();
});


function chooseWord(arr) {
  // Select a current word from philoArr
  var randoWord = arr[Math.floor(Math.random() * arr.length)];
  console.log(randoWord + " - " + randoWord.length);
  // console.log(Math.floor(Math.random() * arr.length));

  // Display underscores _ _ (string), number of underscores must match with number of letters in the selected word
  var answers = randoWord.replace(/./g, "_ ");

  // Convert string to array --> ["_","_","_"]
  answersArr = answers.trim().split(" ");

  displayWord.innerHTML = answers;

  return randoWord;
}


function checkWord() {
  console.log(currentWord + " - " + currentWord.length);
  // Get the last letter guessed from the lettersGuessedArr
  var guess = lettersGuessedArr[lettersGuessedArr.length - 1];

  // Check if the last letter guessed matches with any letter in the word
  for (var i = 0; i < currentWord.length; i++) {
    var capWord = currentWord[i].toUpperCase()
    if (capWord === guess) {
      // Replace "_" by a correct letter e.g. ["_","_","_"] --> ["A","_","_"]
      answersArr[i] = answersArr[i].replace("_", capWord);
      var correctAnswer = answersArr.join("");
    }
  }

  if (correctAnswer === currentWord.toUpperCase()) {
    console.log(correctAnswer + "  " + currentWord.length);
    winsCounter++;

    // Get image and quote for philosophy
    var image = philoObj[correctAnswer.toLowerCase()].img;
    var quote = philoObj[correctAnswer.toLowerCase()].quote;


    // Show image and disply quote if correct guess
    imgElement.setAttribute("src", "assets/images/" + image);
    imgElement.setAttribute("class", "img-responsive img-rounded center-block");
    displayWord.setAttribute("class", "text-decor");
    displayQuote.setAttribute("class", "quote");
    displayQuote.innerHTML = quote;
    displayImg.appendChild(imgElement);
    displayQuote.appendChild(createQuote);
  }


  displayWord.innerHTML = answersArr.join(" ");
  displayWins.innerHTML = winsCounter;

}

gameButton.addEventListener("click", function() {
  // Reset all variables except winCounter
  remainingCounter = 10;
  currentWord = "";
  lettersGuessedArr = [];
  answersArr = [];
  currentWord = chooseWord(philoArr);
  displayRemaining.innerHTML = remainingCounter;
  displayGuessed.innerHTML = lettersGuessedArr;
});

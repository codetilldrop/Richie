// Configuration settings for Richie when the page 
// initially starts up and sets up any necessary
// global variables for the script
var choiceOne = document.getElementById("choice_one");
var choiceTwo = document.getElementById("choice_two");
var choiceThree = document.getElementById("choice_three");
var playButton = document.getElementById("play_button");
var capitalText = document.getElementById("capital");
var stopButton = document.getElementById("stop_button");
var years = document.getElementById("years");
var instructionButton = document.getElementById("instruction_button");
var instructions = document.getElementById("instructions");
var choicesDiv  = document.getElementById("choices");
var basicInfo = document.getElementById("basic_info");
var endOfYear = 5;
var currentYear = new Date().getFullYear();

// Capital is a variable which will be used later on 
// as development progresses
var capital = 0

/*
Choices is an object which will hold all the choices as
keys and then the vals to those keys will be objects 
holding the stats/captial/points/chance for each choice
*/
var choices = {
  "Invest $50 at a fixed rate of 40%": {
    points: 70,
    chance: false,
    loss: false
  },

  "Invest $100 at a variable rate starting at 50%": {
    chance: true,
    pointsOnFail: 110,
    pointsOnWin: 150,
    loss: false
  },

  "You earn $500 as passive income": {
    points: 500,
    chance: false,
    loss: false,
  },

  "You invest $1000 amount of money in an unstable startup": {
    lostPoints: -1000,
    chance: false,
    loss: true
  },

  "You invest $1000 into the stock market based off advice from a high end broker": {
    points: 10000,
    chance: false,
    loss: false
  },

  "You invest in a house which costs $100000 in a rural area": {
    lostPoints: -8000,
    chance: false,
    loss: true 
  },

  "You sell you're shares of a company equivalent $10000 during a GFC": {
    lostPoints: -3000,
    chance: false,
    loss: true  
  },

  "You invest $3000 in a high interest and fixed rate account": {
    points: 5250,
    chance: false,
    loss: false 
  },

  "You make an investment of $25000 in the stock market through a Non-advisory Stock Broker and performed minimal research": {
    lostPoints: -6000,
    chance: false,
    loss: true
  },

  "You put $3000 into superannuation": {
    points: 3000,
    chance: false,
    loss: false
  }, 

  "You invest $5000 through an internet broker": {
    points: 10000,
    chance: false,
    loss: false
  },

  "Your borrow $15750 from a bank to make an investment without knowing if you can make the repayments": {
    chance: true,
    pointsOnFail: 17000,
    pointsOnWin: 20000,
    loss: false
  },

  "You invest in a $200000 property in an area well known for aggressive and poor tennants": {
    chance: false,
    lostPoints: -200000,
    loss: true
  }
};

var choicesList = Object.keys(choices);

choiceOne.style.visibility = "hidden";
choiceTwo.style.visibility = "hidden";
choiceThree.style.visibility = "hidden";

stopButton.style.visibility = "hidden";

years.style.visibility = "hidden";
// Play function: Hides the current play button 
// and begins to execute the game
function play () {
  playButton.style.visibility = "hidden";
  stopButton.style.visibility = "visible";
  years.style.visibility = "visible";
  instructions.remove();
  instructionButton.remove();
  basicInfo.remove();
            
  generateChoices();      
}

function showInstructions() {
  instructionButton.style.visibility = "hidden";
  instructions.innerHTML = "<br>On the screen, you will notice 3 decisions appear. When you click on a decision, new ones pop up. Every 5 decisions you make add up to a value of money you earn/lose per year. The smarter investment decisions you make, the more money you generate on a per year basis. You may not always get reasonable investment decisions so it is important to make sure you choose the best one possible out of the set. When you choose to stop the game, your generated amount of capital (money) is shown and you can review how you went over the years. To play again, refresh the page.";
}

// Generate Choices Function: Begins to generate the three choices for the use
function generateChoices () {
  var choiceLength = choicesList.length;

  // Pick random choices from the choicesList
  var chosenNumbers = []
  var randomNumber = Math.floor(Math.random() * choiceLength); 
  var genChoiceOne = choicesList[randomNumber];

  chosenNumbers.push(randomNumber)

  randomNumber = Math.floor(Math.random() * choiceLength); 
  while (randomNumber in chosenNumbers) {
    randomNumber = Math.floor(Math.random() * choiceLength);  
  } 

  var genChoiceTwo = choicesList[randomNumber];

  chosenNumbers.push(randomNumber)

  randomNumber = Math.floor(Math.random() * choiceLength); 
  while (randomNumber in chosenNumbers) {
    randomNumber = Math.floor(Math.random() * choiceLength);  
  } 

  var genChoiceThree = choicesList[randomNumber];

  // Display those random choices in the buttons
  choiceOne.value = genChoiceOne;
  choiceOne.innerHTML = genChoiceOne;
  choiceOne.style.visibility = "visible";

  choiceTwo.value = genChoiceTwo;
  choiceTwo.innerHTML = genChoiceTwo;
  choiceTwo.style.visibility = "visible";

  choiceThree.value = genChoiceThree;
  choiceThree.innerHTML = genChoiceThree;
  choiceThree.style.visibility = "visible";
}

// Choice Selected Function: When a choice has been selected
// The appropriate action is determined here
function choiceSelected (selectedChoice) {
  var selectedValue = selectedChoice.value;
  var selectedValueProps = choices[selectedValue];

  // Working out whether the user gains or loses capital
  // with their choice
  if (!selectedValueProps.loss) {
    // Checking if there is any chance in 
    // determining the income generated by the user's choice
    if (selectedValueProps.chance) {
      var chance = Math.floor(Math.random() * 5);
      if (chance === 0) {
        capital += selectedValueProps.pointsOnWin;
      } else {
        capital += selectedValueProps.pointsOnFail;
      }
    } else {
      capital += selectedValueProps.points; 
    }
  } else {
    capital += selectedValueProps.lostPoints;
    console.log(capital);
  }
    
  // Dealing with the 5 choices represents a year system
  if (endOfYear === 1) {
    endOfYear = 5;
    years.innerHTML += "<br>" + currentYear + ": " + "You have $" + capital;
    currentYear = currentYear + 1
  } else {
    endOfYear = endOfYear - 1
  }

  generateChoices();
}

// This function will stop the game (pretty much just hide everything)
function stop() {
  choiceOne.style.visibility = "hidden";
  choiceTwo.style.visibility = "hidden";
  choiceThree.style.visibility = "hidden"; 

  if (capital < 0) {
    capitalText.innerHTML = "Your Generated Amount of Capital is -$" + (capital * -1); 
  } else {
    capitalText.innerHTML = "Your Generated Amount of Capital is $" + capital;
  };
  choiceOne.remove();
  choiceTwo.remove();
  choiceThree.remove();
  playButton.remove();
  stopButton.style.visibility = "hidden";
  choicesDiv.remove();
  audio.pause();
}
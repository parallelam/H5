var panel = $('.triviaArea');
var countStartNumber = 15;
isRunning=false;

$(document).on('click', '.start-over', function(e) {
    game.reset();
});  
$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});
$('.start').text('Play The Game');
$(document).on('click', '.start', function(e) {
    $('.timer').append('<h2>Time Remaining: <span id="counter-number">15</span> Seconds</h2>');
    game.loadQuestion();
    $('.start').text('The Game Has Started!');
    isRunning=!isRunning;
});

const triviaQuestions = [
    {
        question: "Who has the most wins as a head coach in the NFL?",
        answers: ["George Halas", "Bill Belichick", "Tom Landry", "Don Shula"],
        correctAnswer: "Don Shula",
        info: "Don Shula holds the record with 347 career wins."
    }, {
        question: "Which Quarterback has the most career wins?",
        answers: ["Tom Brady", "Brett Favre", "Peyton Manning", "Aaron Rodgers"],
        correctAnswer: "Tom Brady",
        info: "Tom Brady currently holds the record with 207 careers wins."
    }, {
        question: "Which player has the most Superbowl appearances?",
        answers: ["Mike Lodish", "Tom Brady", "Corenlius Bennett", "Tedy Brushi"],
        correctAnswer: "Tom Brady",
        info: "Tom Brady has currently been to the Superbowl eight times in his career."
    }, {
        question: "Which team has the most Superbowl victories?",
        answers: ["Dallas Cowboys", "Pittsburgh Steelers", "New England Patriots", "San Francisco 49ers"],
        correctAnswer: "Pittsburgh Steelers",
        info: "The Pittsburgh Steelers currently have six Superbowl victories."
    }, {
        question: "Which Wide Receiver has the most career touchdowns?",
        answers: ["Randy Moss", "Terrell Owens", "Jerry Rice", "Marvin Harrison"],
        correctAnswer: "Jerry Rice",
        info: "Jerry Rice currently holds the record with 197 career touchdowns."
    }, {
        question: "Which kicker currently holds the record for longest field goal succesfully kicked?",
        answers: ["Sebastian Janikowski", "Stephen Gostkowski", "Adam Vinatieri", "Matt Prater"],
        correctAnswer: "Matt Prater",
        info: "Matt Prater succesfully kicked a 64 yard field goal on December 8th, 2013. The longest succesful kick in NFL history."
    }, {
        question: "Which Running Back has the most all time rushing yards?",
        answers: ["Frank Gore", "Barry Sanders", "Emmitt Smith", "Walter Payton"],
        correctAnswer: "Emmitt Smith",
        info: "Emmit Smith holds the record with 18,355 career rushing yards."
    }, {
        question: "Which individual has won the most Superbowl rings?",
        answers: ["Bill Belichick", "Mean Joe Greene", "Tom Brady", "Dan Rooney"],
        correctAnswer: "Bill Belichick",
        info: "Bill Belichick has won seven Superbowl rings. Two as defensive coordinator with the New York Giants, and five as the head coch of the New England Patriots."
    }, {
        question: "Which player has accrued the most all time sacks?",
        answers: ["Jared Allen", "Bruce Smith", "Michael Strahan", "Julius Peppers"],
        correctAnswer: "Bruce Smith",
        info: "Bruce Smith ended his career with 200 recorded sacks."
    }, {
        question: "Which player has the most all time interceptions?",
        answers: ["Charles Woodson", "Paul Krause", "Emlen Tunnell", "Dick Lane"],
        correctAnswer: "Paul Krause",
        info: "Paul Krause ended his career with 81 recorded interceptions."
    }];

var game = {
    triviaQuestions:triviaQuestions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter--;
      $('#counter-number').html(game.counter);  
      if (game.counter === 0){
        console.log('TIME');
        game.timeUp();
      }
    },
    loadQuestion: function(){
      timer = setInterval(game.countdown, 1000);
      panel.html('<h2>' + triviaQuestions[this.currentQuestion].question + '</h2>' );
      for (var i = 0; i<triviaQuestions[this.currentQuestion].answers.length; i++){
        panel.append('<button class="answer-button" id="button"' + 'data-name="' + triviaQuestions[this.currentQuestion].answers[i] + '">' + triviaQuestions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    nextQuestion: function(){
      game.counter = countStartNumber;
      $('#counter-number').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function (){
      clearInterval(timer);
      $('#counter-number').html(game.counter);
      panel.html('<h2>Time\'s Up!</h2>');
      panel.append('<h3>The Correct Answer was: ' + triviaQuestions[this.currentQuestion].correctAnswer);
      panel.append('<h3>'+triviaQuestions[game.currentQuestion].info+'</h3>');
      if (game.currentQuestion === triviaQuestions.length - 1){
        setTimeout(game.results, 5 * 1000);
      } else {
        setTimeout(game.nextQuestion, 5 * 1000);
      }
    },
    results: function() {
      clearInterval(timer);  
      panel.html('<h2>Scores</h2>');
      $('#counter-number').html(game.counter);
      panel.append('<h3>Correct: ' + game.correct + '</h3>');
      panel.append('<h3>Incorrect: ' + game.incorrect + '</h3>');
      panel.append('<h3>Timed Out: ' + (triviaQuestions.length - (game.incorrect + game.correct)) + '</h3>');
      panel.append('<br><button class="o-menu__item / t-menu__item / start-over">Again?</button>');
    },
    clicked: function(e) {
      clearInterval(timer);  
      if ($(e.target).data("name") === triviaQuestions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },
    answeredIncorrectly: function() {
      game.incorrect++;
      clearInterval(timer);
      panel.html('<h2>Wrong!</h2>');
      panel.append('<h3>The Correct Answer was: ' + triviaQuestions[game.currentQuestion].correctAnswer + '</h3>');
      panel.append('<h3>'+triviaQuestions[game.currentQuestion].info+'</h3>');
      if (game.currentQuestion === triviaQuestions.length - 1){
        setTimeout(game.results, 5 * 1000);
      } else {
        setTimeout(game.nextQuestion, 5 * 1000);
      }
    },
    answeredCorrectly: function(){
      clearInterval(timer);
      game.correct++;
      panel.html('<h2>Right!</h2>');
      panel.append('<h3>'+triviaQuestions[game.currentQuestion].info+'</h3>');
      if (game.currentQuestion === triviaQuestions.length - 1){
        setTimeout(game.results, 4 * 1000);
      } else {
        setTimeout(game.nextQuestion, 4 * 1000);
      }
    },
    reset: function(){
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };

document.querySelector('.js-change-theme').innerHTML = "Switch to Day Display";
document
    .querySelector('.js-change-theme')
    .addEventListener('click', () => {
      const body = document.querySelector('body');
      if (body.classList.contains('t--light')) {
          body.classList.remove('t--light');
          body.classList.add('t--dark');
      } else {
          body.classList.remove('t--dark');
          body.classList.add('t--light');
      };
      if (body.classList.contains('t--light')){
          document.querySelector('.js-change-theme').innerHTML = 'Switch to Night Display';
      } else {
          document.querySelector('.js-change-theme').innerHTML = 'Switch to Day Display';
      }
  })  

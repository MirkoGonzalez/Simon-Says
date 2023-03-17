//Variables, arrays, funciones push...

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var patternCompleted = false;

//Funciones para animar o generar numero.

//Funcion para animar boton random.
function animateButton(color) {
    $("#" + color).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
}

//Funcion para generar sonido en boton random.
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

//Funcion para generar numero random.

function nextSequence() {
    userClickedPattern = [];
    patternCompleted = false;

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    animateButton(randomChosenColor);
    playSound(randomChosenColor);
};

//Funcion para reiniciar el juego
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    flag = false; //ponemos la bandera en false para que se pueda volver a jugar
    $(document).one("keypress", function () {
        if (!flag) {
            nextSequence();
            flag = true; //Con esto funciona solo una vez al presionar teclado.
        }
    });
}

//Funcion para checkear respuesta:
function checkAnswer() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            $("h1").text("FAIL. Press any key to restart");
            $("body").addClass("game-over");

            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            playSound("wrong");
            startOver();

            return;
        }
    }

    // Si la respuesta es correcta
    if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];

        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

//Iniciador del juego
var level = 0;
var flag = false; //ponemos una bandera que cambia a true cuando se llama la fucnion. 

$(document).one("keypress", function () {
    if (!flag) {
        nextSequence();
        flag = true; //Con esto funciona solo una vez al presionar teclado.
    }
});

//Identifica el boton seleccionado por el usuario, guarda el id y activa su sonido.

$(".btn").click(function () {

    //Agrega cada boton clickeado a la secuencia

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    //Checkea la respuesta
    if (userClickedPattern.length <= gamePattern.length) {
        checkAnswer();
    }


    //Activa el sonido del boton presionado y le da una animación

    playSound(userChosenColour);
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
});



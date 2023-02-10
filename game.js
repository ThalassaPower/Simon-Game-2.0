var buttonColors= ["red","blue","green","yellow", "purple", "orange"];

var gamePattern= [];

var userClickedPattern= [];

var started = false;

var level = 0;

$("#orange").hide();
$("#purple").hide();

$(document).click(function(){
    if(!started){

        nextSequence();
        started= true;

    }
})

// $(document).keydown(function(){
//     if(!started){

//         nextSequence();
//         started= true;

//     }
// })




function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    //var randomNumber= Math.floor(Math.random()*4);
    //var randomChosenColor= buttonColors[randomNumber];
    //gamePattern.push(randomChosenColor);

    //$("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //var audio= new Audio(randomChosenColor+ ".mp3");
    //audio.play();

    if (level<20){
        randomNumberBoss(4);
        
        if (level==10){
            $(".green").css("background-color", "blue");
            $(".red").css("background-color", "rgb(189, 189, 6)");
            $(".yellow").css("background-color", "green");
            $(".blue").css("background-color", "red");
        }

    }


    /*if (level==10){
        $(".green").css("background-color", "blue");
        $(".red").css("background-color", "rgb(189, 189, 6)");
        $(".yellow").css("background-color", "green");
        $(".blue").css("background-color", "red");
    }*/

    else if (level>=20){
        $("#orange").show();
        $("#purple").show();

        randomNumberBoss(6);
       
    }
}


function randomNumberBoss(numberOfColors){
    var randomNumber= Math.floor(Math.random()*numberOfColors);

    var randomChosenColor= buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    console.log(gamePattern);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio= new Audio(randomChosenColor+ ".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColor= this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
})

$(document).keydown(function(event){
    //console.log(keyPressed(event.key));
    userClickedPattern.push(keyPressed(event.key));
    playSound(keyPressed(event.key));
    animatePress(keyPressed(event.key));
    checkAnswer(userClickedPattern.length -1)  
})




function playSound(name){
    var audio= new Audio(name+ ".mp3");
    audio.play();
    
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }else{

        playSound("wrong");

        $("#level-title").text("Game Over, Touch the Screen to Restart");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        

        startOver();
       
        
    }

}

function startOver(){
    level= 0;
    gamePattern= [];
    started= false;
}


function keyPressed(key){
    switch (key) {
        case "w":
            var colour = "green";
            break;

        case "a":
            var colour = "red";
            break;

        case "s":
            var colour = "yellow";
            break;

        case "d":
            var colour = "blue";
            break;

        case "q":
            var colour = "purple";
            break;

        case "e":
            var colour = "orange";
            break;
    
        default:
            break;
    }

    return colour;
}



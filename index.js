import bestScorer from './localStorage.js';

const {best, isTop} = bestScorer();



let score = 0;
const bubbleContainer = document.querySelector('.bubble_container');
let gameOver = document.querySelector('.game');
let defaultTurn;
let turnNumber = document.querySelector('.turn');
let displayScore = document.querySelector('.score');
const finalScore = document.querySelector('#finalScore');
const topScore = document.querySelector('#topScore');



//! Set Score and Turn 
function scoreNTurn(){
    defaultTurn = randomNumberGenerator();
    turnNumber.textContent = defaultTurn;
    
}


//! Creating Bubbles 
function createBubbles() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble', 'bg-gray-600', 'h-8', 'aspect-square', 'flex', 'items-center', 'justify-center', 'rounded-full', 'text-gray-400', 'text-xl', 'cursor-pointer', 'active:scale-95', 'transition-all', 'duration-200')
    bubble.textContent = randomNumberGenerator();

    return bubble
}

//! Appending Bubbles 
function appendingBubbles(){
    for(let i =0; i<152; i++){
        let create = createBubbles();
        bubbleContainer.appendChild(create)
    }
    
}




//! Random Code Generator 
function randomNumberGenerator(){
    return Math.floor(Math.random()*10)
}



//! Timer Counter 
function timerCounter(){
    let timeCount = document.querySelector('.timer');


let timer = 20
let timerID = setInterval(()=>{
    if(timer>0){
        timer--;
        timeCount.textContent=timer
    }else{
        timer = 0;
        turnNumber.textContent = 0;
        
        gameOver.removeAttribute('hidden');
        bubbleContainer.innerHTML = "";
        finalScore.textContent = score;
        bestScorer(score);
        console.log(bestScorer(score));

        if(score>best){
            topScore.innerHTML=`New Record ${score}`
        }else{
            topScore.innerHTML = `All time Best ${best}`
        }
        displayScore.textContent = 0;
        bubbleContainer.appendChild(gameOver);
        clearInterval(timerID);
    }
},1000)
}

//!Try Again 

    document.querySelector('#tryAgain').addEventListener('click',(e)=>{
        e.stopPropagation();
        appendingBubbles();
        gameOver.setAttribute('hidden', true)
        score = 0;
        scoreNTurn();
        timerCounter();
    })

//! Managing Event Delegation through Bubbling

bubbleContainer.addEventListener('click',(e)=>{
   let clickedOn =  Number(e.target.textContent);

   if(clickedOn === defaultTurn){
    bubbleContainer.innerHTML = "";
    score +=clickedOn;
    displayScore.textContent = score;
    appendingBubbles();
    scoreNTurn();
   }
})

//! Calling Functions By Default 


function init(){
    timerCounter();
    appendingBubbles();
    scoreNTurn()
}

init();
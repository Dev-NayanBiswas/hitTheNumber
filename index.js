import bestScorer from './localStorage.js';




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

let { best, isTop }=bestScorer()

//! Timer Counter 
function timerCounter(){
    let timeCount = document.querySelector('.timer');


let timer = 10
let timerID = setInterval(()=>{
    if(timer>0){
        timer--;
        timeCount.textContent=timer
    }else{
        timer = 0;
        turnNumber.textContent = 0;
        gameOver.removeAttribute('hidden');
        bubbleContainer.innerHTML = "";
        
        //! Storing Data to local
        bestScorer(score);
        
        
        finalScore.textContent = score;
        let localData = JSON.parse(localStorage.getItem('topScore')).best 
        console.log(localData)

        if(localData>score){
            console.log("New Score", localData)
            topScore.textContent=`New Record: ${localData}`
        }else{
            topScore.textContent=`All time Best ${localData || 0}`
            console.log(`All time Best ${localData}`)
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


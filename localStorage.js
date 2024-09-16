export default function bestScorer(boardScore){
    let bestScore = { best:0 }
    const storedScore = JSON.parse(localStorage.getItem('topScore'))
    
    if(!storedScore || boardScore > storedScore.best){
        bestScore.best = boardScore;
        localStorage.setItem('topScore',JSON.stringify(bestScore))
        return{ 
            best:boardScore,
            isTop:true,
        };
    }else{
        return {
            best:storedScore.best,
            isTop:false,
        };
    }

}



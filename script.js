const listOfSpaces = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];


const objSpace = {};
for(let space of listOfSpaces){
    objSpace[space] = document.querySelector(`.${space}`);
};

function clearAll(){
    document.querySelectorAll('.space').forEach(e=>{
        e.innerHTML = ''
    });
    player1.clearSpaces()
    player2.clearSpaces()
    document.querySelector('.title').innerText = 'Board Cleared'
    document.querySelector('.error').innerText = ''
    return;
};


document.querySelector('.clear').addEventListener('click', ()=>{
    clearAll();
});


function player(mark){
    let score = 0
    let spaces = []
    const getSpaces = () => spaces;
    const addSpaces = (spac) => spaces.push(spac)
    const clearSpaces = () => spaces.length = 0
    return {mark, score, getSpaces, addSpaces, clearSpaces};
};

const player1 = player('X');
const player2 = player('O');




const winChecker = (playerSpaces) =>{
    const winningComb = [['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2', 'c3'], 
                        ['c1', 'b2', 'a3'], ['a1', 'b2', 'c3'], ['a1', 'b1', 'c1'], 
                        ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3']];
    for(let combination of winningComb){
        let isSubset = combination.every(val => playerSpaces.includes(val));
        if(isSubset){
            return true;
        };
    };
    return false;

};


const engine = () => {
    
    const checker = (itemx) => {
        if(objSpace[itemx].innerHTML !== ''){
            return 'True';
        } else {
            return 'False';
        };
    };

    document.querySelector('.mode').innerText = 'PVP';
    let lastPicked = player1.mark;


    for(let sp of listOfSpaces){
        objSpace[sp].addEventListener('click', ()=>{
            //that is some convoluted shit i have 0 idea how this magic works
            let symbol = 'X';

            if(lastPicked == player1.mark){
                if(checker(sp)=='True'){
                    document.querySelector('.error').innerText = 'Cant Place';
                } else {
                    symbol = player2.mark;
                    lastPicked = player2.mark;
                    player2.addSpaces(sp);
                    console.log(player2.getSpaces());
                    objSpace[sp].innerHTML = symbol;
                    document.querySelector('.error').innerText = '';
                    console.log(winChecker(player2.getSpaces()));
                    if(winChecker(player2.getSpaces())){
                        document.querySelector('.popup').style.visibility = 'visible';
                        document.querySelector('.playerWin').innerText = 'Player 2 Wins!';
                        document.querySelector('.hide').addEventListener('click', ()=>{
                            document.querySelector('.popup').style.visibility = 'hidden';
                        });
                    };
                };
            } else {
                if(checker(sp)=='True'){
                    document.querySelector('.error').innerText = 'Cant Place';
                } else {
                    symbol = player1.mark;
                    lastPicked = player1.mark;
                    player1.addSpaces(sp);
                    console.log(player1.getSpaces());
                    objSpace[sp].innerHTML = symbol;
                    document.querySelector('.error').innerText = '';
                    console.log(winChecker(player1.getSpaces()));
                    if(winChecker(player1.getSpaces())){
                        document.querySelector('.popup').style.visibility = 'visible';
                        document.querySelector('.playerWin').innerText = 'Player 1 Wins!';
                        document.querySelector('.hide').addEventListener('click', ()=>{
                            document.querySelector('.popup').style.visibility = 'hidden';
                        });
                    };
                };
            };

        }) ;
    };
};

document.querySelector('.pvp').addEventListener('click', engine());


//Future implementaion of a AI partner
// function randomPicker(){

//     let choice = Math.floor(Math.random()*9);
//     let spaceOfChoice = listOfSpaces[choice]

//     if(objSpace[spaceOfChoice].innerHTML === ''){
//         objSpace[spaceOfChoice].innerHTML = 'X'
//     } else {
//         console.log('space taken');
//     };


//     return listOfSpaces[choice];
// };

// console.log(randomPicker());



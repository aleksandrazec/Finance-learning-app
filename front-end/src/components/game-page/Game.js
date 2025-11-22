import { useState } from 'react';
import { GameContext } from './Context';
import { Outlet } from 'react-router';

function Game(props) {

    const maxMoney = 0;
    const livingCosts = 0;


    const [currentBalance, setCurrentBalance] = useState(maxMoney - livingCosts);

    return (
        <GameContext.Provider value={currentBalance}>
            <div>
                <p className='MainText'>You got paid {maxMoney}. Your living expenses are {livingCosts}. How will you allocate your remaining money?</p>
                <p className='MainText'>Current balance: {currentBalance}</p>
                <Outlet />
                <button>
                    Finish
                </button>
            </div>
        </GameContext.Provider>
    )
}

export default Game;

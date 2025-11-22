import { useState, useEffect, useContext } from 'react';
import { GameContext } from './GameContext';
import { Outlet } from 'react-router';

function Game(props) {
    const dynamicGameInfo = useContext(GameContext)
    const { setDynamicGameInfo } = useContext(GameContext)
    const [gameInfo, setGameInfo] = useState({
        start_money: 0,
        living_cost: 0,
        start_date: null
    })

    useEffect(() => {
        const getGameInfo = () => {
            try {
                api.post(`/getgame`, { id: id })
                    .then(result => {
                        setGameInfo(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        setDynamicGameInfo({currentBalance: gameInfo.start_money - gameInfo.living_cost})
    }, [])

    return (
        <GameContext.Provider value={dynamicGameInfo}>
            <div>
                <p className='MainText'>You got paid {gameInfo.start_money}. Your living expenses are {gameInfo.living_cost}. How will you allocate your remaining money?</p>
                <p className='MainText'>Current balance: {dynamicGameInfo.currentBalance}</p>
                <Outlet />
                <button>
                    Finish
                </button>
            </div>
        </GameContext.Provider>
    )
}

export default Game;

import { useState, useEffect, useContext } from 'react';
import { GameContext } from './GameContext';
import { Outlet } from 'react-router';

function Game(props) {
    const { dynamicGameInfo, setDynamicGameInfo } = useContext(GameContext);
    const [gameInfo, setGameInfo] = useState({
        start_money: 0,
        living_cost: 0,
        start_date: null
    });

    useEffect(() => {
        const getGameInfo = async () => {
            try {
                // API CALL HERE
                const result = await api.post(`/getgame`, { id: id });
                setGameInfo(result.data);
                const initialBalance = result.data.start_money - result.data.living_cost;
                setDynamicGameInfo({
                    currentBalance: initialBalance,
                    saving: 0,
                    initialBalance: initialBalance,
                    ownedShares: {}
                });
            } catch (error) {
                console.error(error);
            }
        };
        getGameInfo();
    }, []);

    // Calculate total portfolio value
    const totalPortfolioValue = dynamicGameInfo.ownedShares 
        ? Object.entries(dynamicGameInfo.ownedShares).reduce((total, [optionId, shares]) => {
            // You might need to fetch current prices for each option here
            // For now, this is a placeholder calculation
            return total + (shares * 0); // Replace 0 with actual current price
        }, 0)
        : 0;

    return (
        <GameContext.Provider value={{ dynamicGameInfo, setDynamicGameInfo }}>
            <div className="game-container">
                <header className="game-header">
                    <p className='MainText'>You got paid ${gameInfo.start_money}. Your living expenses are ${gameInfo.living_cost}. How will you allocate your remaining money?</p>
                </header>

                <main className="game-content">
                    <Outlet />
                </main>

                <footer className="game-footer">
                    <p className='MainText'>Current balance: ${dynamicGameInfo?.currentBalance || 0}</p>
                    <p className='MainText'>Savings: ${dynamicGameInfo?.saving || 0}</p>
                    <p className='MainText'>Portfolio Value: ${totalPortfolioValue}</p>
                    <button>
                        Finish
                    </button>
                </footer>
            </div>
        </GameContext.Provider>
    );
}

export default Game;
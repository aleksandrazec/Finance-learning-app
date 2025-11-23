import { useState, useEffect, useContext, createContext } from "react";
import { GameContext } from "./GameContext";
import { Outlet, useParams } from "react-router";
import "./styles.css";
import api from "../../services/api";

function Game(props) {
  const { id } = useParams();
  const [dynamicGameInfo, setDynamicGameInfo] = useState({
    currentBalance: 0,
    saving: 0,
    date: null,
    initialBalance: 0,
    ownedShares: {},
  });

  const [gameInfo, setGameInfo] = useState({
    start_money: 0,
    living_cost: 0,
    start_date: null,
  });

  useEffect(() => {
    const getGameInfo = async () => {
      try {
        const result = await api.get(`/game/${id}`);
        const gameData = result.data;
        setGameInfo(gameData);
        const money = gameData.start_money - gameData.living_cost;

        setDynamicGameInfo(prev => ({
            ...prev,
          currentBalance: money,
          saving: 0,
          initialBalance: money,
          ownedShares: {},
          date: gameData.start_date,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getGameInfo();
  }, [id]);

  const contextValue = {
    dynamicGameInfo,
    setDynamicGameInfo
  }

  return (
    <GameContext.Provider value={{ dynamicGameInfo, setDynamicGameInfo }}>
      <div className="game-container">
        <header className="game-header">
          <p className="MainText">
            You got paid ${gameInfo.start_money}. Your living expenses are $
            {gameInfo.living_cost}. How will you allocate your remaining money? {dynamicGameInfo.date};
          </p>
        </header>

        <main className="game-content">
          <Outlet />
        </main>

        <footer className="game-footer">
          <p className="MainText">
            Current balance: ${dynamicGameInfo?.currentBalance || 0}
          </p>
          <button className="finish-btn">Finish</button>
        </footer>
      </div>
    </GameContext.Provider>
  );
}

export default Game;

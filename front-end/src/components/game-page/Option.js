import { useNavigate, useParams } from 'react-router';
import { useState, useContext } from 'react';
import { GameContext } from './GameContext';
import './styles.css'

function Option(props) {
    const navigate = useNavigate();
    const { dynamicGameInfo, setDynamicGameInfo } = useContext(GameContext);

    const {
        name,
        id,
        currentPrice,
        ownedShares = dynamicGameInfo.ownedShares?.[name] || 0
    } = props;

    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);

    const updateOwnedShares = (optionName, newAmount) => {
        setDynamicGameInfo(prev => ({
            ...prev,
            ownedShares: {
                ...prev.ownedShares,
                optionName: newAmount
            }
        }));
    };


    const handleBuy = async () => {
        if (buyAmount > 0) {
            const totalCost = buyAmount * currentPrice;
            if (totalCost <= dynamicGameInfo.currentBalance) {

                const newOwnedShares = (dynamicGameInfo.ownedShares?.name || 0) + buyAmount;

                updateOwnedShares(name, newOwnedShares);
                setDynamicGameInfo(prev => ({
                    ...prev,
                   currentBalance: dynamicGameInfo.currentBalance-totalCost
                }));
                setBuyAmount(0);
            } else {
                alert("Insufficient funds!");
            }
        }
    };

    const handleSell = async () => {
        const currentOwnedShares = dynamicGameInfo.ownedShares?.name || 0;
        if (sellAmount > 0 && sellAmount <= currentOwnedShares) {
                const totalCost = sellAmount * currentPrice;
                const newOwnedShares = currentOwnedShares - sellAmount;

               updateOwnedShares(name, newOwnedShares)
                setDynamicGameInfo(prev => ({
                    ...prev,
                   currentBalance: dynamicGameInfo.currentBalance+totalCost
                }));
                setSellAmount(0);
        } else {
            alert("Not enough shares to sell!");
        }
    };

     return (
        <div className="option-card">
            <div className="option-header">
                <h3 className="option-name">{name}</h3>
                <span className="price">${currentPrice}</span>
            </div>

            <div className="option-actions">
                <div className="action-group">
                    <input
                        className="buy-input"
                        type='number'
                        placeholder="Buy Amount"
                        onChange={({ target: { value } }) => setBuyAmount(Number(value))}
                        value={buyAmount}
                        min="0"
                    />
                    <button className="buy-btn" onClick={()=>handleBuy()}>Buy</button>
                </div>

                <div className="action-group">
                    <input
                        className="sell-input"
                        type='number'
                        placeholder="Sell Amount"
                        onChange={({ target: { value } }) => setSellAmount(Number(value))}
                        value={sellAmount}
                        min="0"
                        max={dynamicGameInfo.ownedShares?.name || 0}
                    />
                    <button className="sell-btn" onClick={()=>handleSell()}>Sell</button>
                </div>
            </div>

            {(dynamicGameInfo.ownedShares?.name || 0) > 0 && (
                <div className="owned-shares">
                    Owned: {dynamicGameInfo.ownedShares?.name || 0} shares
                </div>
            )}
        </div>
    );
}

export default Option;
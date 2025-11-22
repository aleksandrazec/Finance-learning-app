import { useNavigate, useParams } from 'react-router';
import { useState, useContext } from 'react';
import { GameContext } from './GameContext';

function Option(props) {
    const navigate = useNavigate();
    const { id: categoryId } = useParams();
    const { dynamicGameInfo, setDynamicGameInfo } = useContext(GameContext);
    
    const {
        name,
        id,
        currentPrice,
        ownedShares = dynamicGameInfo.ownedShares?.[id] || 0
    } = props;

    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);

    const goToDetails = () => {
        navigate(`/gamemain/${categoryId}/${id}`);
    };

    const updateOwnedShares = (optionId, newAmount) => {
        setDynamicGameInfo(prev => ({
            ...prev,
            ownedShares: {
                ...prev.ownedShares,
                [optionId]: newAmount
            }
        }));
    };

    const handleBuy = async () => {
        if (buyAmount > 0) {
            const totalCost = buyAmount * currentPrice;
            if (totalCost <= dynamicGameInfo.currentBalance) {
                try {
                    // API CALL HERE to process buy transaction
                    const result = await api.post('/transaction/buy', {
                        optionId: id,
                        amount: buyAmount,
                        price: currentPrice
                    });
                    
                    const newOwnedShares = (dynamicGameInfo.ownedShares?.[id] || 0) + buyAmount;
                    
                    setDynamicGameInfo(prev => ({
                        ...prev,
                        currentBalance: result.data.newBalance,
                        ownedShares: {
                            ...prev.ownedShares,
                            [id]: newOwnedShares
                        }
                    }));
                    setBuyAmount(0);
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("Insufficient funds!");
            }
        }
    };

    const handleSell = async () => {
        const currentOwnedShares = dynamicGameInfo.ownedShares?.[id] || 0;
        if (sellAmount > 0 && sellAmount <= currentOwnedShares) {
            try {
                // API CALL HERE to process sell transaction
                const result = await api.post('/transaction/sell', {
                    optionId: id,
                    amount: sellAmount,
                    price: currentPrice
                });
                
                const newOwnedShares = currentOwnedShares - sellAmount;
                
                // Update context with new balance and shares
                setDynamicGameInfo(prev => ({
                    ...prev,
                    currentBalance: result.data.newBalance,
                    ownedShares: {
                        ...prev.ownedShares,
                        [id]: newOwnedShares
                    }
                }));
                setSellAmount(0);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Not enough shares to sell!");
        }
    };

    return (
        <div className="option-card">
            <div className="option-header" onClick={goToDetails}>
                <h3>{name}</h3>
                <span className="price">${currentPrice}</span>
            </div>
            
            <div className="option-actions">
                <div className="action-group">
                    <input 
                        type='number' 
                        placeholder="Buy Amount" 
                        onChange={({target: {value}}) => setBuyAmount(Number(value))} 
                        value={buyAmount}
                        min="0"
                    />
                    <button onClick={handleBuy}>Buy</button>
                </div>
                
                <div className="action-group">
                    <input 
                        type='number' 
                        placeholder="Sell Amount" 
                        onChange={({target: {value}}) => setSellAmount(Number(value))} 
                        value={sellAmount}
                        min="0"
                        max={dynamicGameInfo.ownedShares?.[id] || 0}
                    />
                    <button onClick={handleSell}>Sell</button>
                </div>
            </div>
            
            {(dynamicGameInfo.ownedShares?.[id] || 0) > 0 && (
                <div className="owned-shares">
                    Owned: {dynamicGameInfo.ownedShares?.[id] || 0} shares
                </div>
            )}
        </div>
    );
}

export default Option;
import { useState, useContext } from 'react';
import { GameContext } from './GameContext';

function Saving(props) {
    const { dynamicGameInfo, setDynamicGameInfo } = useContext(GameContext);
    const [savingAmount, setSavingAmount] = useState(0);

    const handleSavingChange = (e) => {
        const amount = parseInt(e.target.value) || 0;
        const maxAmount = dynamicGameInfo.initialBalance - 
                         (Object.values(dynamicGameInfo.ownedShares || {}).reduce((a, b) => a + b, 0) * 
                         /* average share price calculation would go here */ 1);
        
        if (amount <= maxAmount) {
            setSavingAmount(amount);
            
            // Update the context with new saving amount and recalculate balance
            setDynamicGameInfo(prev => ({
                ...prev,
                saving: amount,
                currentBalance: prev.initialBalance - amount - 
                              (Object.values(prev.ownedShares || {}).reduce((a, b) => a + b, 0) * 
                              /* average share price calculation would go here */ 1)
            }));
        }
    };

    return (
        <div className="saving-option">
            <label htmlFor="saving-input">Savings: </label>
            <input
                id="saving-input"
                type="number"
                value={savingAmount}
                onChange={handleSavingChange}
                min="0"
                max={dynamicGameInfo.initialBalance}
                placeholder="Enter amount to save"
            />
            <span>${savingAmount}</span>
        </div>
    );
}

export default Saving;
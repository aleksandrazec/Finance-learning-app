import { useState, useContext } from 'react';
import { GameContext } from './GameContext';
import './styles.css'

function Saving(props) {
    const { dynamicGameInfo, setDynamicGameInfo } = useContext(GameContext);
    const [savingAmount, setSavingAmount] = useState(0);

    const handleSavingChange = (e) => {
        const amount = parseInt(e.target.value) || 0;

        if (amount <= dynamicGameInfo.currentBalance) {
            setSavingAmount(amount);

            setDynamicGameInfo(prev => ({
                ...prev,
                saving: amount,
                currentBalance: dynamicGameInfo.initialBalance - amount
            }));
        }
    };

    return (
        <div className="saving-option">
            <label htmlFor="saving-input" className="saving-label">Savings: </label>
            <input
                id="saving-input"
                className="saving-input"
                type="number"
                value={savingAmount}
                onChange={handleSavingChange}
                placeholder="Enter amount to save"
            />
            <span className="saving-amount">${savingAmount}</span>
        </div>
    );
}

export default Saving;
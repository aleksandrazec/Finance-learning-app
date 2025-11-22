import { useState, useEffect } from 'react';
import MainOption from './MainOption';
import Saving from './Saving';

function GameMain(props) {
    const [mainOptionsList, setMainOptionsList] = useState([]);

    useEffect(() => {
        const hardcodedOptions = [
            {
                id: 1,
                name: "Invest in Stock Market",
            }
        ];
        setMainOptionsList(hardcodedOptions);
    }, []);

    return (
        <div className="main-options">
            <div className="options-grid">
                {mainOptionsList.length > 0 ? (
                    mainOptionsList.map(el => (
                        <MainOption
                            name={el.name}
                            key={el.id}
                            id={el.id}
                        />
                    ))

                ) : (
                    <p className='loading'>Loading...</p>
                )}
                <Saving/>
            </div>
        </div>
    );
}

export default GameMain;
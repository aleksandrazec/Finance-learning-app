import { useState } from 'react';
import MainOption from './MainOption';

function GameMain(props) {

    const [mainOptionsList, setMainOptionsList] = useState();

    return (
            <div>
                {
                    mainOptionsList ?
                        mainOptionsList.map(el => <MainOption name={el.name} key={el.id} id={el.id} />)
                        :
                        <p className='loading'>Loading...</p>
                }

            </div>
    )
}

export default GameMain;

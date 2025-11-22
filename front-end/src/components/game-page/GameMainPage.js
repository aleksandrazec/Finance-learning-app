import api from '../../services/api';
import {useState} from 'react';
import MainOption from './MainOption';

function GameMainPage(props){
    
    const maxMoney=0;
    const livingCosts=0;

    const [currentBalance, setCurrentBalance] = useState(maxMoney-livingCosts);
    const [mainOptionsList, setMainOptionsList]=useState();
    
    return(
        <div>
            <p className='MainText'>You got paid {maxMoney}. Your living expenses are {livingCosts}. How will you allocate your remaining money?</p>
            <p className='MainText'>Current balance: {currentBalance}</p>
            {
                mainOptionsList ?
                mainOptionsList.map(el => <MainOption name={el.name} key={el.id} id={el.id}/>)
                :
                <p className='loading'>Loading...</p>
            }
            <button>
                Finish
            </button>
        </div>
    )
}

export default GameMainPage;

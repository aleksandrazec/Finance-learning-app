import {useState} from 'react';
import {useParams} from 'react-router';
import Option from "./Option"

function OptionList(props){

    const [list, setList]=useState()
    //setlist function
    return(
        <div>
            <p className="MainText">Invest in:</p>
            {
                list ?
                list.map(el => <Option name={el.name} key={el.id} id={el.id}/>)
                :
                <p className='loading'>Loading...</p>
            }
        </div>
    )
}

export default OptionList;
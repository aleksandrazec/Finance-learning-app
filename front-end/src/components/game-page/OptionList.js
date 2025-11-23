import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import Option from "./Option";
import { GameContext } from './GameContext';
import './styles.css'
import api from '../../services/api';

function OptionList(props) {
    const { id } = useParams();
    const [list, setList] = useState([]);
    const { dynamicGameInfo } = useContext(GameContext);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const result = await api.get(`/stock/${dynamicGameInfo.date}`,  );
                setList(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOptions();
    }, [id]);

 return (
        <div className="option-list">
            <div className="options-container">
                {list.length > 0 ? (
                    list.map(el => (
                        <Option 
                            name={el.Company} 
                            key={el.id} 
                            id={el.id}
                            currentPrice={el.Close}
                        />
                    ))
                ) : (
                    <p className='loading'>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default OptionList;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Option from "./Option";

function OptionList(props) {
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                // API CALL HERE to get specific investment options based on category id
                const result = await api.get(`/investment-options/${id}`);
                setList(result.data.options);
                setCategoryName(result.data.categoryName);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOptions();
    }, [id]);

    return (
        <div className="option-list">
            <h2>Invest in {categoryName}</h2>
            <div className="options-container">
                {list.length > 0 ? (
                    list.map(el => (
                        <Option 
                            name={el.name} 
                            key={el.id} 
                            id={el.id}
                            currentPrice={el.currentPrice}
                            ownedShares={el.ownedShares}
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
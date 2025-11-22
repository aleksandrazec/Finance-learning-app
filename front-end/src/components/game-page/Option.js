import {useNavigate} from 'react-router';
import {useState} from 'react';

function Option(props){
    const navigate=useNavigate()

   const{
    name,
    id
   }=props;

   const [buyAmount, setBuyAmount]=useState(0)
   const [sellAmount, setSellAmount]=useState(0)


   const goToPage=async()=>{
    try {
        navigate(``)
    } catch (error) {
        console.error(error)
    }
   }

    return(
        <div>
            <button onClick={()=>{goToPage()}}>
                {name}
            </button>
            <div>
                <input type='number' placeholder="Buy Amount" onChange={({target: {value: inputBuyAmount}}) => setBuyAmount(inputBuyAmount)} value={buyAmount}/>
                <button >Buy</button>
            </div>
            <div>
                <input type='number' placeholder="Sell Amount" onChange={({target: {value: inputSellAmount}}) => setSellAmount(inputSellAmount)} value={sellAmount}/>
                <button>Sell</button>
            </div>
        </div>
    )
}
export default Option;
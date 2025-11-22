import {useNavigate} from 'react-router'

function MainOption(props){
    const navigate=useNavigate()

   const{
    name,
    id
   }=props;

   const goToPage=async()=>{
    try {
        navigate(`/gamemain/${id}`)
    } catch (error) {
        console.error(error)
    }
   }

    return(
        <div>
            <button onClick={()=>{goToPage()}}>
                {name}
            </button>
        </div>
    )
}

export default MainOption;
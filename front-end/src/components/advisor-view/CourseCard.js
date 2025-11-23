import {useNavigate} from 'react-router';

function CourseCard(props){
    const navigate=useNavigate()

   const{
    title,
    id
   }=props;

  const goToPage = async (id) => {
        try {
            navigate(`/viewcourses/${id}`)
        } catch (error) {
            console.error(error)
        }
    }


    return(
        <div>
            <button onClick={()=>{goToPage()}}>
                {title}
            </button>
        </div>
    )
}
export default CourseCard;


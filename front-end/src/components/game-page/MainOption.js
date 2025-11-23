import { useNavigate } from 'react-router';
import './styles.css'

function MainOption(props) {
    const navigate = useNavigate();
    const { name, id } = props;

    const handleSelect = () => {
        navigate(`/gamemain/${id}`);
    };

  return (
        <div className="main-option-card" onClick={handleSelect}>
            <h3 className="option-title">{name}</h3>
            <button className="select-btn">Select</button>
        </div>
    );
}

export default MainOption;
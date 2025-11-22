import { useNavigate } from 'react-router';

function MainOption(props) {
    const navigate = useNavigate();
    const { name, id } = props;

    const handleSelect = () => {
        navigate(`/gamemain/${id}`);
    };

    return (
        <div className="main-option-card" onClick={handleSelect}>
            <h3>{name}</h3>
            <button className="select-btn">Select</button>
        </div>
    );
}

export default MainOption;
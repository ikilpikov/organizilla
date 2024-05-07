import { useNavigate } from 'react-router-dom';
import leftArrow from '../../../assets/icons/leftArrow.svg';
const ArrowBack = () => {
    const navigator = useNavigate();
    return <img src={leftArrow} width={'40px'} onClick={() => navigator(-1)} />;
};

export default ArrowBack;

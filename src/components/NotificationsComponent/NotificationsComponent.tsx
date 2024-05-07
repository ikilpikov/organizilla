import bell from '../../assets/icons/bell.svg';
import bellOff from '../../assets/icons/bellOff.svg';

const NotificationsComponent = () => {
    return (
        <>
            <h3>Notifications</h3>
            <img src={bell} alt="bell" width={20} />
            <img src={bellOff} alt="bellOff" width={20} />
        </>
    );
};

export default NotificationsComponent;

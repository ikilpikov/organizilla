import bell from 'assets/icons/bell.svg';
import bellOff from 'assets/icons/bellOff.svg';
import styles from './NotificationComponent.module.scss';

const NotificationsComponent = () => {
    return (
        <>
            <img src={bell} alt="bell" width={20} className={styles.notification__icon} />
            {/*  <img src={bellOff} alt="bellOff" width={20} className={styles.notification__icon} /> */}
        </>
    );
};

export default NotificationsComponent;

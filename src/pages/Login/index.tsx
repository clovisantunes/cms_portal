import LoginCard from "../../components/LoginCard";
import styles from './styles.module.scss';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.backgroundSection}>
               
            </div>
            <div className={styles.sidebarContainer}>
                <LoginCard />
            </div>
        </div>
    );
}
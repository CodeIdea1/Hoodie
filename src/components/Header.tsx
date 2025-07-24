import styles from '../styles/Header.module.css';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.center}>
          <h1 className={styles.logo}>HOODIE</h1>
        </div>

        <Navbar />
      </div>
    </header>
  );
}

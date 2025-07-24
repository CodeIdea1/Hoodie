import styles from '../styles/subscribe.module.css';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Subscribe() {
    return (
        <section className={styles.subscribeSection}>
            <div className={styles.subscribeImageWrapper}>
                <h1 className={styles.title}>Subscribe to Our New Collection</h1>

                <form className={styles.subscribeForm}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={styles.emailInput}
                        aria-label="Email address for newsletter subscription"
                        required
                    />
                    <button
                        type="submit"
                        className={styles.submitButton}
                        aria-label="Subscribe to newsletter"
                        title="Subscribe to newsletter"
                    >
                        <ArrowRight size={20} />
                    </button>
                </form>

                <Image
                    src="/Untitled-10.png"
                    alt="New Collection"
                    className={styles.subscribeImage}
                    fill
                />
            </div>
        </section>
    );
}

'use client';

import styles from '../styles/Hoodie.module.css';
import Image from 'next/image';

export default function Hoodie() {
    return (
        <section className={styles.hoodieSection}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>HOODIE</h1>
                    <div className={styles.categoryButtons}>
                        <button>MEN</button>
                        <button>WOMEN</button>
                        <button>CHILDREN</button>
                        <button>POPULAR</button>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.leftText}>
                        <p>PROVIDE AN EMAIL ADDRESS WHERE CUSTOMERS CAN SEND THEIR INQUIRIES.</p>
                    </div>

                    <div className={styles.imageContainer}>
                        <Image
                            src="/Untitled-1.png"
                            alt="Hoodie Model"
                            width={480}
                            height={610}
                            className={styles.modelImage}
                        />
                    </div>

                    <div className={styles.rightText}>
                        <a href="#">NEW COLLECTION →</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

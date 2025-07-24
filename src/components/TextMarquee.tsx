'use client';

import styles from '../styles/ScrollingTextMarquee.module.css';

export default function TextMarquee({ items }: { items: string[] }) {
    return (
        <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeContent}>
                {items.map((item, index) => (
                    <span key={index} className={styles.item}>
                        {item}
                    </span>
                ))}
                {items.map((item, index) => (
                    <span key={`copy-${index}`} className={styles.item}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

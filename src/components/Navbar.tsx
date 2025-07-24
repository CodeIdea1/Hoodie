'use client';

import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? '✕' : '≡'}
            </button>

            <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
                <div className={styles.left}>
                    <select aria-label="Select categories" className={styles.select}>
                        <option>Categories</option>
                    </select>
                    <select aria-label="Select new products" className={styles.select}>
                        <option>New Product</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.search}
                        aria-label="Search products"
                    />
                </div>

                <div className={styles.right}>
                    <button>MEN</button>
                    <button>WOMEN</button>
                    <button>CHILDREN</button>
                    <button>POPULAR</button>
                </div>
            </div>
        </nav>
    );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/fullWintress.module.css';

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
}

const products: Product[] = [
    {
        id: 1, title: 'Sweatshirt', description: 'SWEATSHIRT THEY REPARTICULARLY FAVOURED FOR STYLES, COLORS, AND DESIGNS. THEIR RELAXED AND ESPECIALLY DURING COLDER SEASONS.',
        image: '/Untitled-10.png'
    },
    {
        id: 2, title: 'Athletic Hoodie', description: 'AN "ATHLETIC HOODIE" TO A SPECIFIC TYPE OF HOODIE DESIGNED WITH FEATURES TAILORED FOR ATHLETIC ACTIVITIES AND SPORTS.',
        image: '/Untitled-3.png'
    },
    {
        id: 3, title: '', description: 'A hoodie full winters likely refers to a hoodie specifically designed for cold winter weather.',
        image: '/Untitled-2.png'
    },
    { id: 4, title: '', description: '', image: '/Best Leather Shoes Men Casual-Artguru.png' },
];

export default function FullWintress() {
    const firstTwoProducts = products.slice(0, 2);
    const lastTwoProducts = products.slice(2);

    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const firstGridRef = useRef<HTMLDivElement | null>(null);
    const secondGridRef = useRef<HTMLDivElement | null>(null);

    const [sectionInView, setSectionInView] = useState(false);
    const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !sectionInView) {
                        setSectionInView(true);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [sectionInView]);

    useEffect(() => {
        if (sectionInView) {

            if (titleRef.current) {
                titleRef.current.style.transform = 'translateY(0)';
                titleRef.current.style.opacity = '1';
            }

            if (firstGridRef.current) {
                const firstCards = firstGridRef.current.querySelectorAll(`.${styles.productCard}`);
                firstCards.forEach((card, index) => {
                    setTimeout(() => {
                        (card as HTMLElement).style.transform = 'translateY(0)';
                        (card as HTMLElement).style.opacity = '1';
                        setAnimatedCards(prev => new Set(prev).add(index));
                    }, index * 200);
                });
            }

            setTimeout(() => {
                if (secondGridRef.current) {
                    const secondCards = secondGridRef.current.querySelectorAll(`.${styles.productCard}`);
                    secondCards.forEach((card, index) => {
                        setTimeout(() => {
                            (card as HTMLElement).style.transform = 'translateY(0)';
                            (card as HTMLElement).style.opacity = '1';
                            setAnimatedCards(prev => new Set(prev).add(index + 2));
                        }, index * 200);
                    });
                }
            }, firstTwoProducts.length * 200 + 300);
        }
    }, [sectionInView, firstTwoProducts.length]);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.transform = 'translateY(50px)';
            titleRef.current.style.opacity = '0';
            titleRef.current.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        }

        if (firstGridRef.current) {
            const firstCards = firstGridRef.current.querySelectorAll(`.${styles.productCard}`);
            firstCards.forEach((card) => {
                (card as HTMLElement).style.transform = 'translateY(80px)';
                (card as HTMLElement).style.opacity = '0';
                (card as HTMLElement).style.transition = 'transform 0.7s ease-out, opacity 0.7s ease-out';
            });
        }

        if (secondGridRef.current) {
            const secondCards = secondGridRef.current.querySelectorAll(`.${styles.productCard}`);
            secondCards.forEach((card) => {
                (card as HTMLElement).style.transform = 'translateY(80px)';
                (card as HTMLElement).style.opacity = '0';
                (card as HTMLElement).style.transition = 'transform 0.7s ease-out, opacity 0.7s ease-out';
            });
        }
    }, []);

    return (
        <section className={styles.fullWintressSection} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.productGrid} ref={firstGridRef}>
                    {firstTwoProducts.map((product, index) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className={styles.productImage}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <div className={styles.textWrapper}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <p className={styles.productDescription}>{product.description}</p>
                                </div>
                                <span className={styles.productNumber}>{`0${index + 1}`}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 className={styles.sectionTitle} ref={titleRef}>FULL WINTERS</h1>
                <div className={styles.productGrid} ref={secondGridRef}>
                    {lastTwoProducts.map((product, index) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={`${styles.imageContainer} ${product.id === 3 ? styles.height770 : ''} ${product.id === 4 ? styles.height400 : ''}`}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className={styles.productImage}
                                />
                            </div>
                            {product.id === 4 ? (
                                <div>
                                    <p className={styles.customText}>NEW ARRIVALS JUST DROPPED! EXPLORE THE LATEST STYLES AND LIMITED EDITION PIECES NOW.!</p>
                                    <button className={styles.collectionButton}>NEW COLLECTION // LIMITED EDITION</button>
                                </div>
                            ) : (
                                <div className={styles.productInfo}>
                                    <span className={styles.productNumber}>{`0${index + 3}`}</span>
                                    <div className={styles.textWrapper}>
                                        <h3 className={styles.productTitle}>{product.title}</h3>
                                        <p className={styles.productDescription}>{product.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
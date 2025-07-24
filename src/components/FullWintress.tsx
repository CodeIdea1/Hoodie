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
        id: 1,
        title: 'Sweatshirt',
        description: 'SWEATSHIRT THEY REPARTICULARLY FAVOURED FOR STYLES, COLORS, AND DESIGNS. THEIR RELAXED AND ESPECIALLY DURING COLDER SEASONS.',
        image: '/Untitled-10.png'
    },
    {
        id: 2,
        title: 'Athletic Hoodie',
        description: 'AN "ATHLETIC HOODIE" TO A SPECIFIC TYPE OF HOODIE DESIGNED WITH FEATURES TAILORED FOR ATHLETIC ACTIVITIES AND SPORTS.',
        image: '/Untitled-3.png'
    },
    {
        id: 3,
        title: 'Winter Hoodie',
        description: 'A hoodie full winters likely refers to a hoodie specifically designed for cold winter weather.',
        image: '/Untitled-2.png'
    },
    {
        id: 4,
        title: 'New Collection',
        description: 'Limited Edition Collection',
        image: '/Best Leather Shoes Men Casual-Artguru.png'
    },
];

export default function FullWintress() {
    const [isClient, setIsClient] = useState(false);
    const [sectionInView, setSectionInView] = useState(false);
    const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set());

    const firstTwoProducts = products.slice(0, 2);
    const lastTwoProducts = products.slice(2);

    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const firstGridRef = useRef<HTMLDivElement | null>(null);
    const secondGridRef = useRef<HTMLDivElement | null>(null);

    // التأكد من أننا في بيئة المتصفح
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Intersection Observer للكشف عن دخول القسم في المشاهدة
    useEffect(() => {
        if (!isClient) return;

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

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, [sectionInView, isClient]);

    // تطبيق الانيميشن عند دخول القسم في المشاهدة
    useEffect(() => {
        if (!isClient || !sectionInView) return;

        const animateElements = () => {
            // انيميشن العنوان
            if (titleRef.current) {
                titleRef.current.style.transform = 'translateY(0)';
                titleRef.current.style.opacity = '1';
            }

            // انيميشن الكاردز الأولى
            if (firstGridRef.current) {
                const firstCards = firstGridRef.current.querySelectorAll(`.${styles.productCard}`);
                firstCards.forEach((card, index) => {
                    setTimeout(() => {
                        if (card && (card as HTMLElement).isConnected) {
                            (card as HTMLElement).style.transform = 'translateY(0)';
                            (card as HTMLElement).style.opacity = '1';
                            setAnimatedCards(prev => new Set(prev).add(index));
                        }
                    }, index * 200);
                });
            }

            // انيميشن الكاردز الثانية
            setTimeout(() => {
                if (secondGridRef.current) {
                    const secondCards = secondGridRef.current.querySelectorAll(`.${styles.productCard}`);
                    secondCards.forEach((card, index) => {
                        setTimeout(() => {
                            if (card && (card as HTMLElement).isConnected) {
                                (card as HTMLElement).style.transform = 'translateY(0)';
                                (card as HTMLElement).style.opacity = '1';
                                setAnimatedCards(prev => new Set(prev).add(index + 2));
                            }
                        }, index * 200);
                    });
                }
            }, firstTwoProducts.length * 200 + 300);
        };

        const timer = setTimeout(animateElements, 100);
        return () => clearTimeout(timer);
    }, [sectionInView, firstTwoProducts.length, isClient]);

    // تهيئة الانيميشن الأولية
    useEffect(() => {
        if (!isClient) return;

        const initializeAnimation = () => {
            if (titleRef.current) {
                titleRef.current.style.transform = 'translateY(50px)';
                titleRef.current.style.opacity = '0';
                titleRef.current.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            }

            if (firstGridRef.current) {
                const firstCards = firstGridRef.current.querySelectorAll(`.${styles.productCard}`);
                firstCards.forEach((card) => {
                    if (card) {
                        (card as HTMLElement).style.transform = 'translateY(80px)';
                        (card as HTMLElement).style.opacity = '0';
                        (card as HTMLElement).style.transition = 'transform 0.7s ease-out, opacity 0.7s ease-out';
                    }
                });
            }

            if (secondGridRef.current) {
                const secondCards = secondGridRef.current.querySelectorAll(`.${styles.productCard}`);
                secondCards.forEach((card) => {
                    if (card) {
                        (card as HTMLElement).style.transform = 'translateY(80px)';
                        (card as HTMLElement).style.opacity = '0';
                        (card as HTMLElement).style.transition = 'transform 0.7s ease-out, opacity 0.7s ease-out';
                    }
                });
            }
        };

        const timer = setTimeout(initializeAnimation, 100);
        return () => clearTimeout(timer);
    }, [isClient]);

    // عرض loading state أثناء التحميل في المتصفح
    if (!isClient) {
        return (
            <section className={styles.fullWintressSection}>
                <div className={styles.container}>
                    {/* placeholder content */}
                </div>
            </section>
        );
    }

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
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={index === 0}
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
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {product.id === 4 ? (
                                <div>
                                    <p className={styles.customText}>
                                        NEW ARRIVALS JUST DROPPED! EXPLORE THE LATEST STYLES AND LIMITED EDITION PIECES NOW!
                                    </p>
                                    <button
                                        className={styles.collectionButton}
                                        aria-label="View new limited edition collection"
                                    >
                                        NEW COLLECTION // LIMITED EDITION
                                    </button>
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
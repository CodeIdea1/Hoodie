"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ArrowUpRight } from "lucide-react";
import styles from '../styles/OurCollection.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// تعريف نوع دالة fadeIn
type FadeInFunction = (
    element: HTMLElement | null,
    delay?: number,
    duration?: number
) => void;

// استيراد الانيميشن بشكل dynamic
let fadeIn: FadeInFunction | null = null;
if (typeof window !== "undefined") {
    import('@/animations/fadeIn').then((module) => {
        fadeIn = module.fadeIn;
    });
}

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    multiImages?: string[];
}

const localProducts: Product[] = [
    {
        id: 1,
        title: 'Modern Hoodie',
        image: '/1.png',
        price: 49.99,
    },
    {
        id: 2,
        title: 'Classic Jacket',
        image: '/2.png',
        price: 79.99,
        multiImages: ['/cap1.png', '/cap2.png']
    },
    {
        id: 3,
        title: 'Streetwear Shirt',
        image: '/3.png',
        price: 29.99,
    },
    {
        id: 4,
        title: 'Oversized T-Shirt',
        image: '/4.png',
        price: 25.00,
    },
    {
        id: 5,
        title: 'Minimalist Hoodie',
        image: '/5.png',
        price: 59.00,
    },
];

export default function OurCollection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [scrollProducts, setScrollProducts] = useState<Product[]>([]);
    const [isClient, setIsClient] = useState(false);

    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const linksRef = useRef<HTMLDivElement | null>(null);

    // التأكد من أننا في بيئة المتصفح
    useEffect(() => {
        setIsClient(true);
        setProducts(localProducts.slice(0, 3));
        setScrollProducts(localProducts);
    }, []);

    // تطبيق الانيميشن فقط في المتصفح
    useEffect(() => {
        if (!isClient || !fadeIn) return;

        // حفظ مرجع للدالة للتأكد من عدم تغييرها
        const fadeInFunction = fadeIn;

        const timer = setTimeout(() => {
            try {
                fadeInFunction(sectionRef.current);
                fadeInFunction(titleRef.current, 0.1);
                fadeInFunction(textRef.current, 0.2);

                cardRefs.current.forEach((cardRef, index) => {
                    if (cardRef && cardRef.isConnected) {
                        fadeInFunction(cardRef, 0.3 + (index * 0.1));
                    }
                });

                fadeInFunction(linksRef.current, 0.4);
            } catch (error) {
                console.warn("Animation failed:", error);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [products, isClient]);

    const renderNormalCard = (item: Product, index: number) => (
        <div
            key={item.id}
            className={styles.card}
            ref={(el) => {
                if (cardRefs.current) {
                    cardRefs.current[index] = el;
                }
            }}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.img}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
            />
            <div className={styles.cardInfo}>
                {index === 0 && (
                    <p className={styles.cardText}>
                        MENS BLACK NUMB THE PAIN GRAPHIC PRINTED OVERSIZED HOODIES 20.5s
                    </p>
                )}
                <button
                    className={styles.topProductButton}
                    aria-label={`Explore ${item.title}`}
                >
                    EXPLORE
                </button>
            </div>
        </div>
    );

    const renderMultiImageCard = (item: Product, index: number) => (
        <div
            key={item.id}
            className={`${styles.card} ${styles.multiImageCard}`}
            ref={(el) => {
                if (cardRefs.current) {
                    cardRefs.current[index] = el;
                }
            }}
        >
            <div className={styles.imageGrid}>
                {item.multiImages?.map((img, imgIndex) => (
                    <div key={imgIndex} className={styles.gridImageContainer}>
                        <Image
                            src={img}
                            alt={`${item.title} ${imgIndex + 1}`}
                            fill
                            className={`${styles.gridImg} ${styles[`gridImg${imgIndex + 1}`]}`}
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                ))}
            </div>
            <div className={styles.cardInfo}>
                <button
                    className={styles.topProductButton}
                    aria-label={`Explore ${item.title} collection`}
                >
                    EXPLORE COLLECTION
                </button>
            </div>
        </div>
    );

    // عرض loading state أثناء التحميل في المتصفح
    if (!isClient) {
        return (
            <section className={styles.collectionSection}>
                <div className={styles.container}>
                    <div className={styles.gridTopProducts}>
                        {/* placeholder content */}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.collectionSection} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.gridTopProducts}>
                    {products.map((item, index) => {
                        if (index === 1 && item.multiImages && item.multiImages.length > 0) {
                            return renderMultiImageCard(item, index);
                        }
                        return renderNormalCard(item, index);
                    })}
                </div>

                <h2 className={styles.sectionTitle} ref={titleRef}>
                    OUR COLLECTION
                </h2>

                <p className={styles.sectionDiscription} ref={textRef}>
                    IT SEEMS LIKE YOURE REFERRING TO HOODIE ALLEN, A RAPPER AND SINGER-SONGWRITER.
                    HE GAINED POPULARITY WITH MIXTAPES AND INDEPENDENT RELEASES BEFORE GOING MAINSTREAM.
                </p>

                <div className={styles.heroSocialLinks} ref={linksRef}>
                    <a href="#" aria-label="Follow us on Instagram">INSTAGRAM</a>
                    <a href="#" aria-label="Join our Telegram channel">TELEGRAM</a>
                    <a href="#" aria-label="Like us on Facebook">FACEBOOK</a>
                    <a href="#" aria-label="Follow us on Twitter">TWITTER</a>
                </div>
            </div>

            {isClient && (
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={15}
                    slidesPerView={1.3}
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 30 },
                        768: { slidesPerView: 3.2, spaceBetween: 40 },
                        1024: { slidesPerView: 4, spaceBetween: 50 },
                        1400: { slidesPerView: 4, spaceBetween: 50 },
                    }}
                    navigation={false}
                    pagination={{ clickable: true }}
                    className={styles.swiperContainer}
                >
                    {scrollProducts.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className={styles.cardSmall}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={160}
                                    height={160}
                                    className={styles.imgSmall}
                                    sizes="160px"
                                />
                                <div className={styles.priceContainer}>
                                    <p className={styles.priceOnly}>${item.price}</p>
                                    <ArrowUpRight className={styles.priceIcon} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}
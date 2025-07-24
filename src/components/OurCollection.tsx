"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import styles from '../styles/OurCollection.module.css';
import { ArrowUpRight } from "lucide-react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { fadeIn } from '@/animations/fadeIn';

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

    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const linksRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setProducts(localProducts.slice(0, 3));
        setScrollProducts(localProducts);
    }, []);

    useEffect(() => {
        fadeIn(sectionRef.current);
        fadeIn(titleRef.current, 0.1);
        fadeIn(textRef.current, 0.2);

        cardRefs.current.forEach((cardRef, index) => {
            if (cardRef) {
                fadeIn(cardRef, 0.3 + (index * 0.1));
            }
        });

        fadeIn(linksRef.current, 0.4);
    }, [products]);

    const renderNormalCard = (item: Product, index: number) => (
        <div
            key={item.id}
            className={styles.card}
            ref={(el) => {
                cardRefs.current[index] = el;
            }}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.img}
            />
            <div className={styles.cardInfo}>
                {index === 0 && <p className={styles.cardText}>MENS BLACK NUMB THE PAIN GRAPHIC PRINTED OVERSIZED HOODIES 20.5s</p>}
                <button className={styles.topProductButton}>EXPLORE</button>
            </div>
        </div>
    );

    const renderMultiImageCard = (item: Product, index: number) => (
        <div
            key={item.id}
            className={`${styles.card} ${styles.multiImageCard}`}
            ref={(el) => {
                cardRefs.current[index] = el;
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
                        />
                    </div>
                ))}
            </div>
            <div className={styles.cardInfo}>
                <button className={styles.topProductButton}>EXPLORE COLLECTION</button>
            </div>
        </div>
    );

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

                <h2 className={styles.sectionTitle} ref={titleRef}>OUR COLLECTION</h2>

                <p className={styles.sectionDiscription} ref={textRef}>
                    IT SEEMS LIKE YOURE REFERRING TO HOODIE ALLEN, A RAPPER AND SINGER-SONGWRITER.
                    HE GAINED POPULARITY WITH MIXTAPES AND INDEPENDENT RELEASES BEFORE GOING MAINSTREAM.
                </p>

                <div className={styles.heroSocialLinks} ref={linksRef}>
                    <a href="#">INSTAGRAM</a>
                    <a href="#">TELEGRAM</a>
                    <a href="#">FACEBOOK</a>
                    <a href="#">TWITTER</a>
                </div>
            </div>

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
                            />
                            <div className={styles.priceContainer}>
                                <p className={styles.priceOnly}>${item.price}</p>
                                <ArrowUpRight className={styles.priceIcon} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
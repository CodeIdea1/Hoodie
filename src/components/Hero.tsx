"use client";

import styles from '../styles/Hero.module.css';
import ScrollingTextMarquee from '../components/TextMarquee';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { fadeIn } from '@/animations/fadeIn';

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const topTextRef = useRef<HTMLParagraphElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fadeIn(sectionRef.current);
    fadeIn(topTextRef.current, 0.1);
    fadeIn(titleRef.current, 0.2);
    fadeIn(imageRef.current, 0.3, .5);
    fadeIn(ctaRef.current, 0.4);
    fadeIn(linksRef.current, 0.5);
  }, []);

  return (
    <section className={styles.heroSection} ref={sectionRef}>
      <p className={styles.heroTopText} ref={topTextRef}>The Best Hoodies Are Only Here</p>
      <h1 className={styles.heroTitle} ref={titleRef}>HOODIE</h1>

      <div className={styles.heroImageWrapper} ref={imageRef}>
        <Image
          src="/hero.png"
          alt="Hoodie Models"
          className={styles.heroImage}
          width={1000}
          height={600}
          priority
        />

        <div className={styles.heroCTA} ref={ctaRef}>
          <span className={styles.ctaTitle}>SWIPE</span>
          <span className={styles.ctaSubtitle}>DISCOVER NOW</span>
          <span className={styles.ctaArrow}>➜</span>
        </div>
      </div>

      <div className={styles.heroSocialLinks} ref={linksRef}>
        <a href="#">INSTAGRAM</a>
        <a href="#">TELEGRAM</a>
        <a href="#">FACEBOOK</a>
        <a href="#">TWITTER</a>
      </div>

      <ScrollingTextMarquee
        items={[
          'THE BEST HOODIES CLOTHING',
          'THE BEST HOODIES CLOTHING',
          'THE BEST HOODIES CLOTHING',
          'THE BEST HOODIES CLOTHING',
        ]}
      />
    </section>
  );
}

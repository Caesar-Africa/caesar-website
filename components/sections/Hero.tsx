import styles from './Hero.module.css';

interface HeroProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

export default function Hero({ title, subtitle, children }: HeroProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBg}>
                <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
                <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
                <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>
            </div>
            <div className={styles.heroContent}>
                <h1>{title}</h1>
                <p className={styles.heroSubtitle}>{subtitle}</p>
                {children}
            </div>
        </section>
    );
}

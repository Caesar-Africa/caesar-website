import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

interface AboutPageProps {
    onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
    return (
        <>
            <Hero
                title="Focused on crypto tax in African markets"
                subtitle="Built with input from crypto businesses, tax professionals, and public institutions"
            />

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why Caesar exists</h2>
                    </div>

                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h4>The Problem</h4>
                                <p>Crypto adoption in Africa has grown faster than tax administration</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h4>The Risk</h4>
                                <p>Platforms, users, and governments all carry risk when rules are hard to apply</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h4>The Solution</h4>
                                <p>Caesar turns complexity into a shared, structured view of crypto tax</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Our approach</h2>
                    </div>

                    <div className={styles.iconCards}>
                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>📊</div>
                            <h3>Data-First</h3>
                            <p>Start from real transaction data, not just theory</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>⚙️</div>
                            <h3>Structured Rules</h3>
                            <p>Keep tax logic in reviewable, versioned form</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>🔍</div>
                            <h3>Audit-Ready</h3>
                            <p>Design for supervision from day one</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>⚖️</div>
                            <h3>Balanced Privacy</h3>
                            <p>Meet data needs while respecting user privacy</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

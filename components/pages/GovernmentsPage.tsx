import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

interface GovernmentsPageProps {
    onNavigate: (page: string) => void;
    onOpenModal: (type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales') => void;
}

export default function GovernmentsPage({ onNavigate, onOpenModal }: GovernmentsPageProps) {
    return (
        <>
            <Hero
                title="Crypto tax data for public institutions"
                subtitle="Structured view of crypto activity across all connected platforms"
            >
                <div className={styles.heroButtons}>
                    <button onClick={() => onNavigate('contact')} className={styles.btnPrimary}>
                        Request government demo
                    </button>
                    <button className={styles.btnSecondary}>Download summary note</button>
                </div>
            </Hero>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>What you see</h2>
                        <p className={styles.sectionSubtitle}>Real-time insights into crypto tax capacity</p>
                    </div>

                    <div style={{ background: 'var(--dark-light)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Total Volume Tracked</div>
                                <div className={styles.statNumber}>₦2.4T</div>
                                <span className={styles.statChange}>Across 5 platforms</span>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Taxable Events</div>
                                <div className={styles.statNumber}>700K</div>
                                <span className={styles.statChange}>This month</span>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Coverage Rate</div>
                                <div className={styles.statNumber}>30%</div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--dark-light)', borderRadius: '10px', overflow: 'hidden', marginTop: '10px' }}>
                                    <div style={{ height: '100%', width: '30%', background: 'var(--gradient)', borderRadius: '10px' }}></div>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statLabel}>Data Quality Score</div>
                                <div className={styles.statNumber}>94%</div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--dark-light)', borderRadius: '10px', overflow: 'hidden', marginTop: '10px' }}>
                                    <div style={{ height: '100%', width: '94%', background: 'var(--gradient)', borderRadius: '10px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-pattern">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Access and safeguards</h2>
                    </div>

                    <div className={styles.iconCards}>
                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>🔐</div>
                            <h3>Aggregated First</h3>
                            <p>Dashboards show anonymous indicators by default</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>⚖️</div>
                            <h3>Legal Basis Required</h3>
                            <p>Named data only with clear regulatory authority</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>📝</div>
                            <h3>Full Audit Trail</h3>
                            <p>Every access logged and reviewable</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>✅</div>
                            <h3>Approval Workflows</h3>
                            <p>Sensitive data requires authorization</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>How teams use Caesar</h2>
                    </div>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>📊</div>
                            <div className={styles.featureContent}>
                                <h4>Revenue Estimation</h4>
                                <p>Calculate potential crypto-related tax capacity</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🎯</div>
                            <div className={styles.featureContent}>
                                <h4>Enforcement Priority</h4>
                                <p>Identify high-value compliance targets</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🧪</div>
                            <div className={styles.featureContent}>
                                <h4>Policy Testing</h4>
                                <p>Model impact of rule changes on revenue</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🤝</div>
                            <div className={styles.featureContent}>
                                <h4>Platform Coordination</h4>
                                <p>Common data standards for all exchanges</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

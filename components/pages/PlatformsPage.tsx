import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

interface PlatformsPageProps {
    onNavigate: (page: string) => void;
    onOpenModal: (type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales') => void;
}

export default function PlatformsPage({ onNavigate, onOpenModal }: PlatformsPageProps) {
    return (
        <>
            <Hero
                title="Tax engine for crypto businesses"
                subtitle="For exchanges, wallets, payment providers, remittance apps, and neobanks with crypto"
            >
                <div className={styles.heroButtons}>
                    <button onClick={() => onNavigate('contact')} className={styles.btnPrimary}>
                        Talk to our team
                    </button>
                    <button onClick={() => onNavigate('product')} className={styles.btnSecondary}>
                        View product overview
                    </button>
                </div>
            </Hero>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why platforms choose Caesar</h2>
                    </div>

                    <div className={styles.iconCards}>
                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>🛡️</div>
                            <h3>License Protection</h3>
                            <p>Consistent crypto tax story for licensing and audits keeps you compliant</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>👥</div>
                            <h3>User Trust</h3>
                            <p>Reliable tax reports without building an in-house tax team</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>💰</div>
                            <h3>Platform Tax Accuracy</h3>
                            <p>VAT/WHT on your fees calculated correctly and automatically</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>🌍</div>
                            <h3>Multi-Country Ready</h3>
                            <p>Expand across Africa without rebuilding tax logic for each market</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-pattern">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>How Caesar fits your stack</h2>
                    </div>

                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>Your Platform</div>
                                <h4>Maintains ledger and events</h4>
                                <p>Your systems continue as normal</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>Data Transfer</div>
                                <h4>Send transactions to Caesar</h4>
                                <p>Real-time API or scheduled batches</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>Processing</div>
                                <h4>Caesar calculates taxes</h4>
                                <p>User positions + platform obligations</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineDate}>Output</div>
                                <h4>Display to users & report</h4>
                                <p>In-app views and regulatory filings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Impact across your organization</h2>
                    </div>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>💻</div>
                            <div className={styles.featureContent}>
                                <h4>Product Teams</h4>
                                <p>Ship features instead of maintaining tax logic</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>💼</div>
                            <div className={styles.featureContent}>
                                <h4>Finance Teams</h4>
                                <p>One source of truth for user tax and platform VAT/WHT</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>📋</div>
                            <div className={styles.featureContent}>
                                <h4>Compliance Teams</h4>
                                <p>Documented basis for regulatory discussions</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🎯</div>
                            <div className={styles.featureContent}>
                                <h4>Leadership</h4>
                                <p>Reduce regulatory risk and operational overhead</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Built for every crypto business</h2>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>💱</div>
                            <div className={styles.statLabel}>Exchanges</div>
                            <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Centralized and P2P platforms
                            </p>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>👛</div>
                            <div className={styles.statLabel}>Wallets</div>
                            <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Custodial and super-apps
                            </p>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>💳</div>
                            <div className={styles.statLabel}>Payment Providers</div>
                            <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Checkout and gateway services
                            </p>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>🌍</div>
                            <div className={styles.statLabel}>Remittance</div>
                            <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Cross-border transfer apps
                            </p>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>🏦</div>
                            <div className={styles.statLabel}>Neobanks</div>
                            <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Digital banks with crypto
                            </p>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>🔗</div>
                            <div className={styles.statLabel}>DeFi Bridges</div>
                            <p style={{ marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Protocol integrators
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

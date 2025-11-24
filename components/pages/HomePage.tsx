import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

interface HomePageProps {
    onNavigate: (page: string) => void;
    onOpenModal: (type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales') => void;
}

export default function HomePage({ onNavigate, onOpenModal }: HomePageProps) {
    return (
        <>
            <Hero
                title="Crypto tax rail for African markets"
                subtitle="Caesar turns crypto transactions into tax-ready data for crypto businesses and public institutions"
            >
                <div className={styles.heroButtons}>
                    <button onClick={() => onNavigate('platforms')} className={styles.btnPrimary}>
                        For platforms →
                    </button>
                    <button onClick={() => onNavigate('governments')} className={styles.btnSecondary}>
                        For governments →
                    </button>
                </div>
            </Hero>

            <section className="bg-pattern">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Who Caesar is for</h2>
                    </div>

                    <div className={styles.iconCards}>
                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>💱</div>
                            <h3>Crypto platforms</h3>
                            <p>Exchanges, wallets, payment and checkout providers, remittance apps, neobanks</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>🏛️</div>
                            <h3>Public institutions</h3>
                            <p>Tax authorities, financial regulators, and policy teams</p>
                        </div>

                        <div className={styles.iconCard}>
                            <div className={styles.iconWrapper}>👥</div>
                            <h3>Individuals & SMEs</h3>
                            <p>Self-service reports coming soon to help individuals and small businesses</p>
                            <span style={{ display: 'inline-block', marginTop: '15px', padding: '5px 15px', background: 'rgba(246, 173, 85, 0.2)', color: 'var(--warning)', borderRadius: '20px', fontSize: '0.85rem' }}>
                                Coming Q2 2025
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>What Caesar does</h2>
                        <p className={styles.sectionSubtitle}>Complete tax infrastructure for the crypto economy</p>
                    </div>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>📊</div>
                            <div className={styles.featureContent}>
                                <h4>User Tax Positions</h4>
                                <p>Calculates crypto gains, income, and losses per tax period for each user</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>💰</div>
                            <div className={styles.featureContent}>
                                <h4>Platform Tax Obligations</h4>
                                <p>Handles VAT, WHT, and other taxes on your platform fees and services</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>📈</div>
                            <div className={styles.featureContent}>
                                <h4>Compliance Reports</h4>
                                <p>Produces audit-ready summaries for finance and compliance teams</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>🎯</div>
                            <div className={styles.featureContent}>
                                <h4>Government Dashboards</h4>
                                <p>Feeds structured indicators into regulatory monitoring systems</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>How it works</h2>
                        <p className={styles.sectionSubtitle}>From raw data to tax-ready outputs in 5 steps</p>
                    </div>

                    <div className={styles.processFlow}>
                        <div className={styles.processConnector}></div>
                        <div className={styles.processSteps}>
                            <div className={styles.processStep}>
                                <div className={styles.stepIcon}>
                                    📤
                                    <span className={styles.stepNumber}>1</span>
                                </div>
                                <h4>Send Data</h4>
                                <p>Export or API connection</p>
                            </div>

                            <div className={styles.processStep}>
                                <div className={styles.stepIcon}>
                                    🔄
                                    <span className={styles.stepNumber}>2</span>
                                </div>
                                <h4>Standardize</h4>
                                <p>Events normalized and checked</p>
                            </div>

                            <div className={styles.processStep}>
                                <div className={styles.stepIcon}>
                                    ⚙️
                                    <span className={styles.stepNumber}>3</span>
                                </div>
                                <h4>Apply Rules</h4>
                                <p>Country and year specific</p>
                            </div>

                            <div className={styles.processStep}>
                                <div className={styles.stepIcon}>
                                    🔍
                                    <span className={styles.stepNumber}>4</span>
                                </div>
                                <h4>Review</h4>
                                <p>Exceptions flagged</p>
                            </div>

                            <div className={styles.processStep}>
                                <div className={styles.stepIcon}>
                                    📥
                                    <span className={styles.stepNumber}>5</span>
                                </div>
                                <h4>Receive</h4>
                                <p>Reports and dashboards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Caesar at scale</h2>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>700K+</div>
                            <div className={styles.statLabel}>Monthly taxable events</div>
                            <span className={styles.statChange}>↑ Growing 30% MoM</span>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>$8.5B</div>
                            <div className={styles.statLabel}>African crypto tax gap</div>
                            <span className={styles.statChange}>Opportunity size</span>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statNumber}>&lt;2%</div>
                            <div className={styles.statLabel}>Current compliance rate</div>
                            <span className={styles.statChange}>Caesar can fix this</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2>See Caesar on your data</h2>
                    <p>
                        Share a sample export or describe your current setup.
                        <br />
                        We&apos;ll show you what Caesar would produce.
                    </p>
                    <button onClick={() => onOpenModal('book-demo')} className={styles.btnWhite}>
                        Book a demo
                    </button>
                </div>
            </section>
        </>
    );
}

'use client';

import { useState } from 'react';
import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

interface ProductPageProps {
    onNavigate: (page: string) => void;
    onOpenModal: (type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales' | 'request-brief') => void;
}

export default function ProductPage({ onNavigate, onOpenModal }: ProductPageProps) {
    const [activeTab, setActiveTab] = useState('user-taxes');

    return (
        <>
            <Hero
                title="How Caesar fits your tax workflow"
                subtitle="Takes crypto transaction data, applies local tax rules, returns plug-and-play outputs"
            >
                <div className={styles.heroButtons}>
                    <button onClick={() => onOpenModal('talk-to-us')} className={styles.btnPrimary}>
                        Talk to our team
                    </button>
                    <button onClick={() => onOpenModal('request-brief')} className={styles.btnSecondary}>Request technical brief</button>
                </div>
            </Hero>

            <section>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>What Caesar covers</h2>
                    </div>

                    <div className={styles.tabContainer}>
                        <div className={styles.tabButtons}>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'user-taxes' ? styles.active : ''}`}
                                onClick={() => setActiveTab('user-taxes')}
                            >
                                User Taxes
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'platform-taxes' ? styles.active : ''}`}
                                onClick={() => setActiveTab('platform-taxes')}
                            >
                                Platform Taxes
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'reporting' ? styles.active : ''}`}
                                onClick={() => setActiveTab('reporting')}
                            >
                                Reporting
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'compliance' ? styles.active : ''}`}
                                onClick={() => setActiveTab('compliance')}
                            >
                                Compliance
                            </button>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'user-taxes' ? styles.active : ''}`}>
                            <div className={styles.iconCards}>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>💸</div>
                                    <h3>Capital Gains</h3>
                                    <p>Tracks purchase prices, sale prices, and calculates gains/losses per transaction</p>
                                </div>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>📅</div>
                                    <h3>Income Tax</h3>
                                    <p>Identifies staking rewards, airdrops, and mining income per tax period</p>
                                </div>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>🔗</div>
                                    <h3>Loss Harvesting</h3>
                                    <p>Ring-fences virtual asset losses according to local regulations</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'platform-taxes' ? styles.active : ''}`}>
                            <div className={styles.iconCards}>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>🧾</div>
                                    <h3>VAT Calculations</h3>
                                    <p>Automatic VAT on platform fees, transaction charges, and premium services</p>
                                </div>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>✂️</div>
                                    <h3>Withholding Tax</h3>
                                    <p>WHT on applicable services and cross-border transactions</p>
                                </div>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>🏛️</div>
                                    <h3>Development Levy</h3>
                                    <p>Calculates additional levies as per Nigerian Tax Reform Act 2026</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'reporting' ? styles.active : ''}`}>
                            <div className={styles.featureGrid}>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>📄</div>
                                    <div className={styles.featureContent}>
                                        <h4>PDF Reports</h4>
                                        <p>User-friendly tax summaries for download</p>
                                    </div>
                                </div>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>📊</div>
                                    <div className={styles.featureContent}>
                                        <h4>CSV Exports</h4>
                                        <p>Structured data for accounting systems</p>
                                    </div>
                                </div>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>🔌</div>
                                    <div className={styles.featureContent}>
                                        <h4>API Feeds</h4>
                                        <p>Real-time data for your applications</p>
                                    </div>
                                </div>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>📈</div>
                                    <div className={styles.featureContent}>
                                        <h4>Dashboard Views</h4>
                                        <p>Visual analytics for management</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'compliance' ? styles.active : ''}`}>
                            <div className={styles.featureGrid}>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>✓</div>
                                    <div className={styles.featureContent}>
                                        <h4>Audit Trail</h4>
                                        <p>Complete & immutable record of all calculations</p>
                                    </div>
                                </div>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>✓</div>
                                    <div className={styles.featureContent}>
                                        <h4>Rule Versioning</h4>
                                        <p>Timestamped configurations for historical accuracy</p>
                                    </div>
                                </div>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>✓</div>
                                    <div className={styles.featureContent}>
                                        <h4>Data Privacy</h4>
                                        <p>Pseudonymous by default with granular controls</p>
                                    </div>
                                </div>
                                <div className={styles.featureItem}>
                                    <div className={styles.featureIcon}>✓</div>
                                    <div className={styles.featureContent}>
                                        <h4>Dispute Resolution</h4>
                                        <p>Traceable calculations for easy validation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Data flow architecture</h2>
                    </div>

                    <div className={styles.processFlow}>
                        <div className={styles.processSteps} style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
                            <div style={{ background: 'var(--dark-light)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>📤 What you send</h3>
                                <div className={styles.featureGrid} style={{ gridTemplateColumns: '1fr' }}>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>🔤</div>
                                        <div className={styles.featureContent}>
                                            <h4>Event types</h4>
                                            <p>Trade, deposit, withdrawal, transfer, reward, fee</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>💵</div>
                                        <div className={styles.featureContent}>
                                            <h4>Amounts & assets</h4>
                                            <p>Values in crypto and fiat currencies</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>🕐</div>
                                        <div className={styles.featureContent}>
                                            <h4>Timestamps</h4>
                                            <p>UTC transaction times</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>🆔</div>
                                        <div className={styles.featureContent}>
                                            <h4>User IDs</h4>
                                            <p>Stable account identifiers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: 'var(--dark-light)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                <h3 style={{ marginBottom: '20px', color: 'var(--accent)' }}>📥 What you get</h3>
                                <div className={styles.featureGrid} style={{ gridTemplateColumns: '1fr' }}>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>👤</div>
                                        <div className={styles.featureContent}>
                                            <h4>Per-user assessments</h4>
                                            <p>Individual tax calculations</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>🏢</div>
                                        <div className={styles.featureContent}>
                                            <h4>Platform tax figures</h4>
                                            <p>VAT/WHT on your fees</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>📑</div>
                                        <div className={styles.featureContent}>
                                            <h4>Export formats</h4>
                                            <p>PDFs, CSVs, API responses</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <div className={styles.featureIcon}>📊</div>
                                        <div className={styles.featureContent}>
                                            <h4>Aggregated data</h4>
                                            <p>Government reporting ready</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

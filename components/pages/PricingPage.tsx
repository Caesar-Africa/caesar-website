'use client';

import { useState } from 'react';
import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

interface PricingPageProps {
    onNavigate: (page: string) => void;
    onOpenModal: (type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales' | 'request-access') => void;
}

export default function PricingPage({ onNavigate, onOpenModal }: PricingPageProps) {
    const [activeTab, setActiveTab] = useState('platform-pricing');

    return (
        <>
            <Hero title="Pricing for crypto tax at scale" subtitle="Simple tiers for businesses, custom arrangements for governments" />

            <section style={{ paddingTop: '100px' }}>
                <div className="container">
                    <div className={styles.tabContainer}>
                        <div className={styles.tabButtons}>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'platform-pricing' ? styles.active : ''}`}
                                onClick={() => setActiveTab('platform-pricing')}
                            >
                                Platforms
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'gov-pricing' ? styles.active : ''}`}
                                onClick={() => setActiveTab('gov-pricing')}
                            >
                                Governments
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'individual-pricing' ? styles.active : ''}`}
                                onClick={() => setActiveTab('individual-pricing')}
                            >
                                Individuals (Coming)
                            </button>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'platform-pricing' ? styles.active : ''}`}>
                            <div className={styles.iconCards}>
                                <div className={styles.iconCard} style={{ marginTop: '25px' }}>
                                    <div className={styles.iconWrapper}>🚀</div>
                                    <h3>Starter</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>For crypto platforms with up to 5,000 tax-active users</p>
                                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '20px 0', color: 'var(--primary)' }}>
                                        $300<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}> / mo</span>
                                    </p>
                                    <ul style={{ textAlign: 'left', margin: '20px 0', color: 'var(--text-secondary)', listStyle: 'none' }}>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> $0.06 per tax-active user
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> $300 monthly minimum
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> User-level crypto tax calculations (NG-2026)
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Platform VAT/WHT calculations
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Partner dashboard & FIRS-ready exports
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Full API access
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Email support
                                        </li>
                                    </ul>
                                    <button onClick={() => onOpenModal('request-access')} className={styles.btnPrimary} style={{ width: '100%' }}>
                                        Get started
                                    </button>
                                </div>

                                <div className={styles.iconCard} style={{ border: '2px solid var(--primary)', boxShadow: '0 0 30px rgba(102, 126, 234, 0.2)', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient)', color: 'white', padding: '4px 18px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 700 }}>
                                        RECOMMENDED
                                    </div>
                                    <div className={styles.iconWrapper}>⚡</div>
                                    <h3>Growth</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>For crypto platforms with 5,000–75,000 tax-active users</p>
                                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '20px 0', color: 'var(--primary)' }}>
                                        $300–$4,500<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}> / mo</span>
                                    </p>
                                    <ul style={{ textAlign: 'left', margin: '20px 0', color: 'var(--text-secondary)', listStyle: 'none' }}>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Everything in Starter
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Priority support (faster response times)
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Shared Slack/Teams channel (optional)
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Custom export formats for regulators & internal BI
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> 15% discount with 12-month commitment
                                        </li>
                                    </ul>
                                    <button onClick={() => onOpenModal('request-access')} className={styles.btnPrimary} style={{ width: '100%' }}>
                                        Get started
                                    </button>
                                </div>

                                <div className={styles.iconCard} style={{ marginTop: '25px' }}>
                                    <div className={styles.iconWrapper}>🏢</div>
                                    <h3>Enterprise</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>For platforms with 75,000+ tax-active users or multi-country operations</p>
                                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '20px 0', color: 'var(--primary)' }}>Let&apos;s talk</p>
                                    <ul style={{ textAlign: 'left', margin: '20px 0', color: 'var(--text-secondary)', listStyle: 'none' }}>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Everything in Growth
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Custom volume pricing
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Multiple entities/tax IDs under one account
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> White-label crypto tax portals
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Dedicated account manager & solutions engineer
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Contractual SLAs & security reviews
                                        </li>
                                        <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '0', color: 'var(--accent)' }}>✓</span> Roadmap for additional countries (Kenya, South Africa)
                                        </li>
                                    </ul>
                                    <button onClick={() => onOpenModal('contact-sales')} className={styles.btnPrimary} style={{ width: '100%' }}>
                                        Contact sales
                                    </button>
                                </div>
                            </div>

                            <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                * Taxed users are unique users with at least one taxable event per year
                            </p>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'gov-pricing' ? styles.active : ''}`}>
                            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                                <div className={styles.iconCard}>
                                    <div className={styles.iconWrapper}>🏛️</div>
                                    <h3>Public Institution Pricing</h3>
                                    <p style={{ margin: '20px 0', color: 'var(--text-secondary)' }}>Custom arrangements based on:</p>
                                    <ul style={{ textAlign: 'left', margin: '30px 0', color: 'var(--text-secondary)' }}>
                                        <li style={{ margin: '15px 0' }}>📊 Scope of data sources connected</li>
                                        <li style={{ margin: '15px 0' }}>👥 Number of teams using the portal</li>
                                        <li style={{ margin: '15px 0' }}>🔗 Depth of integration with existing systems</li>
                                        <li style={{ margin: '15px 0' }}>📈 Revenue recovery targets</li>
                                    </ul>
                                    <button onClick={() => onNavigate('contact')} className={styles.btnPrimary} style={{ width: '100%' }}>
                                        Request a proposal
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.tabContent} ${activeTab === 'individual-pricing' ? styles.active : ''}`}>
                            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                <div className={styles.iconWrapper} style={{ margin: '0 auto 30px' }}>
                                    👤
                                </div>
                                <h2 style={{ marginBottom: '20px' }}>Coming Q2 2026</h2>
                                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 30px' }}>
                                    Self-service reports for individuals and small businesses will be offered separately. Pricing will be published when available.
                                </p>
                                <button className={styles.btnSecondary}>Join waitlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Hero from '../sections/Hero';
import styles from './LegalPage.module.css';

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction' },
        { id: 'who-we-are', title: '1. Who we are' },
        { id: 'scope', title: '2. Scope' },
        { id: 'data-collect', title: '3. Data we collect' },
        { id: 'data-use', title: '4. How we use data' },
        { id: 'legal-bases', title: '5. Legal bases' },
        { id: 'data-sharing', title: '6. Data sharing' },
        { id: 'international', title: '7. International transfers' },
        { id: 'retention', title: '8. Data retention' },
        { id: 'your-rights', title: '9. Your rights' },
        { id: 'children', title: '10. Children\'s data' },
        { id: 'changes', title: '11. Changes' },
        { id: 'contact', title: '12. Contact us' }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Hero
                title="Privacy Policy"
                subtitle="How Caesar Tech Limited collects, uses, and protects your personal data"
            />

            <section>
                <div className="container">
                    <div className={styles.legalWrapper}>
                        <nav className={styles.legalNav}>
                            <div className={styles.legalNavTitle}>On this page</div>
                            <div className={styles.legalNavLinks}>
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`${styles.legalNavLink} ${activeSection === section.id ? styles.active : ''}`}
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </div>
                        </nav>

                        <div className={styles.legalContent}>
                            <p className={styles.effectiveDate}>
                                <strong>Effective date:</strong> September 1, 2025
                            </p>

                            <div id="intro" className={styles.section}>
                                <p>
                                    This Privacy Policy explains how <strong>Caesar Tech Limited</strong>, operating as{' '}
                                    <strong>"Caesar"</strong> ("Caesar", "we", "us", or "our"), collects, uses, stores, and protects
                                    personal data when:
                                </p>

                                <ul>
                                    <li>You visit our websites or online properties,</li>
                                    <li>You use our products and services as a business customer, or</li>
                                    <li>
                                        Your data is processed by Caesar in connection with a platform (for example, an exchange, wallet, or
                                        fintech) that uses our services.
                                    </li>
                                </ul>

                                <p>
                                    We are based in Lagos, Nigeria and focus on crypto tax infrastructure and analytics for platforms and
                                    regulators.
                                </p>

                                <p>
                                    If you have any questions, you can contact us using the details in the "Contact us" section.
                                </p>
                            </div>

                            <div id="who-we-are" className={styles.section}>
                                <h2>1. Who we are</h2>
                                <p>Caesar is operated by:</p>
                                <div className={styles.callout}>
                                    <p>
                                        <strong>Caesar Tech Limited</strong>
                                        <br />
                                        Operating as: <strong>Caesar</strong>
                                        <br />
                                        Registered office: Lagos, Nigeria
                                    </p>
                                </div>

                                <p>
                                    For some activities, Caesar acts as a <strong>data controller</strong> (for example, for visitors to our
                                    website and our own business contacts).
                                </p>

                                <p>
                                    For other activities, especially where we process data on behalf of a platform that has integrated
                                    Caesar, we act as a <strong>data processor</strong> or <strong>data sub-processor</strong>, following
                                    that platform's instructions and applicable data protection law.
                                </p>
                            </div>

                            <div id="scope" className={styles.section}>
                                <h2>2. Scope of this Privacy Policy</h2>
                                <p>This Policy applies to:</p>
                                <ul>
                                    <li>Visitors to our websites and marketing pages</li>
                                    <li>
                                        Representatives and users of our business customers (for example, exchanges, wallets, fintechs,
                                        corporate clients)
                                    </li>
                                    <li>End users whose data we process on behalf of a platform that uses Caesar</li>
                                    <li>Government or regulator contacts where we provide B2G services</li>
                                </ul>

                                <p>
                                    It does <strong>not</strong> apply to websites or services we do not control, including the platforms
                                    that integrate our APIs. Those services have their own privacy policies.
                                </p>
                            </div>

                            <div id="data-collect" className={styles.section}>
                                <h2>3. Personal data we collect</h2>
                                <p>The data we collect depends on how you interact with Caesar.</p>

                                <h3>3.1 Website visitors and marketing contacts</h3>
                                <p>We may collect:</p>
                                <ul>
                                    <li>
                                        <strong>Contact details</strong> – name, email address, company, role, phone number (if you provide
                                        them in a form, email, or chat)
                                    </li>
                                    <li>
                                        <strong>Usage data</strong> – pages viewed, clicks, time on page, referring URLs
                                    </li>
                                    <li>
                                        <strong>Technical data</strong> – IP address, browser type and version, device type, operating system,
                                        and similar information
                                    </li>
                                    <li>
                                        <strong>Cookies and similar technologies</strong> – see our Cookie Policy for details
                                    </li>
                                </ul>

                                <h3>3.2 Business customers and partners</h3>
                                <p>When your company signs up for Caesar, we may collect:</p>
                                <ul>
                                    <li>
                                        <strong>Account and contact data</strong> – company name, registration details, billing details,
                                        contact persons, login credentials for admin users
                                    </li>
                                    <li>
                                        <strong>Service usage data</strong> – actions taken in the dashboard, configurations, logs relating to
                                        your use of the platform
                                    </li>
                                </ul>

                                <h3>3.3 End users of platforms that integrate Caesar</h3>
                                <p>
                                    When a platform (such as an exchange or wallet) uses Caesar, we typically receive{' '}
                                    <strong>pseudonymised</strong> or indirect personal data, such as:
                                </p>
                                <ul>
                                    <li>
                                        A <strong>user reference or identifier</strong> used by the platform (not BVN or NIN by default)
                                    </li>
                                    <li>
                                        <strong>Transaction data</strong> – timestamps, event types (for example, buy, sell, trade, deposit,
                                        withdrawal, fee, reward, airdrop, interest, NFT trade), assets and amounts, fiat equivalents
                                    </li>
                                    <li>
                                        <strong>Wallet and technical data</strong> – blockchain addresses, chain/network identifiers, and
                                        related metadata
                                    </li>
                                    <li>
                                        <strong>Tax outputs</strong> – Caesar's calculated tax positions, confidence scores, flags, and
                                        summaries tied to the user reference
                                    </li>
                                </ul>

                                <p>
                                    We do <strong>not</strong> request or require passwords, private keys, seed phrases or similar sensitive
                                    credentials.
                                </p>
                            </div>

                            <div id="data-use" className={styles.section}>
                                <h2>4. How we use personal data</h2>
                                <p>We use personal data for the following purposes:</p>

                                <div className={styles.numberedList}>
                                    <div className={styles.numberedItem}>
                                        <span className={styles.number}>1</span>
                                        <div>
                                            <h4>To provide and operate our services</h4>
                                            <ul>
                                                <li>Calculating crypto tax positions for platforms and their users</li>
                                                <li>Providing dashboards, APIs and reports</li>
                                                <li>Running platform-level VAT and WHT analytics</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={styles.numberedItem}>
                                        <span className={styles.number}>2</span>
                                        <div>
                                            <h4>To communicate with you</h4>
                                            <ul>
                                                <li>Responding to enquiries</li>
                                                <li>Sending service-related notifications</li>
                                                <li>Sharing updates about new features or changes (where permitted)</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={styles.numberedItem}>
                                        <span className={styles.number}>3</span>
                                        <div>
                                            <h4>To improve and secure our services</h4>
                                            <ul>
                                                <li>Monitor performance and reliability</li>
                                                <li>Debugging and preventing abuse</li>
                                                <li>Analysing aggregated usage trends</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={styles.numberedItem}>
                                        <span className={styles.number}>4</span>
                                        <div>
                                            <h4>To comply with legal and regulatory obligations</h4>
                                            <ul>
                                                <li>Responding to lawful requests from regulators or authorities</li>
                                                <li>Maintaining records for tax, audit and compliance</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={styles.numberedItem}>
                                        <span className={styles.number}>5</span>
                                        <div>
                                            <h4>For marketing (limited and optional)</h4>
                                            <ul>
                                                <li>Sending newsletters or event invitations to business contacts</li>
                                                <li>Running campaigns to explain new Caesar features or capabilities</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    You can opt out of marketing emails at any time using the unsubscribe link or by contacting us.
                                </p>
                            </div>

                            <div id="legal-bases" className={styles.section}>
                                <h2>5. Legal bases for processing</h2>
                                <p>We rely on different legal bases depending on the context, including:</p>
                                <ul>
                                    <li>
                                        <strong>Contract</strong> – where processing is necessary to perform a contract with you or your
                                        organisation, or to take steps at your request before entering into a contract
                                    </li>
                                    <li>
                                        <strong>Legitimate interests</strong> – for example, to improve our services, ensure security, and
                                        communicate with existing customers about relevant updates
                                    </li>
                                    <li>
                                        <strong>Consent</strong> – for certain cookies and for specific types of marketing where required by
                                        law
                                    </li>
                                    <li>
                                        <strong>Legal obligation</strong> – where we must process data to comply with applicable law, including
                                        Nigerian data protection and tax laws
                                    </li>
                                </ul>

                                <p>
                                    When we act as a <strong>processor</strong> on behalf of a platform, we rely on that platform's legal
                                    basis and follow their instructions and applicable agreements.
                                </p>
                            </div>

                            <div id="data-sharing" className={styles.section}>
                                <h2>6. How we share personal data</h2>
                                <p>We may share personal data with:</p>

                                <h3>Service providers and vendors</h3>
                                <p>
                                    Hosting providers, analytics providers, email and communication tools, customer support tooling, and
                                    similar vendors who help us deliver the service. These providers are bound by confidentiality and data
                                    protection obligations.
                                </p>

                                <h3>Business customers and partners</h3>
                                <p>
                                    Where we act as a processor, we provide tax outputs and related data back to the platform that integrated
                                    Caesar.
                                </p>

                                <h3>Regulators and authorities</h3>
                                <p>
                                    Where we are legally required to do so, or where data sharing is part of a formal B2G engagement with
                                    appropriate safeguards.
                                </p>

                                <h3>Professional advisers</h3>
                                <p>Lawyers, auditors, and consultants under appropriate confidentiality obligations.</p>

                                <h3>Corporate transactions</h3>
                                <p>
                                    If we engage in a merger, acquisition, financing, or sale of assets, personal data may be transferred as
                                    part of that transaction, subject to appropriate safeguards.
                                </p>

                                <p>
                                    We do <strong>not</strong> sell personal data.
                                </p>
                            </div>

                            <div id="international" className={styles.section}>
                                <h2>7. International transfers</h2>
                                <p>
                                    Caesar Tech Limited is based in Nigeria. Some of our service providers or data storage locations may be
                                    outside Nigeria.
                                </p>

                                <p>
                                    Where we transfer personal data across borders, we take reasonable steps to ensure an adequate level of
                                    protection, consistent with applicable data protection laws. This may include contractual safeguards or
                                    using providers with recognised compliance certifications.
                                </p>
                            </div>

                            <div id="retention" className={styles.section}>
                                <h2>8. Data retention</h2>
                                <p>We retain personal data for as long as reasonably necessary to:</p>
                                <ul>
                                    <li>Provide our services to you or to the platform that engaged us</li>
                                    <li>Comply with applicable laws (including tax and accounting retention requirements)</li>
                                    <li>Resolve disputes and enforce our agreements</li>
                                </ul>

                                <p>
                                    When data is no longer needed, we will delete or anonymise it, subject to any legal requirements to
                                    retain certain records.
                                </p>
                            </div>

                            <div id="your-rights" className={styles.section}>
                                <h2>9. Your rights</h2>
                                <p>
                                    Depending on applicable law and your relationship with us, you may have rights over your personal data,
                                    such as:
                                </p>
                                <ul>
                                    <li>Right of access</li>
                                    <li>Right to rectification</li>
                                    <li>Right to erasure (subject to legal obligations)</li>
                                    <li>Right to restriction</li>
                                    <li>Right to object (including to direct marketing)</li>
                                    <li>Right to data portability</li>
                                </ul>

                                <p>
                                    If your data is processed because a <strong>platform</strong> uses Caesar, you may need to contact that
                                    platform first, as they are typically the primary data controller. We will reasonably assist our customers
                                    in responding to data subject requests.
                                </p>
                            </div>

                            <div id="children" className={styles.section}>
                                <h2>10. Children's data</h2>
                                <p>
                                    Caesar is not directed at children. Our services are aimed at businesses, regulators and adult users of
                                    financial platforms. We do not knowingly collect personal data from children. If you believe we have
                                    collected data from a child, please contact us and we will take appropriate steps.
                                </p>
                            </div>

                            <div id="changes" className={styles.section}>
                                <h2>11. Changes to this Privacy Policy</h2>
                                <p>
                                    We may update this Privacy Policy from time to time. When we make material changes, we will update the
                                    "Effective date" at the top and may provide additional notice (for example, through the service or by
                                    email to account owners).
                                </p>
                            </div>

                            <div id="contact" className={styles.section}>
                                <h2>12. Contact us</h2>
                                <p>If you have questions, concerns, or requests about this Privacy Policy, please contact us at:</p>

                                <div className={styles.callout}>
                                    <p>
                                        <strong>Caesar Tech Limited</strong>
                                        <br />
                                        Lagos, Nigeria
                                        <br />
                                        Email:{' '}
                                        <a href="mailto:privacy@caesar.africa" className={styles.emailLink}>
                                            privacy@caesar.africa
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

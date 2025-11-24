'use client';

import { useState, useEffect } from 'react';
import Hero from '../sections/Hero';
import styles from './LegalPage.module.css';

export default function TermsOfServicePage() {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction' },
        { id: 'services', title: '1. Our services' },
        { id: 'eligibility', title: '2. Eligibility & registration' },
        { id: 'responsibilities', title: '3. Customer responsibilities' },
        { id: 'privacy', title: '4. Data & privacy' },
        { id: 'ip', title: '5. Intellectual property' },
        { id: 'customer-data', title: '6. Customer Data' },
        { id: 'fees', title: '7. Fees & payment' },
        { id: 'availability', title: '8. Service availability' },
        { id: 'disclaimers', title: '9. Disclaimers' },
        { id: 'liability', title: '10. Limitation of liability' },
        { id: 'indemnity', title: '11. Indemnity' },
        { id: 'termination', title: '12. Term & termination' },
        { id: 'changes', title: '13. Changes to Terms' },
        { id: 'governing-law', title: '14. Governing law' },
        { id: 'contact', title: '15. Contact' }
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
            <Hero title="Terms of Service" subtitle="Terms governing your use of Caesar's products and services" />

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
                                    These Terms of Service ("Terms") govern your access to and use of products and services provided by{' '}
                                    <strong>Caesar Tech Limited</strong>, operating as <strong>"Caesar"</strong> ("Caesar", "we", "us", or
                                    "our").
                                </p>

                                <p>
                                    By using Caesar's services, signing an order form, or accessing a Caesar dashboard or API on behalf of an
                                    organisation ("Customer", "you"), you agree to these Terms.
                                </p>

                                <p>If you do not agree, do not use our services.</p>

                                <div className={styles.callout}>
                                    <p>
                                        These Terms are intended for business use (B2B and B2G). If you are an individual user of a platform
                                        that has integrated Caesar, your primary relationship is with that platform, not directly with Caesar.
                                    </p>
                                </div>
                            </div>

                            <div id="services" className={styles.section}>
                                <h2>1. Our services</h2>
                                <p>Caesar provides crypto tax calculation and analytics services, including:</p>
                                <ul>
                                    <li>APIs and tools for processing transaction data</li>
                                    <li>Dashboards and reports showing user-level and platform-level tax outputs</li>
                                    <li>Optional analytics and reporting for tax authorities and regulators</li>
                                </ul>

                                <p>
                                    The exact services you receive may be described in an <strong>order form</strong>, statement of work, or
                                    separate commercial agreement between your organisation and Caesar (each an "Order").
                                </p>
                            </div>

                            <div id="eligibility" className={styles.section}>
                                <h2>2. Eligibility and account registration</h2>
                                <p>To use Caesar as a business customer, you must:</p>
                                <ul>
                                    <li>Be a duly incorporated legal entity or government body</li>
                                    <li>Have the authority to accept these Terms on behalf of that entity</li>
                                    <li>Comply with applicable laws in Nigeria and any other relevant jurisdiction</li>
                                </ul>

                                <p>
                                    You may be required to create an account and provide certain information (for example, company details,
                                    contact information, billing details). You are responsible for:
                                </p>
                                <ul>
                                    <li>Ensuring information is accurate and up to date</li>
                                    <li>Maintaining the confidentiality of your login credentials</li>
                                    <li>All activities that occur under your account</li>
                                </ul>

                                <p>Notify us promptly of any unauthorised access or suspected security breach.</p>
                            </div>

                            <div id="responsibilities" className={styles.section}>
                                <h2>3. Customer responsibilities</h2>
                                <p>You agree to:</p>
                                <ul>
                                    <li>Provide complete, accurate and lawful data to Caesar</li>
                                    <li>
                                        Only send data you are permitted to share under applicable law and your own privacy policies
                                    </li>
                                    <li>Not use Caesar for any illegal or prohibited purpose</li>
                                    <li>Cooperate with us to address technical or security issues where needed</li>
                                </ul>

                                <p>You are responsible for:</p>
                                <ul>
                                    <li>Your own infrastructure and security</li>
                                    <li>The accuracy and completeness of the data you provide</li>
                                    <li>
                                        How you use Caesar's outputs (for example, in preparing filings or making business decisions)
                                    </li>
                                </ul>

                                <p>
                                    Caesar does <strong>not</strong> provide legal, tax or accounting advice. Our outputs are tools to assist
                                    your teams and advisers; final responsibility for compliance and filings rests with you.
                                </p>
                            </div>

                            <div id="privacy" className={styles.section}>
                                <h2>4. Data and privacy</h2>
                                <p>
                                    Our use of personal data is described in our <strong>Privacy Policy</strong>.
                                </p>

                                <p>
                                    Where we process data about your users, customers or employees, we may act as a{' '}
                                    <strong>data processor</strong> on your behalf. In such cases, a separate{' '}
                                    <strong>data processing agreement</strong> ("DPA") may apply and, in case of conflict, will prevail over
                                    these Terms with respect to data protection matters.
                                </p>

                                <p>
                                    You are responsible for providing any necessary notices and obtaining any required consents from your
                                    users before sending their data to Caesar.
                                </p>
                            </div>

                            <div id="ip" className={styles.section}>
                                <h2>5. Intellectual property</h2>
                                <p>All rights, title and interest in and to:</p>
                                <ul>
                                    <li>The Caesar platform, software, interfaces and documentation</li>
                                    <li>Our tax logic, models, algorithms and know-how</li>
                                    <li>Any improvements or modifications thereto</li>
                                </ul>

                                <p>
                                    are and remain the exclusive property of <strong>Caesar Tech Limited</strong> and its licensors.
                                </p>

                                <p>
                                    Subject to your compliance with these Terms and any applicable Order, we grant you a{' '}
                                    <strong>limited, non-exclusive, non-transferable, revocable licence</strong> to access and use the
                                    services solely for your internal business purposes.
                                </p>

                                <p>You must not:</p>
                                <ul>
                                    <li>Reverse engineer, decompile or attempt to derive the source code of our services</li>
                                    <li>Use the services to build a competing product or service</li>
                                    <li>Remove or obscure any proprietary notices</li>
                                </ul>
                            </div>

                            <div id="customer-data" className={styles.section}>
                                <h2>6. Customer Data and licence</h2>
                                <p>
                                    You retain all rights to the data you send to Caesar ("<strong>Customer Data</strong>").
                                </p>

                                <p>
                                    By using the services, you grant Caesar a <strong>non-exclusive, worldwide, royalty-free licence</strong>{' '}
                                    to:
                                </p>
                                <ul>
                                    <li>
                                        Use, copy, process, store and transmit Customer Data as necessary to provide, maintain and improve the
                                        services
                                    </li>
                                    <li>
                                        Generate aggregated or anonymised data that does not identify you or your users, which we may use for
                                        analytics, improving the service and other lawful business purposes
                                    </li>
                                </ul>

                                <p>We do not claim ownership over your Customer Data.</p>
                            </div>

                            <div id="fees" className={styles.section}>
                                <h2>7. Fees and payment</h2>
                                <p>Fees and payment terms are defined in your Order or separate commercial agreement.</p>

                                <p>Unless otherwise specified:</p>
                                <ul>
                                    <li>Fees are due in advance or on the schedule indicated in the Order</li>
                                    <li>Invoices are payable within the timeframe specified (for example, 30 days)</li>
                                    <li>Late payments may result in interest or temporary suspension of service</li>
                                </ul>

                                <p>
                                    You are responsible for any applicable taxes (excluding taxes based on Caesar's income), including VAT
                                    where applicable. We may charge such taxes in addition to our fees.
                                </p>
                            </div>

                            <div id="availability" className={styles.section}>
                                <h2>8. Service availability and changes</h2>
                                <p>We aim to provide reliable, high-availability services, but:</p>
                                <ul>
                                    <li>We do not guarantee continuous, uninterrupted access</li>
                                    <li>We may perform maintenance or upgrades from time to time</li>
                                    <li>
                                        We may modify or discontinue certain features, provided we maintain overall service functionality under
                                        your Order
                                    </li>
                                </ul>

                                <p>Where a material change negatively affects you, we will provide reasonable notice where practicable.</p>
                            </div>

                            <div id="disclaimers" className={styles.section}>
                                <h2>9. Disclaimers</h2>
                                <p>To the maximum extent permitted by law:</p>
                                <ul>
                                    <li>
                                        Our services are provided on an "<strong>as is</strong>" and "<strong>as available</strong>" basis
                                    </li>
                                    <li>
                                        We do not warrant that the services will be error-free, fully accurate or fit for a particular purpose
                                    </li>
                                    <li>
                                        Tax law is complex and may change; Caesar helps you apply current rules, but does not replace
                                        professional legal, tax or accounting advice
                                    </li>
                                </ul>

                                <p>
                                    You are responsible for validating outputs, deciding how to rely on them, and making final compliance
                                    decisions.
                                </p>
                            </div>

                            <div id="liability" className={styles.section}>
                                <h2>10. Limitation of liability</h2>
                                <p>To the maximum extent permitted by law, and except for liability that cannot be excluded:</p>
                                <ul>
                                    <li>
                                        Caesar will not be liable for any <strong>indirect, consequential, special or punitive damages</strong>,
                                        or for loss of profits, revenue, data or business arising out of or related to the services or these
                                        Terms
                                    </li>
                                    <li>
                                        Caesar's total aggregate liability arising out of or related to the services or these Terms will be
                                        limited to the amounts paid by you to Caesar under the applicable Order in the <strong>12 months</strong>{' '}
                                        preceding the event giving rise to the claim
                                    </li>
                                </ul>

                                <p>If a separate signed agreement sets different caps or limitations, that agreement will prevail.</p>
                            </div>

                            <div id="indemnity" className={styles.section}>
                                <h2>11. Indemnity</h2>
                                <p>
                                    You agree to indemnify and hold Caesar harmless from any claims, damages, losses and expenses (including
                                    reasonable legal fees) arising out of or related to:
                                </p>
                                <ul>
                                    <li>Your misuse of the services</li>
                                    <li>Your violation of these Terms or applicable law</li>
                                    <li>Any data you provide to Caesar that infringes third-party rights</li>
                                </ul>
                            </div>

                            <div id="termination" className={styles.section}>
                                <h2>12. Term and termination</h2>
                                <p>
                                    These Terms apply from the time you first use the services or sign an Order, and continue until:
                                </p>
                                <ul>
                                    <li>The applicable Order or subscription ends; or</li>
                                    <li>Either party terminates in accordance with these Terms or a separate signed agreement</li>
                                </ul>

                                <p>We may suspend or terminate your access if:</p>
                                <ul>
                                    <li>
                                        You materially breach these Terms or an Order and fail to remedy within a reasonable time
                                    </li>
                                    <li>You use the services in a way that risks security, stability or legal compliance</li>
                                </ul>

                                <p>On termination:</p>
                                <ul>
                                    <li>Your right to access the services will end</li>
                                    <li>We may retain certain data as required by law or for legitimate business purposes</li>
                                    <li>Any fees accrued up to termination remain payable</li>
                                </ul>
                            </div>

                            <div id="changes" className={styles.section}>
                                <h2>13. Changes to these Terms</h2>
                                <p>
                                    We may update these Terms from time to time. When we do, we will update the "Effective date" at the top
                                    and may provide notice through the service or by email.
                                </p>

                                <p>
                                    If you continue using the services after changes take effect, you will be deemed to have accepted the
                                    updated Terms. If you do not agree, you should stop using the services.
                                </p>
                            </div>

                            <div id="governing-law" className={styles.section}>
                                <h2>14. Governing law and dispute resolution</h2>
                                <p>
                                    These Terms are governed by the laws of the <strong>Federal Republic of Nigeria</strong>, without regard
                                    to conflict of law principles.
                                </p>

                                <p>
                                    Any disputes arising out of or in connection with these Terms or the services will be subject to the
                                    exclusive jurisdiction of the courts of <strong>Lagos State, Nigeria</strong>, unless otherwise agreed in
                                    a separate written agreement.
                                </p>
                            </div>

                            <div id="contact" className={styles.section}>
                                <h2>15. Contact</h2>
                                <p>If you have questions about these Terms, please contact:</p>

                                <div className={styles.callout}>
                                    <p>
                                        <strong>Caesar Tech Limited</strong>
                                        <br />
                                        Lagos, Nigeria
                                        <br />
                                        Email:{' '}
                                        <a href="mailto:legal@caesar.africa" className={styles.emailLink}>
                                            legal@caesar.africa
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

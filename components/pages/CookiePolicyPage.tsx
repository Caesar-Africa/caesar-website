'use client';

import { useState, useEffect } from 'react';
import Hero from '../sections/Hero';
import styles from './LegalPage.module.css';

export default function CookiePolicyPage() {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', title: 'Introduction' },
        { id: 'what-cookies', title: '1. What are cookies?' },
        { id: 'how-use', title: '2. How we use cookies' },
        { id: 'types', title: '3. Types of cookies' },
        { id: 'third-party', title: '4. Third-party cookies' },
        { id: 'manage', title: '5. How to manage' },
        { id: 'changes', title: '6. Changes' },
        { id: 'contact', title: '7. Contact us' }
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
            <Hero title="Cookie Policy" subtitle="How Caesar uses cookies and similar technologies" />

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
                                    This Cookie Policy explains how <strong>Caesar Tech Limited</strong>, operating as{' '}
                                    <strong>"Caesar"</strong> ("we", "us", or "our"), uses cookies and similar technologies on our websites
                                    and web applications.
                                </p>
                            </div>

                            <div id="what-cookies" className={styles.section}>
                                <h2>1. What are cookies?</h2>
                                <p>
                                    Cookies are small text files stored on your device when you visit a website. They help websites function
                                    properly, remember your preferences and understand how visitors use the site.
                                </p>

                                <p>
                                    We also use similar technologies, such as pixels and local storage. In this Policy, we refer to all of
                                    these as "cookies".
                                </p>
                            </div>

                            <div id="how-use" className={styles.section}>
                                <h2>2. How we use cookies</h2>
                                <p>We use cookies on our websites and web applications to:</p>
                                <ul>
                                    <li>Make the site work correctly and securely</li>
                                    <li>Remember your preferences (for example, language or session state)</li>
                                    <li>Understand how visitors use our site so we can improve it</li>
                                    <li>Support limited marketing and communication activities</li>
                                </ul>

                                <p>
                                    We do <strong>not</strong> use cookies to read private information from your device or to store passwords
                                    or private keys.
                                </p>
                            </div>

                            <div id="types" className={styles.section}>
                                <h2>3. Types of cookies we use</h2>

                                <h3>3.1 Strictly necessary cookies</h3>
                                <p>These cookies are essential for the website or app to function. They enable basic features such as:</p>
                                <ul>
                                    <li>Secure login</li>
                                    <li>Page navigation</li>
                                    <li>Form submissions</li>
                                    <li>Load balancing and security</li>
                                </ul>

                                <p>
                                    Without these cookies, parts of the site may not work properly. You cannot disable them via our cookie
                                    settings.
                                </p>

                                <h3>3.2 Performance and analytics cookies</h3>
                                <p>These cookies help us understand how visitors use our site, for example:</p>
                                <ul>
                                    <li>Which pages are visited most often</li>
                                    <li>How long users stay on a page</li>
                                    <li>Whether visitors encounter errors</li>
                                </ul>

                                <p>
                                    We typically use third-party analytics tools for this. The data is used in aggregate to improve
                                    performance and usability.
                                </p>

                                <p>Where required by law, we will only use these cookies if you consent.</p>

                                <h3>3.3 Functional cookies</h3>
                                <p>These cookies allow the site to remember choices you make, such as:</p>
                                <ul>
                                    <li>Language or region</li>
                                    <li>Display preferences</li>
                                    <li>Whether you have dismissed certain notices</li>
                                </ul>

                                <p>They help us provide a smoother, more personalised experience.</p>

                                <h3>3.4 Marketing and advertising cookies</h3>
                                <p>We may, from time to time, use limited marketing or advertising cookies to:</p>
                                <ul>
                                    <li>Measure the effectiveness of campaigns</li>
                                    <li>Understand which channels bring visitors to our site</li>
                                    <li>Show relevant information about Caesar to people who have visited our website</li>
                                </ul>

                                <p>
                                    Where used, these cookies will only be set with your consent via our cookie banner or settings, where
                                    applicable.
                                </p>
                            </div>

                            <div id="third-party" className={styles.section}>
                                <h2>4. Third-party cookies</h2>
                                <p>Some cookies on our site may be set by third parties, for example:</p>
                                <ul>
                                    <li>Analytics providers</li>
                                    <li>Embedded content (such as videos or widgets)</li>
                                    <li>Customer support chat tools</li>
                                </ul>

                                <p>
                                    These third parties have their own privacy and cookie policies. We do not control how they use their
                                    cookies, but we choose reputable providers and limit what they can do on our sites.
                                </p>
                            </div>

                            <div id="manage" className={styles.section}>
                                <h2>5. How to manage cookies</h2>
                                <p>You have several options for managing cookies:</p>

                                <h3>On-site settings</h3>
                                <p>
                                    Where available, you can use our cookie banner or settings panel to accept or reject non-essential
                                    cookies.
                                </p>

                                <h3>Browser settings</h3>
                                <p>
                                    Most browsers allow you to block or delete cookies via their settings. This may affect how our site
                                    functions, especially for strictly necessary cookies.
                                </p>

                                <h3>Third-party opt-outs</h3>
                                <p>Some analytics or advertising providers offer their own opt-out tools.</p>

                                <p>
                                    Please note that blocking or deleting cookies may impair your ability to use certain features of our
                                    website or dashboard.
                                </p>
                            </div>

                            <div id="changes" className={styles.section}>
                                <h2>6. Changes to this Cookie Policy</h2>
                                <p>
                                    We may update this Cookie Policy from time to time, for example if we add new tools or change how we use
                                    cookies. When we do, we will update the "Effective date" and may show a notice on our site.
                                </p>
                            </div>

                            <div id="contact" className={styles.section}>
                                <h2>7. Contact us</h2>
                                <p>If you have questions about our use of cookies, please contact:</p>

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

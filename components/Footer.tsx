'use client';

import styles from './Footer.module.css';

interface FooterProps {
    onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <h3>CAESAR</h3>
                        <p>
                            Crypto tax engine for African markets. We help crypto businesses and public institutions
                            turn transaction data into consistent, audit-ready tax outputs.
                        </p>

                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                <span>X</span>
                            </a>
                            <a href="https://www.linkedin.com/company/caesar-africa" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                <span>in</span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Email">
                                <span>@</span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Product</h4>
                        <a onClick={() => onNavigate('product')}>How it works</a>
                        <a onClick={() => onNavigate('platforms')}>For platforms</a>
                        <a onClick={() => onNavigate('governments')}>For governments</a>
                        <a onClick={() => onNavigate('pricing')}>Pricing</a>
                        <a onClick={() => onNavigate('widget')}>Tax Widget</a>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Company</h4>
                        <a onClick={() => onNavigate('about')}>About</a>
                        <a onClick={() => onNavigate('contact')}>Contact</a>
                        <a href="#">Careers</a>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Resources</h4>
                        <a href="#">Documentation</a>
                        <a href="#">API Reference</a>
                        <a href="#">Country Guides</a>
                        <a onClick={() => onNavigate('faq')}>FAQ</a>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.footerBottomContent}>
                        <span>© {currentYear} Caesar. All rights reserved.</span>
                        <div className={styles.footerLegal}>
                            <a onClick={() => onNavigate('privacy')}>Privacy Policy</a>
                            <a onClick={() => onNavigate('terms')}>Terms of Service</a>
                            <a onClick={() => onNavigate('cookies')}>Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

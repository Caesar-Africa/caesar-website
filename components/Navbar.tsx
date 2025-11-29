'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    onOpenModal: () => void;
}

export default function Navbar({ activePage, onNavigate, onOpenModal }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (page: string) => {
        onNavigate(page);
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <a onClick={() => handleNavClick('home')} className={styles.logo}>
                    CAESAR
                </a>

                <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
                    <a
                        onClick={() => handleNavClick('home')}
                        className={activePage === 'home' ? styles.active : ''}
                        aria-label="Navigate to home page"
                    >
                        Home
                    </a>
                    <a
                        onClick={() => handleNavClick('product')}
                        className={activePage === 'product' ? styles.active : ''}
                        aria-label="Navigate to product page"
                    >
                        Product
                    </a>
                    <a
                        onClick={() => handleNavClick('platforms')}
                        className={activePage === 'platforms' ? styles.active : ''}
                    >
                        Platforms
                    </a>
                    <a
                        onClick={() => handleNavClick('governments')}
                        className={activePage === 'governments' ? styles.active : ''}
                    >
                        Governments
                    </a>
                    <a
                        onClick={() => handleNavClick('pricing')}
                        className={activePage === 'pricing' ? styles.active : ''}
                    >
                        Pricing
                    </a>
                    <a
                        onClick={() => handleNavClick('about')}
                        className={activePage === 'about' ? styles.active : ''}
                    >
                        About
                    </a>
                </div>

                <a onClick={onOpenModal} className={styles.navCta} aria-label="Open contact modal">
                    Request Access
                </a>

                <button
                    className={styles.mobileMenuToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}

'use client';

import { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import RequestAccessForm from './RequestAccessForm';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales' | 'request-brief' | 'request-access';
}

const modalConfigs = {
    'book-demo': {
        title: 'Book a demo',
        subtitle: 'Share a few details so we can match you with the right person.',
    },
    'get-started': {
        title: 'Get started with Caesar',
        subtitle: "Tell us who you are. We'll follow up with next steps.",
    },
    'talk-to-us': {
        title: 'Talk to our team',
        subtitle: 'Two quick questions so we know who should reply.',
    },
    'contact-sales': {
        title: 'Contact sales',
        subtitle: "We'll get back to you with pricing and options.",
    },
    'request-brief': {
        title: 'Request technical brief',
        subtitle: 'Get detailed documentation on Caesar\'s API, data models, and integration process.',
    },
    'request-access': {
        title: 'Request Access',
        subtitle: 'Join the leading platforms using Caesar for crypto tax compliance.',
    },
};

export default function Modal({ isOpen, onClose, type }: ModalProps) {
    const config = modalConfigs[type];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // FormSubmit endpoint - replace with actual email
    const formSubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL || 'contact@caesar.africa';

    return (
        <div className={`${styles.modalOverlay} ${isOpen ? styles.active : ''}`} onClick={handleOverlayClick}>
            <div className={styles.modalContainer}>
                <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>

                <div className={styles.modalHeader}>
                    <h2>{config.title}</h2>
                    <p>{config.subtitle}</p>
                </div>

                {type === 'request-access' ? (
                    <RequestAccessForm />
                ) : (
                    <form className={styles.modalForm} action="https://api.web3forms.com/submit" method="POST">
                        {/* Web3Forms configuration */}
                        <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '5847e2e2-90f4-4c1c-b0f0-3d70d9507953'} />
                        <input type="hidden" name="subject" value={`New ${type} request from Caesar website`} />
                        <input type="hidden" name="redirect" value="https://www.caesar.africa?submitted=true" />
                        <input type="hidden" name="form_type" value={type} />

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                I&apos;m with a... <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioOption}>
                                    <input type="radio" name="organization_type" value="crypto_platform" required />
                                    <span className={styles.radioLabel}>Crypto platform</span>
                                    <span className={styles.radioHint}>
                                        Exchange, wallet, payment/checkout, remittance app, neobank
                                    </span>
                                </label>
                                <label className={styles.radioOption}>
                                    <input type="radio" name="organization_type" value="public_institution" required />
                                    <span className={styles.radioLabel}>Public institution</span>
                                    <span className={styles.radioHint}>Tax authority, regulator, central bank...</span>
                                </label>
                                <label className={styles.radioOption}>
                                    <input type="radio" name="organization_type" value="other" required />
                                    <span className={styles.radioLabel}>Other organisation</span>
                                </label>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="work-email">
                                Work email <span className={styles.required}>*</span>
                            </label>
                            <input type="email" id="work-email" name="email" placeholder="you@company.org" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="org-name">
                                Organisation name <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="org-name" name="organization" placeholder="Organisation name" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="country">
                                Country <span className={styles.required}>*</span>
                            </label>
                            <select id="country" name="country" required>
                                <option value="">Select country</option>
                                <option value="NG">Nigeria</option>
                                <option value="KE">Kenya</option>
                                <option value="ZA">South Africa</option>
                                <option value="GH">Ghana</option>
                                <option value="EG">Egypt</option>
                                <option value="MA">Morocco</option>
                                <option value="RW">Rwanda</option>
                                <option value="UG">Uganda</option>
                                <option value="TZ">Tanzania</option>
                                <option value="ET">Ethiopia</option>
                                <option value="OTHER">Other African country</option>
                                <option value="INTL">International</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="interest">
                                What do you want to explore? <span className={styles.required}>*</span>
                            </label>
                            <select id="interest" name="interest" required>
                                <option value="">Select an option</option>
                                <option value="user_tax">User crypto tax for our customers</option>
                                <option value="platform_tax">VAT / Withholding Tax on our platform fees and services</option>
                                <option value="both_tax">Both user tax and our own platform taxes</option>
                                <option value="gov_dashboards">Government dashboards / analytics</option>
                                <option value="pilot">Pilot or proof of concept</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" name="consent" required />
                                <span>
                                    I agree to be contacted about Caesar and accept the{' '}
                                    <a href="#" className={styles.link}>
                                        privacy policy
                                    </a>
                                    .
                                </span>
                            </label>
                        </div>

                        <button type="submit" className={styles.btnSubmit} aria-label="Submit form">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

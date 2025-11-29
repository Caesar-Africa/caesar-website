'use client';

import { useState } from 'react';
import styles from './RequestAccessForm.module.css';

export default function RequestAccessForm() {
    const [formData, setFormData] = useState({
        businessName: '',
        country: '',
        taxSizeBand: '',
        products: [] as string[],
        mau: '',
        contactName: '',
        role: '',
        email: '',
        phone: '',
        useCase: '',
        useCaseDetails: '',
        timeline: '',
        notes: ''
    });
    const [emailError, setEmailError] = useState('');

    const PUBLIC_DOMAINS = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com'
    ];

    const validateEmail = (email: string) => {
        const domain = email.split('@')[1];
        if (domain && PUBLIC_DOMAINS.includes(domain.toLowerCase())) {
            setEmailError('Please use a work email address.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'email') {
            validateEmail(value);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            if (checked) {
                return { ...prev, products: [...prev.products, value] };
            } else {
                return { ...prev, products: prev.products.filter(p => p !== value) };
            }
        });
    };

    return (
        <form className={styles.formContainer} action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '5847e2e2-90f4-4c1c-b0f0-3d70d9507953'} />
            <input type="hidden" name="subject" value="New Access Request" />
            <input type="hidden" name="redirect" value="https://www.caesar.africa?submitted=true" />

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="businessName">Business Name <span className={styles.required}>*</span></label>
                    <p className={styles.helpText}>The name your customers know you by (trading name).</p>
                    <input className={styles.input} type="text" id="businessName" name="businessName" required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="country">Primary country for tax <span className={styles.required}>*</span></label>
                    <p className={styles.helpText}>Where most of your users are based for this first integration.</p>
                    <select className={styles.select} id="country" name="country" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="NG">Nigeria</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="taxSizeBand">Estimated annual crypto trading volume (USD) <span className={styles.required}>*</span></label>
                    <select className={styles.select} id="taxSizeBand" name="taxSizeBand" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="<5m">&lt; US$5M</option>
                        <option value="5m-20m">US$5M – US$20M</option>
                        <option value="20m-100m">US$20M – US$100M</option>
                        <option value=">100m">&gt; US$100M</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="mau">Users whose crypto tax you want Caesar to calculate each month (Nigeria) <span className={styles.required}>*</span></label>
                    <select className={styles.select} id="mau" name="mau" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="<5k">&lt; 5,000</option>
                        <option value="5k-20k">5,000 – 20,000</option>
                        <option value="20k-50k">20,000 – 50,000</option>
                        <option value="50k-100k">50,000 – 100,000</option>
                        <option value=">100k">&gt; 100,000</option>
                    </select>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>How can we help? <span className={styles.required}>*</span></label>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input className={styles.checkbox} type="checkbox" name="products" value="User Taxes" onChange={handleCheckboxChange} />
                        <span>User Taxes</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input className={styles.checkbox} type="checkbox" name="products" value="Platform Taxes" onChange={handleCheckboxChange} />
                        <span>Platform Taxes</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input className={styles.checkbox} type="checkbox" name="products" value="Reporting" onChange={handleCheckboxChange} />
                        <span>Reporting</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input className={styles.checkbox} type="checkbox" name="products" value="Advisory" onChange={handleCheckboxChange} />
                        <span>Advisory</span>
                    </label>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contactName">Your Name <span className={styles.required}>*</span></label>
                    <input className={styles.input} type="text" id="contactName" name="contactName" required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="role">Job Title <span className={styles.required}>*</span></label>
                    <select className={styles.select} id="role" name="role" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="Founder / C-Level">Founder / C-Level</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Engineering / Developer">Engineering / Developer</option>
                        <option value="Compliance / Legal">Compliance / Legal</option>
                        <option value="Finance / Operations">Finance / Operations</option>
                        <option value="Sales / Partnerships">Sales / Partnerships</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">Work Email <span className={styles.required}>*</span></label>
                    <input className={styles.input} type="email" id="email" name="email" required onChange={handleChange} />
                    {emailError && <span className={styles.errorMessage}>{emailError}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="phone">Phone Number <span className={styles.required}>*</span></label>
                    <input className={styles.input} type="tel" id="phone" name="phone" required onChange={handleChange} />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="useCase">Platform Type <span className={styles.required}>*</span></label>
                <select className={styles.select} id="useCase" name="useCase" required onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="Centralised exchange">Centralised exchange</option>
                    <option value="P2P or OTC platform">P2P or OTC platform</option>
                    <option value="Crypto wallet / super-app">Crypto wallet / super-app</option>
                    <option value="Payment gateway / merchant platform">Payment gateway / merchant platform</option>
                    <option value="Neobank/Fintech">Neobank/Fintech</option>
                    <option value="Investment / trading app">Investment / trading app</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="timeline">When do you want to go live with Caesar? <span className={styles.required}>*</span></label>
                <select className={styles.select} id="timeline" name="timeline" required onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="Just exploring">Just exploring (no fixed date)</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Before next tax filing deadline">Before next tax filing deadline</option>
                    <option value="Already live, need to backfill">Already live, need to backfill</option>
                </select>
            </div>

            {formData.useCase === 'Other' && (
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="useCaseDetails">Please specify platform type</label>
                    <textarea className={styles.textarea} id="useCaseDetails" name="useCaseDetails" rows={2} onChange={handleChange}></textarea>
                </div>
            )}

            <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="notes">Anything else we should know? (optional)</label>
                <textarea className={styles.textarea} id="notes" name="notes" rows={3} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className={styles.submitButton} disabled={!!emailError}>Submit Request</button>
        </form>
    );
}

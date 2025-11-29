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
        useCaseDetails: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                    <label className={styles.formLabel} htmlFor="businessName">Company Name <span className={styles.required}>*</span></label>
                    <input className={styles.input} type="text" id="businessName" name="businessName" required onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="country">Country <span className={styles.required}>*</span></label>
                    <select className={styles.select} id="country" name="country" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="NG">Nigeria</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="taxSizeBand">Est. Annual Tax Volume <span className={styles.required}>*</span></label>
                    <select className={styles.select} id="taxSizeBand" name="taxSizeBand" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="<10k">&lt;$10k</option>
                        <option value="10k-50k">$10k - $50k</option>
                        <option value="50k-100k">$50k - $100k</option>
                        <option value=">100k">&gt;$100k</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="mau">Monthly Active Users <span className={styles.required}>*</span></label>
                    <select className={styles.select} id="mau" name="mau" required onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="<1k">&lt;1k</option>
                        <option value="1k-10k">1k - 10k</option>
                        <option value="10k-100k">10k - 100k</option>
                        <option value=">100k">&gt;100k</option>
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
                    <input className={styles.input} type="text" id="role" name="role" required onChange={handleChange} />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">Work Email <span className={styles.required}>*</span></label>
                    <input className={styles.input} type="email" id="email" name="email" required onChange={handleChange} />
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
                    <option value="Exchange">Exchange</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Neobank">Neobank</option>
                    <option value="Payment Processor">Payment Processor</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {formData.useCase === 'Other' && (
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="useCaseDetails">Please specify</label>
                    <textarea className={styles.textarea} id="useCaseDetails" name="useCaseDetails" rows={3} onChange={handleChange}></textarea>
                </div>
            )}

            <button type="submit" className={styles.submitButton}>Submit Request</button>
        </form>
    );
}

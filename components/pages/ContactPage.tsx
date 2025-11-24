'use client';


import Hero from '../sections/Hero';
import styles from '../sections/shared.module.css';

export default function ContactPage() {
    // FormSubmit endpoint - replace with actual email
    const formSubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL || 'contact@caesar.africa';

    return (
        <>
            <Hero title="Let's discuss your crypto tax needs" subtitle="Our team is ready to show you Caesar in action" />

            <section>
                <div className="container">
                    <div className={styles.iconCards} style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className={styles.iconCard} style={{ gridColumn: 'span 2' }}>
                            <div className={styles.iconWrapper}>📧</div>
                            <h3>Get in touch</h3>
                            <p style={{ margin: '20px 0' }}>
                                Share your requirements and we&apos;ll schedule a demonstration tailored to your needs
                            </p>

                            <form
                                action={`https://formsubmit.co/${formSubmitEmail}`}
                                method="POST"
                                style={{ textAlign: 'left', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}
                            >
                                {/* FormSubmit configuration */}
                                <input type="hidden" name="_subject" value="New Contact Page submission from Caesar website" />
                                <input type="hidden" name="_template" value="table" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_next" value="https://www.caesar.africa?submitted=true" />
                                <input type="hidden" name="_form_type" value="contact_page" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                                        Full Name <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                                        Work Email <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@company.org"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                                        Organisation Name <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="organization"
                                        placeholder="Organisation name"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                                        Country <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <select
                                        name="country"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                        }}
                                    >
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

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                                        What would you like to discuss? <span style={{ color: 'var(--primary)' }}>*</span>
                                    </label>
                                    <select
                                        name="interest"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="">Select an option</option>
                                        <option value="user_tax">User crypto tax for our customers</option>
                                        <option value="platform_tax">VAT / Withholding Tax on our platform fees</option>
                                        <option value="both_tax">Both user tax and platform taxes</option>
                                        <option value="gov_dashboards">Government dashboards / analytics</option>
                                        <option value="pilot">Pilot or proof of concept</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600 }}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Tell us more about your needs..."
                                        rows={5}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--border)',
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'inherit',
                                            resize: 'vertical',
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        required
                                        style={{
                                            marginTop: '2px',
                                            width: '18px',
                                            height: '18px',
                                            cursor: 'pointer',
                                            accentColor: 'var(--primary)',
                                        }}
                                    />
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', cursor: 'pointer' }}>
                                        I agree to be contacted about Caesar and accept the{' '}
                                        <a href="#" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                            privacy policy
                                        </a>
                                        .
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={styles.btnPrimary}
                                    style={{ width: '100%', fontSize: '1.1rem', padding: '16px 32px' }}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

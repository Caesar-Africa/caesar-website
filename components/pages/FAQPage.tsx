'use client';

import { useState } from 'react';
import Hero from '../sections/Hero';
import styles from './FAQPage.module.css';

export default function FAQPage() {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    const toggleQuestion = (id: string) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    const faqSections = [
        {
            title: '1. General',
            questions: [
                {
                    id: 'general-1',
                    question: 'What is Caesar?',
                    answer: `Caesar is a crypto tax engine for platforms in Africa.

We plug into exchanges, wallets and payment apps to automatically calculate:

• Each user's crypto tax position, and
• Your own VAT and Withholding Tax (WHT) on platform fees,

based on Nigerian tax rules. You get APIs and dashboards; your users never have to open Excel or read tax legislation.`
                },
                {
                    id: 'general-2',
                    question: 'Who is Caesar for?',
                    answer: `Caesar is built for organisations, not for individual taxpayers.

Today we work with:

• Crypto exchanges and trading apps
• Consumer and custodial wallets
• Fintechs and payment platforms that touch digital assets
• Companies that hold or trade crypto on their balance sheet

We also offer a separate product for tax authorities and regulators (see "Platforms vs Regulators" below).`
                },
                {
                    id: 'general-3',
                    question: 'Which country do you support today?',
                    answer: `Right now, Caesar supports Nigeria only.

Our engine is aligned with current Nigerian rules for:

• Individual tax on crypto gains and income
• Corporate tax on crypto-related profits
• Value Added Tax (VAT) on relevant platform fees
• Withholding Tax (WHT) where it applies to payments you make

More African markets are on the roadmap, but Nigeria comes first.`
                },
                {
                    id: 'general-4',
                    question: 'Is Caesar a wallet or an exchange?',
                    answer: `No. Caesar is not a wallet, broker, or exchange.

We don't hold funds and we don't execute trades. We work on data only and send back clean tax outputs you can plug into your own systems and processes.`
                }
            ]
        },
        {
            title: '2. Taxable Crypto Events',
            questions: [
                {
                    id: 'events-1',
                    question: 'What crypto events are taxable for my users?',
                    answer: `For individual users in Nigeria, crypto usually becomes taxable when:

• They cash out – convert crypto into naira or spend it, or
• They receive value – get paid or rewarded in crypto.

Common taxable events for individuals include:

Selling crypto for naira
Example: a user sells BTC for NGN on your platform. Any gain (selling value minus cost) can be taxable.

Swapping one crypto for another
Example: swapping USDT for SOL. The crypto they give up is treated as if they sold it for naira at that moment.

Spending crypto on goods or services
Example: paying a hotel, restaurant, or merchant in USDT. The crypto they spend is treated like a disposal.

Rewards, airdrops, interest and yield
Example: staking rewards, bonus tokens, referral rewards or interest on stablecoins. The naira value at the time they receive it is treated as taxable income.

Certain NFT sales
Example: selling an NFT for ETH or USDT. The value they receive can create a taxable gain.

Caesar looks across all of this and works out which parts are actually taxable for the year.`
                },
                {
                    id: 'events-2',
                    question: 'Can you give simple examples for individuals?',
                    answer: `Example 1 – Trading gain

A user's total crypto trading gain across the year is ₦2,000,000.

In a very simplified case where they have no other income:

• The first ₦800,000 is tax-free under the current bands.
• The remaining ₦1,200,000 falls into the next tax band and is taxed at the relevant rate.

Caesar does the detailed band-by-band maths in the background and simply shows the final tax due on their crypto activity.

Example 2 – Rewards and interest

A user earns:

• ₦300,000 in staking rewards, and
• ₦200,000 as interest on stablecoins.

That's ₦500,000 of taxable income from crypto. Caesar adds that to the user's other taxable crypto income and calculates the resulting tax for the year.`
                },
                {
                    id: 'events-3',
                    question: 'What crypto events matter for platforms and companies?',
                    answer: `For platforms and corporate entities, crypto shows up in three main areas:

1. Crypto profits
   Gains and losses from holding or trading crypto in the business.

2. Platform and service fees
   Trading fees, withdrawal fees, card fees, subscription or service fees — these are typically taxable business income.

3. Payments you make that attract WHT
   Service and professional payments where you're required to deduct Withholding Tax.

Caesar separates:

• Your users' taxable crypto activity from
• Your own crypto-related profits, VAT and WHT obligations.`
                },
                {
                    id: 'events-4',
                    question: 'How does VAT apply to crypto platforms?',
                    answer: `VAT in Nigeria focuses on taxable supplies of services, which usually includes many of the fees a platform charges, even if the underlying asset is crypto.

Typical fee types that can attract VAT:

• Trading commissions
• Fiat withdrawal or deposit fees
• Card and payment processing fees
• Some subscription or service charges

Example – VAT on a trading fee

A user pays a ₦1,000 trading fee.

• VAT at 7.5% = ₦75
• The user pays ₦1,075 in total
• Your platform keeps the fee but must account for and remit ₦75 to FIRS in your VAT return

Caesar tracks VAT on platform fees over the period so your finance team can file accurately.

(Exact VAT treatment always depends on the type of fee and current legislation; Caesar's rules are kept aligned with Nigerian law.)`
                },
                {
                    id: 'events-5',
                    question: 'When does Withholding Tax (WHT) apply?',
                    answer: `WHT mostly comes into play when you are paying someone else, not when you're earning fees.

Common WHT situations for a platform or crypto business in Nigeria include:

• Paying local service providers (consultants, agencies, contractors)
• Certain professional, technical or management services
• Some interest or royalty-type payments

Example – WHT on a local service payment

Your platform pays a Nigerian marketing agency ₦5,000,000 for services.

• Applicable WHT rate for that service = 10%
• You withhold ₦500,000 and remit it to FIRS
• The agency receives ₦4,500,000 plus a ₦500,000 WHT credit against its own tax

Caesar helps your finance team track which payments attracted WHT, how much was withheld, and what has been remitted.`
                },
                {
                    id: 'events-6',
                    question: 'Does Caesar handle both individuals and companies?',
                    answer: `Yes.

• For individuals, Caesar tracks taxable crypto income and gains and applies the personal tax bands.
• For companies and platforms, Caesar tracks crypto-related profits, platform fees, VAT amounts and WHT and feeds that into your broader tax process.`
                }
            ]
        },
        {
            title: '3. Product & Integration',
            questions: [
                {
                    id: 'product-1',
                    question: 'How does Caesar integrate with my platform?',
                    answer: `There are two main ways to plug Caesar in:

1. API integration
   • Your backend sends Caesar clean transaction data (buys, sells, trades, deposits, withdrawals, fees, rewards, etc.).
   • Caesar returns user- and platform-level tax outputs and events via API and webhooks.

2. Batch / file uploads
   • You export CSV/JSON from your system.
   • Caesar ingests it on a schedule and updates your dashboards.

Most partners start with basic file uploads and move to the API once they're comfortable.`
                },
                {
                    id: 'product-2',
                    question: 'What data do we need to send?',
                    answer: `At a minimum:

• Your internal user ID or reference
• A timestamp for each transaction
• The type of event (buy, sell, trade, deposit, withdraw, fee, reward, airdrop, interest, NFT trade, etc.)
• The asset and amounts involved (e.g. BTC 0.3, USDT 500)
• Fiat values where you already have them (e.g. NGN equivalent)

For on-chain events, you can also include:

• from_address and to_address
• The network/chain (e.g. Ethereum, Solana, etc.)

Caesar then normalises all of this into a consistent event stream for tax.`
                },
                {
                    id: 'product-3',
                    question: 'Does Caesar handle both on-chain and off-chain activity?',
                    answer: `Yes.

• For on-chain activity, we work with wallet, network and pricing data to understand what happened economically.
• For off-chain activity, we work with your internal ledger: off-chain swaps, internal transfers, internal fee postings, and so on.

If it changes a user's position in a way that matters for tax, Caesar can model it.`
                },
                {
                    id: 'product-4',
                    question: 'What happens when Nigerian tax rules change?',
                    answer: `You don't have to rebuild anything on your side.

When rules change, we:

• Update our tax logic,
• Apply the right rules to each period going forward, and
• Help you understand any impact on previous calculations if needed.

You can always see which rule set applied to which reporting period.`
                }
            ]
        },
        {
            title: '4. Pricing & Plans',
            questions: [
                {
                    id: 'pricing-1',
                    question: 'How do you price Caesar for platforms?',
                    answer: `For platforms (B2B), pricing is based on:

• The number of users we calculate tax for each year ("taxed users"), and
• Which plan you choose (Entry, Growth or Enterprise) and the support level you need.

We work on annual contracts. Most Nigeria-focused platforms end up somewhere between $5k and $40k per year, depending on size and complexity.

Pricing for governments and regulators is separate.`
                },
                {
                    id: 'pricing-2',
                    question: 'What exactly is a "taxed user"?',
                    answer: `A taxed user is any user where Caesar produces at least one tax calculation in a tax year.

If they trade three times or three thousand times, they still count as one taxed user for billing.`
                },
                {
                    id: 'pricing-3',
                    question: 'Do you charge per transaction?',
                    answer: `No. We don't charge per transaction.

We charge by taxed users per year, so your bill reflects:

• How many people you're keeping compliant, and
• How much regulatory risk you're reducing.

We may still apply technical API rate limits for stability, but those are separate from pricing.`
                },
                {
                    id: 'pricing-4',
                    question: 'Can we pay in naira?',
                    answer: `Yes. Nigerian platforms can pay in naira.

We can also bill in USD if that's easier for your treasury or investors.`
                },
                {
                    id: 'pricing-5',
                    question: 'Do you offer discounts for early-stage or smaller platforms?',
                    answer: `We do, especially for early partners.

We sometimes offer reduced minimums in the first year in exchange for:

• Integration feedback,
• Permission to use your logo, and
• Case studies or testimonials once things are live.

Talk to us about your stage and volumes and we'll see what fits.`
                }
            ]
        },
        {
            title: '5. Data, Security & Privacy',
            questions: [
                {
                    id: 'security-1',
                    question: 'What user data does Caesar see?',
                    answer: `Typically, Caesar sees:

• Your internal user reference
• Transaction and balance data
• Wallet addresses where you choose to include them
• Caesar's own outputs (tax summaries, flags, statuses)

We do not need BVN, NIN, passwords, seed phrases or private keys.`
                },
                {
                    id: 'security-2',
                    question: 'Do you ever see private keys or control wallets?',
                    answer: `No. Never.

Caesar works on data only. Your custody model and wallet security stay exactly as they are today.

We don't ask for or use private keys, seed phrases, or signing authority.`
                },
                {
                    id: 'security-3',
                    question: 'How is our data protected?',
                    answer: `In short:

• Data is encrypted in transit and at rest.
• Access is restricted by role and fully logged.
• We keep detailed audit trails of important actions inside the system.

If you need a deeper security review, we can share more detail as part of your due-diligence process.`
                },
                {
                    id: 'security-4',
                    question: 'Will you share our data with tax authorities?',
                    answer: `For platform contracts (B2B):

• You remain the primary owner of your customer data.
• Any sharing with tax authorities happens within your legal obligations and explicit agreements.

For regulator contracts (B2G), we work with carefully scoped datasets and controls agreed with the authority and, where relevant, our platform partners.`
                }
            ]
        },
        {
            title: '6. Platforms vs Regulators',
            questions: [
                {
                    id: 'regulators-1',
                    question: "What's the difference between the platform product and the regulator product?",
                    answer: `We serve two sides of the same problem:

Platform product (B2B)

• You integrate Caesar into your exchange, wallet or fintech.
• You get user-level and platform-level tax outputs and dashboards.
• You stay in control of the customer relationship.

Regulator product (B2G)

• Tax authorities get tools and analytics to understand crypto activity and compliance at scale.
• The focus is on monitoring, risk and audits, not running your platform.
• It's priced and contracted separately from platform plans.`
                },
                {
                    id: 'regulators-2',
                    question: 'If a regulator uses Caesar, do we have to use Caesar too?',
                    answer: `No.

Platforms and regulators can adopt Caesar independently.

When both sides use Caesar, reviews and reconciliations usually become smoother because everyone is working from a consistent interpretation of the rules — but one doesn't technically require the other.`
                }
            ]
        },
        {
            title: '7. Onboarding & Support',
            questions: [
                {
                    id: 'support-1',
                    question: 'What does onboarding look like?',
                    answer: `A typical rollout looks like this:

1. Scoping – we learn how your product works and what tax problems you're trying to solve.
2. Data mapping – we map your event types (buy, sell, trade, fee, etc.) to Caesar's input format.
3. Pilot run – we run Caesar on a historical or sample dataset and compare the results with you.
4. Go-live – we turn on regular ingestion (API or file uploads) and train your team on the dashboard.
5. Fine-tuning – we adjust settings and workflows over the first few reporting cycles.`
                },
                {
                    id: 'support-2',
                    question: 'Who usually owns Caesar inside our company?',
                    answer: `It's usually a joint effort between:

• Compliance / Risk / Legal – making sure everything lines up with your obligations.
• Finance / Tax – using Caesar outputs for filings and audits.
• Engineering / Data – owning the integration and ongoing data quality.

We're used to working with cross-functional teams and can adapt to your structure.`
                },
                {
                    id: 'support-3',
                    question: 'What kind of support do you provide after we go live?',
                    answer: `Support depends on your plan, but broadly:

• Entry – email support and regular check-ins.
• Growth – faster response times, integration help, and support for custom reports.
• Enterprise – a dedicated contact, SLAs, and joint planning around key regulatory deadlines.

The goal is not "install and disappear"; we aim to be a long-term partner in keeping you and your users compliant.`
                }
            ]
        }
    ];

    // Generate FAQ schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSections.flatMap(section =>
            section.questions.map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer.replace(/\n/g, ' ').trim()
                }
            }))
        )
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Hero
                title="Frequently Asked Questions"
                subtitle="Have questions about how Caesar works, who it's for, and what exactly counts as a taxable crypto event in Nigeria? You're in the right place."
            />

            <section>
                <div className="container">
                    <p className={styles.intro}>
                        We've grouped the most common questions into a few sections so you can skim to what you care about:{' '}
                        <strong>General</strong>, <strong>Taxable Crypto Events</strong>, <strong>Product & Integration</strong>,{' '}
                        <strong>Pricing & Plans</strong>, <strong>Data & Security</strong>, <strong>Platforms vs Regulators</strong>,{' '}
                        and <strong>Onboarding & Support</strong>.
                    </p>

                    {faqSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={styles.faqSection}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>

                            <div className={styles.questionsList}>
                                {section.questions.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`${styles.questionItem} ${openQuestion === item.id ? styles.open : ''}`}
                                    >
                                        <button className={styles.questionButton} onClick={() => toggleQuestion(item.id)}>
                                            <span className={styles.questionText}>{item.question}</span>
                                            <span className={styles.questionIcon}>{openQuestion === item.id ? '−' : '+'}</span>
                                        </button>

                                        <div className={styles.answerWrapper}>
                                            <div className={styles.answer}>
                                                {item.answer.split('\n').map((line, i) => (
                                                    <p key={i}>{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

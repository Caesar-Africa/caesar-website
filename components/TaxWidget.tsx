"use client";

import React, { useState, useEffect, FormEvent } from "react";
import styles from "./TaxWidget.module.css";

// -----------------------------
// CONFIG - EXACTLY MATCH NG-2026 INDIVIDUAL & CORPORATE RULES
// -----------------------------

const NG_2026_PIT_BANDS = [
    { min: 0, max: 800_000, rate: 0.0 },
    { min: 800_000, max: 3_000_000, rate: 0.15 },
    { min: 3_000_000, max: 12_000_000, rate: 0.18 },
    { min: 12_000_000, max: 25_000_000, rate: 0.21 },
    { min: 25_000_000, max: 50_000_000, rate: 0.23 },
    { min: 50_000_000, max: null, rate: 0.25 },
];

const NG_2026_VAT_RATE = 0.075; // 7.5%

const NG_2026_CORP_RULES = {
    turnoverBands: {
        small: { label: "Under ₦25M", citRate: 0.0 },
        medium: { label: "₦25M – ₦100M", citRate: 0.2 },
        large: { label: "Over ₦100M", citRate: 0.3 },
    },
    devLevyRate: 0.04,
    tetRate: 0.03,
};

const IND_CRYPTO_RANGE_PRESETS: Record<string, { min: number; max: number | null; midpoint: number }> = {
    "0-250k": { min: 0, max: 250_000, midpoint: 125_000 },
    "250k-1m": { min: 250_000, max: 1_000_000, midpoint: 625_000 },
    "1m-3m": { min: 1_000_000, max: 3_000_000, midpoint: 2_000_000 },
    "3m-10m": { min: 3_000_000, max: 10_000_000, midpoint: 6_500_000 },
    "10m-plus": { min: 10_000_000, max: null, midpoint: 12_500_000 },
};

const IND_OTHER_RANGE_PRESETS: Record<string, { min: number; max: number | null; midpoint: number }> = {
    skip: { min: 0, max: 0, midpoint: 0 },
    "0-1m": { min: 0, max: 1_000_000, midpoint: 500_000 },
    "1m-3m": { min: 1_000_000, max: 3_000_000, midpoint: 2_000_000 },
    "3m-10m": { min: 3_000_000, max: 10_000_000, midpoint: 6_500_000 },
    "10m-plus": { min: 10_000_000, max: null, midpoint: 12_500_000 },
};

const PLAT_FEE_RANGE_PRESETS: Record<string, { min: number; max: number | null; midpoint: number }> = {
    "0-5m": { min: 0, max: 5_000_000, midpoint: 2_500_000 },
    "5-20m": { min: 5_000_000, max: 20_000_000, midpoint: 12_500_000 },
    "20-100m": { min: 20_000_000, max: 100_000_000, midpoint: 60_000_000 },
    "100m-plus": { min: 100_000_000, max: null, midpoint: 120_000_000 },
};

const PLAT_PROFIT_RANGE_PRESETS: Record<string, { min: number; max: number | null; midpoint: number }> = {
    "0-10m": { min: 0, max: 10_000_000, midpoint: 5_000_000 },
    "10-50m": { min: 10_000_000, max: 50_000_000, midpoint: 30_000_000 },
    "50-100m": { min: 50_000_000, max: 100_000_000, midpoint: 75_000_000 },
    "100m-plus": { min: 100_000_000, max: null, midpoint: 120_000_000 },
};

// -----------------------------
// HELPERS
// -----------------------------

function formatNaira(value: number | string) {
    const num = Number(value) || 0;
    return "₦" + num.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}

function getMidpoint(rangeKey: string, presets: Record<string, any>) {
    if (!rangeKey || !presets[rangeKey]) return 0;
    return presets[rangeKey].midpoint || 0;
}

function calcPit(income: number) {
    let remaining = Math.max(0, Number(income) || 0);
    let tax = 0;
    for (const band of NG_2026_PIT_BANDS) {
        if (remaining <= 0) break;
        const upper = band.max ?? remaining; // if max is null (infinity), use remaining
        // The taxable amount in this band is the lesser of:
        // 1. The remaining income
        // 2. The size of the band (upper - min)
        // However, if band.max is null, the size is effectively infinite (or just the remaining)

        // Correct logic:
        // If band.max is null, we take all remaining.
        // Else, we take min(remaining, band.max - band.min)

        const bandSize = band.max === null ? remaining : band.max - band.min;
        const taxableInBand = Math.max(0, Math.min(remaining, bandSize));

        tax += taxableInBand * band.rate;
        remaining -= taxableInBand;
    }
    return Math.round(tax);
}

function parseNumber(value: string | number) {
    const num = Number(value);
    return Number.isFinite(num) && num > 0 ? num : 0;
}

interface TaxWidgetProps {
    onOpenModal: () => void;
}

export default function TaxWidget({ onOpenModal }: TaxWidgetProps) {
    // Step State
    const [step, setStep] = useState(1);
    const [activeTab, setActiveTab] = useState<"individual" | "platform">("individual");

    // Lead Form State
    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadPersona, setLeadPersona] = useState("individual");
    const [leadCompany, setLeadCompany] = useState("");
    const [leadRole, setLeadRole] = useState("");
    const [leadVolume, setLeadVolume] = useState("0-50k");
    const [emailError, setEmailError] = useState("");

    // Individual Calculator State
    const [indCryptoRange, setIndCryptoRange] = useState("0-250k");
    const [indCryptoExact, setIndCryptoExact] = useState("");
    const [indOtherRange, setIndOtherRange] = useState("skip");
    const [indOtherExact, setIndOtherExact] = useState("");

    const [indResult, setIndResult] = useState({
        tax: 0,
        cryptoIncome: 0,
        totalIncome: 0,
        effectiveRate: 0,
        summary: "Select your income ranges and click “Calculate” to see your estimate.",
    });

    // Platform Calculator State
    const [platFeeRange, setPlatFeeRange] = useState("0-5m");
    const [platFeeExact, setPlatFeeExact] = useState("");
    const [platProfitRange, setPlatProfitRange] = useState("0-10m");
    const [platProfitExact, setPlatProfitExact] = useState("");
    const [platTurnoverBand, setPlatTurnoverBand] = useState<"small" | "medium" | "large">("small");
    const [platDevLevy, setPlatDevLevy] = useState(true);
    const [platTet, setPlatTet] = useState(false);

    const [platResult, setPlatResult] = useState({
        vat: 0,
        corpTax: 0,
        cit: 0,
        dev: 0,
        tet: 0,
        effectiveRate: 0,
        vatSummary: "Select your fee and profit ranges to see a VAT and corporate tax estimate.",
    });

    // State for storing lead data to send with results
    const [storedLeadData, setStoredLeadData] = useState<any>(null);

    // Web3Forms helper function
    const submitToWeb3Forms = async (data: any) => {
        const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '5847e2e2-90f4-4c1c-b0f0-3d70d9507953';

        const formData = new FormData();
        formData.append('access_key', web3formsKey);
        formData.append('subject', 'New Tax Widget Lead from Caesar website');
        formData.append('from_name', 'Caesar Tax Widget');
        formData.append('form_type', 'tax-widget-lead');

        // Add all data fields
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, String(data[key]));
            }
        });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (!result.success) {
                console.error('Web3Forms error:', result.message);
            }
        } catch (error) {
            console.error('Error submitting to Web3Forms:', error);
        }
    };

    // Handle Lead Submit
    const handleLeadSubmit = (e: FormEvent) => {
        e.preventDefault();
        setEmailError("");
        const email = leadEmail.trim();

        if (!email || !email.includes("@")) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        const leadData = {
            name: leadName.trim() || null,
            email,
            persona: leadPersona,
            company: leadCompany.trim() || null,
            role: leadRole.trim() || null,
            volumeBand: leadVolume,
            timestamp: new Date().toISOString(),
        };

        // Store lead data to send with calculation results
        setStoredLeadData(leadData);

        setStep(2);
        if (leadPersona === "platform") {
            setActiveTab("platform");
        } else {
            setActiveTab("individual");
        }
    };

    // Handle Individual Calculate
    const handleIndCalculate = (e: FormEvent) => {
        e.preventDefault();

        const cryptoExactNum = parseNumber(indCryptoExact);
        const otherExactNum = parseNumber(indOtherExact);

        const cryptoIncomeNgn = cryptoExactNum > 0 ? cryptoExactNum : getMidpoint(indCryptoRange, IND_CRYPTO_RANGE_PRESETS);
        const otherIncomeNgn = otherExactNum > 0 ? otherExactNum : getMidpoint(indOtherRange, IND_OTHER_RANGE_PRESETS);

        const totalIncomeNgn = cryptoIncomeNgn + otherIncomeNgn;
        const taxDueNgn = calcPit(totalIncomeNgn);
        const effectiveRate = cryptoIncomeNgn > 0 ? taxDueNgn / cryptoIncomeNgn : 0;

        let summary = "";
        if (cryptoIncomeNgn > 0) {
            summary = `Based on about ${formatNaira(cryptoIncomeNgn)} of crypto income and ${formatNaira(otherIncomeNgn)} of other taxable income for 2026.`;
        } else {
            summary = "To see a useful estimate, select a crypto income range above.";
        }

        const results = {
            tax: taxDueNgn,
            cryptoIncome: cryptoIncomeNgn,
            totalIncome: totalIncomeNgn,
            effectiveRate,
            summary,
        };

        setIndResult(results);

        // Submit lead data with calculation results to FormSubmit
        if (storedLeadData) {
            submitToWeb3Forms({
                ...storedLeadData,
                calculator_type: 'Individual',
                crypto_income: formatNaira(cryptoIncomeNgn),
                other_income: formatNaira(otherIncomeNgn),
                total_income: formatNaira(totalIncomeNgn),
                estimated_tax: formatNaira(taxDueNgn),
                effective_rate: `${(effectiveRate * 100).toFixed(2)}%`,
            });
        }
    };

    // Handle Platform Calculate
    const handlePlatCalculate = (e: FormEvent) => {
        e.preventDefault();

        const feeExactNum = parseNumber(platFeeExact);
        const profitExactNum = parseNumber(platProfitExact);

        const feeRevenueNgn = feeExactNum > 0 ? feeExactNum : getMidpoint(platFeeRange, PLAT_FEE_RANGE_PRESETS);
        const profitNgn = profitExactNum > 0 ? profitExactNum : getMidpoint(platProfitRange, PLAT_PROFIT_RANGE_PRESETS);

        const vatDueNgn = Math.round(feeRevenueNgn * NG_2026_VAT_RATE);

        const bandRule = NG_2026_CORP_RULES.turnoverBands[platTurnoverBand];
        const citRate = bandRule ? bandRule.citRate : 0;
        const citTaxNgn = Math.round(profitNgn * citRate);

        const devTaxNgn = platDevLevy ? Math.round(profitNgn * NG_2026_CORP_RULES.devLevyRate) : 0;
        const tetTaxNgn = platTet ? Math.round(profitNgn * NG_2026_CORP_RULES.tetRate) : 0;

        const totalCorpTaxNgn = citTaxNgn + devTaxNgn + tetTaxNgn;
        const effectiveRate = profitNgn > 0 ? totalCorpTaxNgn / profitNgn : 0;

        const results = {
            vat: vatDueNgn,
            corpTax: totalCorpTaxNgn,
            cit: citTaxNgn,
            dev: devTaxNgn,
            tet: tetTaxNgn,
            effectiveRate,
            vatSummary: `Based on about ${formatNaira(feeRevenueNgn)} of VAT-able fee revenue at a 7.5% VAT rate.`,
        };

        setPlatResult(results);

        // Submit lead data with calculation results to FormSubmit
        if (storedLeadData) {
            submitToWeb3Forms({
                ...storedLeadData,
                calculator_type: 'Platform',
                fee_revenue: formatNaira(feeRevenueNgn),
                profit: formatNaira(profitNgn),
                turnover_band: platTurnoverBand,
                vat_due: formatNaira(vatDueNgn),
                cit_tax: formatNaira(citTaxNgn),
                dev_levy: formatNaira(devTaxNgn),
                tet_tax: formatNaira(tetTaxNgn),
                total_corp_tax: formatNaira(totalCorpTaxNgn),
                effective_rate: `${(effectiveRate * 100).toFixed(2)}%`,
            });
        }
    };

    return (
        <section id="caesar-tax-widget" className={styles.caesarWidgetSection}>
            <div className={styles.caesarWidgetContainer}>
                <header className={styles.caesarWidgetHeader}>
                    <h2>Caesar crypto tax quick check</h2>
                    <p>
                        Get a rough Nigerian tax estimate in under a minute. This widget runs fully in your browser
                        using the 2026 rules. The full Caesar engine connects to your actual transaction data for
                        audit-ready calculations.
                    </p>
                </header>

                {/* STEP INDICATOR */}
                <div className={styles.caesarSteps}>
                    <div className={`${styles.caesarStep} ${step === 1 ? styles.caesarStepActive : ""}`} data-step="1">
                        <span>1</span> Tell us who you are
                    </div>
                    <div className={`${styles.caesarStep} ${step === 2 ? styles.caesarStepActive : ""}`} data-step="2">
                        <span>2</span> See your estimate
                    </div>
                </div>

                {/* STEP 1: LEAD FORM */}
                <div className={`${styles.caesarCard} ${step !== 1 ? styles.caesarCardHidden : ""}`} id="caesar-lead-step">
                    <form id="caesar-lead-form" noValidate onSubmit={handleLeadSubmit}>
                        <div className={styles.caesarField}>
                            <label>
                                Who are you?
                                <span
                                    className={styles.caesarTooltip}
                                    data-tooltip="Pick the option that best describes you today. This only affects which calculator tab opens first."
                                >
                                    ?
                                </span>
                            </label>
                            <div className={styles.caesarChipGroup} id="caesarPersona">
                                <button
                                    type="button"
                                    className={`${styles.caesarChip} ${leadPersona === "individual" ? styles.caesarChipSelected : ""}`}
                                    onClick={() => setLeadPersona("individual")}
                                >
                                    Individual crypto user
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.caesarChip} ${leadPersona === "platform" ? styles.caesarChipSelected : ""}`}
                                    onClick={() => setLeadPersona("platform")}
                                >
                                    Platform / company
                                </button>
                            </div>
                        </div>

                        <div className={styles.caesarLeadGrid}>
                            <div className={styles.caesarField}>
                                <label htmlFor="caesarName">
                                    Name <span className={styles.caesarOptional}>(optional)</span>
                                </label>
                                <input
                                    id="caesarName"
                                    type="text"
                                    autoComplete="name"
                                    value={leadName}
                                    onChange={(e) => setLeadName(e.target.value)}
                                />
                            </div>

                            <div className={`${styles.caesarField} ${styles.caesarFieldRequired}`}>
                                <label htmlFor="caesarEmail">
                                    {leadPersona === "individual" ? "Email address" : "Work email"}
                                </label>
                                <input
                                    id="caesarEmail"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={leadEmail}
                                    onChange={(e) => setLeadEmail(e.target.value)}
                                />
                                <span className={styles.caesarFieldHelp}>
                                    We’ll send a copy of your estimate and occasional Caesar updates. No spam.
                                </span>
                                <span className={styles.caesarError}>{emailError}</span>
                            </div>
                        </div>

                        {leadPersona === "platform" && (
                            <div className={styles.caesarLeadGrid} id="caesar-company-row">
                                <div className={styles.caesarField}>
                                    <label htmlFor="caesarCompany">
                                        Company name <span className={styles.caesarOptional}>(optional)</span>
                                    </label>
                                    <input
                                        id="caesarCompany"
                                        type="text"
                                        autoComplete="organization"
                                        value={leadCompany}
                                        onChange={(e) => setLeadCompany(e.target.value)}
                                    />
                                </div>

                                <div className={styles.caesarField}>
                                    <label htmlFor="caesarRole">
                                        Your role <span className={styles.caesarOptional}>(optional)</span>
                                    </label>
                                    <input
                                        id="caesarRole"
                                        type="text"
                                        autoComplete="organization-title"
                                        value={leadRole}
                                        onChange={(e) => setLeadRole(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className={styles.caesarField}>
                            <label>
                                Rough monthly crypto volume
                                <span
                                    className={styles.caesarTooltip}
                                    data-tooltip="This helps us understand whether you look more like a retail user, a trading business, or an exchange-scale platform."
                                >
                                    ?
                                </span>
                            </label>
                            <div className={styles.caesarChipGroup} id="caesarVolume">
                                {["0-50k", "50k-200k", "200k-plus"].map((vol) => (
                                    <button
                                        key={vol}
                                        type="button"
                                        className={`${styles.caesarChip} ${leadVolume === vol ? styles.caesarChipSelected : ""}`}
                                        onClick={() => setLeadVolume(vol)}
                                    >
                                        {vol === "0-50k" ? "Under ₦50m" : vol === "50k-200k" ? "₦50m – ₦200m" : "Over ₦200m"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.caesarLeadFooter}>
                            <p className={styles.caesarSmall}>
                                By continuing, you agree that Caesar Tech Limited (trading as Caesar) may contact you
                                about crypto tax insights and product updates. You can unsubscribe at any time.
                            </p>
                            <button type="submit" className={`${styles.caesarBtn} ${styles.caesarBtnPrimary}`} id="caesarLeadSubmit">
                                Continue to calculator
                            </button>
                        </div>
                    </form>
                </div>

                {/* STEP 2: CALCULATORS */}
                <div className={`${styles.caesarCard} ${step !== 2 ? styles.caesarCardHidden : ""}`} id="caesar-calc-step">
                    {/* Tabs */}
                    <div className={styles.caesarTabs}>
                        <button
                            type="button"
                            className={`${styles.caesarTab} ${activeTab === "individual" ? styles.caesarTabActive : ""}`}
                            onClick={() => setActiveTab("individual")}
                        >
                            Individual
                        </button>
                        <button
                            type="button"
                            className={`${styles.caesarTab} ${activeTab === "platform" ? styles.caesarTabActive : ""}`}
                            onClick={() => setActiveTab("platform")}
                        >
                            Platform / Company
                        </button>
                    </div>

                    {/* INDIVIDUAL TAB */}
                    <div className={`${styles.caesarTabPanel} ${activeTab !== "individual" ? styles.caesarTabPanelHidden : ""}`}>
                        <div className={styles.caesarPanelGrid}>
                            {/* Left: Inputs */}
                            <form id="caesar-individual-form" className={styles.caesarForm} onSubmit={handleIndCalculate}>
                                <div className={styles.caesarFieldGroupInline}>
                                    <div className={styles.caesarField}>
                                        <label>Tax year</label>
                                        <div className={styles.caesarPillInput}>2026 (Nigeria)</div>
                                        <span className={styles.caesarFieldHelp}>
                                            Uses the 2026 Nigerian personal income tax bands from the latest reform Acts.
                                        </span>
                                    </div>
                                    <div className={styles.caesarField}>
                                        <label>Resident in</label>
                                        <div className={styles.caesarPillInput}>Nigeria</div>
                                    </div>
                                </div>

                                {/* Crypto income ranges */}
                                <div className={styles.caesarField}>
                                    <label>
                                        About how much did you make from crypto this year?
                                        <span
                                            className={styles.caesarTooltip}
                                            data-tooltip="Think of this as your total crypto income in naira: trading profits, rewards, airdrops, staking yield, and any salary or invoices paid in crypto."
                                        >
                                            ?
                                        </span>
                                    </label>
                                    <div className={styles.caesarChipGroup}>
                                        {Object.keys(IND_CRYPTO_RANGE_PRESETS).map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                className={`${styles.caesarChip} ${indCryptoRange === range ? styles.caesarChipSelected : ""}`}
                                                onClick={() => setIndCryptoRange(range)}
                                            >
                                                {range === "0-250k" && "₦0 – ₦250K"}
                                                {range === "250k-1m" && "₦250K – ₦1M"}
                                                {range === "1m-3m" && "₦1M – ₦3M"}
                                                {range === "3m-10m" && "₦3M – ₦10M"}
                                                {range === "10m-plus" && "₦10M+"}
                                            </button>
                                        ))}
                                    </div>
                                    <span className={styles.caesarFieldHelp}>
                                        If you’re not sure, pick the closest range. We’ll use the middle of the range for your
                                        estimate.
                                    </span>
                                </div>

                                <div className={styles.caesarField}>
                                    <label htmlFor="indCryptoExact">
                                        Or enter exact crypto income (optional)
                                        <span
                                            className={styles.caesarTooltip}
                                            data-tooltip="If you have a statement from an exchange or wallet showing your total crypto income in naira, you can type that amount here for a sharper estimate."
                                        >
                                            ?
                                        </span>
                                    </label>
                                    <input
                                        id="indCryptoExact"
                                        type="number"
                                        min="0"
                                        step="1000"
                                        placeholder="e.g. 2,300,000"
                                        value={indCryptoExact}
                                        onChange={(e) => setIndCryptoExact(e.target.value)}
                                    />
                                </div>

                                {/* Other income */}
                                <div className={styles.caesarField}>
                                    <label>
                                        About how much did you make from everything else?
                                        <span
                                            className={styles.caesarTooltip}
                                            data-tooltip="Your non-crypto income: salary, business profit, rent, etc., before tax. If you only care about crypto, you can skip this."
                                        >
                                            ?
                                        </span>
                                    </label>
                                    <div className={styles.caesarChipGroup}>
                                        {Object.keys(IND_OTHER_RANGE_PRESETS).map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                className={`${styles.caesarChip} ${indOtherRange === range ? styles.caesarChipSelected : ""}`}
                                                onClick={() => setIndOtherRange(range)}
                                            >
                                                {range === "skip" && "I’ll skip this"}
                                                {range === "0-1m" && "₦0 – ₦1M"}
                                                {range === "1m-3m" && "₦1M – ₦3M"}
                                                {range === "3m-10m" && "₦3M – ₦10M"}
                                                {range === "10m-plus" && "₦10M+"}
                                            </button>
                                        ))}
                                    </div>
                                    <span className={styles.caesarFieldHelp}>
                                        Adding this makes the estimate closer to a real tax calculation. Skipping gives you a
                                        “crypto-only” view.
                                    </span>
                                </div>

                                <div className={styles.caesarField}>
                                    <label htmlFor="indOtherExact">Or enter exact other income (optional)</label>
                                    <input
                                        id="indOtherExact"
                                        type="number"
                                        min="0"
                                        step="1000"
                                        placeholder="e.g. 4,500,000"
                                        value={indOtherExact}
                                        onChange={(e) => setIndOtherExact(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className={`${styles.caesarBtn} ${styles.caesarBtnPrimary}`} id="indCalculate">
                                    Calculate individual estimate
                                </button>
                            </form>

                            {/* Right: Results */}
                            <aside className={styles.caesarResult} aria-live="polite">
                                <div className={styles.caesarBadge}>
                                    Quick estimate • Full accuracy lives in the Caesar tax engine
                                </div>
                                <h3>Your estimated crypto tax (individual)</h3>

                                <div className={styles.caesarResultMain}>
                                    <div className={styles.caesarResultLabel}>Estimated tax due for 2026</div>
                                    <div className={styles.caesarResultAmount}>{formatNaira(indResult.tax)}</div>
                                    <div className={styles.caesarResultSubtext}>{indResult.summary}</div>
                                </div>

                                <dl className={styles.caesarResultBreakdown}>
                                    <div className={styles.caesarResultRow}>
                                        <dt>Total crypto income (₦)</dt>
                                        <dd>{formatNaira(indResult.cryptoIncome)}</dd>
                                    </div>
                                    <div className={styles.caesarResultRow}>
                                        <dt>Estimated total income (₦)</dt>
                                        <dd>{formatNaira(indResult.totalIncome)}</dd>
                                    </div>
                                    <div className={styles.caesarResultRow}>
                                        <dt>Effective tax rate on crypto</dt>
                                        <dd>{Math.round(indResult.effectiveRate * 1000) / 10}%</dd>
                                    </div>
                                </dl>

                                <p className={styles.caesarSmall}>
                                    This uses the 2026 Nigerian personal income tax bands (0% on the first ₦800k, then
                                    15%, 18%, 21%, 23% and 25% as your income rises). It does <strong>not</strong> run cost-basis
                                    reconstruction or event-by-event crypto logic. The production Caesar engine does that
                                    inside partner platforms, so their numbers may be more precise than this quick check.
                                </p>
                            </aside>
                        </div>
                    </div>

                    {/* PLATFORM TAB */}
                    <div className={`${styles.caesarTabPanel} ${activeTab !== "platform" ? styles.caesarTabPanelHidden : ""}`}>
                        <div className={styles.caesarPanelGrid}>
                            {/* Left: Inputs */}
                            <form id="caesar-platform-form" className={styles.caesarForm} onSubmit={handlePlatCalculate}>
                                <div className={styles.caesarFieldGroupInline}>
                                    <div className={styles.caesarField}>
                                        <label>Tax year</label>
                                        <div className={styles.caesarPillInput}>2026 (Nigeria)</div>
                                    </div>
                                    <div className={styles.caesarField}>
                                        <label>Entity type</label>
                                        <div className={styles.caesarPillInput}>Company / Platform</div>
                                    </div>
                                </div>

                                {/* Fee revenue */}
                                <div className={styles.caesarField}>
                                    <label>
                                        Approximate VAT-able fee revenue this year (₦)
                                        <span
                                            className={styles.caesarTooltip}
                                            data-tooltip="Total charged fees that attract VAT: trading fees, withdrawal fees, and other user charges where you invoice customers."
                                        >
                                            ?
                                        </span>
                                    </label>
                                    <div className={styles.caesarChipGroup}>
                                        {Object.keys(PLAT_FEE_RANGE_PRESETS).map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                className={`${styles.caesarChip} ${platFeeRange === range ? styles.caesarChipSelected : ""}`}
                                                onClick={() => setPlatFeeRange(range)}
                                            >
                                                {range === "0-5m" && "₦0 – ₦5M"}
                                                {range === "5-20m" && "₦5M – ₦20M"}
                                                {range === "20-100m" && "₦20M – ₦100M"}
                                                {range === "100m-plus" && "₦100M+"}
                                            </button>
                                        ))}
                                    </div>
                                    <span className={styles.caesarFieldHelp}>
                                        If you’re unsure, pick the closest range. We apply Nigeria’s standard 7.5% VAT rate.
                                    </span>
                                </div>

                                <div className={styles.caesarField}>
                                    <label htmlFor="platFeeExact">Or enter exact fee revenue (optional)</label>
                                    <input
                                        id="platFeeExact"
                                        type="number"
                                        min="0"
                                        step="100000"
                                        placeholder="e.g. 35,000,000"
                                        value={platFeeExact}
                                        onChange={(e) => setPlatFeeExact(e.target.value)}
                                    />
                                </div>

                                {/* Profit */}
                                <div className={styles.caesarField}>
                                    <label>
                                        Approximate profit from crypto-related activities this year (₦)
                                        <span
                                            className={styles.caesarTooltip}
                                            data-tooltip="Your crypto business profit after expenses, before tax. For example, trading spreads, platform fees, and other crypto lines minus related costs."
                                        >
                                            ?
                                        </span>
                                    </label>
                                    <div className={styles.caesarChipGroup}>
                                        {Object.keys(PLAT_PROFIT_RANGE_PRESETS).map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                className={`${styles.caesarChip} ${platProfitRange === range ? styles.caesarChipSelected : ""}`}
                                                onClick={() => setPlatProfitRange(range)}
                                            >
                                                {range === "0-10m" && "₦0 – ₦10M"}
                                                {range === "10-50m" && "₦10M – ₦50M"}
                                                {range === "50-100m" && "₦50M – ₦100M"}
                                                {range === "100m-plus" && "₦100M+"}
                                            </button>
                                        ))}
                                    </div>
                                    <span className={styles.caesarFieldHelp}>
                                        This drives your Company Income Tax (CIT), development levy and TET in this quick
                                        view.
                                    </span>
                                </div>

                                <div className={styles.caesarField}>
                                    <label htmlFor="platProfitExact">Or enter exact crypto profit (optional)</label>
                                    <input
                                        id="platProfitExact"
                                        type="number"
                                        min="0"
                                        step="100000"
                                        placeholder="e.g. 60,000,000"
                                        value={platProfitExact}
                                        onChange={(e) => setPlatProfitExact(e.target.value)}
                                    />
                                </div>

                                {/* Turnover */}
                                <div className={styles.caesarField}>
                                    <label>
                                        Approximate annual turnover
                                        <span
                                            className={styles.caesarTooltip}
                                            data-tooltip="Total gross revenue from all business lines. Nigeria’s 2026 rules use turnover bands: small (≤ ₦25m), medium (₦25–100m), large (₦100m+)."
                                        >
                                            ?
                                        </span>
                                    </label>
                                    <div className={styles.caesarChipGroup}>
                                        {(["small", "medium", "large"] as const).map((band) => (
                                            <button
                                                key={band}
                                                type="button"
                                                className={`${styles.caesarChip} ${platTurnoverBand === band ? styles.caesarChipSelected : ""}`}
                                                onClick={() => setPlatTurnoverBand(band)}
                                            >
                                                {band === "small" && "Small: under ₦25M"}
                                                {band === "medium" && "Medium: ₦25M – ₦100M"}
                                                {band === "large" && "Large: ₦100M+"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Surcharges */}
                                <div className={`${styles.caesarField} ${styles.caesarFieldToggles}`}>
                                    <label>Which surcharges apply to you?</label>
                                    <div className={styles.caesarToggleRow}>
                                        <span>
                                            Development Levy
                                            <span
                                                className={styles.caesarTooltip}
                                                data-tooltip="A 4% levy on assessable profits introduced by the 2026 reform for qualifying companies. Toggle off if your tax adviser has confirmed it doesn’t apply to your entity."
                                            >
                                                ?
                                            </span>
                                        </span>
                                        <button
                                            type="button"
                                            className={`${styles.caesarToggle} ${platDevLevy ? styles.caesarToggleOn : ""}`}
                                            onClick={() => setPlatDevLevy(!platDevLevy)}
                                        >
                                            <span className={styles.caesarToggleThumb}></span>
                                        </button>
                                    </div>
                                    <div className={styles.caesarToggleRow}>
                                        <span>
                                            Tertiary Education Tax (TET)
                                            <span
                                                className={styles.caesarTooltip}
                                                data-tooltip="A 3% tax on assessable profits for Nigerian companies to fund higher education. Most local companies are in scope; non-resident companies are generally exempt."
                                            >
                                                ?
                                            </span>
                                        </span>
                                        <button
                                            type="button"
                                            className={`${styles.caesarToggle} ${platTet ? styles.caesarToggleOn : ""}`}
                                            onClick={() => setPlatTet(!platTet)}
                                        >
                                            <span className={styles.caesarToggleThumb}></span>
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className={`${styles.caesarBtn} ${styles.caesarBtnPrimary}`} id="platCalculate">
                                    Calculate platform estimate
                                </button>
                            </form>

                            {/* Right: Results */}
                            <aside className={styles.caesarResult} aria-live="polite">
                                <div className={styles.caesarBadge}>
                                    High-level view • Full Caesar engine uses your actual ledgers and events
                                </div>
                                <h3>Your estimated platform tax</h3>

                                <div className={styles.caesarResultMain}>
                                    <div className={styles.caesarResultLabel}>Estimated VAT on fees</div>
                                    <div className={styles.caesarResultAmount}>{formatNaira(platResult.vat)}</div>
                                    <div className={styles.caesarResultSubtext}>{platResult.vatSummary}</div>
                                </div>

                                <div className={`${styles.caesarResultMain} ${styles.caesarResultMainSecondary}`}>
                                    <div className={styles.caesarResultLabel}>Estimated corporate tax on crypto</div>
                                    <div className={styles.caesarResultAmount}>{formatNaira(platResult.corpTax)}</div>
                                </div>

                                <dl className={styles.caesarResultBreakdown}>
                                    <div className={styles.caesarResultRow}>
                                        <dt>CIT component</dt>
                                        <dd>{formatNaira(platResult.cit)}</dd>
                                    </div>
                                    <div className={styles.caesarResultRow}>
                                        <dt>Development Levy (4%)</dt>
                                        <dd>{formatNaira(platResult.dev)}</dd>
                                    </div>
                                    <div className={styles.caesarResultRow}>
                                        <dt>Tertiary Education Tax (3%)</dt>
                                        <dd>{formatNaira(platResult.tet)}</dd>
                                    </div>
                                    <div className={styles.caesarResultRow}>
                                        <dt>Effective rate on crypto profit</dt>
                                        <dd>{Math.round(platResult.effectiveRate * 1000) / 10}%</dd>
                                    </div>
                                </dl>

                                <p className={styles.caesarSmall}>
                                    This widget applies the 2026 Nigerian corporate rules in a simplified way:
                                    <strong>0%</strong> CIT for turnover ≤ ₦25m, <strong>20%</strong> for ₦25–100m, and
                                    <strong>30%</strong> above ₦100m, plus a 4% development levy and 3% TET where toggled on.
                                    It does <strong>not</strong> model minimum effective tax, WHT, exemptions, or detailed
                                    sector rules. The production Caesar platform reads your ledgers, event-level crypto
                                    data, and tax rules-as-data to produce complete regulator-grade outputs.
                                </p>
                            </aside>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <button
                        onClick={onOpenModal}
                        className={styles.caesarBtn}
                        style={{ background: "#1f2937", color: "#e5e7eb", textDecoration: "none", border: "none" }}
                    >
                        Book a demo
                    </button>
                </div>
            </div>
        </section>
    );
}

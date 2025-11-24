import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Caesar - Crypto Tax Rail for African Markets",
        template: "%s | Caesar"
    },
    description: "Caesar turns crypto transactions into tax-ready data for crypto businesses and public institutions across Africa. Automated crypto tax calculation, VAT/WHT compliance, and regulatory reporting for platforms in Nigeria.",
    keywords: [
        "crypto tax Nigeria",
        "cryptocurrency tax Africa",
        "crypto tax compliance",
        "VAT crypto Nigeria",
        "WHT crypto platform",
        "crypto tax calculation",
        "blockchain tax reporting",
        "crypto exchange tax",
        "Nigerian crypto regulation",
        "crypto tax software",
        "platform tax compliance",
        "crypto accounting Nigeria"
    ],
    authors: [{ name: "Caesar Tech Limited" }],
    creator: "Caesar Tech Limited",
    publisher: "Caesar Tech Limited",
    metadataBase: new URL("https://www.caesar.africa"),
    alternates: {
        canonical: "/"
    },
    openGraph: {
        type: "website",
        locale: "en_NG",
        url: "/",
        siteName: "Caesar",
        title: "Caesar - Crypto Tax Rail for African Markets",
        description: "Automated crypto tax calculation and compliance for platforms and regulators in Africa. Turn transaction data into tax-ready outputs.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Caesar - Crypto Tax Infrastructure"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Caesar - Crypto Tax Rail for African Markets",
        description: "Automated crypto tax calculation and compliance for platforms and regulators in Africa.",
        images: ["/og-image.png"],
        creator: "@Caesar_Tax"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    verification: {
        google: "verification_token_here",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Organization",
                                    "@id": "https://www.caesar.africa/#organization",
                                    name: "Caesar Tech Limited",
                                    alternateName: "Caesar",
                                    url: "https://www.caesar.africa",
                                    logo: {
                                        "@type": "ImageObject",
                                        url: "https://www.caesar.africa/logo.png"
                                    },
                                    description: "Crypto tax infrastructure for African markets. Automated tax calculation, compliance, and reporting for crypto platforms and regulators.",
                                    address: {
                                        "@type": "PostalAddress",
                                        addressLocality: "Lagos",
                                        addressCountry: "NG"
                                    },
                                    contactPoint: {
                                        "@type": "ContactPoint",
                                        email: "hello@caesar.africa",
                                        contactType: "Customer Service",
                                        areaServed: "NG"
                                    },
                                    sameAs: [
                                        "https://x.com/Caesar_Tax",
                                        "https://www.linkedin.com/company/caesar-africa"
                                    ]
                                },
                                {
                                    "@type": "WebSite",
                                    "@id": "https://www.caesar.africa/#website",
                                    url: "https://www.caesar.africa",
                                    name: "Caesar",
                                    description: "Crypto tax rail for African markets",
                                    publisher: {
                                        "@id": "https://www.caesar.africa/#organization"
                                    }
                                },
                                {
                                    "@type": "SoftwareApplication",
                                    name: "Caesar Tax Engine",
                                    applicationCategory: "FinanceApplication",
                                    operatingSystem: "Web",
                                    offers: {
                                        "@type": "Offer",
                                        price: "5000",
                                        priceCurrency: "USD",
                                        priceSpecification: {
                                            "@type": "UnitPriceSpecification",
                                            price: "5000",
                                            priceCurrency: "USD",
                                            referenceQuantity: {
                                                "@type": "QuantitativeValue",
                                                value: "1",
                                                unitText: "YEAR"
                                            }
                                        }
                                    },
                                    description: "Crypto tax calculation and compliance platform for exchanges, wallets, and fintechs in Nigeria and Africa.",
                                    featureList: [
                                        "Automated crypto tax calculation",
                                        "User-level tax positions",
                                        "Platform VAT and WHT tracking",
                                        "Compliance reporting",
                                        "API integration",
                                        "Dashboard and analytics"
                                    ]
                                }
                            ]
                        })
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}

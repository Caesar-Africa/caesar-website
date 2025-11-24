'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import HomePage from '@/components/pages/HomePage';
import ProductPage from '@/components/pages/ProductPage';
import PlatformsPage from '@/components/pages/PlatformsPage';
import GovernmentsPage from '@/components/pages/GovernmentsPage';
import PricingPage from '@/components/pages/PricingPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import FAQPage from '@/components/pages/FAQPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/components/pages/TermsOfServicePage';
import CookiePolicyPage from '@/components/pages/CookiePolicyPage';

export default function Home() {
    const [activePage, setActivePage] = useState('home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales' | 'request-brief'>('talk-to-us');

    const openModal = (type: typeof modalType) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigateTo = (page: string) => {
        if (page === 'widget') {
            window.location.href = '/widget';
            return;
        }
        setActivePage(page);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Navbar activePage={activePage} onNavigate={navigateTo} onOpenModal={() => openModal('talk-to-us')} />

            <main>
                {activePage === 'home' && <HomePage onNavigate={navigateTo} onOpenModal={openModal} />}
                {activePage === 'product' && <ProductPage onNavigate={navigateTo} onOpenModal={openModal} />}
                {activePage === 'platforms' && <PlatformsPage onNavigate={navigateTo} onOpenModal={openModal} />}
                {activePage === 'governments' && <GovernmentsPage onNavigate={navigateTo} onOpenModal={openModal} />}
                {activePage === 'pricing' && <PricingPage onNavigate={navigateTo} onOpenModal={openModal} />}
                {activePage === 'about' && <AboutPage onNavigate={navigateTo} />}
                {activePage === 'faq' && <FAQPage />}
                {activePage === 'contact' && <ContactPage />}
                {activePage === 'privacy' && <PrivacyPolicyPage />}
                {activePage === 'terms' && <TermsOfServicePage />}
                {activePage === 'cookies' && <CookiePolicyPage />}
            </main>

            <Footer onNavigate={navigateTo} />

            <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
        </>
    );
}

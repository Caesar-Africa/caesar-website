"use client";

import { useState } from "react";
import TaxWidget from "@/components/TaxWidget";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

export default function WidgetPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"book-demo" | "get-started" | "talk-to-us" | "contact-sales" | "request-brief">("talk-to-us");

    const openModal = (type: typeof modalType) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleNavigate = (page: string) => {
        // Since the main app uses internal state for navigation and doesn't sync with URL,
        // we just redirect to the home page for now.
        window.location.href = "/";
    };

    return (
        <main className="min-h-screen bg-[#020617] relative overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />

            {/* Animated Gradient Orbs */}
            <div
                className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[140px] pointer-events-none animate-pulse"
                style={{ animationDuration: '4s' }}
            />
            <div
                className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[140px] pointer-events-none animate-pulse"
                style={{ animationDuration: '5s', animationDelay: '1s' }}
            />
            <div
                className="absolute top-[40%] left-[50%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-pulse"
                style={{ animationDuration: '6s', animationDelay: '2s' }}
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <Navbar
                activePage="widget"
                onNavigate={handleNavigate}
                onOpenModal={() => openModal("talk-to-us")}
            />

            <div className="pt-24 relative z-10">
                <TaxWidget onOpenModal={() => openModal("book-demo")} />
            </div>

            <Footer onNavigate={handleNavigate} />
            <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
        </main>
    );
}

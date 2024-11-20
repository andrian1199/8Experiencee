// src/components/Home.jsx
import React from 'react';
import Hero from './Hero';
import GenreSection from './GenreSection';

function Logic() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header>
            <Hero />
        </header>
    );
}

function Main() {
    return (
        <div>
            <MidSection />
            <GenreSection />
        </div>
    );
}

function Footer() {
    return (
        <footer>
            {/* Footer content */}
        </footer>
    );
}

export default Logic;

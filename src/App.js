import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#283593',
        },
        secondary: {
            main: '#ffb74d',
        },
        background: {
            default: 'linear-gradient(45deg, #E0E7FF 30%, #FFF3E0 90%)',
        },
        text: {
            primary: '#333',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#212121',  // Dark grey
        },
        secondary: {
            main: '#90caf9',  // Light blue for contrast
        },
        background: {
            default: 'linear-gradient(45deg, #1a1a1a 30%, #2c2c3e 90%)',  // Gradient from dark grey to subtle purple-grey
            paper: '#2c2c3e',    // Subtle purple-grey for elements
        },
        text: {
            primary: '#e0e0e0',  // Light grey for readable text
        },
    },
});

function App() {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // This will read from local storage or use the system preference if no setting was saved.
        const savedMode = localStorage.getItem('dark-mode'); // corrected the key
        if (savedMode !== null) return savedMode === 'true';
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    

    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
            localStorage.setItem('dark-mode', String(!prevMode));
            return !prevMode;
        });
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event) => {
            setIsDarkMode(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.title = "Personal Site";
    }, []);    

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <div style={{ minHeight: '100vh', background: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default}}>
                <Router key={isDarkMode ? 'dark' : 'light'}>
                    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    <Routes>
                        <Route path="/" element={<AboutMe />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                    <Footer isDarkMode={isDarkMode} />
                </Router>
            </div>
        </ThemeProvider>
    );


}


export default App;

import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTranslation } from 'react-i18next';
import './styles.css'

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const [title, setTitle] = useState('lang');

    useEffect(() => {
        const currentLanguage = localStorage.getItem('language') || i18n.language;
        updateTitle(currentLanguage);
    }, [i18n.language]);

    const updateTitle = (language) => {
        if (language === 'en') {
            setTitle('Language Select');
        } else if (language === 'tr') {
            setTitle('Dil Seçimi');
        }
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language).then(() => {
            localStorage.setItem('language', language);
            updateTitle(language);
        });
    };

    return (
        <div className="dropdown-container">
            <DropdownButton id="dropdown-basic-button" title={title}>
                <Dropdown.Item onClick={() => changeLanguage('en')}>
                    English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('tr')}>
                    Türkçe
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

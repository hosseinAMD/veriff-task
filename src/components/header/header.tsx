import React from 'react';
import VeriffLogo from 'assets/veriff-logo.png';
import t from 'i18n';
import './header.css';

const Header: React.FC = () => (
  <div className="logo-box">
    <a href="https://www.veriff.com/" target="_blank" rel="noopener noreferrer">
      <img src={VeriffLogo} alt={t('brand')} />
    </a>
  </div>
);

export default Header;

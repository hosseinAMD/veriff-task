import React from 'react';
import VeriffLogo from 'assets/veriff-logo.png';
import t from 'i18n';
import './header.css';

const Header: React.FC = () => (
  <div className="logo-box">
    <img src={VeriffLogo} alt={t('brand')} />
  </div>
);

export default Header;

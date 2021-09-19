import React from 'react';
import Button from 'components/button';
import t from 'i18n';
import './section-loader.css';

export interface SectionLoaderProps {
  loading: boolean;
  error?: string;
  onTryAgain: () => void;
  render: () => void;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({
  loading,
  error,
  onTryAgain,
  render,
}) => {
  if (loading) {
    return (
      <div className="loading">
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <Button onClick={onTryAgain}>{t('tryAgain')}</Button>
      </div>
    );
  }

  return <>{render()}</>;
};

export default SectionLoader;

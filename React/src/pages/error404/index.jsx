import React from 'react';
import { useTranslation } from 'react-i18next';

const Error404 = () => {

    const { t } = useTranslation()
    return (
        <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                                <span className="display-1 fw-bold">4</span>
                                <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
                                <span className="display-1 fw-bold bsb-flip-h">4</span>
                            </h2>
                            <h3 className="h2 mb-2">{t('error-404.you_are_lost')}</h3>
                            <p className="mb-5">{t('error-404.page_not_found')}</p>
                            <a className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" href="/" role="button">
                                {t('error-404.back_to_home')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error404;

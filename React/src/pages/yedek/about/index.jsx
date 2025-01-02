import React from 'react';
import { useTranslation } from 'react-i18next';


export function About() {
    const { t } = useTranslation();

    return (
        <section className="py-5">
            <div className="container">
                <div className="row align-items-center gx-4">
                    <div className="col-md-5">
                        <div className="ms-md-2 ms-lg-5">
                            <img className="img-fluid rounded-3"
                                src='./sourceAbout.png'
                                alt="About Us" />
                        </div>
                    </div>
                    <div className="col-md-6 offset-md-1">
                        <div className="ms-md-2 ms-lg-5">
                            <span className="text-muted">{t('about.our_adventure')}</span>
                            <h2 className="display-5 fw-bold">{t('about.about')}</h2>
                            <p className="lead">
                                {t('about.introduction')}
                            </p>
                            <p className="lead mb-0">
                                {t('about.prompt')}
                            </p>
                            <p className="lead mb-0">
                                {t('about.final')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



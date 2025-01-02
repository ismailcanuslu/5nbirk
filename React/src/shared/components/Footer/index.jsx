import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import footerlogo from '../../../assets/homepage-logo.png';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <section className="bg-light py-4 py-md-5 py-xl-8 border-top border-light">
                <div className="container">
                    <div className="row gy-4 gy-lg-0 justify-content-xl-between">
                        <div className="col-12 col-md-4 col-lg-3 col-xl-2 text-center text-md-start">
                            <div className="widget">
                                <a href="/">
                                    <img src={footerlogo} alt="logo" width="135" height="135" />
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 col-xl-2 text-center text-md-start">
                            <div className="widget">
                                <h4 className="widget-title mb-4">{t('footer.contact_us')}</h4>
                                <address className="mb-4">{t('footer.address')}</address>
                                <p className="mb-1">
                                    <a className="link-secondary text-decoration-none" href="tel:+903624440101">{t('footer.phone')}</a>
                                </p>
                                <p className="mb-0">
                                    <a className="link-secondary text-decoration-none" href="mailto:info@5nbirk.com">{t('footer.email')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 col-xl-2 text-center text-md-start">
                            <div className="widget">
                                <h4 className="widget-title mb-4">{t('footer.learn_more')}</h4>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="/about" className="link-secondary text-decoration-none">{t('footer.about')}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/contact" className="link-secondary text-decoration-none">{t('footer.contact')}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/help-center" className="link-secondary text-decoration-none">{t('footer.terms_of_service')}</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/help-center" className="link-secondary text-decoration-none">{t('footer.privacy_policy')}</a>
                                    </li>
                                </ul>


                            </div>
                        </div>
                        <div className="col-12 col-lg-3 col-xl-4 text-center text-md-start">
                            <div className="widget">
                                <h4 className="widget-title mb-4">{t('footer.newsletter_title')}</h4>
                                <p className="mb-4">{t('footer.newsletter_subscribe')}</p>
                                <form action="#!">
                                    <div className="row gy-4">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <span className="input-group-text" id="email-newsletter-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z" />
                                                        <path d="M2.5 5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v.5l-5 3.5-5-3.5V5z" />
                                                    </svg>
                                                </span>
                                                <input type="email" className="form-control" id="email-newsletter" placeholder={t('footer.email_placeholder')} aria-label="email-newsletter" aria-describedby="email-newsletter-addon" required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-primary" type="submit">{t('footer.subscribe_button')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-light py-3 py-md-4 py-xl-5 border-top border-light-subtle">
                <div className="container">
                    <div className="row gy-4 gy-md-0 align-items-md-center">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="copyright text-start">
                                &copy; 2024
                            </div>
                            <div className="credits text-secondary text-end mt-0 fs-8">
                                <a href="https://www.resyst.co" className="link-secondary text-decoration-none">{t('footer.backlink')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

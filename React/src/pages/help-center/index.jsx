import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

const Help = () => {

    const { t } = useTranslation()
    return (
        <section className="bsb-faq-2 bg-light py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row gy-5 gy-lg-0">
                    <div className="col-12 col-lg-6">
                        <h2 className="h1 mb-3">
                            {t('help-center.how_can_we_help')}
                        </h2>
                        <p className="lead fs-4 text-secondary mb-4">
                            {t('help-center.how_can_we_help_desc')}
                        </p>
                        <a href="/contact" className="btn btn-lg bsb-btn-2xl btn-primary">
                            {t('help-center.contact')}
                        </a>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="row justify-content-xl-end">
                            <div className="col-12 col-xl-11">
                                <div className="accordion accordion-flush" id="accordionExample">
                                    {/* Accordion Item 1 */}
                                    <div className="accordion-item mb-4 shadow-sm">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button bg-transparent fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                {t('help-center.accordion1_title')}
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p>To change your billing information, please follow these steps:</p>
                                                <ul>
                                                    <li>Go to our website and sign in to your account.</li>
                                                    <li>Click on your profile picture in the top right corner of the page and select "Account Settings."</li>
                                                    <li>Under the "Billing Information" section, click on "Edit."</li>
                                                    <li>Make your changes and click on "Save."</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accordion Item 2 */}
                                    <div className="accordion-item mb-4 shadow-sm">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button collapsed bg-transparent fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                {t('help-center.accordion2_title')}
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                A payment system is a way to transfer money from one person or organization to another. It is a complex process that involves many different parties, including banks, credit card companies, and merchants.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Help;

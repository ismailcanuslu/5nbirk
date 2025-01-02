import React from 'react';
import { useTranslation } from 'react-i18next';

function PasswordReset() {
    const { t } = useTranslation();

    return (
        <section className="p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="card border-light-subtle shadow-sm">
                    <div className="row g-0">
                        <div className="col-12 col-md-6 text-bg-primary">
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div className="col-10 col-xl-8 py-3">
                                    <img
                                        className="img-fluid rounded mb-4"
                                        loading="lazy"
                                        src="./navbar-logo.png"
                                        width="245"
                                        height="80"
                                        alt="5nbirk."
                                    />
                                    <hr className="border-primary-subtle mb-4" />
                                    <h2 className="h1 mb-4">{t('passwordReset.tagline')}</h2>
                                    <p className="lead m-0">
                                        {t('passwordReset.description')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                            <h2 className="h3">{t('passwordReset.passwordReset')}</h2>
                                            <h3 className="fs-6 fw-normal text-secondary m-0">
                                                {t('passwordReset.reset_info')}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="#!">
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                placeholder="name@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn bsb-btn-xl btn-primary" type="submit">
                                                    {t('passwordReset.reset_password')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                            <a href="/login" className="link-secondary text-decoration-none">{t('passwordReset.login')}</a>
                                            <a href="/register" className="link-secondary text-decoration-none">{t('passwordReset.register')}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="mt-5 mb-4">{t('passwordReset.orSignInWith')}</p>
                                        <div className="d-flex gap-3 flex-column flex-xl-row">
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <i class="bi bi-google"></i>
                                                <span className="ms-2 fs-6">Google</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default PasswordReset;
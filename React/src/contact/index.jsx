import React from "react";
import { useTranslation } from "react-i18next";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons importu

const Contact = () => {
    const { t } = useTranslation(); // useTranslation hook'u ile çeviri fonksiyonunu çağırıyoruz

    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row gy-3 gy-md-4 gy-lg-0 align-items-md-center">
                    <div className="col-12 col-lg-6">
                        <div className="row justify-content-xl-center">
                            <div className="col-12 col-xl-11">
                                <h2 className="h1 mb-3">{t("contact.get_in_touch")}</h2>
                                <p className="lead fs-4 text-secondary mb-5">
                                    {t("contact.touch_info")}
                                </p>
                                <div className="d-flex mb-5">
                                    <div className="me-4 text-primary">
                                        <i className="bi bi-geo-alt-fill" style={{ fontSize: '32px' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="mb-3">{t("contact.address")}</h4>
                                        <address className="mb-0 text-secondary">
                                            Yakutiye, Erzurum, Türkiye
                                        </address>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12 col-sm-6">
                                        <div className="d-flex mb-5 mb-sm-0">
                                            <div className="me-4 text-primary">
                                                <i className="bi bi-telephone-fill" style={{ fontSize: '32px' }}></i>
                                            </div>
                                            <div>
                                                <h4 className="mb-3">{t("contact.phone")}</h4>
                                                <p className="mb-0">
                                                    <a
                                                        className="link-secondary text-decoration-none"
                                                        href="tel:+15057922430"
                                                    >
                                                        (505) 792-2430
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="d-flex mb-0">
                                            <div className="me-4 text-primary">
                                                <i className="bi bi-envelope-fill" style={{ fontSize: '32px' }}></i>
                                            </div>
                                            <div>
                                                <h4 className="mb-3">{t("contact.email")}</h4>
                                                <p className="mb-0">
                                                    <a
                                                        className="link-secondary text-decoration-none"
                                                        href="mailto:info@5nbirk.com"
                                                    >
                                                        info@5nbirk.com
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="me-4 text-primary">
                                        <i className="bi bi-alarm-fill" style={{ fontSize: '32px' }}></i>
                                    </div>
                                    <div>
                                        <h4 className="mb-3">{t("contact.opening_hours")}</h4>
                                        <div className="d-flex mb-1">
                                            <p className="text-secondary fw-bold mb-0 me-5">
                                                {t("contact.working_weekday")}
                                            </p>
                                            <p className="text-secondary mb-0">
                                                {t("contact.working_weekday_hours")}
                                            </p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-secondary fw-bold mb-0 me-5">
                                                {t("contact.working_weekend")}
                                            </p>
                                            <p className="text-secondary mb-0">
                                                {t("contact.working_weekend_hours")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="bg-white border rounded shadow-sm overflow-hidden">
                            <form action="#!">
                                <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                                    <div className="col-12">
                                        <label htmlFor="fullname" className="form-label">
                                            {t("contact.full_name")} <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullname"
                                            name="fullname"
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="email" className="form-label">
                                            {t("contact.email")} <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-envelope-fill"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="phone" className="form-label">
                                            {t("contact.phone_number")}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-telephone-fill"></i>
                                            </span>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="subject" className="form-label">
                                            {t("contact.subject")} <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            name="subject"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="message" className="form-label">
                                            {t("contact.message")} <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            rows="5"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                        >
                                            {t("contact.send_message")}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

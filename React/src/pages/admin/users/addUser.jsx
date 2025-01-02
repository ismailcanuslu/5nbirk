import React, { useMemo, useEffect, useState } from "react";
import { Input } from "../../SignUp/components/input";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import './addUser.css';

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signUp, updateField } from "../../../redux/app/signUpSlice";
import { Button } from "../../../shared/state/Button";

export function AddUser() {
    const dispatch = useDispatch();
    const {
        username,
        email,
        password,
        passwordRepeat,
        name,  // Değişiklik: firstName
        lastname,  // Değişiklik: lastName
        apiProgress,
        successMessage,
        errors,
        generalError,
    } = useSelector((state) => state.signUp);

    const { t } = useTranslation();
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState(navigator.language || navigator.userLanguage);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch('https://ipapi.co/country/');
                const countryCode = await response.text();
                setCountry(countryCode);
            } catch (error) {
                console.error("Country fetch error:", error);
            }
        };

        fetchCountry();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(signUp({
            username,
            email,
            password,
            name,  // Değişiklik: firstName
            lastname,  // Değişiklik: lastName
            country,
            language
        }));
    };

    const handleInputChange = (field, value) => {
        dispatch(updateField({ field, value }));
        dispatch(clearErrors(field));
    };

    const passwordRepeatError = useMemo(() => {
        if (password && password.length >= 8 && passwordRepeat && passwordRepeat.length >= 8) {
            if (password !== passwordRepeat) {
                return t("passwordMismatch");
            }
        }
        return null;
    }, [password, passwordRepeat, t]);

    return (
        <section className="p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="card border-light-subtle shadow-sm">
                    <div className="row g-0">

                        <div className="col-12 col-md-6 text-bg-primary">
                            <Link to="/admin/users/get-all-users" className="btn btn-success me-2">
                                <i class="bi bi-arrow-bar-left"></i>
                                Geri dön
                            </Link>
                            <div className="d-flex align-items-center justify-content-center h-100">

                                <div className="col-10 col-xl-8 py-3">
                                    <img
                                        className="img-fluid rounded mb-4"
                                        loading="lazy"
                                        src="/../../navbar-logo.png"
                                        width="245"
                                        height="80"
                                        alt="Navbar Logo"
                                    />
                                    <hr className="border-primary-subtle mb-4" />
                                    <h2 className="h1 mb-4">Yönetici Hakları</h2>
                                    <p className="lead m-0">Yönetici hakları ile kullanıcı kaydı yapıyorsunuz. Mail onayı olmaksızın kullanıcı kayıtlanacaktır.</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="mb-5">
                                    <h2 className="h3">{t("signUp.registration")}</h2>
                                    <h3 className="fs-6 fw-normal text-secondary m-0">
                                        {t("signUp.enterDetails")}
                                    </h3>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <div className="row gy-3 gy-md-4">
                                        <div className="col-12">
                                            <Input
                                                id="username"
                                                label={t("signUp.username")}
                                                value={username}
                                                error={errors.username}
                                                onChange={(event) => handleInputChange("username", event.target.value)}
                                            />
                                        </div>
                                        <div className="col-12 row gx-2">
                                            <div className="col-6">
                                                <Input
                                                    id="name"  // Değişiklik: firstName
                                                    label={t("signUp.firstName")}  // Değişiklik: firstName
                                                    value={name}  // Değişiklik: firstName
                                                    error={errors.name}  // Değişiklik: firstName
                                                    onChange={(event) => handleInputChange("name", event.target.value)}  // Değişiklik: firstName
                                                />
                                            </div>
                                            <div className="col-6">
                                                <Input
                                                    id="lastname"  // Değişiklik: lastName
                                                    label={t("signUp.lastName")}  // Değişiklik: lastName
                                                    value={lastname}  // Değişiklik: lastName
                                                    error={errors.lastname}  // Değişiklik: lastName
                                                    onChange={(event) => handleInputChange("lastname", event.target.value)}  // Değişiklik: lastName
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <Input
                                                id="email"
                                                label={t("signUp.email")}
                                                value={email}
                                                error={errors.email}
                                                onChange={(event) => handleInputChange("email", event.target.value)}
                                                type="email"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <Input
                                                id="password"
                                                label={t("signUp.password")}
                                                value={password}
                                                error={errors.password}
                                                onChange={(event) => handleInputChange("password", event.target.value)}
                                                type="password"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <Input
                                                id="passwordRepeat"
                                                label={t("signUp.passwordRepeat")}
                                                value={passwordRepeat}
                                                error={passwordRepeatError || errors.passwordRepeat}
                                                onChange={(event) => handleInputChange("passwordRepeat", event.target.value)}
                                                type="password"
                                            />
                                        </div>

                                        <div className="col-12">
                                            <div className="d-grid">
                                                <Button
                                                    disabled={apiProgress || (!password || password !== passwordRepeat)}
                                                    onClick={onSubmit}
                                                >
                                                    {apiProgress && (
                                                        <span
                                                            className="spinner-border spinner-border-sm"
                                                            aria-hidden="true"
                                                        ></span>
                                                    )}
                                                    Kullanıcıyı kaydet
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {successMessage && (
                                    <div className="alert alert-success d-flex align-items-center" role="alert">
                                        <svg
                                            className="bi flex-shrink-0 me-2"
                                            width="24"
                                            height="24"
                                            role="img"
                                            aria-label="Success:"
                                        >
                                            <use href="#check-circle-fill" />
                                        </svg>
                                        <div>{successMessage}</div>
                                    </div>
                                )}
                                {generalError && (
                                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                                        <svg
                                            className="bi flex-shrink-0 me-2"
                                            width="24"
                                            height="24"
                                            role="img"
                                            aria-label="Warning:"
                                        >
                                            <use href="#exclamation-triangle-fill" />
                                        </svg>
                                        <div>{generalError}</div>
                                    </div>
                                )}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

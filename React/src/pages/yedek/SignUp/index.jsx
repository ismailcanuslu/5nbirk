import React, { useMemo } from "react";
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../../shared/components/LanguageSelector";
import './styles.css'

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signUp, updateField } from "../../redux/app/signUpSlice";
import { Button } from "../../shared/state/Button";

export function SignUp() {
    const dispatch = useDispatch();
    const {
        username,
        email,
        password,
        passwordRepeat,
        apiProgress,
        successMessage,
        errors,
        generalError,
    } = useSelector((state) => state.signUp);

    const { t } = useTranslation();

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(signUp({ username, email, password }));
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
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div className="col-10 col-xl-8 py-3">
                                    <img
                                        className="img-fluid rounded mb-4"
                                        loading="lazy"
                                        src="./navbar-logo.png"
                                        width="245"
                                        height="80"
                                        alt="Navbar Logo"
                                    />
                                    <hr className="border-primary-subtle mb-4" />
                                    <h2 className="h1 mb-4">{t("tagline")}</h2>
                                    <p className="lead m-0">{t("signUp.description")}</p>
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
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" required />
                                                <label className="form-check-label text-secondary">
                                                    {t("signUp.iAgree")}{" "}
                                                    <a href="#!" className="link-primary text-decoration-none">
                                                        {t("terms")}
                                                    </a>
                                                </label>
                                            </div>
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
                                                    {t("signUp.signUp")}
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
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <p className="m-0 text-secondary text-center">
                                            {t("signUp.alreadyHaveAccount")}{" "}
                                            <a href="#!" className="link-primary text-decoration-none">
                                                {t("signUp.signIn")}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="mt-5 mb-4">{t("signUp.orSignInWith")}</p>
                                        <div className="d-flex gap-3 flex-column flex-xl-row">
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-google"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Google</span>
                                            </a>
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-facebook"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.064 1.791.064v2.073h-1.009c-.993 0-1.293.616-1.293 1.252V8.05h2.203l-.352 2.325h-1.85v5.625c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Facebook</span>
                                            </a>
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-twitter"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.01-.423A6.68 6.68 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518A3.301 3.301 0 0 0 15.555 2a6.533 6.533 0 0 1-2.085.797A3.286 3.286 0 0 0 11.078.328a3.284 3.284 0 0 0-4.828 2.994 9.325 9.325 0 0 1-6.766-3.429 3.284 3.284 0 0 0 1.015 4.382A3.27 3.27 0 0 1 .64 5.565v.041a3.284 3.284 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.864.115 3.23 3.23 0 0 1-.618-.057 3.283 3.283 0 0 0 3.067 2.281A6.588 6.588 0 0 1 0 13.065a9.29 9.29 0 0 0 5.031 1.474" />
                                                </svg>
                                                <span className="ms-2 fs-6">Twitter</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


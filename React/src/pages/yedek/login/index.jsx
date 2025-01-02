import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './styles.css';
import { Input } from "../SignUp/components/input";
import { login } from "./api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/app/authSlice";


export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setErrors((lastErrors) => ({
            ...lastErrors,
            email: undefined,
        }));
    }, [email]);

    useEffect(() => {
        setErrors((lastErrors) => ({
            ...lastErrors,
            password: undefined,
        }));
    }, [password]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setGeneralError();

        try {
            const response = await login({ email, password });
            console.log(response.data);
            dispatch(loginSuccess(response.data));
            navigate("/");
        } catch (axiosError) {
            if (axiosError.response?.data) {
                if (axiosError.response.data.status === 400) {
                    setErrors(axiosError.response.data.validationErrors);
                } else {
                    setGeneralError(axiosError.response.data.message);
                }
            } else {
                setGeneralError(t("genericError"));
            }
        } finally {
            setApiProgress(false);
        }
    };

    return (
        <>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 bsb-tpl-bg-platinum">
                            <div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5">
                                <h3 className="m-0">{t('loginPage.welcome')}</h3>
                                <img
                                    className="img"
                                    loading="lazy"
                                    src="./navbar-logo.png"
                                    width="405"
                                    height="135"
                                    alt="5nbirk."
                                />

                                <p className="mb-0">
                                    {t('loginPage.not_a_member_yet')}{' '}
                                    <a href="/register" className="link-secondary text-decoration-none">{t('loginPage.register_now')}</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 bsb-tpl-bg-lotion">
                            <div className="p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5 text-center">
                                            <h3>{t('loginPage.login')}</h3>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-12">
                                            <Input
                                                id="email"
                                                label={t('loginPage.email')}
                                                error={errors.email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <Input
                                                id="password"
                                                label={t('loginPage.password')}
                                                error={errors.password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                type="password"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="remember_me"
                                                />
                                                <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                    {t('loginPage.remember_me')}
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            {generalError && (
                                                <div className="alert alert-warning d-flex align-items-center" role="alert">
                                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                                        <use href="#exclamation-triangle-fill" />
                                                    </svg>
                                                    <div>{generalError}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button
                                                    className="btn bsb-btn-xl btn-primary"
                                                    type="submit"
                                                    disabled={apiProgress || !(password && email)}
                                                >
                                                    {apiProgress && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                                    {t('loginPage.login')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <div className="text-end">
                                            <a href="#!" className="link-secondary text-decoration-none">{t('loginPage.forgot_password')}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="mt-5 mb-4">{t('loginPage.or_sign_in_with')}</p>
                                        <div className="d-flex gap-3 flex-column flex-xl-row">
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Google</span>
                                            </a>
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Facebook</span>
                                            </a>
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.54a6.56 6.56 0 0 1-1.889.517 3.295 3.295 0 0 0 1.447-1.816 6.573 6.573 0 0 1-2.084.793A3.292 3.292 0 0 0 7.876 6.17a9.355 9.355 0 0 1-6.776-3.429 3.29 3.29 0 0 0 1.016 4.385 3.22 3.22 0 0 1-1.49-.41v.041c0 1.579 1.121 2.893 2.609 3.193a3.313 3.313 0 0 1-.867.116c-.212 0-.418-.021-.621-.058a3.297 3.297 0 0 0 3.066 2.283A6.588 6.588 0 0 1 1 13.48a9.291 9.291 0 0 0 5.026 1.476" />
                                                </svg>
                                                <span className="ms-2 fs-6">Twitter</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>

            </section>

        </>
    );
}

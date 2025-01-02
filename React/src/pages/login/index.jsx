import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './styles.css';
import { Input } from "../SignUp/components/input";
import { login } from "./api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/app/authSlice";

export function Login() {
    const [email, setEmail] = useState(""); // Başlangıçta boş string
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const [rememberMe, setRememberMe] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Bileşen ilk render edildiğinde e-posta adresini localStorage'dan çek
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");

        if (rememberedEmail) {
            setEmail(rememberedEmail);
        }
    }, []); // Sadece ilk render'da çalışır

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

            // Eğer "Beni Hatırla" işaretliyse e-posta adresini sakla
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            dispatch(loginSuccess({ ...response.data, rememberMe }));
            navigate("/");
        } catch (axiosError) {
            if (axiosError.response?.data) {
                if (axiosError.response.data.status === 400) {
                    setErrors(axiosError.response.data.validationErrors);
                } else {
                    setGeneralError(axiosError.response.data.message);
                }
            } else {
                setGeneralError(t("init.genericError"));
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
                                    className="navbar-brand img"
                                    loading="lazy"
                                    src="./navbar-logo.png"
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
                                                value={email}
                                                error={errors.email}
                                                onChange={(event) => {
                                                    setEmail(event.target.value);
                                                    console.log("Email değişti:", event.target.value);
                                                }}
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
                                                    id="remember_me"
                                                    checked={rememberMe} // Çekmece durumu
                                                    onChange={(e) => setRememberMe(e.target.checked)} // Değişiklik olduğunda güncelle
                                                />
                                                <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                    {t('loginPage.remember_me')}
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            {generalError && (
                                                <div className="alert alert-info d-flex align-items-center" role="alert">
                                                    <i className="bi bi-x-circle me-3"></i> {/* Simge ile metin arasında boşluk eklemek için `me-3` (margin-end) sınıfı eklendi */}
                                                    <div className="vertical-divider"></div> {/* Dikey çizgi */}
                                                    <div className="ms-3">{generalError}</div> {/* Çizgiden sonra metin için `ms-3` (margin-start) sınıfı eklendi */}
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
                                            <a href="/forgot-password" className="link-secondary text-decoration-none">{t('loginPage.forgot_password')}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="mt-5 mb-4">{t('loginPage.or_sign_in_with')}</p>
                                        <div className="d-flex gap-3 flex-column flex-xl-row">
                                            <a href="#!" className="btn bsb-btn-xl btn-outline-primary">
                                                <i className="bi bi-google"></i>Google
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

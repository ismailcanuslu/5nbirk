import React, { useEffect, useState } from 'react';
import './editUser.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const EditUser = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'TR',
        language: 'tr',
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        notifications: false,
    });

    const [activeTab, setActiveTab] = useState('account');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveChanges = () => {
        console.log('Saved data:', formData);
    };

    const handleDeactivate = () => {
        console.log('Account deactivated');
    };

    return (
        <>

            <div className="profileSettings-wrapper bg-white mt-sm-5">

                <h4 className="pb-4 border-bottom">
                    {activeTab === 'account' ? (
                        <>
                            <i className="bi bi-person-circle"></i> Account Settings
                        </>
                    ) : activeTab === 'security' ? (
                        <>
                            <i className="bi bi-shield-shaded"></i> Security Settings
                        </>
                    ) : (
                        <>
                            <i className="bi bi-app-indicator"></i> Miscellaneous
                        </>
                    )}
                </h4>
                <small className="text-muted">@user adlı kullanıcının bilgileri değiştiriliyor</small>

                <div className="tab-menu">
                    {['account', 'security', 'miscellaneous'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'account' ? 'Account' : (tab === 'security' ? 'Security' : 'Miscellaneous')}
                        </button>
                    ))}
                </div>

                {activeTab === 'account' && (
                    <div className="account-settings py-3">
                        {/* Profile settings */}
                        <div className="py-2">
                            <div className="row py-2">
                                <div className="col-md-6">
                                    <label htmlFor="firstname">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="bg-light form-control"
                                        placeholder={t('signUp.firstName')}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 pt-md-0 pt-3">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="bg-light form-control"
                                        placeholder={t('signUp.lastName')}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col-md-6">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="bg-light form-control"
                                        placeholder={t('signUp.email')}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 pt-md-0 pt-3">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="bg-light form-control"
                                        placeholder={t('profileSettings.phone_number_placeholder')}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col-md-6">
                                    <label htmlFor="country">Country</label>
                                    <select
                                        name="country"
                                        id="country"
                                        className="bg-light"
                                        value={formData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="TR">Türkiye</option>
                                        <option value="USA">United States</option>
                                        <option value="UK">United Kingdom</option>
                                    </select>
                                </div>
                                <div className="col-md-6 pt-md-0 pt-3" id="lang">
                                    <label htmlFor="language">Language</label>
                                    <select
                                        name="language"
                                        id="language"
                                        className="bg-light"
                                        value={formData.language}
                                        onChange={handleChange}
                                    >
                                        <option value="tr">Türkçe</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-3">
                                <button className="btn btn-primary" onClick={handleSaveChanges}>Değişiklikleri Kaydet</button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'security' && (
                    <div className="security-settings py-3">
                        <h4>Change Password</h4>
                        <div className="py-2">
                            <label htmlFor="newPassword">Yeni Şifre</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="bg-light form-control"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="repeatNewPassword">Tekrar Yeni Şifre</label>
                            <input
                                type="password"
                                name="repeatNewPassword"
                                className="bg-light form-control"
                                value={formData.repeatNewPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between py-3">
                            <button className="btn btn-primary" onClick={handleSaveChanges}>Değişiklikleri Kaydet</button>
                        </div>

                        <div className="py-3" id="deactivate">
                            <b>Hesabı Sil</b>
                            <p>Bu hesabı silerseniz, tekrar erişim veya geri almak mümkün olmayacaktır.</p>
                            <button className="btn btn-danger" onClick={handleDeactivate}>Kalıcı Olarak Sil</button>
                        </div>
                    </div>
                )}
                {activeTab === 'miscellaneous' && (
                    <div className="miscellaneous-settings py-3">
                        <h4>Çeşitli Ayarlar</h4>
                        <button className="btn btn-warning">Aktivasyon Mailini Tekrar Gönder</button>
                        <div className="d-flex justify-content-between py-3">
                            <button className="btn btn-warning" onClick={handleSaveChanges}>Profil Resmini Sıfırla</button>
                        </div>

                    </div>
                )}
                <Link to="/admin/users/get-all-users" className="btn btn-success me-2">
                    <i class="bi bi-arrow-bar-left"></i>
                    Geri dön
                </Link>
            </div>
        </>
    );
};

export default EditUser;

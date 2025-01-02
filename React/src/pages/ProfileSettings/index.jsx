import React, { useEffect, useState } from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ProfileSettingsArea = () => {

  const { t } = useTranslation();

  const authState = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'india',
    language: 'english',
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
    notifications: false,
    profilePhoto: null,
  });

  useEffect(() => {
    if (authState) {
      setFormData({
        firstName: authState.firstName || '',
        lastName: authState.lastName || '',
        email: authState.email || '',
        phone: authState.phone || '',
        country: authState.country || 'TR',
        language: authState.language || 'en_US',
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        notifications: false,
      });
    }
  }, [authState]);

  useEffect(() => {
    console.log('Auth State:', authState);
    console.log('Form data:', formData)
    if (authState) {
      setFormData({
        firstName: authState.name || '',
        lastName: authState.lastname || '',
        email: authState.email || '',
        phone: authState.phoneNumber || '',
        country: authState.country || 'TR',
        language: authState.language || 'en_US',
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        notifications: false,
      });
    }
  }, [authState]);

  const [activeTab, setActiveTab] = useState('account');
  const [photoSelected, setPhotoSelected] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        profilePhoto: files[0],
      });
      setPhotoSelected(true); // Fotoğraf seçildiğinde durumu değiştir
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSaveChanges = () => {

  };

  const handleDeactivate = () => {

  };

  const handlePhotoUpload = () => {
    document.getElementById('fileInput').click(); // Dosya yükle butonuna tıklat
  };

  const handleConfirmPhoto = () => {
    // Onaylama işlemi yapılacak, buraya gerekli kodları ekleyebilirsin
    console.log('Photo confirmed:', formData.profilePhoto);
  };

  const handleCancelPhoto = () => {
    setFormData({ ...formData, profilePhoto: null });
    setPhotoSelected(false); // Fotoğraf seçimini iptal et
  };

  return (
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
            <i className="bi bi-app-indicator"></i> Notifications Settings
          </>
        )}
      </h4>
      <div className="tab-menu">
        {['account', 'security', 'notifications'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'account' ? 'Account' : (tab === 'security' ? 'Security' : 'Notifications')}
          </button>
        ))}
      </div>

      {activeTab === 'account' && (
        <div className="account-settings py-3">
          <div className="d-flex align-items-start py-3 border-bottom">
            <img
              src={
                formData.profilePhoto
                  ? URL.createObjectURL(formData.profilePhoto)
                  : 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              }
              className="img"
              alt="Profile"
            />
            <div className="pl-sm-4 pl-2" id="img-section">
              <b>Profile Photo</b>
              <p>Accepted file type .png, .jpg, .jpeg, .heic. Less than 5MB</p>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                accept=".png, .jpg, .jpeg, .heic"
                id="fileInput"
                style={{ display: 'none' }}
              />
              <button className="btn button border" onClick={handlePhotoUpload}><b>Upload</b></button>
              {photoSelected && (
                <div className="mt-2">
                  <button className="btn btn-success" onClick={handleConfirmPhoto}><i class="bi bi-check-circle-fill"></i></button>

                  <button className="btn btn-danger" onClick={handleCancelPhoto}><i class="bi bi-x-circle-fill"></i></button>
                </div>
              )}
            </div>
          </div>
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
                  <option value="india">Türkiye</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
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
                  <option value="turkish">Türkçe</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-between py-3">
              <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'security' && (
        <div className="security-settings py-3">
          <h4>Change Password</h4>
          <div className="py-2">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className="bg-light form-control"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="bg-light form-control"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <label htmlFor="repeatNewPassword">Repeat New Password</label>
            <input
              type="password"
              name="repeatNewPassword"
              className="bg-light form-control"
              value={formData.repeatNewPassword}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between py-3">
            <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
          </div>

          <div className="py-3" id="deactivate">
            <b>Deactivate Account</b>
            <p>If you deactivate your account, you won't be able to access it again.</p>
            <button className="btn danger" onClick={handleDeactivate}>Deactivate</button>
          </div>
        </div>
      )}
      {activeTab === 'notifications' && (
        <div className="notification-settings py-3">
          <h4>Notification Preferences</h4>
          <label htmlFor="notifications">
            <input
              type="checkbox"
              name="notifications"
              id="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
          <div className="d-flex justify-content-between py-3">
            <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsArea;


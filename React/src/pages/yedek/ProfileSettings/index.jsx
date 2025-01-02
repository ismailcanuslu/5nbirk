import React, { useState } from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../shared/state/Button';
import { Input } from '../../shared/state/Input';
import { Alert } from '../../shared/state/Alert';
import { usernameUpdate, clearErrors, updateField } from '../../redux/app/usernameUpdateSlice';
import { useTranslation } from 'react-i18next';

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('information');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [url, setUrl] = useState('http://example.com');
  const [location, setLocation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);


  const { newUsername, apiProgress, errors, generalError } = useSelector((state) => state.usernameUpdate)

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
    dispatch(clearErrors({ field }));
    if (field === 'newUsername') {
      dispatch(clearErrors('username'));
    }
  }

  const handleUpdate = () => {
    console.log("Profile updated:", { fullName, bio, url, location });
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      console.log("Password changed:", { currentPassword, newPassword });
    } else {
      console.error("New passwords do not match.");
    }
  };

  const handleUsernameChange = async (event) => {
    event.preventDefault();
    console.log("Updating username with:", { id: authState.id, username: newUsername });
    dispatch(usernameUpdate({ id: authState.id, body: { username: newUsername } }))
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                  <a
                    href="#information"
                    onClick={() => handleTabChange('information')}
                    className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'information' ? 'active' : ''}`}
                  >
                    {t('profileSettings.account_information')}
                  </a>
                  <br />
                  <a
                    href="#account"
                    onClick={() => handleTabChange('account')}
                    className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'account' ? 'active' : ''}`}
                  >
                    {t('profileSettings.account_settings')}
                  </a>
                  <br />
                  <a
                    href="#security"
                    onClick={() => handleTabChange('security')}
                    className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'security' ? 'active' : ''}`}
                  >
                    {t('profileSettings.account_security')}
                  </a>
                  <br />
                  <a
                    href="#notification"
                    onClick={() => handleTabChange('notification')}
                    className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'notification' ? 'active' : ''}`}
                  >
                    {t('profileSettings.notification')}
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {activeTab === 'information' && (
              <div className="card">
                <div className="card-body">
                  <h2>{t('profileSettings.your_profile_information')}</h2>
                  <div className="mb-3">
                    <label>Name</label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Surname</label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Your Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>URL</label>
                    <Input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Location</label>
                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={handleUpdate}
                      label="Update Profile"
                      apiProgress={apiProgress}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'security' && (
              <div className="card">
                <div className="card-body">
                  <h2>{t('profileSettings.change_password')}</h2>
                  <form onSubmit={handleUsernameChange}>
                    <div>
                      <label>{t('profileSettings.current_password')}</label>
                      <Input
                        type="password"
                        onChange={handlePasswordChange}
                        error={errors.newPassword}
                      ></Input>
                    </div>

                    <div>
                      <label>{t('profileSettings.new_password')}</label>
                      <Input
                        type="password"
                        onChange={handlePasswordChange}
                        error={errors.newPassword}
                      ></Input>
                    </div>

                    <div>
                      <label>{t('profileSettings.confirm_new_password')}</label>
                      <Input
                        type="password"
                        onChange={handlePasswordChange}
                        error={errors.newPassword}
                      ></Input>
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={handleUpdate}
                        label={t('profileSettings.update')}
                        apiProgress={apiProgress}
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
            {activeTab === 'account' && (
              <div className="card">
                <div className="card-body">
                  <h2>{t('profileSettings.change_username')}</h2>
                  <form onSubmit={handleUsernameChange}>
                    <div>
                      <label>{t('profileSettings.username')}</label>
                      <Input
                        type="text"
                        defaultValue={authState.username}
                        onChange={(event) => handleInputChange('newUsername', event.target.value)}
                        error={errors.username}
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        type="submit"
                        onClick={handleUsernameChange}
                        label={t('profileSettings.update')}
                        apiProgress={apiProgress}
                      >
                      </Button>
                    </div>
                    <div>
                      {generalError && <Alert>{generalError}</Alert>}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    </>
  );
}

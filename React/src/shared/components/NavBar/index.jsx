import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../../redux/app/authSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, Nav, Navbar as BootstrapNavbar, Container } from 'react-bootstrap';

import navbarlogo from '../../../assets/navbar-logo.png';

function Navbar() {
    const { t } = useTranslation();
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const [adminPanel, setAdminPanel] = useState(true); // adminPanel state'i

    const onClickLogout = () => {
        dispatch(logoutSuccess());
    };

    const isActive = (path) => location.pathname === path;

    return (
        <BootstrapNavbar expand="lg" bg="light" className="bg-body-tertiary">
            <Container fluid>
                <Link to="/" className="navbar-brand">
                    <img src={navbarlogo} alt="Homepage Logo" />
                </Link>
                <BootstrapNavbar.Toggle aria-controls="navbarSupportedContent" />
                <BootstrapNavbar.Collapse id="navbarSupportedContent">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/about" className={isActive('/about') ? 'active' : ''}>
                            <i className="bi bi-info-circle-fill"></i> {t('init.about')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/forum" className={isActive('/forum') ? 'active' : ''}>
                            <i className="bi bi-chat-dots-fill"></i> {t('init.forum')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/blog" className={isActive('/blog') ? 'active' : ''}>
                            <i className="bi bi-journal-text"></i> {t('init.blog')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/members" className={isActive('/members') ? 'active' : ''}>
                            <i className="bi bi-people-fill"></i> {t('init.members')}
                        </Nav.Link>

                        {adminPanel && (
                            <Nav.Link as={Link} to="/admin" className={isActive('/admin') ? 'active' : ''}>
                                <i className="bi bi-shield-lock-fill"></i> {t('init.admin_panel')}
                            </Nav.Link>
                        )}
                    </Nav>

                    {authState.id === 0 ? (
                        <div className="navbar-actions">
                            <Link to="/login" className="btn btn-outline-primary">
                                <i className="bi bi-box-arrow-in-right"></i> {t('init.login')}
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                <i className="bi bi-person-plus-fill"></i> {t('init.signUp')}
                            </Link>
                        </div>
                    ) : (
                        <div className="navbar-actions d-flex align-items-center" style={{ marginLeft: 'auto' }}>
                            {/* Notification Button */}
                            <Dropdown align="end" className="notification-dropdown me-2">
                                <Dropdown.Toggle variant="light" id="notificationsDropdown">
                                    <i className="bi bi-bell-fill"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Notification 1</Dropdown.Item>
                                    <Dropdown.Item>Notification 2</Dropdown.Item>
                                    <Dropdown.Item>Notification 3</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="/notifications">Show more</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Messages Button */}
                            <Dropdown align="end" className="messages-dropdown me-2">
                                <Dropdown.Toggle variant="light" id="chatsDropdown">
                                    <i className="bi bi-chat-dots"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Chat message 1</Dropdown.Item>
                                    <Dropdown.Item>Chat message 2</Dropdown.Item>
                                    <Dropdown.Item>Chat message 3</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="/chats">Show more</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Profile Button */}
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="light" className="d-flex align-items-center">
                                    <img
                                        src="/default-profile.png"
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ width: "30px", height: "30px", marginRight: "8px" }}
                                    />
                                    <span>{authState.username}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <i className="bi bi-person-circle"></i> <strong>{t('navbar.dropdown_welcome')} {authState.username}</strong>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="/profile">
                                        <i className="bi bi-person"></i> {t('navbar.dropdown_view_profile')}
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/notifications">
                                        <i className="bi bi-bell"></i> {t('navbar.dropdown_notifications')}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="/settings">
                                        <i className="bi bi-gear"></i> {t('navbar.dropdown_settings_privacy')}
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/help-center">
                                        <i className="bi bi-question-circle"></i> {t('navbar.dropdown_help_center')}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={onClickLogout} className="text-danger">
                                        <i className="bi bi-box-arrow-right"></i> {t('navbar.dropdown_logout')}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;

import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const SideBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [openPosts, setOpenPosts] = useState(false);
    const [openMedia, setOpenMedia] = useState(false);
    const [openPages, setOpenPages] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [openTools, setOpenTools] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const iconContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: '#e9ecef',
        marginRight: collapsed ? '0' : '10px',
    };

    return (
        <>

            <Container fluid className="d-flex p-0">
                <Nav
                    className={`d-flex flex-column sidebar ${collapsed ? 'collapsed' : ''}`}
                    style={{
                        width: collapsed ? '80px' : '250px',
                        height: '100vh',
                        backgroundColor: '#f8f9fa',
                        transition: 'width 0.3s ease-in-out',
                        borderRight: '1px solid #dee2e6',
                    }}
                >
                    {/* Sidebar Toggle Icon */}
                    <div className="d-flex justify-content-center align-items-center p-3">
                        <i
                            className={`bi bi-chevron-${collapsed ? 'right' : 'left'}`}
                            style={{
                                fontSize: '1.2rem',
                                color: '#343a40',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                            }}
                            onClick={toggleSidebar}
                        />
                    </div>

                    {/* Divider Line */}
                    <hr style={{ color: '#adb5bd', width: '80%', margin: '0 auto' }} />

                    {/* Sidebar Items */}
                    <Nav.Item>
                        <Nav.Link style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}>
                            <div style={iconContainerStyle}>
                                <i className="bi bi-house" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Başlangıç</span>}
                        </Nav.Link>
                    </Nav.Item>

                    <hr style={{ color: '#adb5bd', width: '80%', margin: '0 auto' }} />

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setOpenPosts(!openPosts)}
                            style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}
                            className={`sidebar-item ${!collapsed && openPosts ? 'active' : ''}`}
                        >
                            <div style={iconContainerStyle}>
                                <i className="bi bi-file-earmark-text" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Yazılar</span>}
                            {!collapsed && (
                                <i
                                    className={`bi bi-chevron-${openPosts ? 'up' : 'down'} ms-auto`}
                                    style={{ fontSize: '0.8rem' }}
                                />
                            )}
                        </Nav.Link>
                        {!collapsed && openPosts && (
                            <Nav className="flex-column ms-4">
                                <Nav.Link as={Link} to="/admin/posts/get-all-posts" style={{ color: '#6c757d' }}>
                                    Tüm Yazılar
                                </Nav.Link>
                                <Nav.Link as={Link} to="/admin/posts/create" style={{ color: '#6c757d' }}>Yeni Yazı Ekle</Nav.Link>
                                <Nav.Link style={{ color: '#6c757d' }}>Kategoriler</Nav.Link>
                                <Nav.Link style={{ color: '#6c757d' }}>Etiketler</Nav.Link>
                            </Nav>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setOpenMedia(!openMedia)}
                            style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}
                            className={`sidebar-item ${!collapsed && openMedia ? 'active' : ''}`}
                        >
                            <div style={iconContainerStyle}>
                                <i className="bi bi-image" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Ortamlar</span>}
                            {!collapsed && (
                                <i
                                    className={`bi bi-chevron-${openMedia ? 'up' : 'down'} ms-auto`}
                                    style={{ fontSize: '0.8rem' }}
                                />
                            )}
                        </Nav.Link>
                        {!collapsed && openMedia && (
                            <Nav className="flex-column ms-4">
                                <Nav.Link style={{ color: '#6c757d' }}>Kütüphane</Nav.Link>
                                <Nav.Link style={{ color: '#6c757d' }}>Yeni Ortam Ekle</Nav.Link>
                            </Nav>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setOpenPages(!openPages)}
                            style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}
                            className={`sidebar-item ${!collapsed && openPages ? 'active' : ''}`}
                        >
                            <div style={iconContainerStyle}>
                                <i className="bi bi-file-earmark" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Sayfalar</span>}
                            {!collapsed && (
                                <i
                                    className={`bi bi-chevron-${openPages ? 'up' : 'down'} ms-auto`}
                                    style={{ fontSize: '0.8rem' }}
                                />
                            )}
                        </Nav.Link>
                        {!collapsed && openPages && (
                            <Nav className="flex-column ms-4">
                                <Nav.Link style={{ color: '#6c757d' }}>Tüm Sayfalar</Nav.Link>
                                <Nav.Link style={{ color: '#6c757d' }}>Yeni Sayfa Ekle</Nav.Link>
                            </Nav>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setOpenUsers(!openUsers)}
                            style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}
                            className={`sidebar-item ${!collapsed && openUsers ? 'active' : ''}`}
                        >
                            <div style={iconContainerStyle}>
                                <i className="bi bi-people" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Kullanıcılar</span>}
                            {!collapsed && (
                                <i
                                    className={`bi bi-chevron-${openUsers ? 'up' : 'down'} ms-auto`}
                                    style={{ fontSize: '0.8rem' }}
                                />
                            )}
                        </Nav.Link>
                        {!collapsed && openUsers && (
                            <Nav className="flex-column ms-4">
                                <Nav.Link as={Link} to="/admin/users/get-all-users" style={{ color: '#6c757d' }}>Tüm Kullanıcılar</Nav.Link>
                                <Nav.Link as={Link} to="/admin/users/add-user" style={{ color: '#6c757d' }}>Yeni Kullanıcı Ekle</Nav.Link>
                            </Nav>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setOpenTools(!openTools)}
                            style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}
                            className={`sidebar-item ${!collapsed && openTools ? 'active' : ''}`}
                        >
                            <div style={iconContainerStyle}>
                                <i className="bi bi-tools" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Araçlar</span>}
                            {!collapsed && (
                                <i
                                    className={`bi bi-chevron-${openTools ? 'up' : 'down'} ms-auto`}
                                    style={{ fontSize: '0.8rem' }}
                                />
                            )}
                        </Nav.Link>
                        {!collapsed && openTools && (
                            <Nav className="flex-column ms-4">
                                <Nav.Link style={{ color: '#6c757d' }}>Site Sağlığı</Nav.Link>
                            </Nav>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link
                            onClick={() => setOpenSettings(!openSettings)}
                            style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}
                            className={`sidebar-item ${!collapsed && openSettings ? 'active' : ''}`}
                        >
                            <div style={iconContainerStyle}>
                                <i className="bi bi-gear" style={{ fontSize: '1.8rem' }} />
                            </div>
                            {!collapsed && <span className="ms-2">Ayarlar</span>}
                            {!collapsed && (
                                <i
                                    className={`bi bi-chevron-${openSettings ? 'up' : 'down'} ms-auto`}
                                    style={{ fontSize: '0.8rem' }}
                                />
                            )}
                        </Nav.Link>
                        {!collapsed && openSettings && (
                            <Nav className="flex-column ms-4">
                                <Nav.Link style={{ color: '#6c757d' }}>Genel Ayarlar</Nav.Link>
                                <Nav.Link style={{ color: '#6c757d' }}>Kullanıcı Ayarları</Nav.Link>
                            </Nav>
                        )}
                    </Nav.Item>
                </Nav>

            </Container>
        </>
    );
};

export default SideBar;

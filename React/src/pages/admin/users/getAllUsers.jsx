import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyasını ekle
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap ikonları
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const users = [
    {
        id: 1,
        name: 'Mila Kunis',
        email: 'mila.kunis@example.com',
        role: 'Admin',
        joined: '2013/08/08',
        avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    },
    {
        id: 2,
        name: 'George Clooney',
        email: 'george.clooney@example.com',
        role: 'Member',
        joined: '2013/08/12',
        avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    },
    {
        id: 3,
        name: 'Ryan Gossling',
        email: 'ryan.gossling@example.com',
        role: 'Registered',
        joined: '2013/03/03',
        avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    },
    {
        id: 4,
        name: 'Emma Watson',
        email: 'emma.watson@example.com',
        role: 'Registered',
        joined: '2004/01/24',
        avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    },
    {
        id: 5,
        name: 'Robert Downey Jr.',
        email: 'robert.downey.jr@example.com',
        role: 'Admin',
        joined: '2013/12/31',
        avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    },
];

const UserList = () => {
    const [rows, setRows] = useState(5); // Varsayılan olarak 5 satır göster
    const [search, setSearch] = useState('');
    const [newUser, setNewUser] = useState(''); // Yeni kullanıcı adı durumu

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddUser = () => {
        if (newUser) {
            const newUserObj = {
                id: users.length + 1,
                name: newUser,
                email: `${newUser.toLowerCase().replace(' ', '.')}@example.com`,
                role: 'Member',
                joined: new Date().toISOString().split('T')[0],
                avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png', // Varsayılan bir avatar
            };
            users.push(newUserObj); // Yeni kullanıcıyı ekle
            setNewUser(''); // Inputu temizle
        }
    };

    return (
        <Container fluid>



            <div className="d-flex">

                <Container className="content p-4" style={{ marginLeft: '20px' }}>

                    <div className="d-flex justify-content-between mb-3">

                        <div className="d-flex">

                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Kullanıcı adı ya da @etiket"
                                value={newUser}
                                onChange={e => setNewUser(e.target.value)}
                                style={{ width: '300px' }}
                            />
                            <Link to="/admin/users/add-user" className="btn btn-success me-2">
                                <i className="bi bi-person-plus"></i>
                                Yeni Kullanıcı Ekle
                            </Link>
                        </div>
                        <div>
                            <p className="d-inline">Sayfa başına gösterim:</p>
                            <select className="form-select d-inline ms-2" value={rows} onChange={e => setRows(e.target.value)} style={{ width: '100px' }}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Kullanıcı</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Katılma Tarihi</th>
                                <th>Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.slice(0, rows).map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <img src={user.avatar} alt={user.name} style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px' }} />
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.joined}</td>
                                    <td>
                                        <button className="btn btn-link text-primary">
                                            <Link to="/admin/users/activity-log"><i className="bi bi-eye"></i></Link>
                                        </button>
                                        <button className="btn btn-link text-warning">
                                            <Link to="/admin/users/edit-user">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                        </button>
                                        <button className="btn btn-link text-danger">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav aria-label="Sayfa Navigasyonu">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Önceki">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Sonraki">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </Container>

            </div>

        </Container>

    );
};

export default UserList;

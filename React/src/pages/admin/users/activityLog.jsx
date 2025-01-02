import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyasını ekle
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap ikonları
import { Link } from 'react-router-dom';

const activities = [
    {
        id: 1,
        content: 'ChatGPT sorularıma karmaşık yanıtlar veriyor',
        type: 'Gönderi',
        dateTime: '2013/07/06-12:30:26',
    },
    {
        id: 2,
        content: 'İlkkan seni kesin dinlemedim ama haksızsın sen ya.',
        type: 'Yorum',
        dateTime: '2013/08/12-14:15:10',
    },
    {
        id: 3,
        content: '<Makale>',
        type: 'Makale',
        dateTime: '2013/03/03-09:45:12',
    },
    {
        id: 4,
        content: '<Makale>',
        type: 'Makale',
        dateTime: '2004/01/24-18:00:00',
    },
    {
        id: 5,
        content: 'Yapay zekanın geleceği hakkında',
        type: 'Gönderi',
        dateTime: '2013/12/31-22:10:30',
    },
];

const ActivityLog = () => {
    const [rows, setRows] = useState(5); // Varsayılan olarak 5 satır göster
    const [search, setSearch] = useState('');
    const [newUser, setNewUser] = useState(''); // Yeni kullanıcı adı durumu

    const filteredActivities = activities.filter(activity =>
        activity.content.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddUser = () => {
        if (newUser) {
            const newActivityObj = {
                id: activities.length + 1,
                content: newUser,
                type: 'Yorum',
                dateTime: new Date().toISOString().split('T')[0],
            };
            activities.push(newActivityObj); // Yeni kullanıcıyı ekle
            setNewUser(''); // Inputu temizle
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <Link to="/admin/users/get-all-users" className="btn btn-success me-2">
                    <i class="bi bi-arrow-bar-left"></i>
                    Geri dön
                </Link>
                <div className="d-flex">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="@postId veya @commentId"
                        value={newUser}
                        onChange={e => setNewUser(e.target.value)}
                        style={{ width: '300px' }}
                    />

                    <span className="align-self-center">@user'ın Hareket Geçmişi İnceleniyor</span>
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
                        <th>ID</th>
                        <th>İçerik</th>
                        <th>Tür</th>
                        <th>Hareket Tarihi ve Saati</th>
                        <th>Aksiyonlar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActivities.slice(0, rows).map(activity => (
                        <tr key={activity.id}>
                            <td>{activity.id}</td>
                            <td>{activity.content === 'Makale' ? <span>Makale</span> : activity.content}</td>
                            <td>{activity.type}</td>
                            <td>{activity.dateTime}</td>
                            <td>
                                <button className="btn btn-link text-primary">
                                    <i className="bi bi-eye"></i>
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
        </div>
    );
};

export default ActivityLog;

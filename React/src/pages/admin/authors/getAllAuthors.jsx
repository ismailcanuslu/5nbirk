import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyasını ekle
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap ikonları
import { Link } from 'react-router-dom';
import axios from 'axios'; // Axios kütüphanesini ekle
import Loader from '../../../shared/components/Loader';
import { apiUrl } from '../../../config';

const GetAllAuthors = () => {

    const [rows, setRows] = useState(5); // Varsayılan olarak 5 satır göster
    const [search, setSearch] = useState('');
    const [authors, setAuthors] = useState([]); // Yazarları saklamak için durum
    const [currentPage, setCurrentPage] = useState(1); // Aktif sayfa
    const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
    const [loading, setLoading] = useState(false);

    // Yazarları al
    const fetchAuthors = async (page, size) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/v1/authors?page=${page}&size=${size}`);
            const { content, totalPages: total } = response.data;

            setAuthors(content || []); // İçerikleri ayarla
            setTotalPages(total || 1); // Toplam sayfa sayısını ayarla
        } catch (error) {
            console.error('Yazarları alırken bir hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors(currentPage, rows);
    }, [currentPage, rows]);

    // Arama işlevi
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.length === 0) {
            fetchAuthors(currentPage, rows); // Eğer input boşsa tüm yazarları tekrar al
        } else {
            try {
                const response = await axios.post('/api/v1/authors/search', { searchValue: query });
                setAuthors(response.data || []); // Gelen sonuçları ayarla
                setTotalPages(1); // Arama yaparken sadece 1 sayfa gösteriyoruz
            } catch (error) {
                console.error('Arama yaparken hata oluştu:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <Loader /> // Yükleniyorsa Loader bileşenini göster
            ) : (
                <>
                    <div className="d-flex justify-content-between mb-3">
                        <div className="d-flex">
                            <Link to="/admin" className="btn btn-success me-2">
                                <i className="bi bi-arrow-bar-left"></i>
                                Geri dön
                            </Link>

                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Yazar adı ya da @authorId"
                                value={search}
                                onChange={handleSearch} // Arama fonksiyonunu tetikle
                                style={{ width: '300px' }}
                            />

                            <Link to="/admin/authors/create" className="btn btn-success me-2">
                                <i className="bi bi-person-plus"></i>
                                Yeni Yazar Ekle
                            </Link>
                        </div>
                        <div>
                            <p className="d-inline">Sayfa başına gösterim:</p>
                            <select className="form-select d-inline ms-2" value={rows} onChange={e => setRows(Number(e.target.value))} style={{ width: '100px' }}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Yazar ID</th>
                                <th>Yazar Adı</th>
                                <th>Oluşturma Tarihi</th>
                                <th>Son Değiştirme Tarihi</th>
                                <th>Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.length > 0 ? (
                                authors.slice(0, rows).map(author => (
                                    <tr key={author.id}>
                                        <td>{author.id}</td>
                                        <td>{author.name}</td>
                                        <td>{new Date(author.createdAt).toLocaleString()}</td>
                                        <td>{author.updatedAt ? new Date(author.updatedAt).toLocaleString() : 'Henüz güncellenmedi'}</td>
                                        <td>
                                            <Link to={`/admin/authors/${author.id}/posts`} className="btn btn-link text-primary">
                                                <i className="bi bi-eye"></i> Gönderileri Gör
                                            </Link>
                                            <Link to={`/admin/authors/edit/${author.id}`} className="btn btn-link text-warning">
                                                <i className="bi bi-pencil-square"></i> Düzenle
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">Yazar bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Sayfa Navigasyonu */}
                    <nav aria-label="Sayfa Navigasyonu">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button className="page-link" aria-label="İlk sayfa" onClick={() => setCurrentPage(1)}>
                                    İlk Sayfa
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" aria-label="Önceki" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                    &laquo;
                                </button>
                            </li>
                            {Array.from({ length: Math.min(9, totalPages) }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button className="page-link" aria-label="Sonraki" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                    &raquo;
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" aria-label="Son sayfa" onClick={() => setCurrentPage(totalPages)}>
                                    Son Sayfa
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default GetAllAuthors;

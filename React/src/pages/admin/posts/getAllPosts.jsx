import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyasını ekle
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap ikonları
import { Link } from 'react-router-dom';
import axios from 'axios'; // Axios kütüphanesini ekle
import Loader from '../../../shared/components/Loader';
import { apiUrl } from '../../../config';

const GetAllPosts = () => {
    const [rows, setRows] = useState(5); // Varsayılan olarak 5 satır göster
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]); // Gönderileri saklamak için durum
    const [currentPage, setCurrentPage] = useState(1); // Aktif sayfa
    const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
    const [loading, setLoading] = useState(false);

    // Gönderileri al
    const fetchPosts = async (page, size) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/v1/latest-posts?page=${page}&size=${size}`);
            const { content, totalPages: total } = response.data;

            setPosts(content || []); // İçerikleri ayarla
            setTotalPages(total || 1); // Toplam sayfa sayısını ayarla
        } catch (error) {
            console.error('Gönderileri alırken bir hata oluştu:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage, rows);
    }, [currentPage, rows]);

    // Arama işlevi
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.length === 0) {
            fetchPosts(currentPage, rows); // Eğer input boşsa tüm gönderileri tekrar al
        } else {
            try {
                const response = await axios.post('${apiUrl}/api/v1/blog/post/search', { searchValue: query });
                setPosts(response.data || []); // Gelen sonuçları ayarla
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
                                placeholder="Gönderi başlığı ya da @postId"
                                value={search}
                                onChange={handleSearch} // Arama fonksiyonunu tetikle
                                style={{ width: '300px' }}
                            />

                            <Link to="/admin/posts/create" className="btn btn-success me-2">
                                <i className="bi bi-file-earmark-post"></i>
                                Yeni Gönderi Ekle
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
                                <th>Post ID</th>
                                <th>Gönderi Başlığı</th>
                                <th>Yazarlar</th>
                                <th>Kategoriler</th>
                                <th>Oluşturma Tarihi</th>
                                <th>Son Güncellenme Tarihi</th>
                                <th>Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.slice(0, rows).map(post => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>

                                        {/* Authors Name Bilgisi */}
                                        <td>
                                            {post.authors && post.authors.length > 0
                                                ? post.authors.map(author => `${author.name}`).join(', ')
                                                : 'Yazar yok'}
                                        </td>

                                        {/* Categories Bilgisi */}
                                        <td>
                                            {post.categories && post.categories.length > 0
                                                ? post.categories.map(category => `${category.categoryName}`).join(', ')
                                                : 'Kategorisi yok'}
                                        </td>

                                        <td>{new Date(post.createdAt).toLocaleString()}</td>
                                        <td>{post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Henüz güncellenmedi'}</td>
                                        <td>
                                            <button className="btn btn-link text-primary">
                                                <Link to={`/blog/${post.title}?id=${post.id}`}>
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                            </button>
                                            <button className="btn btn-link text-warning">
                                                <Link to={`/admin/posts/edit-post/${post.id}`}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                            </button>
                                            <button className="btn btn-link text-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">Arama kriterlerine uygun gönderi bulunamadı.</td>
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

export default GetAllPosts;

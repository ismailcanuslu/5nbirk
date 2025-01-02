import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../shared/components/Loader';
import { apiUrl } from '../../../config';

const GetAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [rows, setRows] = useState(5);
    const [search, setSearch] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/api/v1/blog/all-categories?page=${currentPage}&size=${rows}`);
                setCategories(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Kategoriler alınırken bir hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [currentPage, rows]);

    const filteredCategories = categories.filter(category =>
        category.categoryName?.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddCategory = async () => {
        if (newCategory) {
            const newCategoryObj = {
                categoryName: newCategory,
            };
            try {
                const response = await axios.post('${apiUrl}/api/v1/blog/category/create-category', newCategoryObj);
                setCategories([...categories, response.data]);
                setNewCategory('');
            } catch (error) {
                console.error('Yeni kategori eklenirken bir hata oluştu:', error);
            }
        }
    };

    const handleUpdateCategory = async (id) => {
        if (editingCategoryName) {
            setLoading(true);
            try {
                await axios.put(`${apiUrl}/api/v1/blog/category/${id}`, { categoryName: editingCategoryName });
                const updatedCategories = categories.map(category =>
                    category.id === id ? { ...category, categoryName: editingCategoryName } : category
                );
                setCategories(updatedCategories);
                setEditingCategoryId(null);
                setEditingCategoryName('');
            } catch (error) {
                console.error('Kategori güncellenirken bir hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Sayfa numaralarını dinamik olarak oluştur
    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 4);
        const endPage = Math.min(startPage + 8, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <Loader />
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
                                placeholder="Kategori adı yada @kategoriId"
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                style={{ width: '300px' }}
                            />

                            <button
                                className="btn btn-success me-2"
                                onClick={handleAddCategory}
                            >
                                <i className="bi bi-file-earmark-plus"></i>
                                Yeni Kategori Ekle
                            </button>
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
                                <th>Kategori ID</th>
                                <th>Kategori Adı</th>
                                <th>Oluşturma Tarihi</th>
                                <th>Son Değiştirme Tarihi</th>
                                <th>Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.slice(0, rows).map(category => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>
                                        {editingCategoryId === category.id ? (
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editingCategoryName}
                                                    onChange={e => setEditingCategoryName(e.target.value)}
                                                />
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        setEditingCategoryId(null);
                                                        setEditingCategoryName('');
                                                    }}
                                                >
                                                    <i className="bi bi-x"></i>
                                                </button>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleUpdateCategory(category.id)}
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <i className="bi bi-arrow-clockwise spinner-border"></i>
                                                    ) : (
                                                        <i className="bi bi-check"></i>
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            category.categoryName || 'Belirtilmemiş'
                                        )}
                                    </td>
                                    <td>{category.createdAt ? new Date(category.createdAt).toLocaleString() : 'Belirtilmemiş'}</td>
                                    <td>{category.updatedAt ? new Date(category.updatedAt).toLocaleString() : 'Belirtilmemiş'}</td>
                                    <td>
                                        <Link to={`/admin/categories/activity-log/${category.id}`} className="btn btn-link text-primary">
                                            <i className="bi bi-eye"></i>
                                        </Link>
                                        <button
                                            className="btn btn-link text-warning"
                                            onClick={() => {
                                                setEditingCategoryId(category.id);
                                                setEditingCategoryName(category.categoryName);
                                            }}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-link text-danger">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Sayfa Navigasyonu */}
                    <nav aria-label="Sayfa Navigasyonu">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                >
                                    İlk Sayfa
                                </button>
                            </li>
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    &laquo;
                                </button>
                            </li>
                            {getPageNumbers().map(number => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(number)}>
                                        {number}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    &raquo;
                                </button>
                            </li>
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
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

export default GetAllCategories;

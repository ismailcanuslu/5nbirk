import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../shared/components/Loader';
import { apiUrl } from '../../../config';

const GetAuthorPosts = () => {
    const { authorId } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        const fetchAuthorPosts = async () => {
            try {
                setLoading(true);
                const postsResponse = await axios.get(`${apiUrl}/api/v1/authors/${authorId}/posts`);
                setPosts(postsResponse.data || []);

                // Yazar ismini almak için ek bir istek yapıyoruz
                const authorResponse = await axios.get(`${apiUrl}/api/v1/authors/${authorId}`);
                setAuthorName(authorResponse.data.name);
            } catch (error) {
                console.error('Yazarın gönderileri alınırken bir hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorPosts();
    }, [authorId]);

    return (
        <div className="container mt-4">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h5>{authorName}#{authorId} adlı yazarın yazdığı gönderiler:</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <Link to="/admin/authors" className="btn btn-success me-2">
                            <i className="bi bi-arrow-bar-left"></i>
                            Geri dön
                        </Link>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Post ID</th>
                                <th>Gönderi Başlığı</th>
                                <th>Oluşturma Tarihi</th>
                                <th>Son Güncellenme Tarihi</th>
                                <th>Aksiyonlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{new Date(post.createdAt).toLocaleString()}</td>
                                        <td>{post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Henüz güncellenmedi'}</td>
                                        <td>
                                            <Link to={`/blog/${post.title}?id=${post.id}`} className="btn btn-link text-primary">
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <Link to={`/admin/posts/edit-post/${post.id}`} className="btn btn-link text-warning">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <button className="btn btn-link text-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">Yazarın gönderisi bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default GetAuthorPosts;

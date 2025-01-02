import React, { useEffect } from 'react';
import Loader from '../../shared/components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import defaultimage from '../../assets/navbar-logo.png';
import { useLocation } from 'react-router-dom'; // useLocation'ı import et
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchBlogPostById, clearPost } from '../../redux/app/blogPostSlice';
import { useTranslation } from 'react-i18next';

const BlogContent = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const dispatch = useDispatch();
    const { post, loading, error } = useSelector((state) => state.blogPost);

    useEffect(() => {
        if (id) {
            dispatch(fetchBlogPostById(id));
        }

        return () => {
            dispatch(clearPost());
        };
    }, [id, dispatch]);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="container my-5 blog-content">
            <div className="row">
                <div className="col-lg-8 col-md-12 mb-4">
                    <div className="post-image mb-4">
                        <img
                            src={post?.image_path || defaultimage}
                            alt="blogImage"
                            className="img-fluid rounded"
                        />
                    </div>

                    <div className="post-category text-uppercase mb-3">
                        <span className="badge bg-primary">Kategori</span>
                    </div>

                    <h2 className="post-title">{post?.title}</h2>
                    <div className="post-meta my-3">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="Author"
                            className="rounded-circle me-2"
                        />
                        <span>{post?.user_id || "Yazar Adı"}</span> - <span>{post?.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : "Tarih"}</span>
                    </div>
                    <hr />
                    {/* İçerik */}
                    <p className="post-content">
                        {post?.text || "İçerik henüz mevcut değil."}
                    </p>
                </div>

                {/* Sağ Kısım - Yan Bilgiler */}
                <div className="col-lg-4 col-md-12">
                    {/* Yazar Hakkında */}
                    <div className="author-info p-4 mb-4 bg-light rounded">
                        <h4 className="mb-3">{post?.user_id}</h4>
                        <img
                            src="https://via.placeholder.com/60"
                            alt="Author"
                            className="rounded-circle mb-3"
                        />
                        <h5>Hello, I'm Rachel Roth</h5>
                        <p>
                            I design and develop services for customers of all sizes, specializing in creating stylish,
                            modern websites, web services and online stores.
                        </p>
                    </div>
                    {/* Trending Now */}
                    <div className="trending-now p-4 mb-4 bg-light rounded">
                        <h4>Trending Now</h4>
                        {/* İçerikler buraya eklenebilir */}
                    </div>
                    {/* Latest Post */}
                    <div className="latest-post p-4 mb-4 bg-light rounded">
                        <h4>Latest Post</h4>
                        <div className="post-item d-flex align-items-center mb-3">
                            <img src="https://via.placeholder.com/60x60" alt="Latest Post" className="rounded me-3" />
                            <div>
                                <h6>Prevent 75% of visitors from google analytics</h6>
                                <span>Rachel Roth - 26 Feb 2020</span>
                            </div>
                        </div>
                        {/* Diğer postlar da buraya eklenebilir */}
                    </div>
                    {/* Latest Tags */}
                    <div className="latest-tags p-4 bg-light rounded">
                        <h4>Latest Tags</h4>
                        <div className="tags">
                            <span className="badge bg-secondary me-2">Design</span>
                            <span className="badge bg-secondary me-2">Development</span>
                            <span className="badge bg-secondary me-2">Web Design</span>
                            <span className="badge bg-secondary me-2">Marketing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;

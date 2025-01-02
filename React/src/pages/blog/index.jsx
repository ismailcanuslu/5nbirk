import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestPosts } from '../../redux/app/blogPostSlice';
import Loader from '../../shared/components/Loader';
import homepageLogo from '../../assets/homepage-logo.png';

const Blog = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.blogPost);


    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 6;

    useEffect(() => {
        dispatch(fetchLatestPosts({ page: currentPage, size: postsPerPage }));
    }, [dispatch, currentPage]);

    if (loading) {
        return <Loader />;
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Array.isArray(posts) ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <main className="my-5">
            <div className="container">
                {/* Section: Content */}
                <section className="text-center">
                    <h4 className="mb-5">
                        <strong>Latest posts</strong>
                    </h4>

                    <div className="row">
                        {/* Dinamik Kartlar */}
                        {currentPosts.map((post) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
                                <div className="card">
                                    <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                                        <img
                                            src={post.imagePath || homepageLogo} // Varsayılan görsel
                                            className="img-fluid"
                                            alt={post.title}
                                        />
                                        <a href={`/blog/${post.title}?id=${post.id}`}>
                                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.text}</p>
                                        <a href={`/blog/${post.title}?id=${post.id}`} className="btn btn-primary" data-mdb-ripple-init>
                                            Read
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Section: Content */}

                {/* Pagination */}
                <nav className="my-4" aria-label="...">
                    <ul className="pagination pagination-circle justify-content-center">
                        {/* Previous Button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                tabIndex={currentPage === 1 ? -1 : 0}
                                aria-disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((page) => (
                            <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li className={`page-item ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                tabIndex={currentPage === Math.ceil(posts.length / postsPerPage) ? -1 : 0}
                                aria-disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    );
};

export default Blog;

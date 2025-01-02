import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogPostForHome } from '../../redux/app/blogPostSlice';
import Loader from '../../shared/components/Loader';
import defaultimage from '../../assets/navbar-logo.png';

const Home = () => {

    const dispatch = useDispatch();
    const { homePosts, loading } = useSelector((state) => state.blogPost);

    useEffect(() => {
        dispatch(fetchBlogPostForHome());
        console.log(import.meta.env);

    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (!Array.isArray(homePosts) || homePosts.length === 0) {
        return <div style={{ width: '60%', height: '60%', margin: 'auto', marginTop: "10px" }} className="card">
            <div className="card-body items-center justify-center">
                <span className="icon-[tabler--brand-google-drive] mb-2 size-8"></span>
                <p>No data to show.</p>
            </div>
        </div>



    }

    return (
        <section className="py-3 py-md-5">
            <div className="container overflow-hidden">
                <div className="row gy-5">
                    {homePosts.map((post, index) => (
                        <div className="col-12" key={post.id}>
                            <div className={`row align-items-center gy-3 gy-md-0 gx-xl-5 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                                <div className="col-xs-12 col-md-6">
                                    <div className="img-wrapper position-relative bsb-hover-push">
                                        <a href={`/blog/${post.title}?id=${post.id}`}>
                                            <span className="badge rounded-pill text-bg-warning position-absolute top-0 start-0 m-3">
                                                {post.categoryNames && post.categoryNames.length > 0
                                                    ? post.categoryNames[0]
                                                    : 'Kategori Yok'}
                                            </span>
                                            <img
                                                className="img-fluid rounded w-100 h-100 object-fit-cover"
                                                loading="lazy"
                                                src={post.imagePath || defaultimage}
                                                alt={post.title}
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <div>
                                        <p className="text-secondary mb-1">
                                            {post.updatedAt
                                                ? new Date(post.updatedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
                                                : 'Tarih yok'}
                                        </p>
                                        <h2 className="h1 mb-3">
                                            <a className="link-dark text-decoration-none" href={`/blog/${post.title}?id=${post.id}`}>
                                                {post.title}
                                            </a>
                                        </h2>
                                        <p className="mb-4">{post.text || 'İçerik yok'}</p>
                                        <div className="d-flex align-items-center mb-4">
                                            {post.authors && post.authors.length > 0 ? (
                                                post.authors.map((author, index) => (
                                                    <span key={index} className="badge rounded-pill text-bg-info me-1">
                                                        {author}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-secondary">Yazar bilgisi yok</span>
                                            )}
                                            <a className="btn btn-primary ms-auto" href={`/blog/${post.title}?id=${post.id}`} target="_self">
                                                Read More
                                            </a>
                                        </div>
                                        {index < homePosts.length - 1 && (
                                            <hr style={{ borderColor: 'lightgray', borderWidth: '1px', opacity: 0.5 }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-center">
                        <a className="btn btn-secondary" href="/blog" target="_self">
                            Show all contents
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;

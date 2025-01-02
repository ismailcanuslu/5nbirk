import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../../redux/app/searchUsersSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import Loader from '../../../shared/components/Loader';
import { apiUrl } from '../../../config';

const EditBlogPost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [postId, setPostId] = useState(id); // id'yi sakla
    const navigate = useNavigate(); // For navigation after publish
    const [title, setTitle] = useState('');
    const [editorData, setEditorData] = useState('');
    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingAuthors, setLoadingAuthors] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false); // To track publishing state
    const dispatch = useDispatch();

    const searchResults = useSelector((state) => state.searchUsers.results || []);
    const loadingSearchResults = useSelector((state) => state.searchUsers.loading || false);

    // Fetch blog post data on component mount
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/blog/${id}`);
                const postData = response.data;

                setTitle(postData.title || '');
                setEditorData(postData.text || '');
                // Update authors and categories
                setAuthors(postData.authorNames.map((name, index) => `${name}#${postData.authorIds[index]}`) || []);
                setCategories(postData.categoryNames.map((name, index) => `${name}#${postData.categoryIds[index]}`) || []);
            } catch (error) {
                console.error('Error fetching post data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [id]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const handleAuthorInput = (e) => {
        setAuthorInput(e.target.value);
        dispatch(searchUsers(e.target.value));
    };

    const handleCategoryInput = (e) => {
        setCategoryInput(e.target.value);
        // Add category search function here
    };

    const addAuthor = (e) => {
        if (e.key === 'Enter' && authorInput) {
            setAuthors([...authors, authorInput]);
            setAuthorInput('');
        }
    };

    const addCategory = (e) => {
        if (e.key === 'Enter' && categoryInput) {
            setCategories([...categories, categoryInput]);
            setCategoryInput('');
        }
    };

    const removeAuthor = (author) => setAuthors(authors.filter((a) => a !== author));
    const removeCategory = (category) => setCategories(categories.filter((c) => c !== category));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract IDs for authors and categories
        const authorIds = authors.map(author => author.split('#')[1]); // Get IDs after the '#'
        const categoryIds = categories.map(category => category.split('#')[1]); // Get IDs after the '#'

        const payload = {
            title,
            text: editorData,
            imagePath: "path/to/image.jpg", // Set this as needed
            userId: 952, // Fixed user ID
            authorIds,
            categoryIds
        };

        setPublishing(true); // Start publishing process

        try {
            const response = await axios.put(`${apiUrl}/api/v1/blog/post/${id}`, payload);
            // Redirect to the post page
            const newPostId = parseInt(postId, 10) + 1;
            navigate(`/blog/${response.data.title}?id=${newPostId}`);
        } catch (error) {
            console.error('Error updating the post:', error);
        } finally {
            setPublishing(false); // End publishing process
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container my-5">
            <h1>Blog Gönderini Düzenliyorsun</h1>
            <small className="text-muted"># {id} numaralı blog postunu düzenliyorsun.</small>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label">Başlık</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Başlık Girin"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="text" className="form-label">Metin</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={editorData}
                                onChange={handleEditorChange}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Link to="/admin" className="btn btn-success me-2">
                                <i className="bi bi-arrow-bar-left"></i>
                                Geri dön
                            </Link>
                            <button type="submit" className="btn btn-secondary me-3">
                                <i className="bi bi-clock"></i> Sonrası İçin Kaydet ve Geri Dön
                            </button>
                            <button className="btn btn-primary me-3">
                                <i className="bi bi-eye"></i> Önizleme
                            </button>
                            <button type="submit" className="btn btn-success" disabled={publishing}>
                                {publishing ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    <i className="bi bi-upload"></i>
                                )}
                                Yayınla
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="author-info p-4 mb-4 bg-light rounded">
                            <h5>Yazar Ekle</h5>
                            <input
                                type="text"
                                value={authorInput}
                                onChange={handleAuthorInput}
                                onKeyPress={addAuthor}
                                placeholder="Yazar Adı"
                                className="form-control mb-2"
                            />

                            <Tippy
                                visible={authorInput.length > 2 && searchResults.length > 0}
                                content={
                                    <div className="search-results" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {loadingSearchResults ? (
                                            <Loader />
                                        ) : (
                                            searchResults.map((user, index) => (
                                                <div
                                                    key={index}
                                                    className="result-item"
                                                    style={{ padding: '8px', cursor: 'pointer' }}
                                                >
                                                    {user.name} {user.lastname} (@{user.username})
                                                </div>
                                            ))
                                        )}
                                    </div>
                                }
                                placement="bottom"
                                arrow={true}
                                theme="light"
                            >
                                <span></span>
                            </Tippy>

                            <div>
                                {authors.length > 0 && authors.map((author, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-primary me-2"
                                        onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
                                        onClick={() => removeAuthor(author)}
                                    >
                                        {author}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="category-info p-4 mb-4 bg-light rounded">
                            <h5>Kategori Ekle</h5>
                            <input
                                type="text"
                                value={categoryInput}
                                onChange={handleCategoryInput}
                                onKeyPress={addCategory}
                                placeholder="Kategori Adı"
                                className="form-control mb-2"
                            />
                            <div>
                                {loadingCategories ? (
                                    <Loader />
                                ) : (
                                    categories.length > 0 && categories.map((category, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-secondary me-2"
                                            onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
                                            onClick={() => removeCategory(category)}
                                        >
                                            {category}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditBlogPost;

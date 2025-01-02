import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../redux/app/searchUsersSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import Loader from '../../shared/components/Loader';

const BlogPostForm = () => {
    const [title, setTitle] = useState('');
    const [editorData, setEditorData] = useState('');
    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishing, setPublishing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchResults = useSelector((state) => state.searchUsers.results || []);
    const loading = useSelector((state) => state.searchUsers.loading || false);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };
    const handleAuthorInput = (e) => {
        setAuthorInput(e.target.value);
        dispatch(searchUsers(e.target.value));
    };
    const handleCategoryInput = (e) => setCategoryInput(e.target.value);

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

    const selectAuthor = (user) => {
        setAuthors([...authors, `${user.name} ${user.lastname}#${user.userId}`]);
        setAuthorInput('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPublishing(true);

        const authorIds = authors.map(author => author.split('#')[1]); // ID'leri almak için
        const categoryIds = categories.map(category => category.split('#')[1]); // ID'leri almak için

        const payload = {
            title,
            text: editorData,
            categoryIds: categoryIds.filter(id => id), // Null veya boş olanları filtrele
            authorIds: authorIds.filter(id => id), // Null veya boş olanları filtrele
            images: "path" // Gerekirse uygun bir yol ekleyin
        };

        try {
            const response = await axios.post('${apiUrl}/api/v1/blog/create-post', payload);
            navigate(`/blog/${response.data.title}?id=${response.data.id}`);
        } catch (error) {
            console.error('Yayınlama sırasında hata oluştu:', error);
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="container my-5">
            <h1>Blog Gönderisi Oluştur</h1>
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
                                config={{
                                    toolbar: [
                                        'heading', 'bold', 'italic', 'underline', 'strikethrough', 'link',
                                        'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'imageUpload',
                                        'mediaEmbed', 'undo', 'redo', 'horizontalLine', 'specialCharacters'
                                    ],
                                }}
                                onChange={handleEditorChange}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Link to="/admin/posts/get-all-posts" className="btn btn-success me-2">
                                <i className="bi bi-arrow-bar-left"></i>
                                Geri dön
                            </Link>
                            <button className="btn btn-secondary">
                                <i className="bi bi-clock"></i> Sonrası İçin Kaydet ve Geri Dön
                            </button>
                            <div>
                                <button className="btn btn-secondary me-3">
                                    <i className="bi bi-eye"></i> Gözden Geçir
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
                                        {loading ? (
                                            <Loader />
                                        ) : (
                                            searchResults.map((user, index) => (
                                                <div
                                                    key={index}
                                                    className="result-item"
                                                    onClick={() => selectAuthor(user)}
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
                                {authors.map((author, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-primary me-2"
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
                                {categories.map((category, index) => (
                                    <span
                                        key={index}
                                        className="badge bg-secondary me-2"
                                        onClick={() => removeCategory(category)}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogPostForm;

import React from 'react';

export function Blog() {
    return (
        <>

            {/* Page content */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8">
                        {/* Post content */}
                        <article>
                            <header className="mb-4">
                                <h1 className="fw-bolder mb-1">Welcome to Blog Post!</h1>
                                <div className="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
                                <a className="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                                <a className="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                            </header>
                            <figure className="mb-4">
                                <img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="Blog post" />
                            </figure>
                            <section className="mb-5">
                                <p className="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind...</p>
                                <h2 className="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                                <p className="fs-5 mb-4">For me, the most fascinating interface is Twitter...</p>
                            </section>
                        </article>

                        {/* Comments section */}
                        <section className="mb-5">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <form className="mb-4">
                                        <textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea>
                                    </form>
                                    <div className="d-flex mb-4">
                                        <div className="flex-shrink-0">
                                            <img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="Commenter" />
                                        </div>
                                        <div className="ms-3">
                                            <div className="fw-bold">Commenter Name</div>
                                            If you're going to lead a space frontier, it has to be government; it'll never be private enterprise...
                                            <div className="d-flex mt-4">
                                                <div className="flex-shrink-0">
                                                    <img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="Commenter" />
                                                </div>
                                                <div className="ms-3">
                                                    <div className="fw-bold">Commenter Name</div>
                                                    And under those conditions, you cannot establish a capital-market evaluation of that enterprise...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Side widgets */}
                    <div className="col-lg-4">
                        {/* Search widget */}
                        <div className="card mb-4">
                            <div className="card-header">Search</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                    <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                                </div>
                            </div>
                        </div>
                        {/* Categories widget */}
                        <div className="card mb-4">
                            <div className="card-header">Categories</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                            <li><a href="#!">Web Design</a></li>
                                            <li><a href="#!">HTML</a></li>
                                            <li><a href="#!">Freebies</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                            <li><a href="#!">JavaScript</a></li>
                                            <li><a href="#!">CSS</a></li>
                                            <li><a href="#!">Tutorials</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Side widget */}
                        <div className="card mb-4">
                            <div className="card-header">Side Widget</div>
                            <div className="card-body">You can put anything you want inside of these side widgets...</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap core JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* Core theme JS */}
            <script src="js/scripts.js"></script>
        </>
    );
};

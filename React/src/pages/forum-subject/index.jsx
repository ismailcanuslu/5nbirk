import React from 'react';
import './styles.css';

const ForumSub = () => {
    return (
        <div className="container-fluid mt-100 forum-sub-container"> {/* className eklendi */}
            <div className="d-flex flex-wrap justify-content-between">
                <div>
                    <button type="button" className="btn btn-shadow btn-wide btn-primary">
                        <span className="btn-icon-wrapper pr-2 opacity-7">
                            <i className="fa fa-plus fa-w-20"></i>
                        </span>
                        New thread
                    </button>
                </div>
                <div className="col-12 col-md-3 p-0 mb-3">
                    <input type="text" className="form-control" placeholder="Search..." />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-header pl-0 pr-0">
                    <div className="row no-gutters w-100 align-items-center">
                        <div className="col ml-3">Topics</div>
                        <div className="col-4 text-muted">
                            <div className="row no-gutters align-items-center">
                                <div className="col-4">Replies</div>
                                <div className="col-8">Last update</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/** Card Body */}
                {[
                    {
                        title: 'How can I change the username?',
                        replies: 12,
                        lastUpdated: '1 day ago',
                        user: 'Neon Mandela',
                        userImage: 'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg',
                    },
                    {
                        title: 'How to change the theme to dark mode?',
                        replies: 43,
                        lastUpdated: '1 day ago',
                        user: 'Steve Smith',
                        userImage: 'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583319/AAA/3.jpg',
                    },
                    {
                        title: 'Is it possible to get the refund of the product I purchased today?',
                        replies: 42,
                        lastUpdated: '2 days ago',
                        user: 'Kane William',
                        userImage: 'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg',
                    },
                ].map((topic, index) => (
                    <div key={index}>
                        <div className="card-body py-3">
                            <div className="row no-gutters align-items-center">
                                <div className="col">
                                    <a href="javascript:void(0)" className="text-big" data-abc="true">
                                        {topic.title}
                                    </a>
                                    <div className="text-muted small mt-1">
                                        Started {index + 1} days ago &nbsp;&middot;&nbsp; <a href="javascript:void(0)" className="text-muted" data-abc="true">{topic.user}</a>
                                    </div>
                                </div>
                                <div className="d-none d-md-block col-4">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-4">{topic.replies}</div>
                                        <div className="media col-8 align-items-center">
                                            <img src={topic.userImage} alt="" className="d-block ui-w-30 rounded-circle" />
                                            <div className="media-body flex-truncate ml-2">
                                                <div className="line-height-1 text-truncate">{topic.lastUpdated}</div>
                                                <a href="javascript:void(0)" className="text-muted small text-truncate" data-abc="true">by {topic.user}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="m-0" />
                    </div>
                ))}
            </div>
            <nav>
                <ul className="pagination mb-5">
                    <li className="page-item disabled"><a className="page-link" href="javascript:void(0)" data-abc="true">&laquo;</a></li>
                    <li className="page-item active"><a className="page-link" href="javascript:void(0)" data-abc="true">1</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)" data-abc="true">2</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)" data-abc="true">3</a></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)" data-abc="true">&raquo;</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default ForumSub;

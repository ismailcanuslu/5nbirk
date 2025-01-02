import React from 'react';
import './styles.css'

const Forum = () => {
    return (
        <div className="forum container-fluid mt-100">
            <div className="forum row">
                <div className="forum col-md-12">
                    <div className="forum card mb-3">
                        <div className="forum card-header pr-0 pl-0 py-2">
                            <div className="forum row no-gutters align-items-center w-100">
                                <div className="forum col font-weight-bold pl-3 small">General</div>
                                <div className="forum d-none d-md-block col-6 text-muted">
                                    <div className="forum row no-gutters align-items-center">
                                        <div className="forum col-3 small">Threads</div>
                                        <div className="forum col-3 small">Replies</div>
                                        <div className="forum col-6 small">Last update</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="forum card-body py-2">
                            <div className="forum row no-gutters align-items-center">
                                <div className="forum col">
                                    <a href="/sub-test" className="forum text-big font-weight-semibold" data-abc="true">
                                        Getting started with BBBootstrap.com
                                    </a>
                                </div>
                                <div className="forum d-none d-md-block col-6">
                                    <div className="forum row no-gutters align-items-center">
                                        <div className="forum col-3 small">120</div>
                                        <div className="forum col-3 small">14</div>
                                        <div className="forum media col-6 align-items-center">
                                            <img src="https://i.imgur.com/Ur43esv.jpg" alt="" className="forum d-block ui-w-30 rounded-circle" />
                                            <div className="forum media-body flex-truncate ml-2">
                                                <a href="javascript:void(0)" className="forum d-block text-truncate small" data-abc="true">
                                                    Thank you for your help. Appreciate your solution
                                                </a>
                                                <div className="forum text-muted small text-truncate">2d ago &nbsp;&middot;&nbsp;
                                                    <a href="javascript:void(0)" className="forum text-muted small" data-abc="true">
                                                        William Smith
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="forum m-0" />
                        <div className="forum card-body py-2">
                            <div className="forum row no-gutters align-items-center">
                                <div className="forum col">
                                    <a href="javascript:void(0)" className="forum text-big font-weight-semibold" data-abc="true">
                                        Announcements
                                    </a>
                                </div>
                                <div className="forum d-none d-md-block col-6">
                                    <div className="forum row no-gutters align-items-center">
                                        <div className="forum col-3 small">23</div>
                                        <div className="forum col-3 small">12</div>
                                        <div className="forum media col-6 align-items-center">
                                            <img src="https://i.imgur.com/J6l19aF.jpg" alt="" className="forum d-block ui-w-30 rounded-circle" />
                                            <div className="forum media-body flex-truncate ml-2">
                                                <a href="javascript:void(0)" className="forum d-block text-truncate small" data-abc="true">
                                                    We have created a new feature for developers and designers
                                                </a>
                                                <div className="forum text-muted small text-truncate">1d ago &nbsp;&middot;&nbsp;
                                                    <a href="javascript:void(0)" className="forum text-muted small" data-abc="true">
                                                        Rodie Angel
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="forum m-0" />
                        <div className="forum card-body py-2">
                            <div className="forum row no-gutters align-items-center">
                                <div className="forum col">
                                    <a href="javascript:void(0)" className="forum text-big font-weight-semibold" data-abc="true">
                                        Guides
                                    </a>
                                </div>
                                <div className="forum d-none d-md-block col-6">
                                    <div className="forum row no-gutters align-items-center">
                                        <div className="forum col-3 small">42</div>
                                        <div className="forum col-3 small">654</div>
                                        <div className="forum media col-6 align-items-center">
                                            <img src="https://i.imgur.com/8RKXAIV.jpg" alt="" className="forum d-block ui-w-30 rounded-circle" />
                                            <div className="forum media-body flex-truncate ml-2">
                                                <a href="javascript:void(0)" className="forum d-block text-truncate small" data-abc="true">
                                                    To enable new notifications, just go to settings.
                                                </a>
                                                <div className="forum text-muted small text-truncate">1d ago &nbsp;&middot;&nbsp;
                                                    <a href="javascript:void(0)" className="forum text-muted small" data-abc="true">
                                                        Kim Nicolas
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;

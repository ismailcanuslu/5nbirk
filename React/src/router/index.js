import { createBrowserRouter } from "react-router-dom"

import App from "../App"

import Home from '../pages/home'
import { About } from "../pages/about"
import { Members } from "../pages/members"
import Forum from "../pages/forum"
import Blog from "../pages/blog"

import { Login } from '../pages/login'
import { SignUp } from '../pages/SignUp'
import { Activation } from "../pages/activation"

import { User } from "../pages/User"
import { Profile } from "../pages/profile"
import ProfileSettingsArea from "../pages/ProfileSettings"

import Help from "../pages/help-center"
import Error404 from "../pages/error404"
import PasswordReset from "../pages/forgot-password"
import Contact from "../contact"
import BlogContent from "../pages/blogContent"
import ForumSub from "../pages/forum-subject"

import BlogPostForm from "../pages/blogPostForm"
import Admin from "../pages/admin"
import UserList from "../pages/admin/users/getAllUsers"
import EditUser from "../pages/admin/users/editUser"
import { AddUser } from "../pages/admin/users/addUser"
import ActivityLog from "../pages/admin/users/activityLog"
import getAllPosts from "../pages/admin/posts/getAllPosts"
import getAllCategories from "../pages/admin/posts/getAllCategories"
import EditBlogPost from "../pages/admin/posts/editBlogPost"
import GetAllAuthors from "../pages/admin/authors/getAllAuthors"
import GetAuthorPosts from "../pages/admin/authors/getAuthorPosts"




export default createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                index: true,
                Component: Home,
            },
            {
                path: "*",
                Component: Error404,
            },
            {
                path: "/register",
                Component: SignUp,
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/forum",
                Component: Forum,
            },
            {
                path: "/blog",
                Component: Blog
            },
            {
                path: "/about",
                Component: About,
            },
            {
                path: "/members",
                Component: Members
            },
            {
                path: "/activation/:token",
                Component: Activation
            },
            {
                path: "/user/:id",
                Component: User
            },
            {
                path: "/settings",
                Component: ProfileSettingsArea
            },
            {
                path: "/profile",
                Component: Profile
            },
            {
                path: "/help-center",
                Component: Help
            },
            {
                path: "/forgot-password",
                Component: PasswordReset
            }
            ,
            {
                path: "/contact",
                Component: Contact
            },
            {
                path: "/sub-test",
                Component: ForumSub
            },
            {
                path: "/blog/:title",
                Component: BlogContent
            },
            ,
            {
                path: "/blog/create",
                Component: BlogPostForm
            },
            {
                path: "/admin",
                Component: Admin
            },
            {
                path: "/admin/users/get-all-users",
                Component: UserList
            }
            ,
            {
                path: "/admin/users/edit-user",
                Component: EditUser
            },
            {
                path: "/admin/users/add-user",
                Component: AddUser
            },
            {
                path: "/admin/users/activity-log",
                Component: ActivityLog
            }
            ,
            {
                path: "/admin/posts/get-all-posts",
                Component: getAllPosts
            }
            ,
            {
                path: "/admin/posts/create",
                Component: BlogPostForm
            },
            {
                path: "/admin/posts/categories",
                Component: getAllCategories
            }
            ,
            {
                path: "/admin/posts/edit-post/:id",
                Component: EditBlogPost
            }
            ,
            {
                path: "/admin/posts/authors",
                Component: GetAllAuthors
            }
            ,
            {
                path: "/admin/posts/authors/:id/posts",
                Component: GetAuthorPosts
            }

        ]
    }


])
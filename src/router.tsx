import { lazy, ReactNode, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

// 用懒加载实现优化
const Detail = lazy(() => import('./pages/Detail'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const UserPage = lazy(() => import('./pages/User/index'));
const BookPage  = lazy(() => import('./pages/BookPage/index'));
const NotFound = lazy(() => import('./pages/Exception/403'));


// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹
import AppLayout from './layout/AppLayout';

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
    return <Suspense fallback={<h1>Loading...</h1>}>
        {children}
    </Suspense>
}


export const routers: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        //路由嵌套，子路由的元素需使用<Outlet />
        children: [
            {
                index: true,
                element: lazyLoad(<Home />)
            },
            {
                path: '/user/list',
                element: lazyLoad(<UserPage />)
            },
            {
                path: '/user/detail/:id',
                element: lazyLoad(<Detail />)
            },
            {
                path: '/data-center/books',
                element: lazyLoad(<BookPage />)
            },
            {
                path: '/exception/not-found',
                element: lazyLoad(<NotFound />)
            }
        ]
    },
    {
        path: '/login',
        element: lazyLoad(<Login />)
    }
]
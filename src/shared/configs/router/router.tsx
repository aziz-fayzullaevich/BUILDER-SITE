import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layout/main-layout';
import { lazy, Suspense } from 'react';
import { CustomLoader } from '../../ui/custom-loader';
import { ROUTES } from '../../constants/routes';

const HomePage = lazy(() => import('../../../pages/home/home-page'));
const MySitesPage = lazy(() => import('../../../pages/my-sites/my-sites-page'));
const CreateSitePage = lazy(() => import('../../../pages/create-site/create-site-page'));
const ProfilePage = lazy(() => import('../../../pages/profile/profile-page'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<CustomLoader />}>
                    <HomePage />
                </Suspense>
            },
            {
                path: ROUTES.MY_SITES,
                element: <Suspense fallback={<CustomLoader />}>
                    <MySitesPage />
                </Suspense>
            },
            {
                path: ROUTES.PROFILE,
                element: <Suspense fallback={<CustomLoader />}>
                    <ProfilePage />
                </Suspense>
            }
        ]
    },
    {
        path: ROUTES.CREATE,
        element: <Suspense fallback={<CustomLoader />}>
            <CreateSitePage />
        </Suspense>
    },

])
import { App } from 'app/App';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'shared/ui/Spinner';

const HomePage = lazy(() =>
  import('pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const FavoritesPage = lazy(() =>
  import('pages/FavoritesPage').then((module) => ({
    default: module.FavoritesPage,
  })),
);
const ProductPage = lazy(() =>
  import('pages/ProductPage').then((module) => ({
    default: module.ProductPage,
  })),
);
const ProfilePage = lazy(() =>
  import('pages/ProfilePage').then((module) => ({
    default: module.ProfilePage,
  })),
);
const CartPage = lazy(() =>
  import('pages/CartPage').then((module) => ({ default: module.CartPage })),
);
const SignUpPage = lazy(() =>
  import('pages/SignUpPage').then((module) => ({ default: module.SignUpPage })),
);
const NotFoundPage = lazy(() =>
  import('pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);

export enum AppRoutes {
  HOME = 'home',
  FAVORITES = 'favorites',
  PRODUCTS = 'products',
  PROFILE = 'profile',
  CART = 'cart',
  SIGNUP = 'signup',
  SIGNIN = 'signin',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, `/${string}` | '*'> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.FAVORITES]: '/favorites',
  [AppRoutes.PRODUCTS]: '/products/:productId',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.CART]: '/cart',
  [AppRoutes.SIGNUP]: '/signup',
  [AppRoutes.SIGNIN]: '/signin',
  [AppRoutes.NOT_FOUND]: '*',
};

export const router = createBrowserRouter([
  {
    path: RoutePath.home,
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: RoutePath.favorites,
        element: (
          <Suspense fallback={<Spinner />}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: RoutePath.products,
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: RoutePath.profile,
        element: (
          <Suspense fallback={<Spinner />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: RoutePath.cart,
        element: (
          <Suspense fallback={<Spinner />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: RoutePath.signup,
        element: (
          <Suspense fallback={<Spinner />}>
            <SignUpPage />
          </Suspense>
        ),
      },

      // last route
      {
        path: RoutePath.not_found,
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

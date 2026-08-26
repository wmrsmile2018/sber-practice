import { createBrowserRouter } from 'react-router-dom';

import { App } from '../../..';
import { HomePage } from 'pages/HomePage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { ProductPage } from 'pages/ProductPage';
import { ProfilePage } from 'pages/ProfilePage';
import { CartPage } from 'pages/CartPage';
import { SignUpPage } from 'pages/SignUpPage';
import { NotFoundPage } from 'pages/NotFoundPage';

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
        element: <HomePage />,
      },
      {
        path: RoutePath.favorites,
        element: <FavoritesPage />,
      },
      {
        path: RoutePath.products,
        element: <ProductPage />,
      },
      {
        path: RoutePath.profile,
        element: <ProfilePage />,
      },
      {
        path: RoutePath.cart,
        element: <CartPage />,
      },
      {
        path: RoutePath.signup,
        element: <SignUpPage />,
      },

      // last route
      {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
      },
    ],
  },
]);

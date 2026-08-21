import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/Layout';
import { routes } from '@/app/routes';
import { HomePage } from '@/features/company/HomePage';
import { NosotrosPage } from '@/features/company/NosotrosPage';
import { SigLobbyPage } from '@/features/sig/SigLobbyPage';
import { SigRoomPage } from '@/features/sig/SigRoomPage';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

export const router = createBrowserRouter(
  [
    {
      path: routes.home,
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'nosotros', element: <NosotrosPage /> },
        { path: 'sig', element: <SigLobbyPage /> },
        { path: 'sig/:slug', element: <SigRoomPage /> },
      ],
    },
  ],
  { basename },
);

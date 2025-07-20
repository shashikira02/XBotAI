import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const History = React.lazy(() => import('./pages/History/History'));
const Home = React.lazy(()=> import('./pages/Home/Home'));

const LoadingFallback = ({ message }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    color: '#9785BA' 
  }}>
    {message}
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "history",
        element: (
          <Suspense fallback={<LoadingFallback message="Loading history..." />}>
            <History />
          </Suspense>
        )
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback message="Loading chat..." />}>
            <Home />
          </Suspense>
        )
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
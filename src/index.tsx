import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

<<<<<<< HEAD
import Main from './components/Main';
import Catalog from './components/catalog/Catalog';
import NotFound from './components/NotFound';
import { AuthForm } from './components/auth/AuthForm/AuthForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/catalog",
    element: <Catalog />
  },
  {
    path: "/catalog/foo",
    element: <NotFound />
  },
  {
    path: "*",
    element: <h1>not found</h1>
  },
  {
    path: "/auth",
    element: <AuthForm />
  }
])

const root = ReactDOM.createRoot(
=======
import router from './routes/app.router'

ReactDOM.createRoot(
>>>>>>> 04e10366819f3bc0a57ec4c224e32ff54c54f48e
  document.getElementById('root') as HTMLElement
)
  .render(
    <React.Fragment>
      {router}
    </React.Fragment>
  );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.module.css';

import router from './routes/app.router'

import tokenManager from './libs/token.manager';


(async () => {
  await tokenManager.refreshTokens()

  ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
    .render(
      <React.Fragment>
        {router}
      </React.Fragment>
    );
})();
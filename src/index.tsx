import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import router from './routes/app.router'

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
  .render(
    <React.Fragment>
      {router}
    </React.Fragment>
  );

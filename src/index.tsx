import React from 'react';
import ReactDOM from 'react-dom/client';

import router from './routes/app.router';
import './index.css';
import './styles.module.css';
import ThemeProvider from './contexts/ThemeProvider/ThemeProvider';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
  .render(
    <React.Fragment>
      <ThemeProvider>
          {router}   
      </ThemeProvider>  
    </React.Fragment>
  );
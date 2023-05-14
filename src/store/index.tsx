import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slice/themeSlise'; 
import docListReducer from './slice/docListSlise';
  
export default configureStore({
    reducer: {
        theme: themeReducer,
        docList: docListReducer,
    }
});
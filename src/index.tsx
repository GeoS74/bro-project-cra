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
























// import React, { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   redirect,
//   Link
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <><Page title="page 1"/></>
//   },
//   {
//     path: "/foo",
//     element: <><></><Page title="page 2"/></>
//   },
//   {
//     path: "/bar",
//     element: <><></><Page title="page 2"/></>
//   },
// ])

// function Page({title}: {title: string}){
//   const [x, setX] = useState(0)
//   return <div>
//     <ul>
//     <li><Link to="/">home</Link></li>
//     <li><Link to="/foo">foo</Link></li>
//     <li><Link to="/bar">bar</Link></li>
//     </ul>
//     {title}
//     <p onClick={()=>setX(x+1)}>click me {x}</p>
//   </div>
// }

// ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// ) 
//   .render(
//     <React.Fragment>
//       <RouterProvider router={router} />
//     </React.Fragment>
//   );
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


// const CTX = createContext<{
//   counter: number,
//   setCounter: React.Dispatch<React.SetStateAction<number>>
// } | undefined>(undefined);


// const TestContext = createContext({count: 1})

// function Main() {
//   console.log('render Main')
//   const [counter, setCounter] = useState(0)
//   return (
//     <TestContext.Provider value={{count: 1}}>
//     <Pane />
//   </TestContext.Provider>

//     // <CTX.Provider value={{ counter, setCounter }}>
//     //   <Pane />
//     // </CTX.Provider>
//   )
// }

// function Pane() {
//   console.log('render Pane')
//   const ctx = useContext(TestContext);

//   return <div>
//     <Title />

//     <p>count: {ctx.count}</p>

//     <Button />
//     <Button />
//   </div>
// }

// function Title() {
//   console.log('render Title')
//   return <h1>hello</h1>
// }

// function Button() {
//   console.log('render Button')
//   let ctx = useContext(TestContext);

//   return <input type="submit" defaultValue="ckeck me"
//     onClick={() => {
//       ctx = {count: 2};
//     }} />
// }
import { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
const Header = lazy(() => import('./components/Header'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const Main = lazy(() => import('./components/Main'));
const Login = lazy(() => import('./components/Login'));
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  const [count, setCount] = useState(0)
  const [activeBoard, setActiveBoard] = useState(null);

  const boards = useSelector((state) => state.board?.boards || []);
  const dispatch = useDispatch();

  const addBoard = () => {
    const newBoard = { id: Date.now(), name: 'New Board' };
    dispatch({ type: 'ADD_BOARD', payload: newBoard });
  };

  const selectBoard = (board) => {
    setActiveBoard(board);
  };

  return (
    <>
      <ThemeProvider>
        <Header />

        <div className="content">
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              }>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/main"
                  element={
                    <>
                      <Sidebar setActiveBoard={setActiveBoard} />
                      <Main activeBoard={activeBoard} />
                    </>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
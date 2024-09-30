import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import GoodsList from './page/GoodsList';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<GoodsList/>}/>
                </Routes>
            </Router>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
        </>
    );
}

export default App;

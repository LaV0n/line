import React from 'react';
import './App.css';
import {Main} from "./features/main/Main";
import {Route, Routes} from "react-router-dom";
import {Setting} from "./features/setting/Setting";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<Main/>} path={'/game'}/>
                <Route element={<Setting/>} path={'/'}/>
            </Routes>
        </div>
    );
}

export default App;

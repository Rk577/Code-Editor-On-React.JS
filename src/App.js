import React from "react";
import './App.css';
import {
  BrowserRouter,Routes, Route
} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from "./components/Home"
import EditorsPage from "./components/EditorsPage"





function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88'
              }
            }
          }}></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/editor/:roomId" element={<EditorsPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

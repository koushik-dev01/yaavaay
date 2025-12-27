import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import './App.css';
import PrintComponent from './components/Print/PrintComponent';
import Payment from './components/Payment/Payment';
import Success from "./components/Payment/Success";
import FaceDetection from './components/facedetection/FaceDetection';


function App() {
  return (
    <div className="App">
      <MainContent />
    </div>
  );
}

export default App;

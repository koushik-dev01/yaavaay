import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Success from "./components/Payment/Success";
import Cancel from "./components/Payment/Cancel";
import Payment from "./components/Payment/Payment";
import TestScrip from "./components/Payment/TestPanel";
import RawTestScrip from "./components/Payment/testStrip";
import Return from './components/Payment/Return';
import PrintComponent from './components/Print/PrintComponent';
import FaceDetection from './components/facedetection/FaceDetection';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
        <Route path="/canceled" element={<Cancel />} />
        {/* <Route path="/payment" element={<RawTestScrip />} /> */}
        <Route path="/payment" element={<TestScrip />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/return" element={<Return />} />
        <Route path="/recipt" element={<PrintComponent />} />
        <Route path="/camera" element={<FaceDetection />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

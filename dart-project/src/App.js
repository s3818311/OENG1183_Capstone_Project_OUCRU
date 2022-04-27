import React, {Suspense} from "react";
import './styles/views/_test.scss';
import navigationRoutes from './routes/NavigationRoutes';
import {
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import NavigationBar from './components/global/NavigationBar';
import Header from './components/global/Header';
import Footer from './components/global/Footer';

export default function App() {
  return (
    <div>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavigationBar/>
          <Routes>
            {navigationRoutes}
          </Routes>
        </Router>
      </Suspense>
      <Footer/>
    </div>
   
  );
}

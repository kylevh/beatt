import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.scss'
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import React, { Suspense, lazy } from "react";

const TaxPro = lazy(() => import("./pages/taxpro/TaxPro"));
const Home = lazy(() => import("./pages/home/Home"));

// const Loading = () => {
//   return (
//     <motion.div className="loading-container">
//       <div className="loading-spinner"></div>
//     </motion.div>
//   )
// }

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<div className="page">Analytics</div>} />
        <Route path="/taxpro" element={<TaxPro />} />
        <Route path="/iola" element={<div className="page">IOLA</div>} />
      </Routes>
    </AnimatePresence>
  )
}


function App() {
  return (
    <MemoryRouter>
      <div className="screen-container">
        <Header />
        <div className="screen-container__content">
          <Navbar />
          <div className="screen-container__content--body">
            <Suspense fallback={<div>Loading...</div>}>
              <AnimatedRoutes />
            </Suspense>
          </div>
        </div>
      </div>
    </MemoryRouter>
  )
}

export default App

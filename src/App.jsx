import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

function App() {
  return (
    <>
      <Preloader />
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
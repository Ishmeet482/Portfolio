import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
const Photography = lazy(() => import("./pages/Photography"));
const Gaming = lazy(() => import("./pages/Gaming"));
const Media = lazy(() => import("./pages/Media"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HashRouter>
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/media" element={<Media />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </HashRouter>
);

export default App;

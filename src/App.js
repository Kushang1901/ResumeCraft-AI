import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TemplateSelection from "./pages/TemplateSelection";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/preview";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* HOME */}
                <Route path="/" element={<HomePage />} />

                {/* TEMPLATE SELECTION (NEW) */}
                <Route path="/templates" element={<TemplateSelection />} />

                {/* RESUME FLOW */}
                <Route path="/builder" element={<ResumeBuilder />} />
                <Route path="/preview" element={<Preview />} />

                {/* AUTH */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
